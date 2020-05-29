/*!
 * artplayer-plugin-backlight.js v3.5.9
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2020 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).artplayerPluginBacklight=e()}(this,(function(){"use strict";function t(t){for(var e=[],o=0;o<10;o+=1)for(var n=0;n<5;n+=1)0!==o&&9!==o&&0!==n&&4!==n||e.push(t(o,n,10,5));return e}return function(e){var o=e.constructor.utils.setStyles,n=e.template,a=n.$player,r=n.$video,i=e.player,c=document.createElement("div");c.classList.add("artplayer-backlight"),o(c,{position:"absolute",zIndex:9,left:0,top:0,right:0,bottom:0,width:"100%",height:"100%"});var l,s=(l=c,t((function(t,e,o,n){var a=document.createElement("div");return a.style.position="absolute",a.style.left="".concat(100*t/o,"%"),a.style.top="".concat(100*e/n,"%"),a.style.width="".concat(100/o,"%"),a.style.height="".concat(100/n,"%"),a.style.webkitBorderRadius="50%",a.style.borderRadius="50%",a.style.webkitTransition="all .2s ease",a.style.transition="all .2s ease",l.appendChild(a),{$box:a,left:0===t,right:t===o-1,top:0===e,bottom:e===n-1}}))),u=document.createElement("canvas");return a.insertBefore(c,r),function o(){setTimeout((function(){if(i.playing){var n=r.clientWidth,a=r.clientHeight;(function(e,o,n,a){var r=e.getContext("2d");return e.width=n,e.height=a,r.drawImage(o,0,0),t((function(t,e,o,i){for(var c=n/o,l=a/i,s=t*c,u=e*l,d=r.getImageData(s,u,c,l).data,f=0,h=0,p=0,g=0,y=d.length;g<y;g+=4)f+=d[g],h+=d[g+1],p+=d[g+2];return{r:f=Math.floor(f/(d.length/4)),g:h=Math.floor(h/(d.length/4)),b:p=Math.floor(p/(d.length/4))}}))})(u,r,n,a).forEach((function(t,e){var o=t.r,n=t.g,a=t.b,r=s[e],i=r.$box,c=r.left,l=r.right,u=r.top,d=r.bottom,f=c?"-64px":l?"64px":"0",h=u?"-64px":d?"64px":"0";i.style.webkitBoxShadow="rgb(".concat(o,", ").concat(n,", ").concat(a,") ").concat(f," ").concat(h," 128px"),i.style.boxShadow="rgb(".concat(o,", ").concat(n,", ").concat(a,") ").concat(f," ").concat(h," 128px")}))}e.isDestroy||o()}),200)}(),{name:"artplayerPluginBacklight"}}}));
