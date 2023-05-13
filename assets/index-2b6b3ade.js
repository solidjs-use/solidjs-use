import{n as F,U as B,u as b,C as L,o as A,p as P,T as N,g as j,k as w,t as k,M as v,c as l,a as x}from"./index-89ea7ae1.js";import{u as E}from"./index-53d0e5a4.js";import{u as M}from"./index-510b83ee.js";import{u as f}from"./index-5b1a0946.js";import{u as _}from"./index-c29ea38f.js";import"./index-9cc34db9.js";import"./index-09a531c9.js";function T(s,e={}){const{document:r=B,pointerLockOptions:d}=e,a=_(()=>r&&"pointerLockElement"in r),[i,C]=F(),[g,y]=F();let o;a()&&(E(r,"pointerlockchange",()=>{const n=r.pointerLockElement??i();if(o&&n===o){const t=r.pointerLockElement;C(t),t||(y(null),o=null)}}),E(r,"pointerlockerror",()=>{const n=r.pointerLockElement??i();if(o&&n===o){const t=r.pointerLockElement?"release":"acquire";throw new Error(`Failed to ${t} pointer lock.`)}}));const u=L();function p(n,t){if(!a())throw new Error("Pointer Lock API is not supported by your browser.");const h=n instanceof Event?n.currentTarget:null;if(y(h),o=n instanceof Event?b(s)??h:b(n),!o)throw new Error("Target element undefined.");return o.requestPointerLock(t??d),f(i,u).toBe(o)}async function c(){return i()?(r.exitPointerLock(),await f(i,u).toBeNull(),!0):!1}return{isSupported:a,element:i,triggerElement:g,lock:p,unlock:c}}const $=k('<div flex justify-center items-center box-border perspective-300><div cursor-all-scroll relative w-100px h-100px preserve-3d><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:1;--un-url:url(/solidjs.svg);transform:rotateX(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)"></span><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:-1;--un-url:url(/solidjs-use.svg);transform:rotateX(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)"></span><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:0;--un-url:url(/solidjs.svg);transform:rotateY(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)"></span><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:1;--un-url:url(/solidjs-use.svg);transform:rotateY(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)"></span><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:2;--un-url:url(/solidjs.svg);transform:rotateY(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)"></span><span class="absolute top-0 left-0 w-full h-full b-1 b-solid backface-hidden bg-emerald-4 bg-opacity-20 bg-center bg-[length:75%] bg-no-repeat" style="--i:3;--un-url:url(/solidjs-use.svg);transform:rotateY(calc(90deg * var(--i))) translateZ(50px);background-image:var(--un-url)">'),O=()=>{const{lock:s,unlock:e,element:r}=T(),{x:d,y:a}=M({type:"movement"}),[i,C]=F(-45),[g,y]=F(0);A(P([d,a],([p,c])=>{r()&&(C(n=>n+p/2),y(n=>n+c/2))}));const[o,u]=F();return E(o,"mousedown",s,{capture:!0}),(()=>{const p=$(),c=p.firstChild;return c.$$mouseup=()=>e(),N(u,c),c.style.setProperty("transform","rotateY(calc(var(--rotY) * 1deg)) rotateX(calc(var(--rotX) * 1deg))"),j(n=>{const t=i(),h=g();return t!==n._v$&&((n._v$=t)!=null?c.style.setProperty("--rotY",t):c.style.removeProperty("--rotY")),h!==n._v$2&&((n._v$2=h)!=null?c.style.setProperty("--rotX",h):c.style.removeProperty("--rotX")),n},{_v$:void 0,_v$2:void 0}),p})()},X=O;w(["mouseup"]);const Y=k('<p class="demo-source-link"><a href="https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/usePointerLock/demo.tsx" target="_blank">source');function D(s){const e=Object.assign({div:"div",h1:"h1",p:"p",a:"a",h2:"h2",pre:"pre",code:"code",span:"span"},v(),s.components),{FunctionInfo:r,DemoContainer:d,ContextualNav:a}=e;return a||m("ContextualNav",!0),d||m("DemoContainer",!0),r||m("FunctionInfo",!0),l(e.div,{className:"markdown-body",get children(){return[l(e.h1,{children:"usePointerLock"}),`
`,l(r,{fn:"usePointerLock"}),`
`,l(e.p,{get children(){return["Reactive ",l(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API",children:"pointer lock"}),"."]}}),`
`,l(e.h2,{children:"Demo"}),`
`,`
`,l(d,{get children(){return[Y(),l(X,{})]}}),`
`,l(e.h2,{children:"Basic Usage"}),`
`,l(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return l(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"js","data-theme":"default",get children(){return l(e.code,{"data-language":"js","data-theme":"default",get children(){return[l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#86E1FC"},children:"import"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{ "}),l(e.span,{style:{color:"#C8D3F5"},children:"usePointerLock"}),l(e.span,{style:{color:"#B4C2F0"},children:" }"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"from"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),l(e.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"const"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"{"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"isSupported"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"lock"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"unlock"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"element"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"triggerElement"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"}"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#65BCFF"},children:"usePointerLock"}),l(e.span,{style:{color:"#B4C2F0"},children:"()"})]}})]}})}})}}),`
`,l(e.h2,{children:"Type Declarations"}),`
`,l(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return l(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"typescript","data-theme":"default",get children(){return l(e.code,{"data-language":"typescript","data-theme":"default",get children(){return[l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"declare"}),l(e.span,{style:{color:"#C8D3F5"},children:" global "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"    "}),l(e.span,{style:{color:"#C099FF"},children:"interface"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"PointerLockOptions"}),l(e.span,{style:{color:"#B4C2F0"},children:" {"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"        "}),l(e.span,{style:{color:"#4FD6BE"},children:"unadjustedMovement"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"boolean"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"    }"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"    "}),l(e.span,{style:{color:"#C099FF"},children:"interface"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Element"}),l(e.span,{style:{color:"#B4C2F0"},children:" {"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"        "}),l(e.span,{style:{color:"#82AAFF"},children:"requestPointerLock"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"options"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"PointerLockOptions"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Promise"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FF966C"},children:"void"}),l(e.span,{style:{color:"#86E1FC"},children:">"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#B4C2F0"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"void"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"    }"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"}"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"type"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"MaybeHTMLElement"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"HTMLElement"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"undefined"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"null"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"interface"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"UsePointerLockOptions"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"extends"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C3E88D"},children:"ConfigurableDocument"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"pointerLockOptions"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"PointerLockOptions"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"}"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"/**"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:" * Reactive pointer lock."})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:" *"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#7A88CF"},children:" * "}),l(e.span,{style:{color:"#86E1FC"},children:"@"}),l(e.span,{style:{color:"#C099FF"},children:"see"}),l(e.span,{style:{color:"#7A88CF"},children:" "}),l(e.span,{style:{color:"#C8D3F5"},children:"https://solidjs-use.github.io/solidjs-use/core/usePointerLock"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:" */"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"declare"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"function"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#82AAFF"},children:"usePointerLock"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"target"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"MaybeElementAccessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"MaybeHTMLElement"}),l(e.span,{style:{color:"#86E1FC"},children:">,"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FCA7EA"},children:"options"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"UsePointerLockOptions"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"isSupported"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"solid_js"}),l(e.span,{style:{color:"#86E1FC"},children:"."}),l(e.span,{style:{color:"#FFC777"},children:"Accessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FF966C"},children:"boolean"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"element"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"solid_js"}),l(e.span,{style:{color:"#86E1FC"},children:"."}),l(e.span,{style:{color:"#FFC777"},children:"Accessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"MaybeHTMLElement"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"triggerElement"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"solid_js"}),l(e.span,{style:{color:"#86E1FC"},children:"."}),l(e.span,{style:{color:"#FFC777"},children:"Accessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"MaybeHTMLElement"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#82AAFF"},children:"lock"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"e"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"MaybeElementAccessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"MaybeHTMLElement"}),l(e.span,{style:{color:"#86E1FC"},children:">"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Event"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FCA7EA"},children:"options"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"PointerLockOptions"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"=>"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Promise"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"HTMLElement"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#82AAFF"},children:"unlock"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"()"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"=>"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Promise"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FF966C"},children:"boolean"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"}"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"type"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"UsePointerLockReturn"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"ReturnType"}),l(e.span,{style:{color:"#86E1FC"},children:"<typeof"}),l(e.span,{style:{color:"#C8D3F5"},children:" usePointerLock"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}})]}})}})}}),`
`,l(e.h2,{children:"Source"}),`
`,l(e.p,{get children(){return[l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/usePointerLock/index.ts",children:"Source"})," • ",l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/usePointerLock/demo.tsx",children:"Demo"})," • ",l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/usePointerLock/index.md",children:"Docs"})," • ",l(e.a,{href:"https://vueuse.org/core/usePointerLock",children:"VueUse Docs"})]}}),`
`,l(a,{links:[{href:"#demo",label:"Demo",indent:!1},{href:"#basic-usage",label:"Basic Usage",indent:!1},{href:"#type-declarations",label:"Type Declarations",indent:!1},{href:"#source",label:"Source",indent:!1}]})]}})}function q(s={}){const{wrapper:e}=Object.assign({},v(),s.components);return e?l(e,x(s,{get children(){return l(D,s)}})):D(s)}function m(s,e){throw new Error("Expected "+(e?"component":"object")+" `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{q as default};