import pytest
from pydantic import ValidationError
from forest_lite.server.lib.config import (
    Config,
    Driver,
    Palette,
    NamedPalette,
    Dataset)
import bokeh.palettes


def test_config_object():
    config = Config.from_dict({
        "datasets": [{"label": "Name"}]
    })
    assert config.datasets == [Dataset(label="Name", uid=0)]


def test_config_dataset():
    dataset = Dataset(label="Label",
                      driver={"name": "EIDA50", "settings": {}})
    assert dataset.label == "Label"
    assert dataset.driver == Driver(name="EIDA50", settings={})


def test_config_named_palette():
    name = "Blues"
    number = 3
    result = NamedPalette(name=name, number=number).palette().colors
    expect = list(bokeh.palettes.all_palettes[name][number])
    assert result == expect


def test_config_named_palette_raises_validation_error():
    with pytest.raises(ValidationError):
        NamedPalette(name="Foo", number=1)


def test_config_given_named_palette():
    name = "Blues"
    number = 3
    config = Config(
        datasets=[
            {
                "label": "Name",
                "palettes": {
                    "key": { "name": name, "number": number }
                }
            }
        ]
    )
    result = config.datasets[0].palettes["key"].dict()["colors"]
    expect = list(bokeh.palettes.all_palettes[name][number])
    assert result == expect


def test_config_named_palette_reversed():
    name = "Blues"
    number = 3
    reverse = True
    result = NamedPalette(name=name,
                          number=number,
                          reverse=reverse).palette().colors
    expect = list(bokeh.palettes.all_palettes[name][number])[::-1]
    assert result == expect
