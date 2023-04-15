import{M as a,c as n,a as o}from"./index-3c801358.js";function t(r){const e=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",span:"span",ul:"ul",li:"li",a:"a",blockquote:"blockquote"},a(),r.components),{ContextualNav:l}=e;return l||c("ContextualNav",!0),n(e.div,{className:"markdown-body",get children(){return[n(e.h1,{children:"Contributing"}),`
`,n(e.p,{children:"Thanks for being interested in contributing to this project!"}),`
`,n(e.h2,{children:"Development"}),`
`,n(e.h3,{children:"Setup"}),`
`,n(e.p,{children:"Clone this repo to your local machine and install the dependencies."}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return n(e.code,{"data-language":"bash","data-theme":"default",get children(){return n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"pnpm"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"install"})]}})}})}})}}),`
`,n(e.p,{children:"We use VitePress for rapid development and documenting. You can start it locally by"}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return n(e.code,{"data-language":"bash","data-theme":"default",get children(){return n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"pnpm"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"dev"})]}})}})}})}}),`
`,n(e.h2,{children:"Contributing"}),`
`,n(e.h3,{children:"Existing functions"}),`
`,n(e.p,{children:"Feel free to enhance the existing functions. Please try not to introduce breaking changes."}),`
`,n(e.h3,{children:"New functions"}),`
`,n(e.p,{children:"There are some notes for adding new functions"}),`
`,n(e.ul,{get children(){return[`
`,n(e.li,{children:"Before you start working, it's better to open an issue to discuss first."}),`
`,n(e.li,{get children(){return["The implementation should be placed under ",n(e.code,{children:"packages/core"})," as a folder and exposing in ",n(e.code,{children:"index.ts"})]}}),`
`,n(e.li,{get children(){return["In the ",n(e.code,{children:"core"})," package, try not to introduce 3rd-party dependencies as this package is aimed to be as lightweight as possible."]}}),`
`,n(e.li,{children:"If you'd like to introduce 3rd-party dependencies, please contribute to @solidjs-use/integrations or create a new add-on."}),`
`,n(e.li,{get children(){return["You can find the function template under ",n(e.code,{children:"packages/core/_template/"}),", details explained in the ",n(e.a,{href:"#function-folder",children:"Function Folder"})," section."]}}),`
`]}}),`
`,n(e.blockquote,{get children(){return[`
`,n(e.p,{get children(){return["Please note you don't need to update packages' ",n(e.code,{children:"index.ts"}),". They are auto-generated."]}}),`
`]}}),`
`,n(e.h3,{children:"New add-ons"}),`
`,n(e.p,{children:"New add-ons are greatly welcome!"}),`
`,n(e.ul,{get children(){return[`
`,n(e.li,{get children(){return["Create a new folder under ",n(e.code,{children:"packages/"}),", name it as your add-on name."]}}),`
`,n(e.li,{get children(){return["Add add-on details in ",n(e.code,{children:"scripts/packages.ts"})]}}),`
`,n(e.li,{get children(){return["Create ",n(e.code,{children:"README.md"})," under that folder."]}}),`
`,n(e.li,{children:"Add functions as you would do to the core package."}),`
`,n(e.li,{children:"Commit and submit as a PR."}),`
`]}}),`
`,n(e.h2,{children:"Project Structure"}),`
`,n(e.h3,{children:"Monorepo"}),`
`,n(e.p,{children:"We use monorepo for multiple packages"}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return n(e.code,{"data-language":"bash","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#FFC777"},children:"packages"})}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C8D3F5"},children:"  "}),n(e.span,{style:{color:"#FFC777"},children:"shared/"}),n(e.span,{style:{color:"#C8D3F5"},children:"         "}),n(e.span,{style:{color:"#C3E88D"},children:"-"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"shared"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"utils"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"across"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"packages"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C8D3F5"},children:"  "}),n(e.span,{style:{color:"#FFC777"},children:"core/"}),n(e.span,{style:{color:"#C8D3F5"},children:"           "}),n(e.span,{style:{color:"#C3E88D"},children:"-"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"the"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"core"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"package"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C8D3F5"},children:"  "}),n(e.span,{style:{color:"#FFC777"},children:"firebase/"}),n(e.span,{style:{color:"#C8D3F5"},children:"       "}),n(e.span,{style:{color:"#C3E88D"},children:"-"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"the"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"Firebase"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"add-on"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#C8D3F5"},children:"  "}),n(e.span,{style:{color:"#86E1FC"},children:"["}),n(e.span,{style:{color:"#C8D3F5"},children:"...addons"}),n(e.span,{style:{color:"#86E1FC"},children:"]"}),n(e.span,{style:{color:"#FFC777"},children:"/"}),n(e.span,{style:{color:"#C8D3F5"},children:"    "}),n(e.span,{style:{color:"#C3E88D"},children:"-"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"add-ons"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#C3E88D"},children:"named"})]}})]}})}})}}),`
`,n(e.h3,{children:"Function Folder"}),`
`,n(e.p,{children:"A function folder typically contains these 4 files:"}),`
`,n(e.blockquote,{get children(){return[`
`,n(e.p,{get children(){return["You can find the template under ",n(e.code,{children:"packages/core/_template/"})]}}),`
`]}}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return n(e.code,{"data-language":"bash","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"index.ts"}),n(e.span,{style:{color:"#C8D3F5"},children:"            "}),n(e.span,{style:{color:"#7A88CF"},children:"# function source code itself"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"demo.tsx"}),n(e.span,{style:{color:"#C8D3F5"},children:"            "}),n(e.span,{style:{color:"#7A88CF"},children:"# documentation demo"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"index."}),n(e.span,{style:{color:"#65BCFF"},children:"test"}),n(e.span,{style:{color:"#FFC777"},children:".ts"}),n(e.span,{style:{color:"#C8D3F5"},children:"       "}),n(e.span,{style:{color:"#7A88CF"},children:"# cypress unit testing"})]}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#FFC777"},children:"index.md"}),n(e.span,{style:{color:"#C8D3F5"},children:"            "}),n(e.span,{style:{color:"#7A88CF"},children:"# documentation"})]}})]}})}})}}),`
`,n(e.p,{get children(){return["for ",n(e.code,{children:"index.ts"})," you should export the function with names."]}}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"ts","data-theme":"default",get children(){return n(e.code,{"data-language":"ts","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:"// DO"})}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#86E1FC"},children:"export"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#B4C2F0"},children:"{ "}),n(e.span,{style:{color:"#C8D3F5"},children:"useMyFunction"}),n(e.span,{style:{color:"#B4C2F0"},children:" }"})]}}),`
`,n(e.span,{className:"line",children:" "}),`
`,n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#7A88CF"},children:"// DON'T"})}}),`
`,n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#86E1FC"},children:"export"}),n(e.span,{style:{color:"#C8D3F5"},children:" "}),n(e.span,{style:{color:"#86E1FC"},children:"default"}),n(e.span,{style:{color:"#C8D3F5"},children:" useMyFunction"})]}})]}})}})}}),`
`,n(e.p,{get children(){return["for ",n(e.code,{children:"index.md"})," the first sentence will be displayed as the short intro in the function list, so try to keep it brief and clear."]}}),`
`,n(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return n(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"md","data-theme":"default",get children(){return n(e.code,{"data-language":"md","data-theme":"default",get children(){return[n(e.span,{className:"line",get children(){return[n(e.span,{style:{color:"#86E1FC"},children:"#"}),n(e.span,{style:{color:"#C3E88D"},children:" "}),n(e.span,{style:{color:"#FFC777"},children:"useMyFunction"})]}}),`
`,n(e.span,{className:"line",children:" "}),`
`,n(e.span,{className:"line",get children(){return n(e.span,{style:{color:"#C8D3F5"},children:"This will be the intro. The detail descriptions..."})}})]}})}})}}),`
`,n(e.p,{get children(){return["Read more about the ",n(e.a,{href:"/solidjs-use/guidelines",children:"guidelines"}),"."]}}),`
`,n(e.h2,{children:"Code Style"}),`
`,n(e.p,{children:"Don't worry about the code style as long as you install the dev dependencies. Git hooks will format and fix them for you on committing."}),`
`,n(e.h2,{children:"Thanks"}),`
`,n(e.p,{children:"Thank you again for being interested in this project! You are awesome!"}),`
`,n(l,{links:[{href:"#development",label:"Development",indent:!1},{href:"#setup",label:"Setup",indent:!0},{href:"#contributing",label:"Contributing",indent:!1},{href:"#existing-functions",label:"Existing functions",indent:!0},{href:"#new-functions",label:"New functions",indent:!0},{href:"#new-add-ons",label:"New add-ons",indent:!0},{href:"#project-structure",label:"Project Structure",indent:!1},{href:"#monorepo",label:"Monorepo",indent:!0},{href:"#function-folder",label:"Function Folder",indent:!0},{href:"#code-style",label:"Code Style",indent:!1},{href:"#thanks",label:"Thanks",indent:!1}]})]}})}function s(r={}){const{wrapper:e}=Object.assign({},a(),r.components);return e?n(e,o(r,{get children(){return n(t,r)}})):t(r)}function c(r,e){throw new Error("Expected "+(e?"component":"object")+" `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default};
