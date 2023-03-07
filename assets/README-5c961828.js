import{M as i,c as r,a as l}from"./index-bb12af8a.js";function t(n){const e=Object.assign({div:"div",h1:"h1",p:"p",a:"a",img:"img",blockquote:"blockquote",code:"code",h2:"h2",pre:"pre",span:"span",ul:"ul",li:"li"},i(),n.components),{ContextualNav:s}=e;return s||o("ContextualNav",!0),r(e.div,{className:"markdown-body",get children(){return[r(e.h1,{children:"@solidjs-use/firebase"}),`
`,r(e.p,{get children(){return r(e.a,{href:"https://www.npmjs.com/package/@solidjs-use/firebase",get children(){return r(e.img,{src:"https://img.shields.io/npm/v/@solidjs-use/firebase?color=a1b858",alt:"NPM version"})}})}}),`
`,r(e.blockquote,{get children(){return[`
`,r(e.p,{get children(){return["This is an add-on of ",r(e.a,{href:"https://github.com/solidjs-use/solidjs-use",children:"solidjs-use"}),", enables the real-time bindings for Firebase."]}}),`
`]}}),`
`,r(e.blockquote,{get children(){return[`
`,r(e.p,{get children(){return["⚠️ This package only work with ",r(e.a,{href:"https://firebase.google.com/docs/web/modular-upgrade",children:"Firebase 9 or above with the modular style"}),". For legacy versions, use ",r(e.code,{children:"@vueuse/firebase@8"})," instead."]}}),`
`]}}),`
`,r(e.h2,{children:"Install"}),`
`,r(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return r(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return r(e.code,{"data-language":"bash","data-theme":"default",get children(){return r(e.span,{className:"line",get children(){return[r(e.span,{style:{color:"#FFC777"},children:"npm"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"i"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"@solidjs-use/firebase"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"firebase"})]}})}})}})}}),`
`,r(e.h2,{children:"Functions"}),`
`,r(e.p,{get children(){return[r(e.code,{children:"@solidjs-use/firebase"})," provides the following functions"]}}),`
`,r(e.ul,{get children(){return[`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/firebase/useAuth/",get children(){return r(e.code,{children:"useAuth"})}})," — reactive ",r(e.a,{href:"https://firebase.google.com/docs/auth",children:"Firebase Auth"})," binding"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/firebase/useFirestore/",get children(){return r(e.code,{children:"useFirestore"})}})," — reactive ",r(e.a,{href:"https://firebase.google.com/docs/firestore",children:"Firestore"})," binding"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/firebase/useRTDB/",get children(){return r(e.code,{children:"useRTDB"})}})," — reactive ",r(e.a,{href:"https://firebase.google.com/docs/database",children:"Firebase Realtime Database"})," binding"]}}),`
`]}}),`
`,r(e.h2,{children:"Links"}),`
`,r(e.ul,{get children(){return[`
`,r(e.li,{get children(){return r(e.a,{href:"/solidjs-use",children:"solidjs-use"})}}),`
`]}}),`
`,r(s,{links:[{href:"#install",label:"Install",indent:!1},{href:"#functions",label:"Functions",indent:!1},{href:"#links",label:"Links",indent:!1}]})]}})}function c(n={}){const{wrapper:e}=Object.assign({},i(),n.components);return e?r(e,l(n,{get children(){return r(t,n)}})):t(n)}function o(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
