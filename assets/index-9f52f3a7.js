import{r as a,q as f}from"./index-3c801358.js";import{u as d}from"./index-c8b813f7.js";import{u as b}from"./index-bfe01d69.js";function A(o={}){const{window:t=f}=o,s=b(()=>t&&"DeviceOrientationEvent"in t),[n,i]=a(!1),[r,u]=a(null),[l,m]=a(null),[c,p]=a(null);return t&&s()&&d(t,"deviceorientation",e=>{i(e.absolute),u(e.alpha),m(e.beta),p(e.gamma)}),{isSupported:s,isAbsolute:n,alpha:r,beta:l,gamma:c}}export{A as u};