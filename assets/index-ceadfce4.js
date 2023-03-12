import{z as j,O as w,u as S,C as _,D as I,k,g as p,i as D,t as d,M as A,c as l,a as K}from"./index-dd3ae440.js";import{s as b}from"./index-4d16561d.js";function F(r){return new Promise((e,s)=>{r.oncomplete=r.onsuccess=()=>e(r.result),r.onabort=r.onerror=()=>s(r.error)})}function O(r,e){const s=indexedDB.open(r);s.onupgradeneeded=()=>s.result.createObjectStore(e);const o=F(s);return(a,t)=>o.then(i=>t(i.transaction(e,a).objectStore(e)))}let g;function u(){return g||(g=O("keyval-store","keyval")),g}function T(r,e=u()){return e("readonly",s=>F(s.get(r)))}function x(r,e,s=u()){return s("readwrite",o=>(o.put(e,r),F(o.transaction)))}function m(r,e,s=u()){return s("readwrite",o=>new Promise((a,t)=>{o.get(r).onsuccess=function(){try{o.put(e(this.result),r),a(F(o.transaction))}catch(i){t(i)}}}))}function M(r,e=u()){return e("readwrite",s=>(s.delete(r),F(s.transaction)))}function E(r,e,s={}){const{onError:o=h=>{console.error(h)},writeDefaults:a=!0}=s,[t,i]=j(!1),[n,c]=w(e),C=S(e);async function $(){try{const h=await T(r);h===void 0?C!=null&&a&&await x(r,C):c(()=>h)}catch(h){o(h)}i(!0)}return $(),_(I(n,async()=>{try{n()==null?await M(r):Array.isArray(n())?await m(r,()=>JSON.parse(JSON.stringify(n()))):typeof n()=="object"?await m(r,()=>({...n()})):await m(r,()=>n())}catch(h){o(h)}})),{data:n,setData:c,isFinished:t}}const z=d("<h5>Object</h5>",2),y=d('<input type="text">',1),U=d('<input type="range">',1),N=d('<pre lang="json"></pre>',2),B=d("<br>",1),R=d("<h5>String</h5>",2),P=d("<pre></pre>",2),V=d("<h5>Array</h5>",2),W=()=>{const r="vue-use-idb-keyval",{data:e,setData:s}=E(`${r}-object`,{name:"Banana",color:"Yellow",size:"Medium",count:0}),{data:o,setData:a}=E(`${r}-string`,"foobar"),{data:t,setData:i}=E(`${r}-array`,["foo","bar","baz"]);return[z.cloneNode(!0),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>s({...e(),name:c.currentTarget.value}),p(()=>n.value=e().name),n})(),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>s({...e(),color:c.currentTarget.value}),p(()=>n.value=e().color),n})(),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>s({...e(),size:c.currentTarget.value}),p(()=>n.value=e().size),n})(),(()=>{const n=U.cloneNode(!0);return n.$$input=c=>s({...e(),count:Number(c.currentTarget.value)}),p(()=>n.value=e().count),n})(),(()=>{const n=N.cloneNode(!0);return D(n,()=>b(e())),n})(),B.cloneNode(!0),R.cloneNode(!0),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>a(c.currentTarget.value),p(()=>n.value=o()),n})(),(()=>{const n=P.cloneNode(!0);return D(n,o),n})(),B.cloneNode(!0),V.cloneNode(!0),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>i([c.currentTarget.value,t()[1],t()[2]]),p(()=>n.value=t()?.[0]),n})(),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>i([t()[0],c.currentTarget.value,t()[2]]),p(()=>n.value=t()?.[1]),n})(),(()=>{const n=y.cloneNode(!0);return n.$$input=c=>i([t()[0],t()[1],c.currentTarget.value]),p(()=>n.value=t()?.[2]),n})(),(()=>{const n=N.cloneNode(!0);return D(n,()=>b(t())),n})()]};k(["input"]);const G=d('<p class="demo-source-link"><a href="https://github.com/solidjs-use/solidjs-use/blob/main/packages/integrations/src/useIDBKeyval/demo.tsx" target="_blank">source</a></p>',4);function v(r){const e=Object.assign({div:"div",h1:"h1",p:"p",a:"a",code:"code",h2:"h2",pre:"pre",span:"span"},A(),r.components),{FunctionInfo:s,DemoContainer:o,ContextualNav:a}=e;return a||f("ContextualNav",!0),o||f("DemoContainer",!0),s||f("FunctionInfo",!0),l(e.div,{className:"markdown-body",get children(){return[l(e.h1,{children:"useIDBKeyval"}),`
`,l(s,{fn:"useIDBKeyval"}),`
`,l(e.p,{get children(){return["Wrapper for ",l(e.a,{href:"https://www.npmjs.com/package/idb-keyval",get children(){return l(e.code,{children:"idb-keyval"})}}),"."]}}),`
`,l(e.h2,{children:"Demo"}),`
`,`
`,l(o,{get children(){return[G.cloneNode(!0),l(W,{})]}}),`
`,l(e.p,{get children(){return["Available in the ",l(e.a,{href:"/solidjs-use/integrations/README",children:"@solidjs-use/integrations"})," add-on."]}}),`
`,l(e.h2,{children:"Install"}),`
`,l(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return l(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"bash","data-theme":"default",get children(){return l(e.code,{"data-language":"bash","data-theme":"default",get children(){return l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#FFC777"},children:"npm"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C3E88D"},children:"install"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C3E88D"},children:"solidjs-use"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C3E88D"},children:"@solidjs-use/integrations"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C3E88D"},children:"idb-keyval"})]}})}})}})}}),`
`,l(e.h2,{children:"Usage"}),`
`,l(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return l(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"ts","data-theme":"default",get children(){return l(e.code,{"data-language":"ts","data-theme":"default",get children(){return[l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#86E1FC"},children:"import"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{ "}),l(e.span,{style:{color:"#C8D3F5"},children:"useIDBKeyval"}),l(e.span,{style:{color:"#B4C2F0"},children:" }"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"from"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"@solidjs-use/integrations/useIDBKeyval"}),l(e.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"// bind object"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"const"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"{"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"data"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"storedObject"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"setData"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"setStoredObject"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"}"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#65BCFF"},children:"useIDBKeyval"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"my-idb-keyval-store"}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"  "}),l(e.span,{style:{color:"#4FD6BE"},children:"hello"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#A9B8E8"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"hi"}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#86E1FC"},children:","})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"  "}),l(e.span,{style:{color:"#4FD6BE"},children:"greeting"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#A9B8E8"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"Hello"}),l(e.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"})"})}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"// update object"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#65BCFF"},children:"setStoredObject"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"state"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"=>"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"({"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"  "}),l(e.span,{style:{color:"#FF757F",fontWeight:"bold"},children:"..."}),l(e.span,{style:{color:"#C8D3F5"},children:"state"}),l(e.span,{style:{color:"#86E1FC"},children:","})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"  "}),l(e.span,{style:{color:"#4FD6BE"},children:"hello"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#A9B8E8"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"hola"}),l(e.span,{style:{color:"#86E1FC"},children:"'"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"}))"})}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"// bind boolean"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"const"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"{"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"data"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"flag"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"setData"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"setFlag"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"}"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#65BCFF"},children:"useIDBKeyval"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"my-flag"}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"true"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#7A88CF"},children:"// returns Signal<boolean>"})]}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"// bind number"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"const"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"{"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"data"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"count"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#4FD6BE"},children:"setData"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF98A4"},children:"setCount"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"}"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"="}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#65BCFF"},children:"useIDBKeyval"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#C3E88D"},children:"my-count"}),l(e.span,{style:{color:"#86E1FC"},children:"'"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"0"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#7A88CF"},children:"// returns Signal<number>"})]}}),`
`,l(e.span,{className:"line",children:" "}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"// delete data from idb storage"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#65BCFF"},children:"setStoredObject"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#7F85A3"},children:"null"}),l(e.span,{style:{color:"#B4C2F0"},children:")"})]}})]}})}})}}),`
`,l(e.h2,{children:"Type Declarations"}),`
`,l(e.div,{"data-rehype-pretty-code-fragment":"",get children(){return l(e.pre,{style:{backgroundColor:"#1F2028"},"data-language":"typescript","data-theme":"default",get children(){return l(e.code,{"data-language":"typescript","data-theme":"default",get children(){return[l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"interface"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"UseIDBOptions"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#7A88CF"},children:"/**"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     * On error callback"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     *"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     * Default log error to `console.error`"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     */"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#82AAFF"},children:"onError"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"error"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"unknown"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"=>"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"void"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#7A88CF"},children:"/**"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     * Write the default value to the storage when it does not exist"})}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     *"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#7A88CF"},children:"     * "}),l(e.span,{style:{color:"#86E1FC"},children:"@"}),l(e.span,{style:{color:"#C099FF"},children:"default"}),l(e.span,{style:{color:"#7A88CF"},children:" "}),l(e.span,{style:{color:"#C8D3F5"},children:"true"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#7A88CF"},children:"     */"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"writeDefaults"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"boolean"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}}),`
`,l(e.span,{className:"line",get children(){return l(e.span,{style:{color:"#B4C2F0"},children:"}"})}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C099FF"},children:"declare"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#C099FF"},children:"function"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#82AAFF"},children:"useIDBKeyval"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"T"}),l(e.span,{style:{color:"#86E1FC"},children:">"}),l(e.span,{style:{color:"#B4C2F0"},children:"("}),l(e.span,{style:{color:"#FCA7EA"},children:"key"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"IDBValidKey"}),l(e.span,{style:{color:"#86E1FC"},children:","}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FCA7EA"},children:"initialValue"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"MaybeAccessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"T"}),l(e.span,{style:{color:"#86E1FC"},children:">,"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FCA7EA"},children:"options"}),l(e.span,{style:{color:"#86E1FC"},children:"?:"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"UseIDBOptions"}),l(e.span,{style:{color:"#B4C2F0"},children:")"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#B4C2F0"},children:"{"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"data"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Accessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"T"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"setData"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Setter"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FFC777"},children:"T"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"null"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#86E1FC"},children:"|"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FF966C"},children:"undefined"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#C8D3F5"},children:"    "}),l(e.span,{style:{color:"#4FD6BE"},children:"isFinished"}),l(e.span,{style:{color:"#86E1FC"},children:":"}),l(e.span,{style:{color:"#C8D3F5"},children:" "}),l(e.span,{style:{color:"#FFC777"},children:"Accessor"}),l(e.span,{style:{color:"#86E1FC"},children:"<"}),l(e.span,{style:{color:"#FF966C"},children:"boolean"}),l(e.span,{style:{color:"#86E1FC"},children:">;"})]}}),`
`,l(e.span,{className:"line",get children(){return[l(e.span,{style:{color:"#B4C2F0"},children:"}"}),l(e.span,{style:{color:"#86E1FC"},children:";"})]}})]}})}})}}),`
`,l(e.h2,{children:"Source"}),`
`,l(e.p,{get children(){return[l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/integrations/src/useIDBKeyval/index.ts",children:"Source"})," • ",l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/integrations/src/useIDBKeyval/demo.tsx",children:"Demo"})," • ",l(e.a,{href:"https://github.com/solidjs-use/solidjs-use/blob/main/packages/integrations/src/useIDBKeyval/index.md",children:"Docs"})," • ",l(e.a,{href:"https://vueuse.org/integrations/useIDBKeyval",children:"VueUse Docs"})]}}),`
`,l(a,{links:[{href:"#demo",label:"Demo",indent:!1},{href:"#install",label:"Install",indent:!1},{href:"#usage",label:"Usage",indent:!1},{href:"#type-declarations",label:"Type Declarations",indent:!1},{href:"#source",label:"Source",indent:!1}]})]}})}function Y(r={}){const{wrapper:e}=Object.assign({},A(),r.components);return e?l(e,K(r,{get children(){return l(v,r)}})):v(r)}function f(r,e){throw new Error("Expected "+(e?"component":"object")+" `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{Y as default};
