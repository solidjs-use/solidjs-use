import{r as V}from"./index-4b666c27.js";import{r as g,b as p,u as s,B as u,C as l,q as C}from"./index-d619ab1d.js";import{u as w}from"./index-9b4ec456.js";function M(r,f,m={}){const{window:t=C,initialValue:o="",observe:d=!1}=m,n=g(o),[b,v]=n,e=p(()=>s(f)??t?.document?.documentElement);function c(){const a=s(r),i=s(e);if(i&&t){const y=t.getComputedStyle(i).getPropertyValue(a)?.trim();v(()=>y||o)}}return d&&w(e,c,{attributes:!0,window:t}),u(l([e,V(r)],c)),u(l(b,a=>{e()?.style&&e()?.style.setProperty(s(r),a)},{defer:!0})),n}export{M as u};