import{r as t,q as M}from"./index-3c801358.js";import{u as a}from"./index-c8b813f7.js";import{u as E}from"./index-bfe01d69.js";function h(d={}){const{window:o=M}=d,e=o?.navigator,c=E(()=>e&&"connection"in e),[i,s]=t(!0),[u,v]=t(!1),[w,f]=t(void 0),[p,r]=t(void 0),[k,D]=t(void 0),[m,y]=t(void 0),[g,x]=t(void 0),[A,O]=t(void 0),[S,T]=t("unknown"),n=c()&&e.connection;function l(){e&&(s(e.onLine),f(i()?void 0:Date.now()),r(i()?Date.now():void 0),n&&(D(n.downlink),y(n.downlinkMax),O(n.effectiveType),x(n.rtt),v(n.saveData),T(n.type)))}return o&&(a(o,"offline",()=>{s(!1),f(Date.now())}),a(o,"online",()=>{s(!0),r(Date.now())})),n&&a(n,"change",l,!1),l(),{isSupported:c,isOnline:i,saveData:u,offlineAt:w,onlineAt:p,downlink:k,downlinkMax:m,effectiveType:A,rtt:g,type:S}}export{h as u};