import{b as S,u as h,n as p,i as t,g as j,s as v,k,t as _,M as $,c as n,a as M}from"./index-89ea7ae1.js";function I(l,e,r){return s=>S(()=>r(h(s),h(l),h(e)))}const w=(l,e,r)=>(l-e[0])/(e[1]-e[0])*(r[1]-r[0])+r[0];function R(l,e,r=w){return I(l,e,r)}function O(l,e,r,s){return R(e,r,s)(l)}const T=_('<div><div>Projection from [<!>, <!>] to [<!>, <!>]</div><div><input id="input" type="range"></div><div>Input: </div><div>Output: '),U=()=>{const[l]=p([0,10]),[e]=p([10,100]),[r,s]=p(0),i=O(r,l,e);return(()=>{const y=T(),c=y.firstChild,x=c.firstChild,C=x.nextSibling,N=C.nextSibling,u=N.nextSibling,P=u.nextSibling,m=P.nextSibling,B=m.nextSibling,g=B.nextSibling;g.nextSibling;const f=c.nextSibling,a=f.firstChild,d=f.nextSibling;d.firstChild;const b=d.nextSibling;return b.firstChild,t(c,()=>l()[0],C),t(c,()=>l()[1],u),t(c,()=>e()[0],m),t(c,()=>e()[1],g),a.$$input=o=>s(Number(o.currentTarget.value)),t(d,r,null),t(b,i,null),j(o=>{const D=l()[0],E=l()[1];return D!==o._v$&&v(a,"min",o._v$=D),E!==o._v$2&&v(a,"max",o._v$2=E),o},{_v$:void 0,_v$2:void 0}),j(()=>a.value=r()),y})()},V=U;k(["input"]);const X=_('<p class="demo-source-link"><a href="https://github.com/solidjs-use/solidjs-use/blob/main/packages/math/src/useProjection/demo.tsx" target="_blank">source');function A(l){const e=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",span:"span",a:"a"},$(),l.components),{FunctionInfo:r,DemoContainer:s,ContextualNav:i}=e;return i||F("ContextualNav",!0),s||F("DemoContainer",!0),r||F("FunctionInfo",!0),n(e.div,{className:"markdown-body",get children(){return[n(e.h1,{children:"useProjection"}),`
`,n(r,{fn:"useProjection"}),`
`,n(e.p,{children:"Reactive numeric projection from one domain to another."}),`
`,n(e.h2,{children:"Demo"}),`
`,`
`,n(s,{get children(){return[X(),n(V,{})]}}),`
`,n(e.h2,{children:"Usage"}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"ts","data-theme":"default",get children(){return n(e.code,{"data-language":"ts","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#86E1FC"},children:"import"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#B4C2F0"},children:"{ "}),n(e.span,{style:{color:"#C8D3F5"},children:"useProjection"}),n(e.span,{style:{color:"#B4C2F0"},children:" }"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"from"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"'"}),n(e.span,{style:{color:"#C3E88D"},children:"@solidjs-use/math"}),n(e.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,n(e.span,{className:"line",children:" "}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C099FF"},children:"const"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#FF98A4"},children:"input"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF98A4"},children:"setInput"}),n(e.span,{style:{color:"#86E1FC"},children:"]"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"="}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#65BCFF"},children:"createSignal"}),n(e.span,{style:{color:"#B4C2F0"},children:"("}),n(e.span,{style:{color:"#FF966C"},children:"0"}),n(e.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C099FF"},children:"const"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF98A4"},children:"projected"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"="}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#65BCFF"},children:"useProjection"}),n(e.span,{style:{color:"#B4C2F0"},children:"("}),n(e.span,{style:{color:"#C8D3F5"},children:"input"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#FF966C"},children:"0"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF966C"},children:"10"}),n(e.span,{style:{color:"#86E1FC"},children:"],"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#FF966C"},children:"0"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF966C"},children:"100"}),n(e.span,{style:{color:"#86E1FC"},children:"]"}),n(e.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,n(e.span,{className:"line",children:" "}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#65BCFF"},children:"setInput"}),n(e.span,{style:{color:"#B4C2F0"},children:"("}),n(e.span,{style:{color:"#FF966C"},children:"5"}),n(e.span,{style:{color:"#B4C2F0"},children:")"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#7A88CF"},children:"// projected() === 50"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#65BCFF"},children:"setInput"}),n(e.span,{style:{color:"#B4C2F0"},children:"("}),n(e.span,{style:{color:"#FF966C"},children:"10"}),n(e.span,{style:{color:"#B4C2F0"},children:")"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#7A88CF"},children:"// projected() === 100"})]}})]}})}})}}),`
`,n(e.h2,{children:"Type Declarations"}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"typescript","data-theme":"default",get children(){return n(e.code,{"data-language":"typescript","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:"/**"})}}),`
`,n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:" * Reactive numeric projection from one domain to another."})}}),`
`,n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:" *"})}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#7A88CF"},children:" * "}),n(e.span,{style:{color:"#86E1FC"},children:"@"}),n(e.span,{style:{color:"#C099FF"},children:"see"}),n(e.span,{style:{color:"#7A88CF"},children:" "}),n(e.span,{style:{color:"#C8D3F5"},children:"https://solidjs-use.github.io/solidjs-use/math/useProjection"})]}}),`
`,n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:" */"})}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C099FF"},children:"declare"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C099FF"},children:"function"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#82AAFF"},children:"useProjection"}),n(e.span,{style:{color:"#B4C2F0"},children:"("}),n(e.span,{style:{color:"#FCA7EA"},children:"input"}),n(e.span,{style:{color:"#86E1FC"},children:":"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"MaybeAccessor"}),n(e.span,{style:{color:"#86E1FC"},children:"<"}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:">,"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FCA7EA"},children:"fromDomain"}),n(e.span,{style:{color:"#86E1FC"},children:":"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"MaybeAccessor"}),n(e.span,{style:{color:"#86E1FC"},children:"<"}),n(e.span,{style:{color:"#C099FF"},children:"readonly"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:"]>,"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FCA7EA"},children:"toDomain"}),n(e.span,{style:{color:"#86E1FC"},children:":"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"MaybeAccessor"}),n(e.span,{style:{color:"#86E1FC"},children:"<"}),n(e.span,{style:{color:"#C099FF"},children:"readonly"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:"]>,"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FCA7EA"},children:"projector"}),n(e.span,{style:{color:"#86E1FC"},children:"?:"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"ProjectorFunction"}),n(e.span,{style:{color:"#86E1FC"},children:"<"}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:","}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:">"}),n(e.span,{style:{color:"#B4C2F0"},children:")"}),n(e.span,{style:{color:"#86E1FC"},children:":"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"solid_js"}),n(e.span,{style:{color:"#86E1FC"},children:"."}),n(e.span,{style:{color:"#FFC777"},children:"Accessor"}),n(e.span,{style:{color:"#86E1FC"},children:"<"}),n(e.span,{style:{color:"#FF966C"},children:"number"}),n(e.span,{style:{color:"#86E1FC"},children:">;"})]}})]}})}})}}),`
`,n(e.h2,{children:"Source"}),`
`,n(e.p,{get children(){return[n(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/math/src/useProjection/index.ts",children:"Source"})," • ",n(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/math/src/useProjection/demo.tsx",children:"Demo"})," • ",n(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/math/src/useProjection/index.md",children:"Docs"})," • ",n(e.a,{href:"https://vueuse.org/math/useProjection",children:"VueUse Docs"})]}}),`
`,n(i,{links:[{href:"#demo",label:"Demo",indent:!1},{href:"#usage",label:"Usage",indent:!1},{href:"#type-declarations",label:"Type Declarations",indent:!1},{href:"#source",label:"Source",indent:!1}]})]}})}function L(l={}){const{wrapper:e}=Object.assign({},$(),l.components);return e?n(e,M(l,{get children(){return n(A,l)}})):A(l)}function F(l,e){throw new Error("Expected "+(e?"component":"object")+" `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{L as default};