(()=>{var fe=Object.create;var te=Object.defineProperty;var de=Object.getOwnPropertyDescriptor;var _e=Object.getOwnPropertyNames;var he=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty;var re=(l=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(l,{get:(e,u)=>(typeof require<"u"?require:e)[u]}):l)(function(l){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+l+'" is not supported')});var W=(l,e)=>()=>(e||l((e={exports:{}}).exports,e),e.exports);var xe=(l,e,u,A)=>{if(e&&typeof e=="object"||typeof e=="function")for(let I of _e(e))!pe.call(l,I)&&I!==u&&te(l,I,{get:()=>e[I],enumerable:!(A=de(e,I))||A.enumerable});return l};var q=(l,e,u)=>(u=l!=null?fe(he(l)):{},xe(e||!l||!l.__esModule?te(u,"default",{value:l,enumerable:!0}):u,l));var ne=W(()=>{});var ie=W((j,oe)=>{(function(l,e){typeof j=="object"?oe.exports=j=e():typeof define=="function"&&define.amd?define([],e):l.CryptoJS=e()})(j,function(){var l=l||function(e,u){var A;if(typeof window<"u"&&window.crypto&&(A=window.crypto),typeof self<"u"&&self.crypto&&(A=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(A=globalThis.crypto),!A&&typeof window<"u"&&window.msCrypto&&(A=window.msCrypto),!A&&typeof global<"u"&&global.crypto&&(A=global.crypto),!A&&typeof re=="function")try{A=ne()}catch{}var I=function(){if(A){if(typeof A.getRandomValues=="function")try{return A.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof A.randomBytes=="function")try{return A.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},P=Object.create||function(){function s(){}return function(g){var d;return s.prototype=g,d=new s,s.prototype=null,d}}(),x={},t=x.lib={},E=t.Base=function(){return{extend:function(s){var g=P(this);return s&&g.mixIn(s),(!g.hasOwnProperty("init")||this.init===g.init)&&(g.init=function(){g.$super.init.apply(this,arguments)}),g.init.prototype=g,g.$super=this,g},create:function(){var s=this.extend();return s.init.apply(s,arguments),s},init:function(){},mixIn:function(s){for(var g in s)s.hasOwnProperty(g)&&(this[g]=s[g]);s.hasOwnProperty("toString")&&(this.toString=s.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),T=t.WordArray=E.extend({init:function(s,g){s=this.words=s||[],g!=u?this.sigBytes=g:this.sigBytes=s.length*4},toString:function(s){return(s||_).stringify(this)},concat:function(s){var g=this.words,d=s.words,r=this.sigBytes,c=s.sigBytes;if(this.clamp(),r%4)for(var m=0;m<c;m++){var v=d[m>>>2]>>>24-m%4*8&255;g[r+m>>>2]|=v<<24-(r+m)%4*8}else for(var y=0;y<c;y+=4)g[r+y>>>2]=d[y>>>2];return this.sigBytes+=c,this},clamp:function(){var s=this.words,g=this.sigBytes;s[g>>>2]&=4294967295<<32-g%4*8,s.length=e.ceil(g/4)},clone:function(){var s=E.clone.call(this);return s.words=this.words.slice(0),s},random:function(s){for(var g=[],d=0;d<s;d+=4)g.push(I());return new T.init(g,s)}}),O=x.enc={},_=O.Hex={stringify:function(s){for(var g=s.words,d=s.sigBytes,r=[],c=0;c<d;c++){var m=g[c>>>2]>>>24-c%4*8&255;r.push((m>>>4).toString(16)),r.push((m&15).toString(16))}return r.join("")},parse:function(s){for(var g=s.length,d=[],r=0;r<g;r+=2)d[r>>>3]|=parseInt(s.substr(r,2),16)<<24-r%8*4;return new T.init(d,g/2)}},w=O.Latin1={stringify:function(s){for(var g=s.words,d=s.sigBytes,r=[],c=0;c<d;c++){var m=g[c>>>2]>>>24-c%4*8&255;r.push(String.fromCharCode(m))}return r.join("")},parse:function(s){for(var g=s.length,d=[],r=0;r<g;r++)d[r>>>2]|=(s.charCodeAt(r)&255)<<24-r%4*8;return new T.init(d,g)}},f=O.Utf8={stringify:function(s){try{return decodeURIComponent(escape(w.stringify(s)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(s){return w.parse(unescape(encodeURIComponent(s)))}},h=t.BufferedBlockAlgorithm=E.extend({reset:function(){this._data=new T.init,this._nDataBytes=0},_append:function(s){typeof s=="string"&&(s=f.parse(s)),this._data.concat(s),this._nDataBytes+=s.sigBytes},_process:function(s){var g,d=this._data,r=d.words,c=d.sigBytes,m=this.blockSize,v=m*4,y=c/v;s?y=e.ceil(y):y=e.max((y|0)-this._minBufferSize,0);var C=y*m,L=e.min(C*4,c);if(C){for(var p=0;p<C;p+=m)this._doProcessBlock(r,p);g=r.splice(0,C),d.sigBytes-=L}return new T.init(g,L)},clone:function(){var s=E.clone.call(this);return s._data=this._data.clone(),s},_minBufferSize:0}),b=t.Hasher=h.extend({cfg:E.extend(),init:function(s){this.cfg=this.cfg.extend(s),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(s){return this._append(s),this._process(),this},finalize:function(s){s&&this._append(s);var g=this._doFinalize();return g},blockSize:512/32,_createHelper:function(s){return function(g,d){return new s.init(d).finalize(g)}},_createHmacHelper:function(s){return function(g,d){return new S.HMAC.init(s,d).finalize(g)}}}),S=x.algo={};return x}(Math);return l})});var ge=W((V,ae)=>{(function(l,e){typeof V=="object"?ae.exports=V=e(ie()):typeof define=="function"&&define.amd?define(["./core"],e):e(l.CryptoJS)})(V,function(l){return function(e){var u=l,A=u.lib,I=A.WordArray,P=A.Hasher,x=u.algo,t=[];(function(){for(var f=0;f<64;f++)t[f]=e.abs(e.sin(f+1))*4294967296|0})();var E=x.MD5=P.extend({_doReset:function(){this._hash=new I.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(f,h){for(var b=0;b<16;b++){var S=h+b,s=f[S];f[S]=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360}var g=this._hash.words,d=f[h+0],r=f[h+1],c=f[h+2],m=f[h+3],v=f[h+4],y=f[h+5],C=f[h+6],L=f[h+7],p=f[h+8],k=f[h+9],N=f[h+10],B=f[h+11],D=f[h+12],R=f[h+13],M=f[h+14],H=f[h+15],n=g[0],o=g[1],i=g[2],a=g[3];n=T(n,o,i,a,d,7,t[0]),a=T(a,n,o,i,r,12,t[1]),i=T(i,a,n,o,c,17,t[2]),o=T(o,i,a,n,m,22,t[3]),n=T(n,o,i,a,v,7,t[4]),a=T(a,n,o,i,y,12,t[5]),i=T(i,a,n,o,C,17,t[6]),o=T(o,i,a,n,L,22,t[7]),n=T(n,o,i,a,p,7,t[8]),a=T(a,n,o,i,k,12,t[9]),i=T(i,a,n,o,N,17,t[10]),o=T(o,i,a,n,B,22,t[11]),n=T(n,o,i,a,D,7,t[12]),a=T(a,n,o,i,R,12,t[13]),i=T(i,a,n,o,M,17,t[14]),o=T(o,i,a,n,H,22,t[15]),n=O(n,o,i,a,r,5,t[16]),a=O(a,n,o,i,C,9,t[17]),i=O(i,a,n,o,B,14,t[18]),o=O(o,i,a,n,d,20,t[19]),n=O(n,o,i,a,y,5,t[20]),a=O(a,n,o,i,N,9,t[21]),i=O(i,a,n,o,H,14,t[22]),o=O(o,i,a,n,v,20,t[23]),n=O(n,o,i,a,k,5,t[24]),a=O(a,n,o,i,M,9,t[25]),i=O(i,a,n,o,m,14,t[26]),o=O(o,i,a,n,p,20,t[27]),n=O(n,o,i,a,R,5,t[28]),a=O(a,n,o,i,c,9,t[29]),i=O(i,a,n,o,L,14,t[30]),o=O(o,i,a,n,D,20,t[31]),n=_(n,o,i,a,y,4,t[32]),a=_(a,n,o,i,p,11,t[33]),i=_(i,a,n,o,B,16,t[34]),o=_(o,i,a,n,M,23,t[35]),n=_(n,o,i,a,r,4,t[36]),a=_(a,n,o,i,v,11,t[37]),i=_(i,a,n,o,L,16,t[38]),o=_(o,i,a,n,N,23,t[39]),n=_(n,o,i,a,R,4,t[40]),a=_(a,n,o,i,d,11,t[41]),i=_(i,a,n,o,m,16,t[42]),o=_(o,i,a,n,C,23,t[43]),n=_(n,o,i,a,k,4,t[44]),a=_(a,n,o,i,D,11,t[45]),i=_(i,a,n,o,H,16,t[46]),o=_(o,i,a,n,c,23,t[47]),n=w(n,o,i,a,d,6,t[48]),a=w(a,n,o,i,L,10,t[49]),i=w(i,a,n,o,M,15,t[50]),o=w(o,i,a,n,y,21,t[51]),n=w(n,o,i,a,D,6,t[52]),a=w(a,n,o,i,m,10,t[53]),i=w(i,a,n,o,N,15,t[54]),o=w(o,i,a,n,r,21,t[55]),n=w(n,o,i,a,p,6,t[56]),a=w(a,n,o,i,H,10,t[57]),i=w(i,a,n,o,C,15,t[58]),o=w(o,i,a,n,R,21,t[59]),n=w(n,o,i,a,v,6,t[60]),a=w(a,n,o,i,B,10,t[61]),i=w(i,a,n,o,c,15,t[62]),o=w(o,i,a,n,k,21,t[63]),g[0]=g[0]+n|0,g[1]=g[1]+o|0,g[2]=g[2]+i|0,g[3]=g[3]+a|0},_doFinalize:function(){var f=this._data,h=f.words,b=this._nDataBytes*8,S=f.sigBytes*8;h[S>>>5]|=128<<24-S%32;var s=e.floor(b/4294967296),g=b;h[(S+64>>>9<<4)+15]=(s<<8|s>>>24)&16711935|(s<<24|s>>>8)&4278255360,h[(S+64>>>9<<4)+14]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360,f.sigBytes=(h.length+1)*4,this._process();for(var d=this._hash,r=d.words,c=0;c<4;c++){var m=r[c];r[c]=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360}return d},clone:function(){var f=P.clone.call(this);return f._hash=this._hash.clone(),f}});function T(f,h,b,S,s,g,d){var r=f+(h&b|~h&S)+s+d;return(r<<g|r>>>32-g)+h}function O(f,h,b,S,s,g,d){var r=f+(h&S|b&~S)+s+d;return(r<<g|r>>>32-g)+h}function _(f,h,b,S,s,g,d){var r=f+(h^b^S)+s+d;return(r<<g|r>>>32-g)+h}function w(f,h,b,S,s,g,d){var r=f+(b^(h|~S))+s+d;return(r<<g|r>>>32-g)+h}u.MD5=P._createHelper(E),u.HmacMD5=P._createHmacHelper(E)}(Math),l.MD5})});var Q=W((X,ce)=>{(function(l,e){if(typeof define=="function"&&define.amd)define("webextension-polyfill",["module"],e);else if(typeof X<"u")e(ce);else{var u={exports:{}};e(u),l.browser=u.exports}})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:X,function(l){"use strict";if(!globalThis.chrome?.runtime?.id)throw new Error("This script should only be loaded in a browser extension.");if(typeof globalThis.browser>"u"||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){let e="The message port closed before a response was received.",u=A=>{let I={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(I).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class P extends WeakMap{constructor(c,m=void 0){super(m),this.createItem=c}get(c){return this.has(c)||this.set(c,this.createItem(c)),super.get(c)}}let x=r=>r&&typeof r=="object"&&typeof r.then=="function",t=(r,c)=>(...m)=>{A.runtime.lastError?r.reject(new Error(A.runtime.lastError.message)):c.singleCallbackArg||m.length<=1&&c.singleCallbackArg!==!1?r.resolve(m[0]):r.resolve(m)},E=r=>r==1?"argument":"arguments",T=(r,c)=>function(v,...y){if(y.length<c.minArgs)throw new Error(`Expected at least ${c.minArgs} ${E(c.minArgs)} for ${r}(), got ${y.length}`);if(y.length>c.maxArgs)throw new Error(`Expected at most ${c.maxArgs} ${E(c.maxArgs)} for ${r}(), got ${y.length}`);return new Promise((C,L)=>{if(c.fallbackToNoCallback)try{v[r](...y,t({resolve:C,reject:L},c))}catch(p){console.warn(`${r} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,p),v[r](...y),c.fallbackToNoCallback=!1,c.noCallback=!0,C()}else c.noCallback?(v[r](...y),C()):v[r](...y,t({resolve:C,reject:L},c))})},O=(r,c,m)=>new Proxy(c,{apply(v,y,C){return m.call(y,r,...C)}}),_=Function.call.bind(Object.prototype.hasOwnProperty),w=(r,c={},m={})=>{let v=Object.create(null),y={has(L,p){return p in r||p in v},get(L,p,k){if(p in v)return v[p];if(!(p in r))return;let N=r[p];if(typeof N=="function")if(typeof c[p]=="function")N=O(r,r[p],c[p]);else if(_(m,p)){let B=T(p,m[p]);N=O(r,r[p],B)}else N=N.bind(r);else if(typeof N=="object"&&N!==null&&(_(c,p)||_(m,p)))N=w(N,c[p],m[p]);else if(_(m,"*"))N=w(N,c[p],m["*"]);else return Object.defineProperty(v,p,{configurable:!0,enumerable:!0,get(){return r[p]},set(B){r[p]=B}}),N;return v[p]=N,N},set(L,p,k,N){return p in v?v[p]=k:r[p]=k,!0},defineProperty(L,p,k){return Reflect.defineProperty(v,p,k)},deleteProperty(L,p){return Reflect.deleteProperty(v,p)}},C=Object.create(r);return new Proxy(C,y)},f=r=>({addListener(c,m,...v){c.addListener(r.get(m),...v)},hasListener(c,m){return c.hasListener(r.get(m))},removeListener(c,m){c.removeListener(r.get(m))}}),h=new P(r=>typeof r!="function"?r:function(m){let v=w(m,{},{getContent:{minArgs:0,maxArgs:0}});r(v)}),b=new P(r=>typeof r!="function"?r:function(m,v,y){let C=!1,L,p=new Promise(D=>{L=function(R){C=!0,D(R)}}),k;try{k=r(m,v,L)}catch(D){k=Promise.reject(D)}let N=k!==!0&&x(k);if(k!==!0&&!N&&!C)return!1;let B=D=>{D.then(R=>{y(R)},R=>{let M;R&&(R instanceof Error||typeof R.message=="string")?M=R.message:M="An unexpected error occurred",y({__mozWebExtensionPolyfillReject__:!0,message:M})}).catch(R=>{console.error("Failed to send onMessage rejected reply",R)})};return B(N?k:p),!0}),S=({reject:r,resolve:c},m)=>{A.runtime.lastError?A.runtime.lastError.message===e?c():r(new Error(A.runtime.lastError.message)):m&&m.__mozWebExtensionPolyfillReject__?r(new Error(m.message)):c(m)},s=(r,c,m,...v)=>{if(v.length<c.minArgs)throw new Error(`Expected at least ${c.minArgs} ${E(c.minArgs)} for ${r}(), got ${v.length}`);if(v.length>c.maxArgs)throw new Error(`Expected at most ${c.maxArgs} ${E(c.maxArgs)} for ${r}(), got ${v.length}`);return new Promise((y,C)=>{let L=S.bind(null,{resolve:y,reject:C});v.push(L),m.sendMessage(...v)})},g={devtools:{network:{onRequestFinished:f(h)}},runtime:{onMessage:f(b),onMessageExternal:f(b),sendMessage:s.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:s.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},d={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return I.privacy={network:{"*":d},services:{"*":d},websites:{"*":d}},w(A,g,I)};l.exports=u(chrome)}else l.exports=globalThis.browser})});var Z=class{constructor(e){var u,A;this.timer=null,this.time=10,this.count=10,this.arr=[],this.time=(u=e.time)!==null&&u!==void 0?u:10,this.count=(A=e.count)!==null&&A!==void 0?A:10,this.url="https://"+e.project+"."+e.host+"/logstores/"+e.logstore+"/track",this.opt=e,e.installUnloadHook&&typeof e.installUnloadHook=="function"&&e.installUnloadHook(()=>{this.platformSend(this.assemblePayload())})}assemblePayload(e=this.arr){let u={__logs__:e};return this.opt.tags&&(u.__tags__=this.opt.tags),this.opt.topic&&(u.__topic__=this.opt.topic),this.opt.source&&(u.__source__=this.opt.source),JSON.stringify(u)}platformSend(e){this.opt.sendPayload&&typeof this.opt.sendPayload=="function"&&this.arr&&this.arr.length>0&&this.opt.sendPayload(this.url,e)}transString(e){let u={};for(let A in e)typeof e[A]=="object"?u[A]=JSON.stringify(e[A]):u[A]=String(e[A]);return u}sendImmediateInner(){this.arr&&this.arr.length>0&&(this.platformSend(this.assemblePayload()),this.timer!=null&&(clearTimeout(this.timer),this.timer=null),this.arr=[])}sendInner(){if(this.timer)this.arr.length>=this.count&&(clearTimeout(this.timer),this.timer=null,this.sendImmediateInner());else{let e=this;this.arr.length>=this.count||this.time<=0?this.sendImmediateInner():this.timer=setTimeout(function(){e.sendImmediateInner()},this.time*1e3)}}send(e){let u=this.transString(e);this.arr.push(u),this.sendInner()}sendImmediate(e){let u=this.transString(e);this.arr.push(u),this.sendImmediateInner()}sendBatchLogs(e){let u=e.map(A=>this.transString(A));this.arr.push(...u),this.sendInner()}sendBatchLogsImmediate(e){let u=e.map(A=>this.transString(A));this.arr.push(...u),this.sendImmediateInner()}};function ve(l,e){return navigator&&navigator.sendBeacon?navigator.sendBeacon(`${l}?APIVersion=0.6.0`,e):!1}function Te(l,e){let u=new Blob([e],{type:"application/x-protobuf"});fetch(l,{method:"POST",body:u,headers:{"x-log-apiversion":"0.6.0","x-log-bodyrawsize":e.length.toString()}})}function ye(l,e){try{ve(l,e)||Te(l,e)}catch(u){console&&typeof console.error=="function"&&(console.error(`Failed to log to ali log service because of this exception:
`+u),console.error("Failed log data:",l))}}var J=class extends Z{constructor(e){let u=Object.assign({},e,{installUnloadHook:A=>{},sendPayload:(A,I)=>{ye(A,I)}});super(u)}},se=J;var le=q(ge()),F=q(Q());async function Ee(){let l=F.default.runtime.getManifest(),e=(0,le.default)(`${l.name}_${l.version}_${navigator.userAgent}_${Date.now()}`).toString();return await F.default.storage.local.set({userId:e}),e}async function me(){let l="",e=await F.default.storage.local.get();return l=e.userId,e.userId||(l=await Ee()),l}async function ue(){let l="",e=await F.default.storage.local.get();return l=e.sign_up_at,e.sign_up_at||(l=G()),l}function G(){let e=new Date().getTimezoneOffset(),u=new Date().getTime();return`${new Date(u+e*60*1e3+8*60*60*1e3).getTime()}`.slice(0,-3)}function z(){return{user_agent:navigator.userAgent,accept_language:navigator.language,referer:location.href}}var we=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor||"Google Inc"),Oe=/Edg(e)?/.test(navigator.userAgent);var U={INSTALL:"ext_install",POPUP_GOTO_YOUTUBE:"popup_goto_youtube",CONTENT_TURN_ON:"content_turn_on",CONTENT_TURN_OFF:"content_turn_off",ERROR_DETAIL:"error_detail",LOGO_CLICK:"logo_click",POPUP_GOOGLE_LOGIN:"popup_google_login",POPUP_DESCRIBE_DENOTE:"popup_describe_denote",POPUP_OPEN_DENOTE:"popup_open_denote",POPUP_FEEDBACK_FORM:"popup_feedback_form",POPUP_GOOGLE_SIGNOUT:"popup_google_signout",CONTENT_SAMPLE_SHARE:"content_sample_share",CONTENT_SAMPLE_DETAIL:"content_sample_detail",CONTENT_SAMPLE_DOWNLOAD:"content_sample_download",CONTENT_BATCH_DOWNLOAD:"content_batch_download",OPEN_DENOTE_VIEW:"open_denote_view",SAMPLE_DETAIL_DOWNLOAD:"sample_detail_download",SAMPLE_DETAIL_TAG:"sample_detail_tag",SAMPLE_DETAIL_SHARE:"sample_detail_share",SAMPLE_DETAIL_COMMENT:"sample_detail_comment",CONTENT_GOOGLE_LOGIN:"content_google_login",CONTENT_BACKGROUD_LOGIN:"content_backgroud_login",CONTENT_GOOGLE_SINGOUT:"content_google_singout",CONTENT_FEEDBACK_FORM:"content_feedback_form",CLICK_SAVE_DOWNLOAD_BUTTON:"click_save_download_button",CONTENT_SAVED_SHARE:"content_saved_share",CONTENT_SAVED_DELETE:"content_saved_delete",CONTENT_SAVED_DETAIL:"content_saved_detail",CONTENT_VIEW_MORE:"content_view_more",CONFIRM_GOOGLE_LOGIN_POPUP:"confirm_google_login_popup",CONFIRM_GOOGLE_LOGIN_CLICK:"confirm_google_login_click",CONFIRM_GOTO_DN_PRIVACY:"popup_goto_dn_privacy",CONFIRM_GOTO_DN_TERMS:"popup_goto_dn_terms",CONTENT_SAVED_DOWNLOAD:"content_saved_download",CONTENT_SWITCH_BOARD:"content_switch_board",CONTENT_NEW_FOLDER:"content_new_folder",CONTENT_NEW_BOARD:"content_new_board",CONTENT_CLICK_CHAT_ICON:"content_click_chat_icon",CONTENT_CLICK_SELECT_ALL:"content_click_select_all",CONTENT_BATCH_DELETE:"content_batch_delete",CONTENT_BATCH_DELETE_SUCCESS:"content_batch_delete_success",CONTENT_BATCH_DELETE_FAILED:"content_batch_delete_failed",CONTENT_CLICK_RETRY:"content_click_retry",YTSPEAKER_UDEMY_DRAINAGE:"ytspeaker_udemy_drainage",YTSPEAKER_COURSERA_DRAINAGE:"ytspeaker_coursera_drainage",YTSPEAKER_INSEXPORT_DRAINAGE:"ytspeaker_insexport_drainage",YTSPEAKER_COOPERATION_SMARTTAB_WEBSTORE:"ytspeaker_cooperation_smarttab_webstore",YTSPEAKER_COOPERATION_SMARTTAB_INTRODUCE:"ytspeaker_cooperation_smarttab_introduce",POPUP_CLICK_FEEDBACK:"popup_click_feedback"};for(let l in U)Oe?U[l]=`${U[l]}_edge`:we&&(U[l]=`${U[l]}_chrome`);var K=U,Y={DOWNLOAD:"download",SEARCH:"search",ACTION:"action"};var Ae=q(Q());var ee=null,be="us-west-1.log.aliyuncs.com",Ce="nc-dn-us",Ne="extensions";var Se={host:be,project:Ce,logstore:Ne,time:3,count:1};function Pe(){return ee===null&&(ee=new se(Se)),ee}async function $(l){let e=await Le();Pe().send(Object.assign(e,l))}async function Le(){let l=await me(),e=await ue(),u=Ae.default.runtime.getManifest();return{extension_name:"ng_syt",anonymous_user_id:l,user_id:0,created_at:G(),ext_version:u.version,sign_up_at:e}}(()=>{"use strict";let l=navigator.language;l.split("-")[0];class e{static voices=[];static groups=[];static log(x){let{level:t,msg:E}=this.getMessages(x);this.echo(t,E),this.sendGTag(t,E)}static echo(x,t){}static getMessages(x){let t={level:"warn",msg:""};if(x.length){let[E,...T]=x;return t.level=console[E]?E:"log",t.msg=console[E]?T.length?T.length===1?T[0]:T:E:x.length===1?E:x,t}return t}static group(x){let[t,E,T]=x;this.groups.includes(t)?T||this.echo(`log group ${t} already exists!`):(this.groups.push(t),this.echo(E?"groupCollapsed":"group",t))}static groupEnd(x){x?(this.groups.map(t=>this.echo("groupEnd")),this.groups=[]):(this.groups.pop(),this.echo("groupEnd"))}static sendGTag(x,t){let E=`${e.getVoice()?.voiceURI}, ${A.translate_lang}/${l}`;["error","warn"].includes(x)&&typeof gtag=="function"&&gtag("event",x==="error"?"error":"warn",{event_category:`${t}`,event_label:`${E}`,value:x==="error"?1:0,non_interaction:!0})}static getVoice(x){return typeof window<"u"?e.voices?.length?e.voices[x!==void 0?x:A.speech_voice]:(e.setVoices(),e.voices?.[A.speech_voice]):{voiceURI:"N/A"}}static setVoices(){return typeof window<"u"&&(e.voices?.length||(e.voices=window?.speechSynthesis?.getVoices())),e}}let u=(...P)=>e.log(P);u.group=(...P)=>x=>x,u.groupEnd=P=>x=>x,e.setVoices();let A={enable:1,speech_voice:0,translate_lang:l.split("-")[0],rate:1.2,max_rate:1.4,volume:1,pitch:1,speaking_control:"voice",custom_translate_lang:{name:"",code:""},ui_lang:l.split("-")[0],voices_map:{}},I=async P=>await new Promise((x,t)=>{chrome.storage.sync.get("options",E=>{chrome.runtime.lastError?t(chrome.runtime.lastError):(Object.assign(A,E?.options),x(A))})});console.clear_storage=()=>{chrome.storage.sync.clear().then(P=>u("storage clear"))},console.show_storage=()=>{new Promise((P,x)=>{chrome.storage.sync.get(null,t=>{if(chrome.runtime.lastError)return x(chrome.runtime.lastError);P(t)})}).then(P=>console.log(P))},(async P=>{let x={},t=0,E="";chrome.runtime.onInstalled.addListener(async _=>{_.reason=="install"&&(console.log("install"),await chrome.storage.local.set({sign_up_at:G()}),chrome.tabs.create({url:"https://www.youtube.com"}),$(Object.assign({action_id:K.INSTALL,type:Y.ACTION},z()))),_?.reason==="update"&&(console.log("update"),T())});let T=()=>{};chrome.storage.onChanged.addListener(async function(_,w){w==="sync"&&(u("changes",_),await O())});let O=async _=>{try{Object.assign(x,await I()),t=1}catch(w){u("error",`Storage Error: ${w} 
${w.stack}`)}};chrome.runtime.onMessageExternal.addListener(function(_,w,f){var h;if(_?.type==="SYT_TURN_ON"?$(Object.assign({action_id:K.CONTENT_TURN_OFF,type:Y.ACTION},z())):_?.type==="SYT_TURN_OFF"&&$(Object.assign({action_id:K.CONTENT_TURN_ON,type:Y.ACTION},z())),_?.hasOwnProperty("badge")&&(h={text:_.badge},h?.text&&chrome.action.setBadgeText((b=>(["On","Off"].includes(b.text)&&chrome.action.setBadgeBackgroundColor({color:[0,0,0,+(b.text!=="On")]}),b))(h)).then()),_?.hasOwnProperty("title")&&(E=_.title),(_?.hasOwnProperty("options")||t)&&(t=0,f({options:x})),_?.hasOwnProperty("update")){for(let[b,S]of Object.entries(_.update))x.hasOwnProperty(b)&&(x[b]=S);chrome.storage.sync.set({options:x},async b=>{await O()})}}),chrome.runtime.onMessage.addListener(function(_,w,f){if(_.question==="now_playing")f({answer:"now_playing",msg:E});else if(_.type==="SEND_LOG"){console.log("send log history",_.data),$(_.data);return}}),chrome.runtime.setUninstallURL("https://forms.gle/qXMbGXgCL5k33FKD6"),await O()})()})();})();