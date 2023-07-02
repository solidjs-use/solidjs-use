import{M as o,c as r,a as s}from"./index-c97db86a.js";function l(n){const e=Object.assign({div:"div",h1:"h1",p:"p",a:"a",img:"img",blockquote:"blockquote",h2:"h2",pre:"pre",code:"code",span:"span",ul:"ul",li:"li"},o(),n.components),{ContextualNav:t}=e;return t||c("ContextualNav",!0),r(e.div,{className:"markdown-body",get children(){return[r(e.h1,{children:"@solidjs-use/electron"}),`
`,r(e.p,{get children(){return r(e.a,{href:"https://www.npmjs.com/package/@solidjs-use/electron",get children(){return r(e.img,{src:"https://img.shields.io/npm/v/@solidjs-use/electron?color=a1b858",alt:"NPM version"})}})}}),`
`,r(e.blockquote,{get children(){return[`
`,r(e.p,{get children(){return["This is an add-on of ",r(e.a,{href:"https://github.com/solidjs-use/solidjs-use",children:"solidjs-use"}),", enables electron renderer process API as Composition API."]}}),`
`]}}),`
`,r(e.h2,{children:"Install"}),`
`,r(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return r(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return r(e.code,{"data-language":"bash","data-theme":"default",get children(){return r(e.span,{className:"line",get children(){return[r(e.span,{style:{color:"#FFC777"},children:"npm"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"i"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"@solidjs-use/electron"}),r(e.span,{style:{color:"#C8D3F5"},children:" "}),r(e.span,{style:{color:"#C3E88D"},children:"electron"})]}})}})}})}}),`
`,r(e.h2,{children:"Functions"}),`
`,r(e.p,{get children(){return[r(e.code,{children:"@solidjs-use/electron"})," provides the following functions"]}}),`
`,r(e.ul,{get children(){return[`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/electron/useIpcRenderer/",get children(){return r(e.code,{children:"useIpcRenderer"})}})," — provides ",r(e.a,{href:"https://www.electronjs.org/docs/api/ipc-renderer",children:"ipcRenderer"})," and all of its APIs"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/electron/useIpcRendererInvoke/",get children(){return r(e.code,{children:"useIpcRendererInvoke"})}})," — reactive ",r(e.a,{href:"https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args",children:"ipcRenderer.invoke API"})," result"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/electron/useIpcRendererOn/",get children(){return r(e.code,{children:"useIpcRendererOn"})}})," — use ",r(e.a,{href:"https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener",children:"ipcRenderer.on"})," with ease and ",r(e.a,{href:"https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener",children:"ipcRenderer.removeListener"})," automatically on unmounted"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/electron/useZoomFactor/",get children(){return r(e.code,{children:"useZoomFactor"})}})," — reactive ",r(e.a,{href:"https://www.electronjs.org/docs/api/web-frame#webframe",children:"WebFrame"})," zoom factor"]}}),`
`,r(e.li,{get children(){return[r(e.a,{href:"/solidjs-use/electron/useZoomLevel/",get children(){return r(e.code,{children:"useZoomLevel"})}})," — reactive ",r(e.a,{href:"https://www.electronjs.org/docs/api/web-frame#webframe",children:"WebFrame"})," zoom level"]}}),`
`]}}),`
`,r(e.h2,{children:"Links"}),`
`,r(e.ul,{get children(){return[`
`,r(e.li,{get children(){return r(e.a,{href:"/solidjs-use",children:"solidjs-use"})}}),`
`]}}),`
`,r(t,{links:[{href:"#install",label:"Install",indent:!1},{href:"#functions",label:"Functions",indent:!1},{href:"#links",label:"Links",indent:!1}]})]}})}function d(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?r(e,s(n,{get children(){return r(l,n)}})):l(n)}function c(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};
