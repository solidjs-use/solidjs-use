import{r as a,q as m}from"./index-3c801358.js";import{u}from"./index-c8b813f7.js";function s(n={}){const{window:e=m}=n,t=n.document??e?.document,[c,r]=a(t?.activeElement);return e&&(u(e,"blur",i=>{i.relatedTarget===null&&r(()=>t?.activeElement)},!0),u(e,"focus",()=>{r(()=>t?.activeElement)},!0)),c}export{s as u};