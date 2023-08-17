(function(u){typeof define=="function"&&define.amd?define(u):u()})(function(){"use strict";var Gt=Object.defineProperty,Jt=Object.defineProperties;var Yt=Object.getOwnPropertyDescriptors;var ee=Object.getOwnPropertySymbols;var Kt=Object.prototype.hasOwnProperty,Qt=Object.prototype.propertyIsEnumerable;var te=(u,o,d)=>o in u?Gt(u,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):u[o]=d,c=(u,o)=>{for(var d in o||(o={}))Kt.call(o,d)&&te(u,d,o[d]);if(ee)for(var d of ee(o))Qt.call(o,d)&&te(u,d,o[d]);return u},y=(u,o)=>Jt(u,Yt(o));var u=Object.defineProperty,o=(t,e)=>{for(var a in e)u(t,a,{get:e[a],enumerable:!0})},d={};o(d,{convertFileSrc:()=>ne,invoke:()=>M,transformCallback:()=>m});function ae(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function m(t,e=!1){let a=ae(),r=`_${a}`;return Object.defineProperty(window,r,{value:i=>(e&&Reflect.deleteProperty(window,r),t==null?void 0:t(i)),writable:!1,configurable:!0}),a}async function M(t,e={}){return new Promise((a,r)=>{let i=m(l=>{a(l),Reflect.deleteProperty(window,`_${s}`)},!0),s=m(l=>{r(l),Reflect.deleteProperty(window,`_${i}`)},!0);window.__TAURI_IPC__(c({cmd:t,callback:i,error:s},e))})}function ne(t,e="asset"){let a=encodeURIComponent(t);return navigator.userAgent.includes("Windows")?`https://${e}.localhost/${a}`:`${e}://localhost/${a}`}async function n(t){return M("tauri",t)}var re={};o(re,{TauriEvent:()=>z,emit:()=>P,listen:()=>O,once:()=>x});async function E(t,e){return n({__tauriModule:"Event",message:{cmd:"unlisten",event:t,eventId:e}})}async function C(t,e,a){await n({__tauriModule:"Event",message:{cmd:"emit",event:t,windowLabel:e,payload:a}})}async function v(t,e,a){return n({__tauriModule:"Event",message:{cmd:"listen",event:t,windowLabel:e,handler:m(a)}}).then(r=>async()=>E(t,r))}async function S(t,e,a){return v(t,e,r=>{a(r),E(t,r.id).catch(()=>{})})}var z=(t=>(t.WINDOW_RESIZED="tauri://resize",t.WINDOW_MOVED="tauri://move",t.WINDOW_CLOSE_REQUESTED="tauri://close-requested",t.WINDOW_CREATED="tauri://window-created",t.WINDOW_DESTROYED="tauri://destroyed",t.WINDOW_FOCUS="tauri://focus",t.WINDOW_BLUR="tauri://blur",t.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",t.WINDOW_THEME_CHANGED="tauri://theme-changed",t.WINDOW_FILE_DROP="tauri://file-drop",t.WINDOW_FILE_DROP_HOVER="tauri://file-drop-hover",t.WINDOW_FILE_DROP_CANCELLED="tauri://file-drop-cancelled",t.MENU="tauri://menu",t.CHECK_UPDATE="tauri://update",t.UPDATE_AVAILABLE="tauri://update-available",t.INSTALL_UPDATE="tauri://update-install",t.STATUS_UPDATE="tauri://update-status",t.DOWNLOAD_PROGRESS="tauri://update-download-progress",t))(z||{});async function O(t,e){return v(t,null,e)}async function x(t,e){return S(t,null,e)}async function P(t,e){return C(t,void 0,e)}var ie={};o(ie,{checkUpdate:()=>oe,installUpdate:()=>se,onUpdaterEvent:()=>D});async function D(t){return O("tauri://update-status",e=>{t(e==null?void 0:e.payload)})}async function se(){let t;function e(){t&&t(),t=void 0}return new Promise((a,r)=>{function i(s){if(s.error){e(),r(s.error);return}s.status==="DONE"&&(e(),a())}D(i).then(s=>{t=s}).catch(s=>{throw e(),s}),P("tauri://update-install").catch(s=>{throw e(),s})})}async function oe(){let t;function e(){t&&t(),t=void 0}return new Promise((a,r)=>{function i(l){e(),a({manifest:l,shouldUpdate:!0})}function s(l){if(l.error){e(),r(l.error);return}l.status==="UPTODATE"&&(e(),a({shouldUpdate:!1}))}x("tauri://update-available",l=>{i(l==null?void 0:l.payload)}).catch(l=>{throw e(),l}),D(s).then(l=>{t=l}).catch(l=>{throw e(),l}),P("tauri://update").catch(l=>{throw e(),l})})}var le={};o(le,{CloseRequestedEvent:()=>j,LogicalPosition:()=>R,LogicalSize:()=>F,PhysicalPosition:()=>f,PhysicalSize:()=>g,UserAttentionType:()=>N,WebviewWindow:()=>h,WebviewWindowHandle:()=>k,WindowManager:()=>U,appWindow:()=>W,availableMonitors:()=>me,currentMonitor:()=>ce,getAll:()=>$,getCurrent:()=>ue,primaryMonitor:()=>de});var F=class{constructor(e,a){this.type="Logical",this.width=e,this.height=a}},g=class{constructor(e,a){this.type="Physical",this.width=e,this.height=a}toLogical(e){return new F(this.width/e,this.height/e)}},R=class{constructor(e,a){this.type="Logical",this.x=e,this.y=a}},f=class{constructor(e,a){this.type="Physical",this.x=e,this.y=a}toLogical(e){return new R(this.x/e,this.y/e)}},N=(t=>(t[t.Critical=1]="Critical",t[t.Informational=2]="Informational",t))(N||{});function ue(){return new h(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0})}function $(){return window.__TAURI_METADATA__.__windows.map(t=>new h(t.label,{skip:!0}))}var I=["tauri://created","tauri://error"],k=class{constructor(e){this.label=e,this.listeners=Object.create(null)}async listen(e,a){return this._handleTauriEvent(e,a)?Promise.resolve(()=>{let r=this.listeners[e];r.splice(r.indexOf(a),1)}):v(e,this.label,a)}async once(e,a){return this._handleTauriEvent(e,a)?Promise.resolve(()=>{let r=this.listeners[e];r.splice(r.indexOf(a),1)}):S(e,this.label,a)}async emit(e,a){if(I.includes(e)){for(let r of this.listeners[e]||[])r({event:e,id:-1,windowLabel:this.label,payload:a});return Promise.resolve()}return C(e,this.label,a)}_handleTauriEvent(e,a){return I.includes(e)?(e in this.listeners?this.listeners[e].push(a):this.listeners[e]=[a],!0):!1}},U=class extends k{async scaleFactor(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"scaleFactor"}}}})}async innerPosition(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerPosition"}}}}).then(({x:e,y:a})=>new f(e,a))}async outerPosition(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerPosition"}}}}).then(({x:e,y:a})=>new f(e,a))}async innerSize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerSize"}}}}).then(({width:e,height:a})=>new g(e,a))}async outerSize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerSize"}}}}).then(({width:e,height:a})=>new g(e,a))}async isFullscreen(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isFullscreen"}}}})}async isMinimized(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMinimized"}}}})}async isMaximized(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMaximized"}}}})}async isFocused(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isFocused"}}}})}async isDecorated(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isDecorated"}}}})}async isResizable(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isResizable"}}}})}async isMaximizable(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMaximizable"}}}})}async isMinimizable(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMinimizable"}}}})}async isClosable(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isClosable"}}}})}async isVisible(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isVisible"}}}})}async title(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"title"}}}})}async theme(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"theme"}}}})}async center(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"center"}}}})}async requestUserAttention(e){let a=null;return e&&(e===1?a={type:"Critical"}:a={type:"Informational"}),n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"requestUserAttention",payload:a}}}})}async setResizable(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setResizable",payload:e}}}})}async setMaximizable(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMaximizable",payload:e}}}})}async setMinimizable(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMinimizable",payload:e}}}})}async setClosable(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setClosable",payload:e}}}})}async setTitle(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setTitle",payload:e}}}})}async maximize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"maximize"}}}})}async unmaximize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unmaximize"}}}})}async toggleMaximize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"toggleMaximize"}}}})}async minimize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"minimize"}}}})}async unminimize(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unminimize"}}}})}async show(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"show"}}}})}async hide(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"hide"}}}})}async close(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"close"}}}})}async setDecorations(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setDecorations",payload:e}}}})}async setAlwaysOnTop(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setAlwaysOnTop",payload:e}}}})}async setContentProtected(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setContentProtected",payload:e}}}})}async setSize(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSize",payload:{type:e.type,data:{width:e.width,height:e.height}}}}}})}async setMinSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMinSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setMaxSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMaxSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setFullscreen(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFullscreen",payload:e}}}})}async setFocus(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFocus"}}}})}async setIcon(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIcon",payload:{icon:typeof e=="string"?e:Array.from(e)}}}}})}async setSkipTaskbar(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSkipTaskbar",payload:e}}}})}async setCursorGrab(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorGrab",payload:e}}}})}async setCursorVisible(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorVisible",payload:e}}}})}async setCursorIcon(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorIcon",payload:e}}}})}async setCursorPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setIgnoreCursorEvents(e){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIgnoreCursorEvents",payload:e}}}})}async startDragging(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"startDragging"}}}})}async onResized(e){return this.listen("tauri://resize",a=>{a.payload=H(a.payload),e(a)})}async onMoved(e){return this.listen("tauri://move",a=>{a.payload=q(a.payload),e(a)})}async onCloseRequested(e){return this.listen("tauri://close-requested",a=>{let r=new j(a);Promise.resolve(e(r)).then(()=>{if(!r.isPreventDefault())return this.close()})})}async onFocusChanged(e){let a=await this.listen("tauri://focus",i=>{e(y(c({},i),{payload:!0}))}),r=await this.listen("tauri://blur",i=>{e(y(c({},i),{payload:!1}))});return()=>{a(),r()}}async onScaleChanged(e){return this.listen("tauri://scale-change",e)}async onMenuClicked(e){return this.listen("tauri://menu",e)}async onFileDropEvent(e){let a=await this.listen("tauri://file-drop",s=>{e(y(c({},s),{payload:{type:"drop",paths:s.payload}}))}),r=await this.listen("tauri://file-drop-hover",s=>{e(y(c({},s),{payload:{type:"hover",paths:s.payload}}))}),i=await this.listen("tauri://file-drop-cancelled",s=>{e(y(c({},s),{payload:{type:"cancel"}}))});return()=>{a(),r(),i()}}async onThemeChanged(e){return this.listen("tauri://theme-changed",e)}},j=class{constructor(e){this._preventDefault=!1,this.event=e.event,this.windowLabel=e.windowLabel,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}},h=class extends U{constructor(e,a={}){super(e),a!=null&&a.skip||n({__tauriModule:"Window",message:{cmd:"createWebview",data:{options:c({label:e},a)}}}).then(async()=>this.emit("tauri://created")).catch(async r=>this.emit("tauri://error",r))}static getByLabel(e){return $().some(a=>a.label===e)?new h(e,{skip:!0}):null}static async getFocusedWindow(){for(let e of $())if(await e.isFocused())return e;return null}},W;"__TAURI_METADATA__"in window?W=new h(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0}):(console.warn(`Could not find "window.__TAURI_METADATA__". The "appWindow" value will reference the "main" window label.
Note that this is not an issue if running this frontend on a browser instead of a Tauri window.`),W=new h("main",{skip:!0}));function A(t){return t===null?null:{name:t.name,scaleFactor:t.scaleFactor,position:q(t.position),size:H(t.size)}}function q(t){return new f(t.x,t.y)}function H(t){return new g(t.width,t.height)}async function ce(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"currentMonitor"}}}}).then(A)}async function de(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"primaryMonitor"}}}}).then(A)}async function me(){return n({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"availableMonitors"}}}}).then(t=>t.map(A))}var he={};o(he,{isPermissionGranted:()=>ye,requestPermission:()=>pe,sendNotification:()=>_e});async function ye(){return window.Notification.permission!=="default"?Promise.resolve(window.Notification.permission==="granted"):n({__tauriModule:"Notification",message:{cmd:"isNotificationPermissionGranted"}})}async function pe(){return window.Notification.requestPermission()}function _e(t){typeof t=="string"?new window.Notification(t):new window.Notification(t.title,t)}function L(){return navigator.appVersion.includes("Win")}var ge={};o(ge,{EOL:()=>fe,arch:()=>ve,locale:()=>De,platform:()=>we,tempdir:()=>Pe,type:()=>Me,version:()=>be});var fe=L()?`\r
`:`
`;async function we(){return n({__tauriModule:"Os",message:{cmd:"platform"}})}async function be(){return n({__tauriModule:"Os",message:{cmd:"version"}})}async function Me(){return n({__tauriModule:"Os",message:{cmd:"osType"}})}async function ve(){return n({__tauriModule:"Os",message:{cmd:"arch"}})}async function Pe(){return n({__tauriModule:"Os",message:{cmd:"tempdir"}})}async function De(){return n({__tauriModule:"Os",message:{cmd:"locale"}})}var $e={};o($e,{BaseDirectory:()=>w,Dir:()=>w,copyFile:()=>Se,createDir:()=>Ee,exists:()=>xe,readBinaryFile:()=>Ae,readDir:()=>Te,readTextFile:()=>We,removeDir:()=>Ce,removeFile:()=>ze,renameFile:()=>Oe,writeBinaryFile:()=>Le,writeFile:()=>V,writeTextFile:()=>V});var w=(t=>(t[t.Audio=1]="Audio",t[t.Cache=2]="Cache",t[t.Config=3]="Config",t[t.Data=4]="Data",t[t.LocalData=5]="LocalData",t[t.Desktop=6]="Desktop",t[t.Document=7]="Document",t[t.Download=8]="Download",t[t.Executable=9]="Executable",t[t.Font=10]="Font",t[t.Home=11]="Home",t[t.Picture=12]="Picture",t[t.Public=13]="Public",t[t.Runtime=14]="Runtime",t[t.Template=15]="Template",t[t.Video=16]="Video",t[t.Resource=17]="Resource",t[t.App=18]="App",t[t.Log=19]="Log",t[t.Temp=20]="Temp",t[t.AppConfig=21]="AppConfig",t[t.AppData=22]="AppData",t[t.AppLocalData=23]="AppLocalData",t[t.AppCache=24]="AppCache",t[t.AppLog=25]="AppLog",t))(w||{});async function We(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"readTextFile",path:t,options:e}})}async function Ae(t,e={}){let a=await n({__tauriModule:"Fs",message:{cmd:"readFile",path:t,options:e}});return Uint8Array.from(a)}async function V(t,e,a){typeof a=="object"&&Object.freeze(a),typeof t=="object"&&Object.freeze(t);let r={path:"",contents:""},i=a;return typeof t=="string"?r.path=t:(r.path=t.path,r.contents=t.contents),typeof e=="string"?r.contents=e!=null?e:"":i=e,n({__tauriModule:"Fs",message:{cmd:"writeFile",path:r.path,contents:Array.from(new TextEncoder().encode(r.contents)),options:i}})}async function Le(t,e,a){typeof a=="object"&&Object.freeze(a),typeof t=="object"&&Object.freeze(t);let r={path:"",contents:[]},i=a;return typeof t=="string"?r.path=t:(r.path=t.path,r.contents=t.contents),e&&"dir"in e?i=e:typeof t=="string"&&(r.contents=e!=null?e:[]),n({__tauriModule:"Fs",message:{cmd:"writeFile",path:r.path,contents:Array.from(r.contents instanceof ArrayBuffer?new Uint8Array(r.contents):r.contents),options:i}})}async function Te(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"readDir",path:t,options:e}})}async function Ee(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"createDir",path:t,options:e}})}async function Ce(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"removeDir",path:t,options:e}})}async function Se(t,e,a={}){return n({__tauriModule:"Fs",message:{cmd:"copyFile",source:t,destination:e,options:a}})}async function ze(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"removeFile",path:t,options:e}})}async function Oe(t,e,a={}){return n({__tauriModule:"Fs",message:{cmd:"renameFile",oldPath:t,newPath:e,options:a}})}async function xe(t,e={}){return n({__tauriModule:"Fs",message:{cmd:"exists",path:t,options:e}})}var Fe={};o(Fe,{BaseDirectory:()=>w,appCacheDir:()=>ke,appConfigDir:()=>B,appDataDir:()=>Ne,appDir:()=>Re,appLocalDataDir:()=>Ie,appLogDir:()=>G,audioDir:()=>Ue,basename:()=>ht,cacheDir:()=>je,configDir:()=>qe,dataDir:()=>He,delimiter:()=>ot,desktopDir:()=>Ve,dirname:()=>dt,documentDir:()=>Be,downloadDir:()=>Ge,executableDir:()=>Je,extname:()=>mt,fontDir:()=>Ye,homeDir:()=>Ke,isAbsolute:()=>yt,join:()=>ct,localDataDir:()=>Qe,logDir:()=>it,normalize:()=>ut,pictureDir:()=>Ze,publicDir:()=>Xe,resolve:()=>lt,resolveResource:()=>tt,resourceDir:()=>et,runtimeDir:()=>at,sep:()=>st,templateDir:()=>nt,videoDir:()=>rt});async function Re(){return B()}async function B(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:21}})}async function Ne(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:22}})}async function Ie(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:23}})}async function ke(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:24}})}async function Ue(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:1}})}async function je(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:2}})}async function qe(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:3}})}async function He(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:4}})}async function Ve(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:6}})}async function Be(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:7}})}async function Ge(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:8}})}async function Je(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:9}})}async function Ye(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:10}})}async function Ke(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:11}})}async function Qe(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:5}})}async function Ze(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:12}})}async function Xe(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:13}})}async function et(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:17}})}async function tt(t){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:t,directory:17}})}async function at(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:14}})}async function nt(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:15}})}async function rt(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:16}})}async function it(){return G()}async function G(){return n({__tauriModule:"Path",message:{cmd:"resolvePath",path:"",directory:25}})}var st=L()?"\\":"/",ot=L()?";":":";async function lt(...t){return n({__tauriModule:"Path",message:{cmd:"resolve",paths:t}})}async function ut(t){return n({__tauriModule:"Path",message:{cmd:"normalize",path:t}})}async function ct(...t){return n({__tauriModule:"Path",message:{cmd:"join",paths:t}})}async function dt(t){return n({__tauriModule:"Path",message:{cmd:"dirname",path:t}})}async function mt(t){return n({__tauriModule:"Path",message:{cmd:"extname",path:t}})}async function ht(t,e){return n({__tauriModule:"Path",message:{cmd:"basename",path:t,ext:e}})}async function yt(t){return n({__tauriModule:"Path",message:{cmd:"isAbsolute",path:t}})}var pt={};o(pt,{exit:()=>_t,relaunch:()=>gt});async function _t(t=0){return n({__tauriModule:"Process",message:{cmd:"exit",exitCode:t}})}async function gt(){return n({__tauriModule:"Process",message:{cmd:"relaunch"}})}var ft={};o(ft,{Child:()=>J,Command:()=>Y,EventEmitter:()=>b,open:()=>bt});async function wt(t,e,a=[],r){return typeof a=="object"&&Object.freeze(a),n({__tauriModule:"Shell",message:{cmd:"execute",program:e,args:a,options:r,onEventFn:m(t)}})}var b=class{constructor(){this.eventListeners=Object.create(null)}addListener(e,a){return this.on(e,a)}removeListener(e,a){return this.off(e,a)}on(e,a){return e in this.eventListeners?this.eventListeners[e].push(a):this.eventListeners[e]=[a],this}once(e,a){let r=(...i)=>{this.removeListener(e,r),a(...i)};return this.addListener(e,r)}off(e,a){return e in this.eventListeners&&(this.eventListeners[e]=this.eventListeners[e].filter(r=>r!==a)),this}removeAllListeners(e){return e?delete this.eventListeners[e]:this.eventListeners=Object.create(null),this}emit(e,...a){if(e in this.eventListeners){let r=this.eventListeners[e];for(let i of r)i(...a);return!0}return!1}listenerCount(e){return e in this.eventListeners?this.eventListeners[e].length:0}prependListener(e,a){return e in this.eventListeners?this.eventListeners[e].unshift(a):this.eventListeners[e]=[a],this}prependOnceListener(e,a){let r=(...i)=>{this.removeListener(e,r),a(...i)};return this.prependListener(e,r)}},J=class{constructor(e){this.pid=e}async write(e){return n({__tauriModule:"Shell",message:{cmd:"stdinWrite",pid:this.pid,buffer:typeof e=="string"?e:Array.from(e)}})}async kill(){return n({__tauriModule:"Shell",message:{cmd:"killChild",pid:this.pid}})}},Y=class extends b{constructor(e,a=[],r){super(),this.stdout=new b,this.stderr=new b,this.program=e,this.args=typeof a=="string"?[a]:a,this.options=r!=null?r:{}}static sidecar(e,a=[],r){let i=new Y(e,a,r);return i.options.sidecar=!0,i}async spawn(){return wt(e=>{switch(e.event){case"Error":this.emit("error",e.payload);break;case"Terminated":this.emit("close",e.payload);break;case"Stdout":this.stdout.emit("data",e.payload);break;case"Stderr":this.stderr.emit("data",e.payload);break}},this.program,this.args,this.options).then(e=>new J(e))}async execute(){return new Promise((e,a)=>{this.on("error",a);let r=[],i=[];this.stdout.on("data",s=>{r.push(s)}),this.stderr.on("data",s=>{i.push(s)}),this.on("close",s=>{e({code:s.code,signal:s.signal,stdout:r.join(`
`),stderr:i.join(`
`)})}),this.spawn().catch(a)})}};async function bt(t,e){return n({__tauriModule:"Shell",message:{cmd:"open",path:t,with:e}})}var Mt={};o(Mt,{getName:()=>Pt,getTauriVersion:()=>Dt,getVersion:()=>vt,hide:()=>Wt,show:()=>$t});async function vt(){return n({__tauriModule:"App",message:{cmd:"getAppVersion"}})}async function Pt(){return n({__tauriModule:"App",message:{cmd:"getAppName"}})}async function Dt(){return n({__tauriModule:"App",message:{cmd:"getTauriVersion"}})}async function $t(){return n({__tauriModule:"App",message:{cmd:"show"}})}async function Wt(){return n({__tauriModule:"App",message:{cmd:"hide"}})}var At={};o(At,{getMatches:()=>Lt});async function Lt(){return n({__tauriModule:"Cli",message:{cmd:"cliMatches"}})}var Tt={};o(Tt,{readText:()=>Ct,writeText:()=>Et});async function Et(t){return n({__tauriModule:"Clipboard",message:{cmd:"writeText",data:t}})}async function Ct(){return n({__tauriModule:"Clipboard",message:{cmd:"readText",data:null}})}var St={};o(St,{ask:()=>Ft,confirm:()=>Rt,message:()=>xt,open:()=>zt,save:()=>Ot});async function zt(t={}){return typeof t=="object"&&Object.freeze(t),n({__tauriModule:"Dialog",message:{cmd:"openDialog",options:t}})}async function Ot(t={}){return typeof t=="object"&&Object.freeze(t),n({__tauriModule:"Dialog",message:{cmd:"saveDialog",options:t}})}async function xt(t,e){var r,i;let a=typeof e=="string"?{title:e}:e;return n({__tauriModule:"Dialog",message:{cmd:"messageDialog",message:t.toString(),title:(r=a==null?void 0:a.title)==null?void 0:r.toString(),type:a==null?void 0:a.type,buttonLabel:(i=a==null?void 0:a.okLabel)==null?void 0:i.toString()}})}async function Ft(t,e){var r,i,s,l,_;let a=typeof e=="string"?{title:e}:e;return n({__tauriModule:"Dialog",message:{cmd:"askDialog",message:t.toString(),title:(r=a==null?void 0:a.title)==null?void 0:r.toString(),type:a==null?void 0:a.type,buttonLabels:[(s=(i=a==null?void 0:a.okLabel)==null?void 0:i.toString())!=null?s:"Yes",(_=(l=a==null?void 0:a.cancelLabel)==null?void 0:l.toString())!=null?_:"No"]}})}async function Rt(t,e){var r,i,s,l,_;let a=typeof e=="string"?{title:e}:e;return n({__tauriModule:"Dialog",message:{cmd:"confirmDialog",message:t.toString(),title:(r=a==null?void 0:a.title)==null?void 0:r.toString(),type:a==null?void 0:a.type,buttonLabels:[(s=(i=a==null?void 0:a.okLabel)==null?void 0:i.toString())!=null?s:"Ok",(_=(l=a==null?void 0:a.cancelLabel)==null?void 0:l.toString())!=null?_:"Cancel"]}})}var Nt={};o(Nt,{isRegistered:()=>Ut,register:()=>It,registerAll:()=>kt,unregister:()=>jt,unregisterAll:()=>qt});async function It(t,e){return n({__tauriModule:"GlobalShortcut",message:{cmd:"register",shortcut:t,handler:m(e)}})}async function kt(t,e){return n({__tauriModule:"GlobalShortcut",message:{cmd:"registerAll",shortcuts:t,handler:m(e)}})}async function Ut(t){return n({__tauriModule:"GlobalShortcut",message:{cmd:"isRegistered",shortcut:t}})}async function jt(t){return n({__tauriModule:"GlobalShortcut",message:{cmd:"unregister",shortcut:t}})}async function qt(){return n({__tauriModule:"GlobalShortcut",message:{cmd:"unregisterAll"}})}var Ht={};o(Ht,{Body:()=>p,Client:()=>Z,Response:()=>Q,ResponseType:()=>K,fetch:()=>Vt,getClient:()=>X});var K=(t=>(t[t.JSON=1]="JSON",t[t.Text=2]="Text",t[t.Binary=3]="Binary",t))(K||{}),p=class{constructor(t,e){this.type=t,this.payload=e}static form(t){let e={},a=(r,i)=>{if(i!==null){let s;typeof i=="string"?s=i:i instanceof Uint8Array||Array.isArray(i)?s=Array.from(i):i instanceof File?s={file:i.name,mime:i.type,fileName:i.name}:typeof i.file=="string"?s={file:i.file,mime:i.mime,fileName:i.fileName}:s={file:Array.from(i.file),mime:i.mime,fileName:i.fileName},e[String(r)]=s}};if(t instanceof FormData)for(let[r,i]of t)a(r,i);else for(let[r,i]of Object.entries(t))a(r,i);return new p("Form",e)}static json(t){return new p("Json",t)}static text(t){return new p("Text",t)}static bytes(t){return new p("Bytes",Array.from(t instanceof ArrayBuffer?new Uint8Array(t):t))}},Q=class{constructor(t){this.url=t.url,this.status=t.status,this.ok=this.status>=200&&this.status<300,this.headers=t.headers,this.rawHeaders=t.rawHeaders,this.data=t.data}},Z=class{constructor(t){this.id=t}async drop(){return n({__tauriModule:"Http",message:{cmd:"dropClient",client:this.id}})}async request(t){let e=!t.responseType||t.responseType===1;return e&&(t.responseType=2),n({__tauriModule:"Http",message:{cmd:"httpRequest",client:this.id,options:t}}).then(a=>{let r=new Q(a);if(e){try{r.data=JSON.parse(r.data)}catch(i){if(r.ok&&r.data==="")r.data={};else if(r.ok)throw Error(`Failed to parse response \`${r.data}\` as JSON: ${i};
              try setting the \`responseType\` option to \`ResponseType.Text\` or \`ResponseType.Binary\` if the API does not return a JSON response.`)}return r}return r})}async get(t,e){return this.request(c({method:"GET",url:t},e))}async post(t,e,a){return this.request(c({method:"POST",url:t,body:e},a))}async put(t,e,a){return this.request(c({method:"PUT",url:t,body:e},a))}async patch(t,e){return this.request(c({method:"PATCH",url:t},e))}async delete(t,e){return this.request(c({method:"DELETE",url:t},e))}};async function X(t){return n({__tauriModule:"Http",message:{cmd:"createClient",options:t}}).then(e=>new Z(e))}var T=null;async function Vt(t,e){var a;return T===null&&(T=await X()),T.request(c({url:t,method:(a=e==null?void 0:e.method)!=null?a:"GET"},e))}var Bt=M;window.__HC_LAUNCHER_API__={notify:async t=>{await Bt("notify",{notification:t})}}});
