import{n as p,o as T,p as M,T as g,i as I,c as e,a2 as L,a3 as m,g as V,k as O,t as F,M as _,a as R}from"./index-65f89b6f.js";import{N as U}from"./Note-cf3e0c10.js";import{t as H}from"./index-bdfa89b2.js";import{w as P}from"./computed-7e51e667.js";import{u as k}from"./index-7f8481c1.js";function f(n,l={}){const{initialValue:o=!1,focusVisible:t=!1}=l,[r,d]=p(!1),s=H(n);k(s,"focus",a=>{(!t||a.target.matches?.(":focus-visible"))&&d(!0)}),k(s,"blur",()=>d(!1));const[y,i]=P({get(){return r()},set(a){!a&&r()&&s()?.blur(),a&&!r()&&s()?.focus()}});return T(M(s,()=>{i(o)})),[y,i]}const W=F('<div><p class="demo-el px-2 rounded" tabindex="0">Paragraph that can be focused</p><input class="demo-el" type="text" placeholder="Input that can be focused"><button class="demo-el button">Button that can be focused</button><hr><button class="button small !ml-0">Focus text</button><button class="button small">Focus input</button><button class="button small">Focus button'),X=F(`<style>
      .demo-el:focus {
        opacity: .7;
        box-shadow: 0 0 2px 1px var(--c-brand);
      }
      `),z=F("<span>&nbsp;"),Y=()=>{const[n,l]=p(),[o,t]=p(),[r,d]=p(),[s,y]=f(n),[i,a]=f(o,{initialValue:!0}),[B,w]=f(r);return[(()=>{const C=W(),D=C.firstChild,b=D.nextSibling,N=b.nextSibling,j=N.nextSibling,h=j.nextSibling,u=h.nextSibling,A=u.nextSibling;return g(l,D),g(t,b),g(d,N),I(C,e(U,{class:"mb-2",get children(){return e(L,{get fallback(){return z()},get children(){return[e(m,{get when(){return s()},children:"The paragraph has focus"}),e(m,{get when(){return i()},children:"The input control has focus"}),e(m,{get when(){return B()},children:"The button has focus"})]}})}}),h),h.$$click=()=>y(!s()),u.$$click=()=>a(!i()),A.$$click=()=>w(!B()),V(c=>{const v=!!s(),x=!!s(),$=!!s();return v!==c._v$&&h.classList.toggle("orange",c._v$=v),x!==c._v$2&&u.classList.toggle("orange",c._v$2=x),$!==c._v$3&&A.classList.toggle("orange",c._v$3=$),c},{_v$:void 0,_v$2:void 0,_v$3:void 0}),C})(),X()]},q=Y;O(["click"]);const G=F('<p class="demo-source-link"><a href="https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/useFocus/demo.tsx" target="_blank">source');function S(n){const l=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",span:"span",a:"a"},_(),n.components),{FunctionInfo:o,DemoContainer:t,ContextualNav:r}=l;return r||E("ContextualNav",!0),t||E("DemoContainer",!0),o||E("FunctionInfo",!0),e(l.div,{className:"markdown-body",get children(){return[e(l.h1,{children:"useFocus"}),`
`,e(o,{fn:"useFocus"}),`
`,e(l.p,{get children(){return["Reactive utility to track or set the focus state of a DOM element. State changes to reflect whether the target element is the focused element. Setting reactive value from the outside will trigger ",e(l.code,{children:"focus"})," and ",e(l.code,{children:"blur"})," events for ",e(l.code,{children:"true"})," and ",e(l.code,{children:"false"})," values respectively."]}}),`
`,e(l.h2,{children:"Demo"}),`
`,`
`,e(t,{get children(){return[G(),e(q,{})]}}),`
`,e(l.h2,{children:"Basic Usage"}),`
`,e(l.div,{"data-rehype-pretty-code-fragment":"",get children(){return e(l.pre,{style:{backgroundColor:"#1F2028"},"data-language":"tsx","data-theme":"default",get children(){return e(l.code,{"data-language":"tsx","data-theme":"default",get children(){return[e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#86E1FC"},children:"import"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{ "}),e(l.span,{style:{color:"#C8D3F5"},children:"createEffect"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"createSignal"}),e(l.span,{style:{color:"#B4C2F0"},children:" }"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"from"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"solid-js"}),e(l.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#86E1FC"},children:"import"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{ "}),e(l.span,{style:{color:"#C8D3F5"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:" }"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"from"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),e(l.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,e(l.span,{className:"line",children:" "}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#82AAFF"},children:"Demo"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"()"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"=>"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"target"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setTarget"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"createSignal"}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FFC777"},children:"HTMLElement"}),e(l.span,{style:{color:"#86E1FC"},children:">"}),e(l.span,{style:{color:"#B4C2F0"},children:"()"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"focused"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setFocused"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#C8D3F5"},children:"target"}),e(l.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,e(l.span,{className:"line",children:" "}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#65BCFF"},children:"createEffect"}),e(l.span,{style:{color:"#B4C2F0"},children:"(() "}),e(l.span,{style:{color:"#C099FF"},children:"=>"}),e(l.span,{style:{color:"#B4C2F0"},children:" {"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"    "}),e(l.span,{style:{color:"#86E1FC"},children:"if"}),e(l.span,{style:{color:"#B4C2F0"},children:" ("}),e(l.span,{style:{color:"#65BCFF"},children:"focused"}),e(l.span,{style:{color:"#B4C2F0"},children:"()) {"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"      "}),e(l.span,{style:{color:"#FFC777"},children:"console"}),e(l.span,{style:{color:"#86E1FC"},children:"."}),e(l.span,{style:{color:"#65BCFF"},children:"log"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"input element has been focused"}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"    } "}),e(l.span,{style:{color:"#86E1FC"},children:"else"}),e(l.span,{style:{color:"#B4C2F0"},children:" {"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"      "}),e(l.span,{style:{color:"#FFC777"},children:"console"}),e(l.span,{style:{color:"#86E1FC"},children:"."}),e(l.span,{style:{color:"#65BCFF"},children:"log"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"input element has lost focus"}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"    }"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"  })"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"}"})}})]}})}})}}),`
`,e(l.h2,{children:"Setting initial focus"}),`
`,e(l.p,{get children(){return["To focus the element on its first render one can provide the ",e(l.code,{children:"initialValue"})," option as ",e(l.code,{children:"true"}),". This will trigger a ",e(l.code,{children:"focus"})," event on the target element."]}}),`
`,e(l.div,{"data-rehype-pretty-code-fragment":"",get children(){return e(l.pre,{style:{backgroundColor:"#1F2028"},"data-language":"tsx","data-theme":"default",get children(){return e(l.code,{"data-language":"tsx","data-theme":"default",get children(){return[e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#86E1FC"},children:"import"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{ "}),e(l.span,{style:{color:"#C8D3F5"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:" }"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"from"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,e(l.span,{className:"line",children:" "}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#82AAFF"},children:"Demo"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"()"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"=>"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"target"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setTarget"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"createSignal"}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FFC777"},children:"HTMLElement"}),e(l.span,{style:{color:"#86E1FC"},children:">"}),e(l.span,{style:{color:"#B4C2F0"},children:"()"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"focused"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setFocused"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#C8D3F5"},children:"target"}),e(l.span,{style:{color:"#B4C2F0"},children:"， { "}),e(l.span,{style:{color:"#4FD6BE"},children:"initialValue"}),e(l.span,{style:{color:"#86E1FC"},children:":"}),e(l.span,{style:{color:"#A9B8E8"},children:" "}),e(l.span,{style:{color:"#FF966C"},children:"true"}),e(l.span,{style:{color:"#A9B8E8"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"})"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"}"})}})]}})}})}}),`
`,e(l.h2,{children:"Change focus state"}),`
`,e(l.p,{get children(){return["Changes of the ",e(l.code,{children:"focused"})," reactive ref will automatically trigger ",e(l.code,{children:"focus"})," and ",e(l.code,{children:"blur"})," events for ",e(l.code,{children:"true"})," and ",e(l.code,{children:"false"})," values respectively. You can utilize this behavior to focus the target element as a result of another action (e.g. when a button click as shown below)."]}}),`
`,e(l.div,{"data-rehype-pretty-code-fragment":"",get children(){return e(l.pre,{style:{backgroundColor:"#1F2028"},"data-language":"tsx","data-theme":"default",get children(){return e(l.code,{"data-language":"tsx","data-theme":"default",get children(){return[e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#86E1FC"},children:"import"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{ "}),e(l.span,{style:{color:"#C8D3F5"},children:"createEffect"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"on"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"createSignal"}),e(l.span,{style:{color:"#B4C2F0"},children:" }"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"from"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"solid-js"}),e(l.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#86E1FC"},children:"import"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{ "}),e(l.span,{style:{color:"#C8D3F5"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:" }"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"from"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"'"}),e(l.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),e(l.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,e(l.span,{className:"line",children:" "}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#82AAFF"},children:"Demo"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"()"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"=>"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"target"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setTarget"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"createSignal"}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FFC777"},children:"HTMLElement"}),e(l.span,{style:{color:"#86E1FC"},children:">"}),e(l.span,{style:{color:"#B4C2F0"},children:"()"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#C099FF"},children:"const"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"["}),e(l.span,{style:{color:"#FF98A4"},children:"focused"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#FF98A4"},children:"setFocused"}),e(l.span,{style:{color:"#86E1FC"},children:"]"}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#B4C2F0"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#C8D3F5"},children:"target"}),e(l.span,{style:{color:"#B4C2F0"},children:")"})]}}),`
`,e(l.span,{className:"line",children:" "}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"  "}),e(l.span,{style:{color:"#86E1FC"},children:"return"}),e(l.span,{style:{color:"#B4C2F0"},children:" ("})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"    "}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FF757F"},children:"div"}),e(l.span,{style:{color:"#86E1FC"},children:">"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"      "}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FF757F"},children:"button "}),e(l.span,{style:{color:"#C099FF"},children:"type"}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#86E1FC"},children:'"'}),e(l.span,{style:{color:"#C3E88D"},children:"button"}),e(l.span,{style:{color:"#86E1FC"},children:'"'}),e(l.span,{style:{color:"#FF757F"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"onClick"}),e(l.span,{style:{color:"#86E1FC"},children:"={"}),e(l.span,{style:{color:"#B4C2F0"},children:"()"}),e(l.span,{style:{color:"#FF757F"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"=>"}),e(l.span,{style:{color:"#FF757F"},children:" "}),e(l.span,{style:{color:"#65BCFF"},children:"setFocused"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#FF966C"},children:"true"}),e(l.span,{style:{color:"#B4C2F0"},children:")"}),e(l.span,{style:{color:"#86E1FC"},children:"}>"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"        Click me to focus input below"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"      "}),e(l.span,{style:{color:"#86E1FC"},children:"</"}),e(l.span,{style:{color:"#FF757F"},children:"button"}),e(l.span,{style:{color:"#86E1FC"},children:">"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"      "}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FF757F"},children:"input "}),e(l.span,{style:{color:"#C099FF"},children:"ref"}),e(l.span,{style:{color:"#86E1FC"},children:"={"}),e(l.span,{style:{color:"#C8D3F5"},children:"setTarget"}),e(l.span,{style:{color:"#86E1FC"},children:"}"}),e(l.span,{style:{color:"#FF757F"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"type"}),e(l.span,{style:{color:"#86E1FC"},children:"="}),e(l.span,{style:{color:"#86E1FC"},children:'"'}),e(l.span,{style:{color:"#C3E88D"},children:"text"}),e(l.span,{style:{color:"#86E1FC"},children:'"'}),e(l.span,{style:{color:"#FF757F"},children:" "}),e(l.span,{style:{color:"#86E1FC"},children:"/>"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#B4C2F0"},children:"    "}),e(l.span,{style:{color:"#86E1FC"},children:"</"}),e(l.span,{style:{color:"#FF757F"},children:"div"}),e(l.span,{style:{color:"#86E1FC"},children:">"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"  )"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"}"})}})]}})}})}}),`
`,e(l.h2,{children:"Type Declarations"}),`
`,e(l.div,{"data-rehype-pretty-code-fragment":"",get children(){return e(l.pre,{style:{backgroundColor:"#1F2028"},"data-language":"typescript","data-theme":"default",get children(){return e(l.code,{"data-language":"typescript","data-theme":"default",get children(){return[e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C099FF"},children:"interface"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FFC777"},children:"UseFocusOptions"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"extends"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C3E88D"},children:"ConfigurableWindow"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C8D3F5"},children:"    "}),e(l.span,{style:{color:"#7A88CF"},children:"/**"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     * Initial value. If set true, then focus will be set on the target"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     *"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#7A88CF"},children:"     * "}),e(l.span,{style:{color:"#86E1FC"},children:"@"}),e(l.span,{style:{color:"#C099FF"},children:"default"}),e(l.span,{style:{color:"#7A88CF"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"false"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     */"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C8D3F5"},children:"    "}),e(l.span,{style:{color:"#4FD6BE"},children:"initialValue"}),e(l.span,{style:{color:"#86E1FC"},children:"?:"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FF966C"},children:"boolean"}),e(l.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C8D3F5"},children:"    "}),e(l.span,{style:{color:"#7A88CF"},children:"/**"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     * Replicate the :focus-visible behavior of CSS"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     *"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#7A88CF"},children:"     * "}),e(l.span,{style:{color:"#86E1FC"},children:"@"}),e(l.span,{style:{color:"#C099FF"},children:"default"}),e(l.span,{style:{color:"#7A88CF"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"false"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"     */"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C8D3F5"},children:"    "}),e(l.span,{style:{color:"#4FD6BE"},children:"focusVisible"}),e(l.span,{style:{color:"#86E1FC"},children:"?:"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FF966C"},children:"boolean"}),e(l.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#B4C2F0"},children:"}"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:"/**"})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:" * Track or set the focus state of a DOM element."})}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:" *"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#7A88CF"},children:" * "}),e(l.span,{style:{color:"#86E1FC"},children:"@"}),e(l.span,{style:{color:"#C099FF"},children:"see"}),e(l.span,{style:{color:"#7A88CF"},children:" "}),e(l.span,{style:{color:"#C8D3F5"},children:"https://solidjs-use.github.io/solidjs-use/core/useFocus"})]}}),`
`,e(l.span,{className:"line",get children(){return e(l.span,{style:{color:"#7A88CF"},children:" */"})}}),`
`,e(l.span,{className:"line",get children(){return[e(l.span,{style:{color:"#C099FF"},children:"declare"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#C099FF"},children:"function"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#82AAFF"},children:"useFocus"}),e(l.span,{style:{color:"#B4C2F0"},children:"("}),e(l.span,{style:{color:"#FCA7EA"},children:"target"}),e(l.span,{style:{color:"#86E1FC"},children:":"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FFC777"},children:"MaybeElementAccessor"}),e(l.span,{style:{color:"#86E1FC"},children:","}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FCA7EA"},children:"options"}),e(l.span,{style:{color:"#86E1FC"},children:"?:"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FFC777"},children:"UseFocusOptions"}),e(l.span,{style:{color:"#B4C2F0"},children:")"}),e(l.span,{style:{color:"#86E1FC"},children:":"}),e(l.span,{style:{color:"#C8D3F5"},children:" "}),e(l.span,{style:{color:"#FFC777"},children:"WritableComputedReturn"}),e(l.span,{style:{color:"#86E1FC"},children:"<"}),e(l.span,{style:{color:"#FF966C"},children:"boolean"}),e(l.span,{style:{color:"#86E1FC"},children:">;"})]}})]}})}})}}),`
`,e(l.h2,{children:"Source"}),`
`,e(l.p,{get children(){return[e(l.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/useFocus/index.ts",children:"Source"})," • ",e(l.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/useFocus/demo.tsx",children:"Demo"})," • ",e(l.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/core/src/useFocus/index.md",children:"Docs"})," • ",e(l.a,{href:"https://vueuse.org/core/useFocus",children:"VueUse Docs"})]}}),`
`,e(r,{links:[{href:"#demo",label:"Demo",indent:!1},{href:"#basic-usage",label:"Basic Usage",indent:!1},{href:"#setting-initial-focus",label:"Setting initial focus",indent:!1},{href:"#change-focus-state",label:"Change focus state",indent:!1},{href:"#type-declarations",label:"Type Declarations",indent:!1},{href:"#source",label:"Source",indent:!1}]})]}})}function le(n={}){const{wrapper:l}=Object.assign({},_(),n.components);return l?e(l,R(n,{get children(){return e(S,n)}})):S(n)}function E(n,l){throw new Error("Expected "+(l?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{le as default};