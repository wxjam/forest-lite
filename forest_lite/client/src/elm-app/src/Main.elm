port module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, li, option, select, span, text, ul)
import Html.Attributes exposing (class, style)
import Http
import Json.Decode exposing (Decoder, field, int, list, string)
import Json.Decode.Pipeline exposing (optional, required)


jwtDecoder : Decoder JWTClaim
jwtDecoder =
    Json.Decode.succeed JWTClaim
        |> required "auth_time" int
        |> optional "email" string "Not provided"
        |> required "name" string
        |> required "given_name" string
        |> required "family_name" string
        |> required "groups" (list string)
        |> required "iat" int
        |> required "exp" int


type alias JWTClaim =
    { auth_time : Int
    , email : String
    , name : String
    , given_name : String
    , family_name : String
    , groups : List String
    , iat : Int
    , exp : Int
    }


type alias User =
    { name : String
    , email : String
    , groups : List String
    }


type alias Model =
    { user : Maybe User
    , route : Maybe Route
    , datasets : Request
    , datasetDescription : RequestDescription
    }


type alias Dataset =
    { label : String
    , id : Int
    }


type Request
    = Failure
    | Loading
    | Success (List Dataset)


type RequestDescription
    = FailureDescription
    | LoadingDescription
    | SuccessDescription String


type Route
    = Account
    | Home


type alias Flags =
    Json.Decode.Value


type Msg
    = HashReceived String
    | GotDatasets (Result Http.Error (List Dataset))
    | GotDatasetDescription (Result Http.Error String)



-- MAIN


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- INIT


init : Flags -> ( Model, Cmd Msg )
init flags =
    case Json.Decode.decodeValue jwtDecoder flags of
        Ok claim ->
            ( { user =
                    Just
                        { name = claim.name
                        , email = claim.email
                        , groups = claim.groups
                        }
              , route = Nothing
              , datasets = Loading
              , datasetDescription = LoadingDescription
              }
            , getDatasets
            )

        Err err ->
            -- TODO: Support failed JSON decode in Model
            ( { user = Nothing
              , route = Nothing
              , datasets = Loading
              , datasetDescription = LoadingDescription
              }
            , getDatasets
            )


datasetsDecoder : Decoder (List Dataset)
datasetsDecoder =
    field "datasets" (list datasetDecoder)


datasetDecoder : Decoder Dataset
datasetDecoder =
    Json.Decode.map2 Dataset
        (field "label" string)
        (field "id" int)



-- PORTS


port hash : (String -> msg) -> Sub msg



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HashReceived hashRoute ->
            ( { model | route = parseRoute hashRoute }, Cmd.none )

        GotDatasets result ->
            case result of
                Ok payload ->
                    ( { model | datasets = Success payload }
                    , getDatasetDescription 0
                    )

                Err _ ->
                    ( { model | datasets = Failure }, Cmd.none )

        GotDatasetDescription result ->
            case result of
                Ok payload ->
                    ( { model | datasetDescription = SuccessDescription payload }
                    , Cmd.none
                    )

                Err _ ->
                    ( { model | datasetDescription = FailureDescription }, Cmd.none )


getDatasets : Cmd Msg
getDatasets =
    Http.get
        { url = "http://localhost:8000/datasets"
        , expect = Http.expectJson GotDatasets datasetsDecoder
        }


getDatasetDescription : Int -> Cmd Msg
getDatasetDescription datasetId =
    Http.get
        { url = "http://localhost:8000/datasets/" ++ String.fromInt datasetId
        , expect = Http.expectString GotDatasetDescription
        }


parseRoute : String -> Maybe Route
parseRoute hashText =
    if hashText == "#/account" then
        Just Account

    else if hashText == "#/" then
        Just Home

    else
        Nothing



-- VIEW


view : Model -> Html Msg
view model =
    case model.route of
        Just validRoute ->
            case validRoute of
                Account ->
                    viewAccountInfo model

                Home ->
                    viewHome model

        Nothing ->
            div [] []


viewHome : Model -> Html Msg
viewHome model =
    case model.datasets of
        Success payload ->
            div [] [ viewOptions (List.map (\o -> o.label) payload) ]

        Loading ->
            div [] [ text "..." ]

        Failure ->
            div [] [ text "failed to fetch datasets" ]


viewOptions : List String -> Html Msg
viewOptions texts =
    select [] (List.map (\t -> option [] [ text t ]) texts)


viewAccountInfo : Model -> Html Msg
viewAccountInfo model =
    div
        [ style "display" "grid"
        , style "grid-template-columns" "1fr 1fr 1fr"
        ]
        [ div [ style "grid-column-start" "2" ]
            [ div [ class "Account__card" ]
                [ viewTitle
                , viewUser model.user
                ]
            ]
        ]


viewTitle : Html Msg
viewTitle =
    h1
        [ class "Account__h1" ]
        [ text "Account information" ]


viewUser : Maybe User -> Html Msg
viewUser maybeUser =
    case maybeUser of
        Just user ->
            div
                []
                [ viewItem "Name" user.name
                , viewItem "Contact" user.email
                , div
                    [ class "Account__item__container" ]
                    [ div [ class "Account__item__label" ]
                        [ text "Authentication groups"
                        ]
                    , div []
                        [ ul
                            [ class "Account__ul" ]
                            (List.map viewGroup user.groups)
                        ]
                    ]
                ]

        Nothing ->
            div [] [ text "Not logged in" ]


viewGroup group =
    li
        [ class "Account__li" ]
        [ text group ]


viewItem : String -> String -> Html Msg
viewItem label content =
    div
        [ class "Account__item__container" ]
        [ div
            [ class "Account__item__label" ]
            [ text label ]
        , div
            [ class "Account__item__content" ]
            [ text content ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    hash HashReceived
