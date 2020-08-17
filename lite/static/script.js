!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);let n=function(e,t){this.figure=e,this.source=new Bokeh.ColumnDataSource({data:{x:[],y:[],dw:[],dh:[],image:[],level:[]}}),e.image({x:{field:"x"},y:{field:"y"},dw:{field:"dw"},dh:{field:"dh"},image:{field:"image"},source:this.source,color_mapper:t}),this.url="/tiles/dataset/time/{Z}/{X}/{Y}",fetch("/google_limits").then(e=>e.json()).then(e=>{this.limits=e}),this.tileCache={},this.imageCache={};let a=this.figure.x_range;a.connect(a.properties.start.change,()=>{this.render()})};n.prototype.setURL=function(e){if(e===this.url)return;this.url=e;let t=Object.keys(this.source.data).reduce((e,t)=>(e[t]=[],e),{});this.source.data=t,this.source.change.emit(),this.tileCache={},this.render()},n.prototype.render=function(){if(void 0===this.limits)return;let e=this.figure.x_range,t=this.figure.y_range,a=i(e,t,this.limits),n={remote:[],local:[]};for(let e=0;e<a.length;e++){let t=a[e],i=this.url.replace("{Z}",t.z).replace("{X}",t.x).replace("{Y}",t.y);i in this.tileCache||(this.tileCache[i]=!0,i in this.imageCache?n.local.push(i):n.remote.push(i))}let s=n.local.map(e=>this.imageCache[e]);s.length>0&&this._addImages(s),n.remote.forEach(e=>{fetch(e).then(e=>e.json()).then(t=>{this.imageCache[e]=t,this._addImage(t)})})},n.prototype._addImages=function(e){let t=this.source,a=this.splitImages(t.data).concat(e);a=a.sort((e,t)=>e.level[0]-t.level[0]);let n=this.mergeImages(a);t.data=n,t.change.emit()},n.prototype._addImage=function(e){let t=this.source,a=Object.keys(e).reduce((a,n)=>(a[n]=t.data[n].concat(e[n]),a),{}),n=this.splitImages(a);n=n.sort((e,t)=>e.level[0]-t.level[0]);let i=this.mergeImages(n);t.data=i,t.change.emit()},n.prototype.splitImages=function(e){return Object.keys(e).reduce((t,a)=>(e[a].forEach((e,n)=>{t[n]=t[n]||{},t[n][a]=[e]}),t),[])},n.prototype.mergeImages=function(e){return e.reduce((e,t)=>(Object.keys(t).forEach(a=>{e[a]=e[a]||[],e[a]=e[a].concat(t[a])}),e),{})};let i=function(e,t,a){let n=s(a.x[0],a.x[1],0,256),i=s(a.y[0],a.y[1],0,256),c={x:{start:n(e.start),end:n(e.end)},y:{start:i(t.start),end:i(t.end)}},d=o(c)+2,p={x:{start:r(l(c.x.start,d)),end:r(l(c.x.end,d))},y:{start:r(l(c.y.start,d)),end:r(l(c.y.end,d))}},u=[];for(let e=p.x.start;e<=p.x.end;e++)for(let t=p.y.start;t<=p.y.end;t++)u.push({z:d,x:e,y:t});return u},s=function(e,t,a,n){return function(i){return(n-a)*(i-e)/(t-e)}},l=function(e,t){return Math.floor(e*2**t)},r=function(e){return Math.floor(e/256)},o=function(e){let t=e.x.end-e.x.start,a=e.y.end-e.y.start,n=Math.min(t,a);return Math.floor(Math.log2(256/n))},c={Antique:"https://cartocdn_d.global.ssl.fastly.net/base-antique/{Z}/{X}/{Y}.png","Midnight Commander":"https://cartocdn_d.global.ssl.fastly.net/base-midnight/{Z}/{X}/{Y}.png","ESRI Nat Geo":"https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{Z}/{Y}/{X}",Voyager:"https://d.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{Z}/{X}/{Y}.png"};let d=e=>({type:"SET_PALETTE",payload:e}),p=e=>({type:"SET_PALETTE_NAME",payload:e}),u=e=>({type:"SET_PALETTE_NUMBER",payload:e}),h=e=>({type:"SET_TIME_INDEX",payload:e}),f=(e="",t)=>{switch(t.type){case"SET_DATASET":return Object.assign({},e,{dataset:t.payload});case"SET_DATASETS":return Object.assign({},e,{datasets:t.payload});case"SET_URL":return Object.assign({},e,{url:t.payload});case"SET_PALETTE":return Object.assign({},e,{palette:t.payload});case"SET_PALETTES":return Object.assign({},e,{palettes:t.payload});case"SET_PALETTE_NAME":return Object.assign({},e,{palette_name:t.payload});case"SET_PALETTE_NAMES":return Object.assign({},e,{palette_names:t.payload});case"SET_PALETTE_NUMBER":return Object.assign({},e,{palette_number:t.payload});case"SET_PALETTE_NUMBERS":return Object.assign({},e,{palette_numbers:t.payload});case"SET_PLAYING":return Object.assign({},e,{playing:t.payload});case"SET_LIMITS":return Object.assign({},e,{limits:t.payload});case"SET_TIMES":return Object.assign({},e,{times:t.payload});case"SET_TIME_INDEX":return Object.assign({},e,{time_index:t.payload});case"FETCH_IMAGE":return Object.assign({},e,{is_fetching:!0,image_url:t.payload});case"FETCH_IMAGE_SUCCESS":return Object.assign({},e,{is_fetching:!1});default:return e}},g=e=>e=>t=>{e(t)},m=e=>t=>a=>{if("NEXT_TIME_INDEX"===a.type){let a=e.getState();if(void 0===a.time_index)return;if(void 0===a.times)return;let n=_(a.time_index+1,a.times.length),i=h(n);t(i)}else if("PREVIOUS_TIME_INDEX"===a.type){let a=e.getState();if(void 0===a.time_index)return;if(void 0===a.times)return;let n=_(a.time_index-1,a.times.length),i=h(n);t(i)}else t(a)},y=e=>t=>a=>{if("SET_PALETTE_NAME"==a.type){let t=a.payload,n=e.getState();if(void 0!==n.palettes){let a=n.palettes.filter(e=>e.name==t).map(e=>parseInt(e.number)).concat().sort((e,t)=>e-t),i={type:"SET_PALETTE_NUMBERS",payload:a};e.dispatch(i)}}else if("SET_PALETTE_NUMBER"==a.type){let t=e.getState(),n=t.palette_name,i=a.payload;if(void 0!==t.palettes){let a=T(t.palettes,n,i);if(a.length>0){let t=d(a[0].palette);e.dispatch(t)}}}else if("SET_PALETTES"==a.type){t(a),t(p("Blues")),t(u(256));let e=T(a.payload,"Blues",256);if(e.length>0){let a=d(e[0].palette);t(a)}return}return t(a)},E=e=>e=>t=>{if(e(t),"SET_DATASETS"==t.type){let a=t.payload[0];e((e=>({type:"SET_DATASET",payload:e}))(a))}},_=function(e,t){return(e%t+t)%t},T=function(e,t,a){return e.filter(e=>e.name===t).filter(e=>parseInt(e.number)===parseInt(a))};function b(e,t){this.figure=e,this.source=new Bokeh.ColumnDataSource({data:{xs:[[]],ys:[[]]}}),this.figure.multi_line({xs:{field:"xs"},ys:{field:"ys"},line_color:t,source:this.source})}function S(e){this.el=e}function v(e){this.button=document.createElement("button"),this.button.classList.add("lite-btn","play-btn"),this.i=document.createElement("i"),this.i.classList.add("fas","fa-play"),this.button.appendChild(this.i),this.button.onclick=e.onClick,this.el=this.button}function I(e){let t,a;t=document.createElement("button"),t.classList.add("lite-btn","previous-btn"),t.onclick=e.onClick,a=document.createElement("i"),a.classList.add("fas","fa-angle-left"),t.appendChild(a),this.el=t}function x(e){let t,a;t=document.createElement("button"),t.classList.add("lite-btn","next-btn"),t.onclick=e.onClick,a=document.createElement("i"),a.classList.add("fas","fa-angle-right"),t.appendChild(a),this.el=t}window.main=function(){let e=new Bokeh.Range1d({start:0,end:1e6}),t=new Bokeh.Range1d({start:0,end:1e6}),a=Bokeh.Plotting.figure({x_range:e,y_range:t,sizing_mode:"stretch_both"});a.xaxis[0].visible=!1,a.yaxis[0].visible=!1,a.toolbar_location=null,a.min_border=0,a.select_one(Bokeh.WheelZoomTool).active=!0;let i=new Bokeh.WMTSTileSource({url:"https://cartocdn_d.global.ssl.fastly.net/base-antique/{Z}/{X}/{Y}.png"}),s=new Bokeh.TileRenderer({tile_source:i});a.renderers=a.renderers.concat(s),Bokeh.Plotting.show(a,"#map-figure");let l=Redux.createStore(f,Redux.applyMiddleware(g,m,y,E));l.subscribe(()=>{let e=l.getState();void 0!==e.url&&(i.url=e.url)}),fetch("./palettes").then(e=>e.json()).then(e=>{let t={type:"SET_PALETTES",payload:e};return l.dispatch(t),e}).then(e=>{let t=e.map(e=>e.name);return Array.from(new Set(t)).concat().sort()}).then(e=>{let t={type:"SET_PALETTE_NAMES",payload:e};l.dispatch(t)});let r=new Bokeh.Widgets.Select({options:Object.keys(c)});r.connect(r.properties.value.change,()=>{l.dispatch({type:"SET_URL",payload:c[r.value]})}),Bokeh.Plotting.show(r,"#tile-url-select");let o=new Bokeh.Widgets.Select({options:[]});o.connect(o.properties.value.change,()=>{l.dispatch({type:"SET_DATASET",payload:o.value})}),Bokeh.Plotting.show(o,"#select"),l.subscribe(()=>{let e=l.getState();void 0!==e.datasets&&void 0!==e.dataset&&(o.options=e.datasets,o.value=e.dataset)}),fetch("./datasets").then(e=>e.json()).then(e=>{l.dispatch({type:"SET_DATASETS",payload:e.names})});let d=new Bokeh.Widgets.Select({options:[]});l.subscribe(()=>{let e=l.getState();void 0!==e.palette_names&&(d.options=e.palette_names)}),d.connect(d.properties.value.change,()=>{let e=p(d.value);l.dispatch(e)}),Bokeh.Plotting.show(d,"#palette-select");let _=new Bokeh.Widgets.Select({options:[]});l.subscribe(()=>{let e=l.getState();if(void 0!==e.palette_numbers){let t=e.palette_numbers.map(e=>e.toString());_.options=t}}),_.connect(_.properties.value.change,()=>{let e=u(_.value);l.dispatch(e)}),Bokeh.Plotting.show(_,"#palette-number-select");let T=new Bokeh.LinearColorMapper({low:200,high:300,palette:["#440154","#208F8C","#FDE724"],nan_color:"rgba(0,0,0,0)"});l.subscribe(()=>{let e=l.getState();void 0!==e.palette&&(T.palette=e.palette),void 0!==e.limits&&(T.low=e.limits.low,T.high=e.limits.high)});let A=new n(a,T);l.subscribe(()=>{let e=l.getState();if(void 0===e.dataset)return;if(void 0===e.time_index)return;if(void 0===e.times)return;let t=e.times[e.time_index],a=`./tiles/${e.dataset}/${t}/{Z}/{X}/{Y}`;A.setURL(a)});let w=new S(document.getElementById("title-text"));l.subscribe(()=>{let e=l.getState();if(void 0===e.time_index)return;if(void 0===e.times)return;let t=new Date(e.times[e.time_index]);w.render(t.toUTCString())}),l.dispatch(h(0)),fetch("./datasets/EIDA50/times?limit=10").then(e=>e.json()).then(e=>{let t={type:"SET_TIMES",payload:e};l.dispatch(t)});let M=()=>{let e=l.getState();if(!e.is_fetching&&e.playing){let e={type:"NEXT_TIME_INDEX"};l.dispatch(e)}},L=document.getElementById("controls"),k=document.createElement("div");k.classList.add("btn-row"),L.appendChild(k);let j=new I({onClick:()=>{let e={type:"PREVIOUS_TIME_INDEX"};l.dispatch(e)}});k.appendChild(j.el);let C=new v({onClick:function(){let e;e=!l.getState().playing;let t=(e=>({type:"SET_PLAYING",payload:e}))(e);l.dispatch(t)}});l.subscribe(()=>{let e=l.getState();C.render(e.playing)}),k.appendChild(C.el);let P=new x({onClick:()=>{let e={type:"NEXT_TIME_INDEX"};l.dispatch(e)}});k.appendChild(P.el);M(),setInterval(M,100),new b(a,"black").fetch("./atlas/coastlines"),new b(a,"black").fetch("./atlas/borders"),new b(a,"red").fetch("./atlas/disputed"),new b(a,"LightBlue").fetch("./atlas/lakes")},b.prototype.fetch=function(e){fetch(e).then(e=>e.json()).then(e=>{this.source.data=e})},S.prototype.render=function(e){this.el.innerHTML=e},v.prototype.render=function(e){e?(this.i.classList.remove("fas","fa-play"),this.i.classList.add("fas","fa-pause")):(this.i.classList.remove("fas","fa-pause"),this.i.classList.add("fas","fa-play"))}}]);