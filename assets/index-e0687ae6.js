import{t as O}from"./index-231b6a69.js";import{n as e,o as S,p as A,u as C}from"./index-dbcfc8dd.js";import{t as H}from"./index-37537b1b.js";import{u as h}from"./index-53b5d553.js";import{u as M}from"./index-ae1534c9.js";function j(r,l={}){const{reset:d=!0,windowResize:g=!0,windowScroll:w=!0,immediate:v=!0}=l,[R,i]=e(0),[b,n]=e(0),[x,u]=e(0),[y,c]=e(0),[z,f]=e(0),[B,a]=e(0),[E,m]=e(0),[L,p]=e(0);function o(){const s=C(r);if(!s){d&&(i(0),n(0),u(0),c(0),f(0),a(0),m(0),p(0));return}const t=s.getBoundingClientRect();i(t.height),n(t.bottom),u(t.left),c(t.right),f(t.top),a(t.width),m(t.x),p(t.y)}return M(r,o),S(A(O(r),s=>{!s&&o()},{defer:!0})),w&&h("scroll",o,{capture:!0,passive:!0}),g&&h("resize",o,{passive:!0}),H(()=>{v&&o()}),{height:R,bottom:b,left:x,right:y,top:z,width:B,x:E,y:L,update:o}}export{j as u};