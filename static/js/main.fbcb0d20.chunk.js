(this["webpackJsonpmaslows-particle-system"]=this["webpackJsonpmaslows-particle-system"]||[]).push([[0],[,function(e,t,s){"use strict";s.d(t,"dpr",(function(){return n})),s.d(t,"raf",(function(){return r})),s.d(t,"caf",(function(){return a})),s.d(t,"cos",(function(){return o})),s.d(t,"\u03c0",(function(){return c})),s.d(t,"random",(function(){return u})),s.d(t,"sin",(function(){return l})),s.d(t,"\u03c0\u03c0",(function(){return g})),s.d(t,"add",(function(){return h})),s.d(t,"sub",(function(){return m}));s(9);const{devicePixelRatio:n,requestAnimationFrame:r,cancelAnimationFrame:a}=window,{atan2:i,cos:o,PI:c,random:u,sin:l}=Math,g=2*c,h=(e,t)=>({x:e.x+t.x,y:e.y+t.y}),m=(e,t)=>({x:e.x-t.x,y:e.y-t.y})},function(e,t,s){"use strict";s.d(t,"a",(function(){return r})),s.d(t,"c",(function(){return a})),s.d(t,"b",(function(){return i}));var n=s(27);let r;!function(e){e.Self="Self",e.Other="Other"}(r||(r={}));const a=(e,t)=>{switch(t.type){case"setMessagesTop":return{messages:e.messages,messagesTop:t.payload.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"setMessagesHeight":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:t.payload.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"addMessage":return{messages:[...e.messages,{id:Object(n.a)(),createdAt:(new Date).toISOString(),...t.payload}],messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"renderMessage":const s=e.messages.find(e=>e.id===t.payload.id),r=s?e.messages.indexOf(s):-1;return s&&-1!==r?{messages:[...e.messages.slice(0,r),{...s,top:t.payload.top,height:t.payload.height},...e.messages.slice(r+1)],messagesTop:e.messagesTop,messagesHeight:e.messagesHeight+t.payload.height,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment}:e;case"setIsShowingFireworks":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:t.payload.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"setIsShowingSentiment":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:t.payload.isShowingSentiment};default:return e}},i={messages:[],messagesTop:0,messagesHeight:0,isShowingFireworks:!1,isShowingSentiment:!1}},function(e,t,s){e.exports={Form:"Form_Form__2boAo",Input:"Form_Input__1kIqz",Button:"Form_Button__1q5fL"}},function(e,t,s){e.exports={Message:"Message_Message__L9LXR",Self:"Message_Self__13TvW",Other:"Message_Other__oJUsj"}},function(e,t,s){e.exports={Device:"App_Device__1vnMx",Header:"App_Header__2rl_K",Footer:"App_Footer__3E1PI"}},function(e,t,s){e.exports={Messages:"Messages_Messages__2D-Ym",Sentinel:"Messages_Sentinel__286rc"}},function(e,t,s){e.exports={Sentiment:"Sentiment_Sentiment__ACt7i",Heart:"Sentiment_Heart__z1evg"}},,function(e,t){},function(e,t,s){"use strict";(function(e){s.d(t,"a",(function(){return u}));var n=s(0),r=s.n(n),a=s(2),i=s(15),o=s(6),c=s.n(o);const u=({messages:t,messagesTop:s,messagesHeight:o,dispatch:u})=>{const l=Object(n.useRef)(null),g=Object(n.useRef)(null),h=Object(n.useRef)(!0),m=Object(n.useRef)(s);m.current=s;const d=Object(n.useRef)(o);return d.current=o,Object(n.useEffect)(()=>{if(!l.current)return;const e=l.current,t=e.clientHeight-8;u({type:"setMessagesHeight",payload:{messagesHeight:e.clientHeight}});const s=()=>{e.scrollTop<m.current&&e.scrollTop<t&&(e.scrollTop=t),u({type:"setMessagesTop",payload:{messagesTop:e.scrollTop}});const s=e.scrollTop+e.clientHeight,n=d.current-e.clientHeight/3;h.current=s>n};return e.addEventListener("scroll",s,{passive:!0}),()=>{e.removeEventListener("scroll",s)}},[u]),Object(n.useEffect)(()=>{var s;const n=(null===(s=t[t.length-1])||void 0===s?void 0:s.sender)===a.a.Self;(h.current||n)&&e(()=>{g.current&&g.current.scrollIntoView({behavior:"smooth"})})},[t]),r.a.createElement("ol",{className:c.a.Messages,ref:l},t.reduce((e,{id:t,createdAt:n,sender:a,content:c,top:g,height:h})=>{if(!l.current)return e;const{clientHeight:m}=l.current;return void 0!==g&&void 0!==h&&!(g&&h&&g<s+m&&g+h>s)||e.push(r.a.createElement(i.a,{key:t,id:t,createdAt:n,sender:a,content:c,top:g,height:h,messagesHeight:o,dispatch:u})),e},[]),r.a.createElement("li",{className:c.a.Sentinel,style:{top:o},ref:g}))}}).call(this,s(23).setImmediate)},,,function(e,t,s){e.exports={Fireworks:"Fireworks_Fireworks__20lpI"}},,function(e,t,s){"use strict";s.d(t,"a",(function(){return h}));var n=s(14),r=s(0),a=s.n(r),i=s(2),o=s(4),c=s.n(o);const{getComputedStyle:u}=window,l=e=>{const{marginTop:t}=u(e);return e.offsetTop-parseInt(t,10)},g=e=>{const{marginTop:t,height:s,marginBottom:n}=u(e);return[t,s,n].reduce((e,t)=>e+parseInt(t,10),0)},h=({id:e,createdAt:t,sender:s,content:o,top:u,height:h,messagesHeight:m,dispatch:d})=>{const p=Object(r.useRef)(null);return Object(r.useEffect)(()=>{p.current&&void 0===u&&void 0===h&&d({type:"renderMessage",payload:{id:e,top:m+l(p.current),height:g(p.current)}})},[d,h,e,m,u]),a.a.createElement("li",{className:Object(n.a)({[c.a.Message]:!0,[c.a.Self]:s===i.a.Self,[c.a.Other]:s===i.a.Other}),title:t,style:{top:u},ref:p},o)}},,function(e,t,s){e.exports=s(26)},function(e,t,s){},,,,,,,,function(e,t,s){"use strict";s.r(t);s(18);var n=s(0),r=s.n(n),a=s(12),i=s.n(a),o=s(2),c=s(1),u=s(13),l=s.n(u);const g={x:0,y:.2};let h=[];const m=(e,t)=>{const s=Object(c.random)()*c["\u03c0\u03c0"],n=15*Object(c.random)();return{currPos:{x:e,y:t},prevPos:{x:e+Object(c.cos)(s)*n,y:t+Object(c.sin)(s)*n},hue:Object(c.random)()*c["\u03c0\u03c0"]*(180/c["\u03c0"])}},d=(e,{width:t,height:s})=>{e.fillStyle="black",e.fillRect(0,0,t,s),h.forEach(t=>{(e=>{const t=Object(c.add)(Object(c.sub)(e.currPos,e.prevPos),g),s=Object(c.add)(e.currPos,t);e.prevPos=e.currPos,e.currPos=s})(t),((e,{currPos:t,prevPos:s,hue:n})=>{e.beginPath(),e.fillStyle=`hsl(${n}, 80%, 50%)`,e.ellipse(t.x,t.y,5,5,0,0,c["\u03c0\u03c0"]),e.fill(),e.beginPath(),e.fillStyle=`hsl(${(n+180)%360}, 80%, 50%)`,e.ellipse(s.x,s.y,5,5,0,0,c["\u03c0\u03c0"]),e.fill()})(e,t)})},p=({dispatch:e})=>{const t=Object(n.useRef)(null),[s,a]=Object(n.useState)(null);return Object(n.useEffect)(()=>{if(!t.current||!t.current.parentElement)return;const{width:e,height:s}=t.current.parentElement.getBoundingClientRect();t.current.width=e*c.dpr,t.current.height=s*c.dpr,t.current.style.opacity="1",a(t.current.getContext("2d"))},[]),Object(n.useEffect)(()=>{if(!t.current||!s)return;const{width:n,height:r}=t.current;let a,i=0,o=0;const u=l=>{a=Object(c.raf)(u),i||(i=l),o=l-i,(({width:e,height:t,time:s})=>{const n=e/2,r=t/2;if(s%1e3<16&&s<5e3){const e=n/2+Object(c.random)()*n,t=r/4+Object(c.random)()*r;for(let s=0;s<100;++s)h.push(m(e,t))}})({width:n,height:r,time:o}),d(s,{width:n,height:r,time:o}),(({width:e,height:t})=>{h=h.reduce((s,n)=>{const{currPos:{x:r,y:a}}=n;return 0<r&&r<e&&0<a&&a<t&&s.push(n),s},[])})({width:n,height:r,time:o}),o>5e3&&0===h.length&&t.current&&(t.current.style.opacity="0",Object(c.caf)(a),setTimeout(()=>e({type:"setIsShowingFireworks",payload:{isShowingFireworks:!1}}),400))};return a=Object(c.raf)(u),()=>{Object(c.caf)(a)}},[s,e]),r.a.createElement("canvas",{className:l.a.Fireworks,ref:t})};var f=s(3),w=s.n(f);const S=({dispatch:e})=>{const[t,s]=Object(n.useState)("");return r.a.createElement("form",{action:"",className:w.a.Form,onSubmit:n=>{n.preventDefault(),e({type:"addMessage",payload:{sender:o.a.Self,content:t}}),s("")}},r.a.createElement("input",{type:"text",className:w.a.Input,value:t,onChange:e=>{s(e.target.value)}}),r.a.createElement("button",{type:"submit",className:w.a.Button,disabled:""===t},"\u2191"))};var y=s(10),b=s(5),O=s.n(b),j=s(27),_=s(7),v=s.n(_);const F={x:0,y:-.1};let E=[];const H=({width:e,height:t,time:s})=>{if(s%80<16&&s<5e3){const s=Object(c.random)()*e,n=t;E.push(((e,t)=>{const s=Object(c.random)()*c["\u03c0\u03c0"],n=5*Object(c.random)();return{currPos:{x:e,y:t},prevPos:{x:e+Object(c.cos)(s)*n,y:t+Object(c.sin)(s)*n},id:Object(j.a)(),opacity:1,scale:1}})(s,n))}},k=({height:e})=>{E.forEach(t=>{(e=>{const t=Object(c.add)(Object(c.sub)(e.currPos,e.prevPos),F),s=Object(c.add)(e.currPos,t);e.prevPos=e.currPos,e.currPos=s})(t),t.opacity=t.currPos.y/e,t.scale=2-t.currPos.y/e})},x=({dispatch:e})=>{const t=Object(n.useRef)(null),[s,a]=Object(n.useState)([]);return Object(n.useEffect)(()=>{if(!t.current)return;t.current.style.opacity="1";const{clientWidth:s,clientHeight:n}=t.current;let r,i=0,o=0;const u=l=>{r=Object(c.raf)(u),i||(i=l),o=l-i,k({width:s,height:n,time:o}),H({width:s,height:n,time:o}),(({width:e,height:t,time:s})=>{E=E.reduce((s,n)=>{const{currPos:{x:r,y:a}}=n;return 0<r&&r<e&&-40<a&&a<t+40&&s.push(n),s},[])})({width:s,height:n,time:o}),a(E),o>5e3&&0===E.length&&t.current&&(t.current.style.opacity="0",Object(c.caf)(r),setTimeout(()=>e({type:"setIsShowingSentiment",payload:{isShowingSentiment:!1}}),400))};return r=Object(c.raf)(u),()=>{Object(c.caf)(r)}},[e]),r.a.createElement("div",{className:v.a.Sentiment,ref:t},s.map(({id:e,currPos:{x:t,y:s},opacity:n,scale:a})=>r.a.createElement("span",{role:"img","aria-label":"love",className:v.a.Heart,key:e,style:{opacity:n,transform:`translate(${t}px, ${s}px) scale(${a})`}},"\u2764\ufe0f")))},T=()=>{const[{messages:e,messagesTop:t,messagesHeight:s,isShowingFireworks:a,isShowingSentiment:i},c]=Object(n.useReducer)(o.c,o.b),u=Object(n.useCallback)(e=>{c(e),"addMessage"===e.type&&(0===e.payload.content.indexOf("say ")&&setTimeout(()=>{u({type:"addMessage",payload:{sender:o.a.Other,content:e.payload.content.slice(3).trim()}})},2e3),"congrats"===e.payload.content&&c({type:"setIsShowingFireworks",payload:{isShowingFireworks:!0}}),"\u2764\ufe0f"===e.payload.content&&c({type:"setIsShowingSentiment",payload:{isShowingSentiment:!0}}))},[c]);return r.a.createElement("article",{className:O.a.Device},a&&r.a.createElement(p,{dispatch:c}),r.a.createElement("header",{className:O.a.Header},"Bot"),r.a.createElement(y.a,{messages:e,messagesTop:t,messagesHeight:s,dispatch:c}),r.a.createElement("footer",{className:O.a.Footer},r.a.createElement(S,{dispatch:u})),i&&r.a.createElement(x,{dispatch:c}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}],[[17,1,2]]]);
//# sourceMappingURL=main.fbcb0d20.chunk.js.map