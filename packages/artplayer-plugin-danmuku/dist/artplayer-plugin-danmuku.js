/*!
 * artplayer-plugin-danmuku.js v4.3.16
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2022 Harvey Zack
 * Released under the MIT License.
 */
!function(t,e,i,r,n){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof s.parcelRequire93cf&&s.parcelRequire93cf,a=o.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(e,i){if(!a[e]){if(!t[e]){var r="function"==typeof s.parcelRequire93cf&&s.parcelRequire93cf;if(!i&&r)return r(e,!0);if(o)return o(e,!0);if(l&&"string"==typeof e)return l(e);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}p.resolve=function(i){var r=t[e][1][i];return null!=r?r:i},p.cache={};var h=a[e]=new u.Module(e);t[e][0].call(h.exports,p,h,h.exports,this)}return a[e].exports;function p(t){var e=p.resolve(t);return!1===e?{}:u(e)}}u.isParcelRequire=!0,u.Module=function(t){this.id=t,this.bundle=u,this.exports={}},u.modules=t,u.cache=a,u.parent=o,u.register=function(e,i){t[e]=[function(t,e){e.exports=i},{}]},Object.defineProperty(u,"root",{get:function(){return s.parcelRequire93cf}}),s.parcelRequire93cf=u;for(var h=0;h<e.length;h++)u(e[h]);var p=u(i);"object"==typeof exports&&"undefined"!=typeof module?module.exports=p:"function"==typeof define&&define.amd&&define((function(){return p}))}({E13ST:[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i);var n=t("./danmuku"),s=r.interopDefault(n);function o(t){return e=>{const i=new s.default(e,t);return{name:"artplayerPluginDanmuku",emit:i.emit.bind(i),config:i.config.bind(i),hide:i.hide.bind(i),show:i.show.bind(i),get isHide(){return i.isHide}}}}i.default=o,window.artplayerPluginDanmuku=o},{"./danmuku":"8Gtnh","@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}],"8Gtnh":[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i);var n=t("./bilibili"),s=t("./getDanmuTop"),o=r.interopDefault(s);class a{constructor(t,e){this.art=t,this.utils=t.constructor.utils,this.validator=t.constructor.validator,this.queue=[],this.option={},this.$refs=[],this.config(e),this.isStop=!1,this.isHide=!1,this.animationFrameTimer=null,this.$danmuku=t.template.$danmuku,this.$player=t.template.$player,t.on("video:play",this.start.bind(this)),t.on("video:playing",this.start.bind(this)),t.on("video:pause",this.stop.bind(this)),t.on("video:waiting",this.stop.bind(this)),t.on("resize",this.resize.bind(this)),t.on("destroy",this.stop.bind(this)),t.on("fullscreen",this.reset.bind(this)),t.on("fullscreenWeb",this.reset.bind(this)),this.load()}static get option(){return{danmuku:[],speed:5,margin:[10,100],opacity:1,fontSize:25,filter:()=>!0,antiOverlap:!0,synchronousPlayback:!1}}static get scheme(){return{danmuku:"array|function|string",speed:"number",margin:"array",opacity:"number",fontSize:"number",filter:"function",antiOverlap:"boolean",synchronousPlayback:"boolean"}}get isRotate(){return this.art.plugins.autoOrientation&&this.art.plugins.autoOrientation.state}get marginTop(){const{clamp:t}=this.utils,{$player:e}=this.art.template,i=this.option.margin[0];if("number"==typeof i)return t(i,0,e.clientHeight);if("string"==typeof i&&i.endsWith("%")){const r=parseFloat(i)/100;return t(e.clientHeight*r,0,e.clientHeight)}return a.option.margin[0]}get marginBottom(){const{clamp:t}=this.utils,{$player:e}=this.art.template,i=this.option.margin[1];if("number"==typeof i)return t(i,0,e.clientHeight);if("string"==typeof i&&i.endsWith("%")){const r=parseFloat(i)/100;return t(e.clientHeight*r,0,e.clientHeight)}return a.option.margin[1]}filter(t,e){return this.queue.filter((e=>e.$state===t)).map(e)}getLeft(t){const e=t.getBoundingClientRect();return this.isRotate?e.top:e.left}getRef(){const t=this.$refs.pop();if(t)return t;const e=document.createElement("div");return e.style.cssText='\n            user-select: none;\n            position: absolute;\n            white-space: pre;\n            pointer-events: none;\n            perspective: 500px;\n            display: inline-block;\n            will-change: transform;\n            font-weight: normal;\n            line-height: 1.125;\n            visibility: hidden;\n            font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;\n            text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;\n        ',e}getReady(){const{currentTime:t}=this.art;return this.queue.filter((e=>"ready"===e.$state||"wait"===e.$state&&t+.1>=e.time&&e.time>=t-.1))}async load(){try{let t=[];t="function"==typeof this.option.danmuku?await this.option.danmuku():"function"==typeof this.option.danmuku.then?await this.option.danmuku:"string"==typeof this.option.danmuku?await n.bilibiliDanmuParseFromUrl(this.option.danmuku):this.option.danmuku,this.utils.errorHandle(Array.isArray(t),"Danmuku need return an array as result"),this.art.emit("artplayerPluginDanmuku:loaded",t),this.queue=[],this.$danmuku.innerText="",t.forEach((t=>this.emit(t)))}catch(t){throw this.art.emit("artplayerPluginDanmuku:error",t),t}return this}config(t){const{clamp:e}=this.utils;return this.option=Object.assign({},a.option,this.option,t),this.validator(this.option,a.scheme),t.fontSize&&this.reset(),this.option.speed=e(this.option.speed,1,10),this.option.opacity=e(this.option.opacity,0,1),this.option.fontSize=e(this.option.fontSize,12,100),this.art.emit("artplayerPluginDanmuku:config",this.option),this}makeWait(t){t.$state="wait",t.$ref&&(t.$ref.style.visibility="hidden",t.$ref.style.marginLeft="0px",t.$ref.style.transform="translateX(0px)",t.$ref.style.transition="transform 0s linear 0s",this.$refs.push(t.$ref),t.$ref=null)}continue(){const{clientWidth:t}=this.$player;return this.filter("stop",(e=>{switch(e.$state="emit",e.$lastStartTime=Date.now(),e.mode){case 0:{const i=t+e.$ref.clientWidth;e.$ref.style.transform=`translateX(${-i}px)`,e.$ref.style.transition=`transform ${e.$restTime}s linear 0s`;break}}})),this}suspend(){const{clientWidth:t}=this.$player;return this.filter("emit",(e=>{switch(e.$state="stop",e.mode){case 0:{const i=t-(this.getLeft(e.$ref)-this.getLeft(this.$player));e.$ref.style.transform=`translateX(${-i}px)`,e.$ref.style.transition="transform 0s linear 0s";break}}})),this}resize(){return this}reset(){this.queue.forEach((t=>this.makeWait(t)))}update(){const{clientWidth:t}=this.$player;return this.animationFrameTimer=window.requestAnimationFrame((()=>{this.art.playing&&!this.isHide&&(this.filter("emit",(t=>{const e=(Date.now()-t.$lastStartTime)/1e3;t.$restTime-=e,t.$lastStartTime=Date.now(),t.$restTime<=0&&this.makeWait(t)})),this.getReady().forEach((e=>{e.$ref=this.getRef(),e.$ref.innerText=e.text,this.$danmuku.appendChild(e.$ref),e.$ref.style.left=`${t}px`,e.$ref.style.opacity=this.option.opacity,e.$ref.style.fontSize=`${this.option.fontSize}px`,e.$ref.style.color=e.color||"#fff",e.$ref.style.border=e.border?`1px solid ${e.color||"#fff"}`:"none",e.$ref.style.marginLeft="0px",e.$lastStartTime=Date.now(),e.$restTime=this.option.synchronousPlayback&&this.art.playbackRate?this.option.speed/Number(this.art.playbackRate):this.option.speed;const i=o.default(this,e);if(void 0!==i)switch(e.$state="emit",e.$ref.style.visibility="visible",e.mode){case 0:{e.$ref.style.top=`${i}px`;const r=t+e.$ref.clientWidth;e.$ref.style.transform=`translateX(${-r}px)`,e.$ref.style.transition=`transform ${e.$restTime}s linear 0s`;break}case 1:e.$ref.style.left="50%",e.$ref.style.top=`${i}px`,e.$ref.style.marginLeft=`-${e.$ref.clientWidth/2}px`}else e.$state="ready",this.$refs.push(e.$ref),e.$ref=null}))),this.isStop||this.update()})),this}stop(){return this.isStop=!0,this.suspend(),window.cancelAnimationFrame(this.animationFrameTimer),this.art.emit("artplayerPluginDanmuku:stop"),this}start(){return this.isStop=!1,this.continue(),this.update(),this.art.emit("artplayerPluginDanmuku:start"),this}show(){return this.isHide=!1,this.$danmuku.style.display="block",this.art.emit("artplayerPluginDanmuku:show"),this}hide(){return this.isHide=!0,this.$danmuku.style.display="none",this.art.emit("artplayerPluginDanmuku:hide"),this}emit(t){return this.validator(t,{text:"string",mode:"number|undefined",color:"string|undefined",time:"number|undefined",border:"boolean|undefined"}),t.text.trim()&&this.option.filter(t)?(t.time?t.time=this.utils.clamp(t.time,0,1/0):t.time=this.art.currentTime+.5,this.queue.push({mode:0,...t,$state:"wait",$ref:null,$restTime:0,$lastStartTime:0}),this):this}}i.default=a},{"./bilibili":"KnwDr","./getDanmuTop":"2Abxf","@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}],KnwDr:[function(t,e,i){var r=t("@parcel/transformer-js/src/esmodule-helpers.js");function n(t){switch(t){case 1:case 2:case 3:default:return 0;case 4:case 5:return 1}}function s(t){if("string"!=typeof t)return[];const e=t.match(/<d([\S ]*?>[\S ]*?)<\/d>/gi);return e&&e.length?e.map((t=>{const[,e,i]=t.match(/<d p="(.+)">(.+)<\/d>/),r=e.split(",");return 8===r.length&&i.trim()?{text:i,time:Number(r[0]),mode:n(Number(r[1])),fontSize:Number(r[2]),color:`#${Number(r[3]).toString(16)}`,timestamp:Number(r[4]),pool:Number(r[5]),userID:r[6],rowID:Number(r[7])}:null})):[]}function o(t){return fetch(t).then((t=>t.text())).then((t=>s(t)))}r.defineInteropFlag(i),r.export(i,"getMode",(()=>n)),r.export(i,"bilibiliDanmuParseFromXml",(()=>s)),r.export(i,"bilibiliDanmuParseFromUrl",(()=>o))},{"@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}],b7MJY:[function(t,e,i){i.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},i.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.exportAll=function(t,e){return Object.keys(t).forEach((function(i){"default"===i||"__esModule"===i||e.hasOwnProperty(i)||Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[i]}})})),e},i.export=function(t,e,i){Object.defineProperty(t,e,{enumerable:!0,get:i})}},{}],"2Abxf":[function(t,e,i){function r(t,e,i,r){const n=r.$ref.offsetTop,s=t.getLeft(r.$ref)-e,o=r.$ref.clientHeight,a=r.$ref.clientWidth,l=s+a,u=i-l,h=l/r.$restTime,p=r.mode,f=r.$restTime;return{$ref:r.$ref,mode:p,time:f,top:n,left:s,height:o,width:a,right:u,speed:h,distance:l}}t("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(i),i.default=function(t,e){const i=t.getLeft(t.$player),{clientWidth:n,clientHeight:s}=t.$player,{antiOverlap:o}=t.option,{marginBottom:a,marginTop:l}=t,u=r(t,i,n,e),h=t.queue.filter((t=>t.$ref&&"emit"===t.$state&&t.mode===u.mode&&t.$ref.offsetTop<=s-a)).map((e=>r(t,i,n,e))).sort(((t,e)=>t.top-e.top));if(0===h.length)return l;h.unshift({top:0,left:0,right:0,height:l,width:n,speed:0,distance:n}),h.push({top:s-a,left:0,right:0,height:a,width:n,speed:0,distance:n});for(let t=1;t<h.length;t+=1){const e=h[t],i=h[t-1],r=i.top+i.height;if(e.top-r>=u.height)return r}const p=[];for(let t=1;t<h.length-1;t+=1){const e=h[t];if(p.length){const t=p[p.length-1];t[0].top===e.top?t.push(e):p.push([e])}else p.push([e])}if(!o){switch(u.mode){case 0:p.sort(((t,e)=>{const i=Math.min(...e.map((t=>t.right))),r=Math.min(...t.map((t=>t.right)));return i*e.length-r*t.length}));break;case 1:p.sort(((t,e)=>{const i=Math.max(...e.map((t=>t.width)));return Math.max(...t.map((t=>t.width)))*t.length-i*e.length}))}return p[0][0].top}switch(u.mode){case 0:{const t=p.find((t=>t.every((t=>{if(n<t.distance)return!1;if(u.speed<t.speed)return!0;return t.right/(u.speed-t.speed)>t.time}))));return t&&t[0]?t[0].top:void 0}case 1:return}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"b7MJY"}]},["E13ST"],"E13ST");