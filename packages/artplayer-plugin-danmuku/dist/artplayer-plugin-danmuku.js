/*!
 * artplayer-plugin-danmuku.js v4.3.22
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2022 Harvey Zack
 * Released under the MIT License.
 */
!function(t,e,i,r,n){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof s.parcelRequire93cf&&s.parcelRequire93cf,a=o.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function h(e,i){if(!a[e]){if(!t[e]){var r="function"==typeof s.parcelRequire93cf&&s.parcelRequire93cf;if(!i&&r)return r(e,!0);if(o)return o(e,!0);if(l&&"string"==typeof e)return l(e);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}p.resolve=function(i){var r=t[e][1][i];return null!=r?r:i},p.cache={};var u=a[e]=new h.Module(e);t[e][0].call(u.exports,p,u,u.exports,this)}return a[e].exports;function p(t){var e=p.resolve(t);return!1===e?{}:h(e)}}h.isParcelRequire=!0,h.Module=function(t){this.id=t,this.bundle=h,this.exports={}},h.modules=t,h.cache=a,h.parent=o,h.register=function(e,i){t[e]=[function(t,e){e.exports=i},{}]},Object.defineProperty(h,"root",{get:function(){return s.parcelRequire93cf}}),s.parcelRequire93cf=h;for(var u=0;u<e.length;u++)h(e[u]);var p=h(i);"object"==typeof exports&&"undefined"!=typeof module?module.exports=p:"function"==typeof define&&define.amd&&define((function(){return p}))}({E13ST:[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i);var n=t("./danmuku"),s=r.interopDefault(n);function o(t){return e=>{const i=new s.default(e,t);return{name:"artplayerPluginDanmuku",emit:i.emit.bind(i),config:i.config.bind(i),hide:i.hide.bind(i),show:i.show.bind(i),get isHide(){return i.isHide}}}}i.default=o,window.artplayerPluginDanmuku=o},{"./danmuku":"8Gtnh","@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}],"8Gtnh":[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i);var n=t("./bilibili"),s=t("./getDanmuTop"),o=r.interopDefault(s);class a{constructor(e,i){const{constructor:r,template:n}=e;if(this.utils=r.utils,this.validator=r.validator,this.$danmuku=n.$danmuku,this.$player=n.$player,this.art=e,this.queue=[],this.option={},this.$refs=[],this.isStop=!1,this.isHide=!1,this.timer=null,this.config(i),this.option.useWorker)try{this.worker=new Worker(t("85d40535eae5f839"))}catch(t){}e.on("video:play",this.start.bind(this)),e.on("video:playing",this.start.bind(this)),e.on("video:pause",this.stop.bind(this)),e.on("video:waiting",this.stop.bind(this)),e.on("fullscreen",this.reset.bind(this)),e.on("fullscreenWeb",this.reset.bind(this)),e.on("destroy",this.stop.bind(this)),this.load()}static get option(){return{danmuku:[],speed:5,margin:[10,100],opacity:1,fontSize:25,filter:()=>!0,antiOverlap:!0,useWorker:!0,synchronousPlayback:!1}}static get scheme(){return{danmuku:"array|function|string",speed:"number",margin:"array",opacity:"number",fontSize:"number",filter:"function",antiOverlap:"boolean",useWorker:"boolean",synchronousPlayback:"boolean"}}get isRotate(){return this.art.plugins.autoOrientation&&this.art.plugins.autoOrientation.state}get marginTop(){const{clamp:t}=this.utils,{$player:e}=this.art.template,i=this.option.margin[0];if("number"==typeof i)return t(i,0,e.clientHeight);if("string"==typeof i&&i.endsWith("%")){const r=parseFloat(i)/100;return t(e.clientHeight*r,0,e.clientHeight)}return a.option.margin[0]}get marginBottom(){const{clamp:t}=this.utils,{$player:e}=this.art.template,i=this.option.margin[1];if("number"==typeof i)return t(i,0,e.clientHeight);if("string"==typeof i&&i.endsWith("%")){const r=parseFloat(i)/100;return t(e.clientHeight*r,0,e.clientHeight)}return a.option.margin[1]}filter(t,e){return this.queue.filter((e=>e.$state===t)).map(e)}getLeft(t){const e=t.getBoundingClientRect();return this.isRotate?e.top:e.left}getRef(){const t=this.$refs.pop();if(t)return t;const e=document.createElement("div");return e.style.cssText='\n            user-select: none;\n            position: absolute;\n            white-space: pre;\n            pointer-events: none;\n            perspective: 500px;\n            display: inline-block;\n            will-change: transform;\n            font-weight: normal;\n            line-height: 1.125;\n            visibility: hidden;\n            font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;\n            text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;\n        ',e}getReady(){const{currentTime:t}=this.art;return this.queue.filter((e=>"ready"===e.$state||"wait"===e.$state&&t+.1>=e.time&&e.time>=t-.1))}getEmits(){const t=[],{clientWidth:e}=this.$player,i=this.getLeft(this.$player);return this.filter("emit",(r=>{const n=r.$ref.offsetTop,s=this.getLeft(r.$ref)-i,o=r.$ref.clientHeight,a=r.$ref.clientWidth,l=s+a,h=e-l,u=l/r.$restTime,p={};p.top=n,p.left=s,p.height=o,p.width=a,p.right=h,p.speed=u,p.distance=l,p.time=r.$restTime,p.mode=r.mode,t.push(p)})),t}postMessage(t={}){return new Promise((e=>{if(this.option.useWorker&&this.worker&&this.worker.postMessage)t.id=Date.now(),this.worker.postMessage(t),this.worker.onmessage=i=>{const{data:r}=i;r.id===t.id&&e(r)};else{const i=o.default(t);e({top:i})}}))}async load(){try{let t=[];t="function"==typeof this.option.danmuku?await this.option.danmuku():"function"==typeof this.option.danmuku.then?await this.option.danmuku:"string"==typeof this.option.danmuku?await n.bilibiliDanmuParseFromUrl(this.option.danmuku):this.option.danmuku,this.utils.errorHandle(Array.isArray(t),"Danmuku need return an array as result"),this.art.emit("artplayerPluginDanmuku:loaded",t),this.queue=[],this.$danmuku.innerText="",t.forEach((t=>this.emit(t)))}catch(t){throw this.art.emit("artplayerPluginDanmuku:error",t),t}return this}config(t){const{clamp:e}=this.utils;return this.option=Object.assign({},a.option,this.option,t),this.validator(this.option,a.scheme),t.fontSize&&this.reset(),this.option.speed=e(this.option.speed,1,10),this.option.opacity=e(this.option.opacity,0,1),this.option.fontSize=e(this.option.fontSize,12,100),this.art.emit("artplayerPluginDanmuku:config",this.option),this}makeWait(t){t.$state="wait",t.$ref&&(t.$ref.style.visibility="hidden",t.$ref.style.marginLeft="0px",t.$ref.style.transform="translateX(0px)",t.$ref.style.transition="transform 0s linear 0s",this.$refs.push(t.$ref),t.$ref=null)}continue(){const{clientWidth:t}=this.$player;return this.filter("stop",(e=>{switch(e.$state="emit",e.$lastStartTime=Date.now(),e.mode){case 0:{const i=t+e.$ref.clientWidth;e.$ref.style.transform=`translateX(${-i}px)`,e.$ref.style.transition=`transform ${e.$restTime}s linear 0s`;break}}})),this}suspend(){const{clientWidth:t}=this.$player;return this.filter("emit",(e=>{switch(e.$state="stop",e.mode){case 0:{const i=t-(this.getLeft(e.$ref)-this.getLeft(this.$player));e.$ref.style.transform=`translateX(${-i}px)`,e.$ref.style.transition="transform 0s linear 0s";break}}})),this}reset(){this.queue.forEach((t=>this.makeWait(t)))}update(){const{clientWidth:t}=this.$player;return this.timer=window.requestAnimationFrame((async()=>{if(this.art.playing&&!this.isHide){this.filter("emit",(t=>{const e=(Date.now()-t.$lastStartTime)/1e3;t.$restTime-=e,t.$lastStartTime=Date.now(),t.$restTime<=0&&this.makeWait(t)}));const e=this.getReady();for(let i=0;i<e.length;i++){const r=e[i];r.$ref=this.getRef(),r.$ref.innerText=r.text,this.$danmuku.appendChild(r.$ref),r.$ref.style.left=`${t}px`,r.$ref.style.opacity=this.option.opacity,r.$ref.style.fontSize=`${this.option.fontSize}px`,r.$ref.style.color=r.color||"#fff",r.$ref.style.border=r.border?`1px solid ${r.color||"#fff"}`:"none",r.$ref.style.marginLeft="0px",r.$lastStartTime=Date.now(),r.$restTime=this.option.synchronousPlayback&&this.art.playbackRate?this.option.speed/Number(this.art.playbackRate):this.option.speed;const n={mode:r.mode,height:r.$ref.clientHeight,speed:(t+r.$ref.clientWidth)/r.$restTime},{top:s}=await this.postMessage({target:n,emits:this.getEmits(),antiOverlap:this.option.antiOverlap,clientWidth:this.$player.clientWidth,clientHeight:this.$player.clientHeight,marginBottom:this.marginBottom,marginTop:this.marginTop});if(this.isStop||void 0===s)r.$state="ready",this.$refs.push(r.$ref),r.$ref=null;else switch(r.$state="emit",r.$ref.style.visibility="visible",r.mode){case 0:{r.$ref.style.top=`${s}px`;const e=t+r.$ref.clientWidth;r.$ref.style.transform=`translateX(${-e}px)`,r.$ref.style.transition=`transform ${r.$restTime}s linear 0s`;break}case 1:r.$ref.style.left="50%",r.$ref.style.top=`${s}px`,r.$ref.style.marginLeft=`-${r.$ref.clientWidth/2}px`}}}this.isStop||this.update()})),this}stop(){return this.isStop=!0,this.suspend(),window.cancelAnimationFrame(this.timer),this.art.emit("artplayerPluginDanmuku:stop"),this}start(){return this.isStop=!1,this.continue(),this.update(),this.art.emit("artplayerPluginDanmuku:start"),this}show(){return this.isHide=!1,this.start(),this.$danmuku.style.display="block",this.art.emit("artplayerPluginDanmuku:show"),this}hide(){return this.isHide=!0,this.stop(),this.queue.forEach((t=>this.makeWait(t))),this.$danmuku.style.display="none",this.art.emit("artplayerPluginDanmuku:hide"),this}emit(t){return this.validator(t,{text:"string",mode:"number|undefined",color:"string|undefined",time:"number|undefined",border:"boolean|undefined"}),t.text.trim()&&this.option.filter(t)?(t.time?t.time=this.utils.clamp(t.time,0,1/0):t.time=this.art.currentTime+1,this.queue.push({mode:0,...t,$state:"wait",$ref:null,$restTime:0,$lastStartTime:0}),this):this}}i.default=a},{"./bilibili":"KnwDr","@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY","85d40535eae5f839":"5sXKb","./getDanmuTop":"2Abxf"}],KnwDr:[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function n(t){switch(t){case 1:case 2:case 3:default:return 0;case 4:case 5:return 1}}function s(t){if("string"!=typeof t)return[];const e=t.match(/<d([\S ]*?>[\S ]*?)<\/d>/gi);return e&&e.length?e.map((t=>{const[,e,i]=t.match(/<d p="(.+)">(.+)<\/d>/),r=e.split(",");return 8===r.length&&i.trim()?{text:i,time:Number(r[0]),mode:n(Number(r[1])),fontSize:Number(r[2]),color:`#${Number(r[3]).toString(16)}`,timestamp:Number(r[4]),pool:Number(r[5]),userID:r[6],rowID:Number(r[7])}:null})):[]}function o(t){return fetch(t).then((t=>t.text())).then((t=>s(t)))}r.defineInteropFlag(i),r.export(i,"getMode",(()=>n)),r.export(i,"bilibiliDanmuParseFromXml",(()=>s)),r.export(i,"bilibiliDanmuParseFromUrl",(()=>o))},{"@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}],b7MJY:[function(t,e,i){i.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},i.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.exportAll=function(t,e){return Object.keys(t).forEach((function(i){"default"===i||"__esModule"===i||e.hasOwnProperty(i)||Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[i]}})})),e},i.export=function(t,e,i){Object.defineProperty(t,e,{enumerable:!0,get:i})}},{}],"5sXKb":[function(t,e,i){e.exports="data:application/javascript,function%20getDanmuTop%28%7Btarget%3At%2Cemits%3Ae%2CclientWidth%3An%2CclientHeight%3Ai%2CmarginBottom%3As%2CmarginTop%3Ah%2CantiOverlap%3Ao%7D%29%7Bconst%20r%3De.filter%28%28e%3D%3Ee.mode%3D%3D%3Dt.mode%26%26e.top%3C%3Di-s%29%29.sort%28%28%28t%2Ce%29%3D%3Et.top-e.top%29%29%3Bif%280%3D%3D%3Dr.length%29return%20h%3Br.unshift%28%7Btop%3A0%2Cleft%3A0%2Cright%3A0%2Cheight%3Ah%2Cwidth%3An%2Cspeed%3A0%2Cdistance%3An%7D%29%2Cr.push%28%7Btop%3Ai-s%2Cleft%3A0%2Cright%3A0%2Cheight%3As%2Cwidth%3An%2Cspeed%3A0%2Cdistance%3An%7D%29%3Bfor%28let%20e%3D1%3Be%3Cr.length%3Be%2B%3D1%29%7Bconst%20n%3Dr%5Be%5D%2Ci%3Dr%5Be-1%5D%2Cs%3Di.top%2Bi.height%3Bif%28n.top-s%3E%3Dt.height%29return%20s%7Dconst%20p%3D%5B%5D%3Bfor%28let%20t%3D1%3Bt%3Cr.length-1%3Bt%2B%3D1%29%7Bconst%20e%3Dr%5Bt%5D%3Bif%28p.length%29%7Bconst%20t%3Dp%5Bp.length-1%5D%3Bt%5B0%5D.top%3D%3D%3De.top%3Ft.push%28e%29%3Ap.push%28%5Be%5D%29%7Delse%20p.push%28%5Be%5D%29%7Dif%28%21o%29%7Bswitch%28t.mode%29%7Bcase%200%3Ap.sort%28%28%28t%2Ce%29%3D%3E%7Bconst%20n%3DMath.min%28...e.map%28%28t%3D%3Et.right%29%29%29%2Ci%3DMath.min%28...t.map%28%28t%3D%3Et.right%29%29%29%3Breturn%20n%2ae.length-i%2at.length%7D%29%29%3Bbreak%3Bcase%201%3Ap.sort%28%28%28t%2Ce%29%3D%3E%7Bconst%20n%3DMath.max%28...e.map%28%28t%3D%3Et.width%29%29%29%3Breturn%20Math.max%28...t.map%28%28t%3D%3Et.width%29%29%29%2at.length-n%2ae.length%7D%29%29%7Dreturn%20p%5B0%5D%5B0%5D.top%7Dswitch%28t.mode%29%7Bcase%200%3A%7Bconst%20e%3Dp.find%28%28e%3D%3Ee.every%28%28e%3D%3E%7Bif%28n%3Ce.distance%29return%211%3Bif%28t.speed%3Ce.speed%29return%210%3Breturn%20e.right%2F%28t.speed-e.speed%29%3Ee.time%7D%29%29%29%29%3Breturn%20e%26%26e%5B0%5D%3Fe%5B0%5D.top%3Avoid%200%7Dcase%201%3Areturn%7D%7Donmessage%3Dt%3D%3E%7Bconst%7Bdata%3Ae%7D%3Dt%2Cn%3DgetDanmuTop%28e%29%3Bself.postMessage%28%7Btop%3An%2Cid%3Ae.id%7D%29%7D%3B"},{}],"2Abxf":[function(t,e,i){t("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(i),i.default=function({target:t,emits:e,clientWidth:i,clientHeight:r,marginBottom:n,marginTop:s,antiOverlap:o}){const a=e.filter((e=>e.mode===t.mode&&e.top<=r-n)).sort(((t,e)=>t.top-e.top));if(0===a.length)return s;a.unshift({top:0,left:0,right:0,height:s,width:i,speed:0,distance:i}),a.push({top:r-n,left:0,right:0,height:n,width:i,speed:0,distance:i});for(let e=1;e<a.length;e+=1){const i=a[e],r=a[e-1],n=r.top+r.height;if(i.top-n>=t.height)return n}const l=[];for(let t=1;t<a.length-1;t+=1){const e=a[t];if(l.length){const t=l[l.length-1];t[0].top===e.top?t.push(e):l.push([e])}else l.push([e])}if(!o){switch(t.mode){case 0:l.sort(((t,e)=>{const i=Math.min(...e.map((t=>t.right))),r=Math.min(...t.map((t=>t.right)));return i*e.length-r*t.length}));break;case 1:l.sort(((t,e)=>{const i=Math.max(...e.map((t=>t.width)));return Math.max(...t.map((t=>t.width)))*t.length-i*e.length}))}return l[0][0].top}switch(t.mode){case 0:{const e=l.find((e=>e.every((e=>{if(i<e.distance)return!1;if(t.speed<e.speed)return!0;return e.right/(t.speed-e.speed)>e.time}))));return e&&e[0]?e[0].top:void 0}case 1:return}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}]},["E13ST"],"E13ST");