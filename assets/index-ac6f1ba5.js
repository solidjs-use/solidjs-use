import{c as f}from"./index-72f1e1a3.js";import{r as g,X as l,z as S,A as y}from"./index-d619ab1d.js";import{u as d}from"./index-d4ccc7ee.js";import{u as h}from"./index-9a69823d.js";function P(r,u={}){const{controls:c=!1,navigator:e=l}=u,s=h(()=>e&&"permissions"in e);let t;const m=typeof r=="string"?{name:r}:r,[n,o]=g(),a=()=>{t&&o(t.state)},p=y(),i=f(async()=>{if(s()){if(!t)try{t=await e.permissions.query(m),S(p,()=>{d(t,"change",a)}),a()}catch{o("prompt")}return t}});return i(),c?{state:n,isSupported:s,query:i}:n}export{P as u};