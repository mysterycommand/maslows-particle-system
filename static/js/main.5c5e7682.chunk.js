(this["webpackJsonpmaslows-particle-system"]=this["webpackJsonpmaslows-particle-system"]||[]).push([[0],[,function(e,t,s){"use strict";s.d(t,"dpr",(function(){return n})),s.d(t,"raf",(function(){return r})),s.d(t,"caf",(function(){return a})),s.d(t,"cos",(function(){return i})),s.d(t,"\u03c0",(function(){return c})),s.d(t,"random",(function(){return u})),s.d(t,"sin",(function(){return l})),s.d(t,"\u03c0\u03c0",(function(){return g})),s.d(t,"add",(function(){return m})),s.d(t,"sub",(function(){return d})),s.d(t,"pool",(function(){return p}));s(9);const{devicePixelRatio:n,requestAnimationFrame:r,cancelAnimationFrame:a}=window,{atan2:o,cos:i,PI:c,random:u,sin:l}=Math,g=2*c,m=(e,t)=>({x:e.x+t.x,y:e.y+t.y}),d=(e,t)=>({x:e.x-t.x,y:e.y-t.y}),p=(e,t)=>new Array(e).fill(0).map(()=>({...t(),currPos:{x:0,y:0},prevPos:{x:0,y:0},active:!1}))},function(e,t,s){"use strict";s.d(t,"a",(function(){return r})),s.d(t,"c",(function(){return a})),s.d(t,"b",(function(){return o}));var n=s(27);let r;!function(e){e.Self="Self",e.Other="Other"}(r||(r={}));const a=(e,t)=>{switch(t.type){case"setMessagesTop":return{messages:e.messages,messagesTop:t.payload.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"setMessagesHeight":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:t.payload.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"addMessage":return{messages:[...e.messages,{id:Object(n.a)(),createdAt:(new Date).toISOString(),...t.payload}],messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"renderMessage":const s=e.messages.find(e=>e.id===t.payload.id),r=s?e.messages.indexOf(s):-1;return s&&-1!==r?{messages:[...e.messages.slice(0,r),{...s,top:t.payload.top,height:t.payload.height},...e.messages.slice(r+1)],messagesTop:e.messagesTop,messagesHeight:e.messagesHeight+t.payload.height,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:e.isShowingSentiment}:e;case"setIsShowingFireworks":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:t.payload.isShowingFireworks,isShowingSentiment:e.isShowingSentiment};case"setIsShowingSentiment":return{messages:e.messages,messagesTop:e.messagesTop,messagesHeight:e.messagesHeight,isShowingFireworks:e.isShowingFireworks,isShowingSentiment:t.payload.isShowingSentiment};default:return e}},o={messages:[],messagesTop:0,messagesHeight:0,isShowingFireworks:!1,isShowingSentiment:!1}},function(e,t,s){e.exports={Form:"Form_Form__2boAo",Input:"Form_Input__1kIqz",Button:"Form_Button__1q5fL"}},function(e,t,s){e.exports={Message:"Message_Message__L9LXR",Self:"Message_Self__13TvW",Other:"Message_Other__oJUsj"}},function(e,t,s){e.exports={Device:"App_Device__1vnMx",Header:"App_Header__2rl_K",Footer:"App_Footer__3E1PI"}},function(e,t,s){e.exports={Messages:"Messages_Messages__2D-Ym",Sentinel:"Messages_Sentinel__286rc"}},function(e,t,s){e.exports={Sentiment:"Sentiment_Sentiment__ACt7i",Heart:"Sentiment_Heart__z1evg"}},,function(e,t){},function(e,t,s){"use strict";(function(e){s.d(t,"a",(function(){return u}));var n=s(0),r=s.n(n),a=s(2),o=s(15),i=s(6),c=s.n(i);const u=({messages:t,messagesTop:s,messagesHeight:i,dispatch:u})=>{const l=Object(n.useRef)(null),g=Object(n.useRef)(null),m=Object(n.useRef)(!0),d=Object(n.useRef)(s);d.current=s;const p=Object(n.useRef)(i);return p.current=i,Object(n.useEffect)(()=>{if(!l.current)return;const e=l.current,t=e.clientHeight-8;u({type:"setMessagesHeight",payload:{messagesHeight:e.clientHeight}});const s=()=>{e.scrollTop<d.current&&e.scrollTop<t&&(e.scrollTop=t),u({type:"setMessagesTop",payload:{messagesTop:e.scrollTop}});const s=e.scrollTop+e.clientHeight,n=p.current-e.clientHeight/3;m.current=s>n};return e.addEventListener("scroll",s,{passive:!0}),()=>{e.removeEventListener("scroll",s)}},[u]),Object(n.useEffect)(()=>{var s;const n=(null===(s=t[t.length-1])||void 0===s?void 0:s.sender)===a.a.Self;(m.current||n)&&e(()=>{g.current&&g.current.scrollIntoView({behavior:"smooth"})})},[t]),r.a.createElement("ol",{className:c.a.Messages,ref:l},t.reduce((e,{id:t,createdAt:n,sender:a,content:c,top:g,height:m})=>{if(!l.current)return e;const{clientHeight:d}=l.current;return void 0!==g&&void 0!==m&&!(g&&m&&g<s+d&&g+m>s)||e.push(r.a.createElement(o.a,{key:t,id:t,createdAt:n,sender:a,content:c,top:g,height:m,messagesHeight:i,dispatch:u})),e},[]),r.a.createElement("li",{className:c.a.Sentinel,style:{top:i},ref:g}))}}).call(this,s(23).setImmediate)},,,function(e,t,s){e.exports={Fireworks:"Fireworks_Fireworks__20lpI"}},,function(e,t,s){"use strict";s.d(t,"a",(function(){return m}));var n=s(14),r=s(0),a=s.n(r),o=s(2),i=s(4),c=s.n(i);const{getComputedStyle:u}=window,l=e=>{const{marginTop:t}=u(e);return e.offsetTop-parseInt(t,10)},g=e=>{const{marginTop:t,height:s,marginBottom:n}=u(e);return[t,s,n].reduce((e,t)=>e+parseInt(t,10),0)},m=({id:e,createdAt:t,sender:s,content:i,top:u,height:m,messagesHeight:d,dispatch:p})=>{const h=Object(r.useRef)(null);return Object(r.useEffect)(()=>{h.current&&void 0===u&&void 0===m&&p({type:"renderMessage",payload:{id:e,top:d+l(h.current),height:g(h.current)}})},[p,m,e,d,u]),a.a.createElement("li",{className:Object(n.a)({[c.a.Message]:!0,[c.a.Self]:s===o.a.Self,[c.a.Other]:s===o.a.Other}),title:t,style:{top:u},ref:h},i)}},,function(e,t,s){e.exports=s(26)},function(e,t,s){},,,,,,,,function(e,t,s){"use strict";s.r(t);s(18);var n=s(0),r=s.n(n),a=s(12),o=s.n(a),i=s(2),c=s(1),u=s(13),l=s.n(u);const g={x:0,y:.2},m=Object(c.pool)(5e3,()=>({hue:0})),d=({dispatch:e})=>{const t=Object(n.useRef)(null),[s,a]=Object(n.useState)(null);return Object(n.useEffect)(()=>{if(!t.current||!t.current.parentElement)return;const{width:e,height:s}=t.current.parentElement.getBoundingClientRect();t.current.width=e*c.dpr,t.current.height=s*c.dpr,t.current.style.opacity="1",a(t.current.getContext("2d"))},[]),Object(n.useEffect)(()=>{if(!t.current||!s)return;const{width:n,height:r}=t.current,a=n/2,o=r/2;let i,u=0,l=0;const d=p=>{i=Object(c.raf)(d),u||(u=p),l=p-u,s.fillStyle="black",s.fillRect(0,0,n,r);let h=0;const f=l%1e3<18&&l<5e3,y=a/2+Object(c.random)()*a,w=o/4+Object(c.random)()*o;m.forEach(e=>{if(!e.active&&f){if(!(h<500))return;((e,t,s)=>{const n=Object(c.random)()*c["\u03c0\u03c0"],r=15*Object(c.random)();e.currPos={x:t,y:s},e.prevPos={x:t+Object(c.cos)(n)*r,y:s+Object(c.sin)(n)*r},e.active=!0,e.hue=Object(c.random)()*c["\u03c0\u03c0"]*(180/c["\u03c0"])})(e,y,w),++h}e.active=0<e.currPos.x&&e.currPos.x<n&&0<e.currPos.y&&e.currPos.y<r,e.active&&((e=>{const t=Object(c.add)(Object(c.sub)(e.currPos,e.prevPos),g),s=Object(c.add)(e.currPos,t);e.prevPos=e.currPos,e.currPos=s})(e),((e,{currPos:t,prevPos:s,hue:n})=>{e.fillStyle="white",e.fillRect(s.x-4,s.y-4,8,8),e.fillStyle=`hsl(${n}, 80%, 50%)`,e.fillRect(t.x-4,t.y-4,8,8)})(s,e))}),l>5e3&&m.every(({active:e})=>!e)&&t.current&&(t.current.style.opacity="0",Object(c.caf)(i),setTimeout(()=>e({type:"setIsShowingFireworks",payload:{isShowingFireworks:!1}}),400))};return i=Object(c.raf)(d),()=>{Object(c.caf)(i)}},[s,e]),r.a.createElement("canvas",{className:l.a.Fireworks,ref:t})};var p=s(3),h=s.n(p);const f=({dispatch:e})=>{const[t,s]=Object(n.useState)("");return r.a.createElement("form",{action:"",className:h.a.Form,onSubmit:n=>{n.preventDefault(),e({type:"addMessage",payload:{sender:i.a.Self,content:t}}),s("")}},r.a.createElement("input",{type:"text",className:h.a.Input,value:t,onChange:e=>{s(e.target.value)}}),r.a.createElement("button",{type:"submit",className:h.a.Button,disabled:""===t},"\u2191"))};var y=s(10),w=s(5),S=s.n(w),b=s(27);const O={x:0,y:-.1},v=Object(c.pool)(50,()=>({id:Object(b.a)(),opacity:1,scale:1}));var j=s(7),_=s.n(j);const x=({dispatch:e})=>{const t=Object(n.useRef)(null),[s,a]=Object(n.useState)([]);return Object(n.useEffect)(()=>{if(!t.current)return;t.current.style.opacity="1";const{clientWidth:s,clientHeight:n}=t.current;let r,o=0,i=0;const u=l=>{r=Object(c.raf)(u),o||(o=l),i=l-o;let g=0;const m=i%80<16&&i<5e3,d=Object(c.random)()*s,p=n;v.forEach(e=>{if(!e.active&&m){if(!(g<5))return;((e,t,s)=>{const n=Object(c.random)()*c["\u03c0\u03c0"],r=5*Object(c.random)(),a=t+Object(c.cos)(n)*r,o=s+Object(c.sin)(n)*r;e.currPos={x:t,y:s},e.prevPos={x:a,y:o},e.active=!0,e.opacity=1,e.scale=1})(e,d,p),++g}e.active=0<e.currPos.x&&e.currPos.x<s&&-40<e.currPos.y&&e.currPos.y<n+40,e.active&&((e,{height:t})=>{const s=Object(c.add)(Object(c.sub)(e.currPos,e.prevPos),O),n=Object(c.add)(e.currPos,s);e.prevPos=e.currPos,e.currPos=n,e.opacity=e.currPos.y/t,e.scale=2-e.currPos.y/t})(e,{width:s,height:n,time:i})}),a(v.filter(({active:e})=>e)),i>5e3&&v.every(({active:e})=>!e)&&t.current&&(t.current.style.opacity="0",Object(c.caf)(r),setTimeout(()=>e({type:"setIsShowingSentiment",payload:{isShowingSentiment:!1}}),400))};return r=Object(c.raf)(u),()=>{Object(c.caf)(r)}},[e]),r.a.createElement("div",{className:_.a.Sentiment,ref:t},s.map(({id:e,currPos:{x:t,y:s},opacity:n,scale:a})=>r.a.createElement("span",{role:"img","aria-label":"love",className:_.a.Heart,key:e,style:{opacity:n,transform:`translate(${t}px, ${s}px) scale(${a})`}},"\u2764\ufe0f")))},F=()=>{const[{messages:e,messagesTop:t,messagesHeight:s,isShowingFireworks:a,isShowingSentiment:o},c]=Object(n.useReducer)(i.c,i.b),u=Object(n.useCallback)(e=>{c(e),"addMessage"===e.type&&(0===e.payload.content.indexOf("say ")&&setTimeout(()=>{u({type:"addMessage",payload:{sender:i.a.Other,content:e.payload.content.slice(3).trim()}})},2e3),"congrats"===e.payload.content&&c({type:"setIsShowingFireworks",payload:{isShowingFireworks:!0}}),"\u2764\ufe0f"===e.payload.content&&c({type:"setIsShowingSentiment",payload:{isShowingSentiment:!0}}))},[c]);return r.a.createElement("article",{className:S.a.Device},a&&r.a.createElement(d,{dispatch:c}),r.a.createElement("header",{className:S.a.Header},"Bot"),r.a.createElement(y.a,{messages:e,messagesTop:t,messagesHeight:s,dispatch:c}),r.a.createElement("footer",{className:S.a.Footer},r.a.createElement(f,{dispatch:u})),o&&r.a.createElement(x,{dispatch:c}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}],[[17,1,2]]]);
//# sourceMappingURL=main.5c5e7682.chunk.js.map