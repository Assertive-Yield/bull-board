(()=>{"use strict";var e,t,n,a={6684:(e,t)=>{t.n=void 0,t.n={latest:"latest",active:"active",waiting:"waiting",completed:"completed",failed:"failed",delayed:"delayed",paused:"paused"}},7182:(e,t,n)=>{var a=n(2784),r=n(8316),l=n(6213),c=n(5235),o=n(47),u=n(4795),s=n(2867),i=n(7162),m=n.n(i),d=n(8777),p=n(6666),f="latest",v="active",h="waiting",E="completed",g="failed",y="delayed",b=[f,v,h,E,g,y,"paused"];function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){(0,p.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C=function(e){var t=e.children;return a.createElement("header",{className:"Qp5xkm"},a.createElement("div",{className:"KmtwbG"},a.createElement("img",{src:("/images/logo.svg","".concat(window.__basePath__,"/static").concat("/images/logo.svg")),alt:"Bull Dashboard"}),"Bull Dashboard"),t)},x=function(){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none",stroke:"currentcolor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2"},a.createElement("circle",{cx:"14",cy:"14",r:"12"}),a.createElement("path",{d:"M23 23 L30 30"}))};var N=function(e){return e<100?"".concat(e):e<1e3?"".concat(Math.floor(e/100),"h"):e<1e4?"".concat(Math.floor(e/1e3),"k"):e<1e5?"e4":e<1e6?"e5":e<1e7?"e6":">e6"},R=function(e){var t=e.counts;return a.createElement("table",{className:"ySjCGC"},a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",{style:{color:"greenyellow"}},N(t.active)),a.createElement("td",{style:{color:"lightgreen"}},N(t.completed)),a.createElement("td",{style:{color:"gray"}},N(t.paused))),a.createElement("tr",null,a.createElement("td",{style:{color:"lightblue"}},N(t.delayed)),a.createElement("td",{style:{color:"yellow"}},N(t.waiting)),a.createElement("td",{style:{color:"red"}},N(t.failed)))))};const O="_SQRTj";var P=n(6277),j=function(e){var t=e.queues,n=e.selectedStatuses,r=(0,a.useState)(""),c=(0,s.Z)(r,2),o=c[0],u=c[1];return a.createElement("aside",{className:"KM3iIV"},a.createElement("div",{className:O},"QUEUES"),((null==t?void 0:t.length)||0)>5&&a.createElement("div",{className:"yFahS9"},a.createElement(x,null),a.createElement("input",{className:"NaAPYH",type:"search",id:"search-queues",placeholder:"Filter queues",value:o,onChange:function(e){var t=e.currentTarget;return u(t.value)}})),a.createElement("nav",null,!!t&&a.createElement("ul",{className:"xQ9Bfk"},t.filter((function(e){return e.name.includes(o)})).map((function(e){var t=e.name,r=e.isPaused,c=e.counts;return a.createElement("li",{key:t,className:"Fcuop6"},a.createElement(R,{counts:c}),a.createElement(l.OL,{to:"/queue/".concat(encodeURIComponent(t)).concat(n[t]&&n[t]!==b[0]?"?status=".concat(n[t]):""),activeClassName:"xIyUVd",title:t},t," ",r&&a.createElement("span",{className:"FQv16d"},"[ Paused ]")))})))),a.createElement("div",{className:(0,P.Z)("LzWgje",O)},"3.10.2"))},Z=["Data","Options","Logs"],A=n(7896),L=n(2159);const q={button:"FfK0_C",default:"FLsJVc",isActive:"eSFVol",basic:"geS1cw",primary:"jxfPOB"};var S=["children","className","isActive","theme"],_=a.forwardRef((function(e,t){var n=e.children,r=e.className,l=e.isActive,c=void 0!==l&&l,o=e.theme,u=void 0===o?"default":o,s=(0,L.Z)(e,S);return a.createElement("button",(0,A.Z)({type:"button",ref:t},s,{className:(0,P.Z)(r,q.button,q[u],(0,p.Z)({},q.isActive,c))}),n)}));var B=n(9249),M=n(7371),F=n(753),I=n(8106),U=n(8657),J=n(5058),z=n(3923),D=n(5473);z.Z.registerLanguage("json",D.Z),z.Z.registerLanguage("stacktrace",(function(){var e={className:"number",begin:":\\d+:\\d+",relevance:5};return{case_insensitive:!0,contains:[{className:"type",begin:/^\w*Error:\s*/,relevance:40,contains:[{className:"title",begin:/.*/,end:/$/,excludeStart:!0,endsWithParent:!0}]},{className:"trace-line",begin:/^\s*at/,end:/$/,keywords:"at as async prototype anonymous function",contains:[{className:"code-path",begin:/\(/,end:/\)$/,excludeEnd:!0,excludeBegin:!0,contains:[e]}]},e]}}));var H=function(e){(0,I.Z)(l,e);var t,n,r=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,J.Z)(t);if(n){var r=(0,J.Z)(this).constructor;e=Reflect.construct(a,arguments,r)}else e=a.apply(this,arguments);return(0,U.Z)(this,e)});function l(){var e;(0,B.Z)(this,l);for(var t=arguments.length,n=new Array(t),c=0;c<t;c++)n[c]=arguments[c];return e=r.call.apply(r,[this].concat(n)),(0,p.Z)((0,F.Z)(e),"codeRef",a.createRef()),e}return(0,M.Z)(l,[{key:"shouldComponentUpdate",value:function(e){return e.language!==this.props.language||(Array.isArray(this.props.children)?this.props.children.some((function(t){return![].concat(e.children).includes(t)})):e.children!==this.props.children)}},{key:"componentDidMount",value:function(){this.highlightCode()}},{key:"componentDidUpdate",value:function(){this.highlightCode()}},{key:"render",value:function(){var e=this.props.language;return a.createElement("pre",{ref:this.codeRef},a.createElement("code",{className:e}))}},{key:"highlightCode",value:function(){var e,t=null===(e=this.codeRef.current)||void 0===e?void 0:e.querySelector("code");t&&(t.textContent=this.props.children,z.Z.highlightElement(t))}}]),l}(a.Component);var V=function(e){var t=e.actions,n=(0,a.useState)([]),r=(0,s.Z)(n,2),l=r[0],c=r[1];return(0,a.useEffect)((function(){var e=!0;return t.getJobLogs().then((function(t){return e&&c(t)})),function(){e=!1}}),[]),Array.isArray(l)&&l.length?a.createElement("ul",{className:"EnrkkZ"},l.map((function(e,t){return a.createElement("li",{key:t},e)}))):null},T=function(e){var t=e.selectedTab,n=e.job,r=n.stacktrace,l=n.data,c=n.returnValue,o=n.opts,u=n.failedReason,s=e.actions;switch(t){case"Data":return a.createElement(H,{language:"json"},JSON.stringify({data:l,returnValue:c},null,2));case"Options":return a.createElement(H,{language:"json"},JSON.stringify(o,null,2));case"Error":return a.createElement(a.Fragment,null,0===r.length?a.createElement("div",{className:"error"},u||"NA"):a.createElement(H,{language:"stacktrace",key:"stacktrace"},r.join("\n")));case"Logs":return a.createElement(V,{actions:s});default:return null}},Q=function(e){var t=e.status,n=e.job,r=e.actions,l=function(e,t){var n=(0,a.useState)([]),r=(0,s.Z)(n,2),l=r[0],c=r[1],o=(0,a.useState)(0),u=(0,s.Z)(o,2),i=u[0],m=u[1],d=l[i];return(0,a.useEffect)((function(){var n=e===g?["Error"].concat(Z):t?[].concat(Z,["Error"]):[].concat(Z);c(n)}),[e]),{tabs:l.map((function(e,t){return{title:e,isActive:e===d,selectTab:function(){return m(t)}}})),selectedTab:d}}(t,n.isFailed),c=l.tabs,o=l.selectedTab;return 0===c.length?null:a.createElement("div",{className:"btVpoI"},a.createElement("ul",{className:"khjsGk"},c.map((function(e){return a.createElement("li",{key:e.title},a.createElement(_,{onClick:e.selectTab,isActive:e.isActive},e.title))}))),a.createElement("div",{className:"BhrxDy"},a.createElement("div",null,a.createElement(T,{selectedTab:o,job:n,actions:r}))))},W=function(){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a.createElement("path",{d:"M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"}))},K=function(){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a.createElement("path",{d:"M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"}))};var G=function(e){var t=e.title,n=e.children;return a.createElement("span",{"data-title":t,className:"Km6UUy"},n)};var X,$={promote:{title:"Promote",Icon:function(){return a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},a.createElement("path",{d:"M15 17v-2.99A4 4 0 0 0 11 10H8v5L2 9l6-6v5h3a6 6 0 0 1 6 6v3h-2z"}))},actionKey:"promoteJob"},clean:{title:"Clean",Icon:K,actionKey:"cleanJob"},retry:{title:"Retry",Icon:W,actionKey:"retryJob"}},Y=(X={},(0,p.Z)(X,g,[$.retry,$.clean]),(0,p.Z)(X,y,[$.promote,$.clean]),(0,p.Z)(X,E,[$.clean]),(0,p.Z)(X,h,[$.clean]),X),ee=function(e){var t=e.actions,n=e.status,r=e.allowRetries,l=Y[n];return l?(r||(l=l.filter((function(e){return"retryJob"!==e.actionKey}))),a.createElement("ul",{className:"FIjbjm"},l.map((function(e){return a.createElement("li",{key:e.title},a.createElement(G,{title:e.title},a.createElement(_,{onClick:t[e.actionKey],className:"crgtje"},a.createElement(e.Icon,null))))})))):null};var te=function(e){var t=e.percentage,n=e.status,r=e.className;return a.createElement("svg",{className:(0,P.Z)("mpWxwy",r),viewBox:"0 0 148 148"},a.createElement("circle",{cx:"70",cy:"70",r:"70",fill:"none",stroke:"#EDF2F7",strokeWidth:"8",strokeLinecap:"round",style:{transform:"translate(4px, 4px)"}}),a.createElement("circle",{cx:"70",cy:"70",r:"70",fill:"none",stroke:n===g?"#F56565":"#48BB78",strokeWidth:"8",strokeLinecap:"round",strokeDasharray:"600",strokeDashoffset:600-440*t/100,style:{transform:"translate(4px, -4px) rotate(-90deg)"}}),a.createElement("text",{textAnchor:"middle",x:"74",y:"88"},t,"%"))},ne=n(6542),ae=n(4919),re=n(1914),le=n(8950);var ce=function(e){return(0,ne.Z)(e)?(0,ae.Z)(e,"HH:mm:ss"):(0,re.Z)(e)===(0,re.Z)(new Date)?(0,ae.Z)(e,"MM/dd HH:mm:ss"):(0,ae.Z)(e,"MM/dd/yyyy HH:mm:ss")},oe=function(e){var t=e.job,n=e.status;return a.createElement("div",{className:"HyeswP"},a.createElement("ul",{className:"zNRPYu"},a.createElement("li",null,a.createElement("small",null,"Added at"),a.createElement("time",null,ce(t.timestamp||0))),!!t.delay&&t.delay>0&&n===y&&a.createElement("li",null,a.createElement("small",null,"Will run at"),a.createElement("time",null,ce((t.timestamp||0)+t.delay))),!!t.processedOn&&a.createElement("li",null,a.createElement("small",null,t.delay&&t.delay>0?"delayed for ":"",(0,le.Z)(t.processedOn,t.timestamp||0,{includeSeconds:!0})),a.createElement("small",null,"Process started at"),a.createElement("time",null,ce(t.processedOn))),!!t.finishedOn&&a.createElement("li",null,a.createElement("small",null,(0,le.Z)(t.finishedOn,t.processedOn||0,{includeSeconds:!0})),a.createElement("small",null,t.isFailed&&n!==v?"Failed":"Finished"," at"),a.createElement("time",null,ce(t.finishedOn)))))},ue=n(6684),se=[ue.n.active,ue.n.completed],ie=function(e){var t,n,r,l,c,o,u,s,i=e.job,m=e.status,d=e.actions,p=e.readOnlyMode,f=e.allowRetries;return a.createElement("div",{className:"kxGL7W"},a.createElement("div",{className:"P5lfym"},a.createElement("span",{title:"#".concat(i.id)},"#",i.id),a.createElement(oe,{job:i,status:m})),a.createElement("div",{className:"BXwLWT"},a.createElement("div",{className:"A9V76b"},a.createElement("h4",null,i.name,i.attempts>1&&a.createElement("span",null,"attempt #",i.attempts),!(null===(t=i.opts)||void 0===t||null===(n=t.repeat)||void 0===n||!n.count)&&a.createElement("span",null,"repeat ",null===(r=i.opts)||void 0===r||null===(l=r.repeat)||void 0===l?void 0:l.count,!(null===(c=i.opts)||void 0===c||null===(o=c.repeat)||void 0===o||!o.limit)&&" / ".concat(null===(u=i.opts)||void 0===u||null===(s=u.repeat)||void 0===s?void 0:s.limit))),!p&&a.createElement(ee,{status:m,actions:d,allowRetries:f})),a.createElement("div",{className:"XRq6SL"},a.createElement(Q,{status:m,job:i,actions:d}),"number"==typeof i.progress&&a.createElement(te,{percentage:i.progress,status:i.isFailed&&!se.includes(m)?ue.n.failed:m,className:"WoVp7D"}))))};const me="hdBx8v";var de=[g,y,E],pe=function(e){var t=e.onClick;return a.createElement(_,{onClick:t,className:me},a.createElement(K,null),"Clean all")},fe=function(e){var t=e.status,n=e.actions,r=e.queue,l=e.allowRetries;return function(e){return de.includes(e)}(t)?a.createElement("ul",{className:"Wzq3Rj"},t===g&&a.createElement(a.Fragment,null,l&&a.createElement("li",null,a.createElement(_,{onClick:n.retryAll(r.name),className:me},a.createElement(W,null),"Retry all")),a.createElement("li",null,a.createElement(pe,{onClick:n.cleanAllFailed(r.name)}))),t===y&&a.createElement("li",null,a.createElement(pe,{onClick:n.cleanAllDelayed(r.name)})),t===E&&a.createElement("li",null,a.createElement(pe,{onClick:n.cleanAllCompleted(r.name)}))):null};var ve=n(1910),he=function(){return a.createElement("svg",{"aria-hidden":"true",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 192 512"},a.createElement("path",{d:"M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"}))},Ee=function(){return a.createElement("svg",{"aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},a.createElement("path",{d:"M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"}))},ge=function(){return a.createElement("svg",{"aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},a.createElement("path",{d:"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"}))};var ye=function(e){var t=e.queue,n=e.actions;return a.createElement(ve.fC,null,a.createElement(ve.xz,{asChild:!0},a.createElement(_,{className:"SqLNg_"},a.createElement(he,null))),a.createElement(ve.VY,{className:"hoE_qZ",align:"end"},a.createElement(ve.ck,{className:"W0NO5n",onSelect:t.isPaused?n.resumeQueue(t.name):n.pauseQueue(t.name)},t.isPaused?a.createElement(a.Fragment,null,a.createElement(ge,null),"Resume"):a.createElement(a.Fragment,null,a.createElement(Ee,null),"Pause"))))},be=function(e){var t=e.queue,n=e.actions,r=(0,c.$B)().url;return a.createElement("div",{className:"BLTrf1"},b.map((function(e){var n=e===f,c=e.toLocaleUpperCase();return a.createElement(l.OL,{to:"".concat(r).concat(n?"":"?status=".concat(e)),activeClassName:"sisXR_",isActive:function(t,a){var r=a.search,l=new URLSearchParams(r);return l.get("status")===e||n&&null===l.get("status")},key:"".concat(t.name,"-").concat(e)},a.createElement("span",{title:c},c),t.counts[e]>0&&a.createElement("span",{className:"OojyH0"},t.counts[e]))})),!t.readOnlyMode&&a.createElement("div",null,a.createElement(ye,{queue:t,actions:n})))};var we=n(7492),ke=n.n(we);const Ce={pagination:"MQi06k",isActive:"ZLigFy",disabled:"_LJRJH"};var xe=function(){return a.createElement("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 512"},a.createElement("path",{d:"M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"}))},Ne=function(){return a.createElement("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 512"},a.createElement("path",{d:"M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"}))};var Re=function(e){(0,I.Z)(l,e);var t,n,r=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,J.Z)(t);if(n){var r=(0,J.Z)(this).constructor;e=Reflect.construct(a,arguments,r)}else e=a.apply(this,arguments);return(0,U.Z)(this,e)});function l(e){var t;return(0,B.Z)(this,l),(t=r.call(this,e)).hrefBuilder=t.hrefBuilder.bind((0,F.Z)(t)),t.handlePageChange=t.handlePageChange.bind((0,F.Z)(t)),t}return(0,M.Z)(l,[{key:"render",value:function(){var e=this.props.pageCount;if(e<=1)return null;var t=this.props.location.search,n=new URLSearchParams(t),r=(Number(n.get("page"))||1)-1;return a.createElement(ke(),{forcePage:r,previousLabel:a.createElement(xe,null),nextLabel:a.createElement(Ne,null),breakLabel:"...",breakClassName:Ce.breakMe,pageCount:e,marginPagesDisplayed:2,pageRangeDisplayed:3,onPageChange:this.handlePageChange,containerClassName:Ce.pagination,activeClassName:Ce.isActive,disabledClassName:Ce.disabled,hrefBuilder:this.hrefBuilder})}},{key:"handlePageChange",value:function(e){var t=e.selected,n=this.props,a=n.location,r=a.search,l=a.pathname,c=n.history,o=new URLSearchParams(r);t>0?o.set("page","".concat(t+1)):o.delete("page"),o.sort(),c.push({pathname:l,search:o.toString()})}},{key:"hrefBuilder",value:function(e){var t=this.props.location.search,n=new URLSearchParams(t);return e>0&&(n.set("page","".concat(e)),n.sort()),n.toString()}}]),l}(a.PureComponent),Oe=(0,c.EN)(Re);const Pe="CXpuez";var je=function(e){var t=e/1e3,n=Math.floor(t/3600),a=Math.floor((t-3600*n)/60),r=Math.floor(t-3600*n-60*a);return"".concat(n,"h ").concat(a,"m ").concat(r,"s")},Ze=function(e){var t=e.queue;if(!t)return a.createElement("section",null,"Queue Not found");var n=t.stats,r=n.waitTime,l=n.processingTime,c=t.workerCount||1;return r&&l?a.createElement("section",{className:"Ab8fhz"},a.createElement("div",{className:Pe},a.createElement("h3",null,"Wait Time"),a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("td",null,"P95"),a.createElement("td",null,"P50"),a.createElement("td",null,"P05"),a.createElement("td",null,"AVG"))),a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",null,je(r.p95)),a.createElement("td",null,je(r.p50)),a.createElement("td",null,je(r.p05)),a.createElement("td",null,je(r.avg)))))),a.createElement("div",{className:Pe},a.createElement("h3",null,"Backlog"),a.createElement("table",{style:{width:"110px"}},a.createElement("thead",null,a.createElement("tr",null,a.createElement("td",null,"@",c," Worker",c>1?"s":""))),a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",null,t.counts.waiting?(0,le.Z)(t.counts.waiting*l.avg/c,0):"-"))))),a.createElement("div",{className:Pe},a.createElement("h3",null,"Processing Time"),a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("td",null,"P95"),a.createElement("td",null,"P50"),a.createElement("td",null,"P05"),a.createElement("td",null,"AVG"))),a.createElement("tbody",null,a.createElement("tr",null,a.createElement("td",null,je(l.p95)),a.createElement("td",null,je(l.p50)),a.createElement("td",null,je(l.p05)),a.createElement("td",null,je(l.avg))))))):null},Ae=function(e){var t=e.selectedStatus,n=e.actions,r=e.queue;return r?a.createElement("section",null,a.createElement(Ze,{queue:r}),a.createElement("div",{className:"nE8ME3"},a.createElement(be,{queue:r,actions:n}),a.createElement("div",{className:"c_JoYF"},a.createElement("div",null,r.jobs.length>0&&!r.readOnlyMode&&a.createElement(fe,{queue:r,actions:n,status:t[r.name],allowRetries:r.allowRetries})),a.createElement(Oe,{pageCount:r.pagination.pageCount}))),r.jobs.map((function(e){return a.createElement(ie,{key:e.id,job:e,status:t[r.name],actions:{cleanJob:n.cleanJob(null==r?void 0:r.name)(e),promoteJob:n.promoteJob(null==r?void 0:r.name)(e),retryJob:n.retryJob(null==r?void 0:r.name)(e),getJobLogs:n.getJobLogs(null==r?void 0:r.name)(e)},readOnlyMode:null==r?void 0:r.readOnlyMode,allowRetries:null==r?void 0:r.allowRetries})}))):a.createElement("section",null,"Queue Not found")},Le=n(7826),qe=n.n(Le);var Se=function(){return a.createElement("svg",{width:42,role:"img",viewBox:"0 0 24 24"},a.createElement("path",{fill:"#CBD5E0",d:"M23.99314 6.28305c.012-.244-.307-.458-.949-.694-1.248-.457-7.843-3.082-9.106-3.545-1.263-.462-1.777-.443-3.261.089-1.484.533-8.506 3.287-9.755 3.776-.625.246-.931.473-.92.715v2.426c0 .242.334.498.97.802 1.272.608 8.332 3.461 9.448 3.994 1.116.533 1.9.54 3.313-.196 1.412-.736 8.047-3.465 9.328-4.132.651-.34.939-.604.939-.843 0-.225.001-2.392.001-2.392h-.008zm-15.399 2.296l5.561-.854-1.68 2.463-3.881-1.609zm12.299-2.218l-3.288 1.299-.357.14-3.287-1.299 3.642-1.44 3.29 1.3zm-9.655-2.383l-.538-.992 1.678.656 1.582-.518-.428 1.025 1.612.604-2.079.216-.466 1.12-.752-1.249-2.401-.216 1.792-.646zm-4.143 1.399c1.642 0 2.972.516 2.972 1.152 0 .636-1.331 1.152-2.972 1.152s-2.973-.517-2.973-1.152c0-.636 1.331-1.152 2.973-1.152z"}),a.createElement("path",{fill:"#E2E8F0",d:"M23.99314 10.38505c-.011.229-.313.484-.934.809-1.281.667-7.916 3.396-9.328 4.132-1.413.736-2.197.729-3.313.196-1.116-.533-8.176-3.386-9.448-3.994-.635-.303-.959-.56-.97-.801v2.426c0 .242.334.498.97.802 1.272.608 8.332 3.46 9.448 3.993 1.116.534 1.9.541 3.313-.195 1.412-.736 8.047-3.465 9.328-4.132.651-.34.939-.604.939-.843 0-.226.001-2.392.001-2.392-.001-.001-.004 0-.006-.001z"}),a.createElement("path",{fill:"#EDF2F7",d:"M23.99414 14.34005c-.01.229-.313.485-.935.81-1.281.667-7.916 3.396-9.328 4.132-1.413.736-2.197.729-3.313.195-1.116-.533-8.176-3.386-9.448-3.993-.635-.304-.959-.56-.97-.802v2.426c0 .242.334.499.97.803 1.272.608 8.333 3.46 9.448 3.993 1.116.534 1.9.541 3.313-.196 1.412-.736 8.047-3.464 9.328-4.132.651-.339.939-.603.939-.842 0-.226.001-2.392.001-2.392-.001-.001-.004-.001-.005-.002z"}))},_e=function(e){var t=e.stats,n=t.redis_version,r=t.used_memory,l=t.total_system_memory,c=t.mem_fragmentation_ratio,o=t.connected_clients,u=t.blocked_clients;return a.createElement("div",{className:"okCqHD"},a.createElement("div",null,a.createElement(Se,null)),a.createElement("div",null,"Version",a.createElement("span",null,n)),a.createElement("div",null,"Memory usage",a.createElement("span",null,function(e,t){if(void 0===e)return"-";var n=parseInt(e,10);if(void 0===t)return qe()(n);var a=parseInt(t,10);return"".concat((n/a*100).toFixed(2),"%")}(r,l)),l&&r?a.createElement("small",null,qe()(parseInt(r))," of ",qe()(parseInt(l))):a.createElement("small",{className:"error"},"Could not retrieve memory stats")),a.createElement("div",null,"Fragmentation ratio",a.createElement("span",null,c)),a.createElement("div",null,"Connected clients",a.createElement("span",null,o)),a.createElement("div",null,"Blocked clients",a.createElement("span",null,u)))},Be=n(9814);var Me,Fe=function(e){return a.createElement(Be.fC,{open:e.open,onOpenChange:function(t){t||e.onCancel()}},a.createElement(Be.h_,null,a.createElement(Be.aV,{className:"c_vKqt"}),a.createElement(Be.VY,{className:"bmCu5n"},a.createElement("div",{className:"inL8kX"},!!e.title&&a.createElement(Be.Dx,{asChild:!0},a.createElement("h3",null,e.title)),!!e.description&&a.createElement(Be.dk,null,e.description),a.createElement("div",{className:"k0LtaB"},a.createElement(Be.aU,{asChild:!0},a.createElement(_,{theme:"primary",onClick:e.onConfirm},"Confirm")),a.createElement(Be.$j,{asChild:!0},a.createElement(_,{theme:"basic",onClick:e.onCancel},"Cancel")))))))},Ie=function(e){var t,n,r,l,i,f,v=e.api;f=(0,c.TH)().key,(0,a.useEffect)((function(){window.scrollTo(0,0)}),[f]);var h=function(e){var t,n,r,l=(t=(0,c.TH)().search,new URLSearchParams(t)),o=(n=(0,c.TH)().pathname,r=(0,c.LX)(n,{path:"/queue/:name",exact:!0,strict:!0}),decodeURIComponent((null==r?void 0:r.params.name)||"")||void 0),i=(0,a.useState)({data:null,loading:!0}),f=(0,s.Z)(i,2),v=f[0],h=f[1],E=function(){var e=(0,a.useState)(null),t=(0,s.Z)(e,2),n=t[0],r=t[1];return{confirmProps:{open:!(null==n||!n.promise),title:(null==n?void 0:n.opts.title)||"Are you sure?",description:(null==n?void 0:n.opts.description)||"",onCancel:function(){var e;r({opts:{title:null==n?void 0:n.opts.title,description:null==n?void 0:n.opts.description},promise:null}),null==n||null===(e=n.promise)||void 0===e||e.reject()},onConfirm:function(){var e;r({opts:{title:null==n?void 0:n.opts.title,description:null==n?void 0:n.opts.description},promise:null}),null==n||null===(e=n.promise)||void 0===e||e.resolve(void 0)}},openConfirm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,n){r({promise:{resolve:t,reject:n},opts:e})}))}}}(),g=E.confirmProps,y=E.openConfirm,w=function(){var e=(0,c.TH)(),t=e.search,n=e.pathname,r=(0,c.$B)({path:"/queue/:name"}),l=(0,a.useState)({}),o=(0,s.Z)(l,2),u=o[0],i=o[1];return(0,a.useEffect)((function(){var e=new URLSearchParams(t).get("status")||b[0],n=r?decodeURIComponent(null==r?void 0:r.params.name):"";n&&i(k(k({},u),{},(0,p.Z)({},n,e)))}),[t,n]),u}(),C=function(){return e.getQueues({activeQueue:o,status:o?w[o]:void 0,page:l.get("page")||"1"}).then((function(e){h({data:e,loading:!1})})).catch((function(e){return console.error("Failed to poll",e)}))};function x(e,t){return(0,u.Z)(m().mark((function n(){return m().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,y({description:t});case 3:return n.next=5,e();case 5:return n.next=7,C();case 7:n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),n.t0&&console.error(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))}return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=(0,a.useRef)(e);(0,a.useLayoutEffect)((function(){r.current=e}),[e]),(0,a.useEffect)((function(){if(null!==t){r.current();var e=!0,n=setInterval((0,u.Z)(m().mark((function t(){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:return e=!1,t.prev=3,t.next=6,r.current();case 6:return t.prev=6,e=!0,t.finish(6);case 9:case"end":return t.stop()}}),t,null,[[3,,6,9]])}))),t);return function(){clearInterval(n)}}}),[t].concat((0,d.Z)(n)))}(C,5e3,[w]),{state:v,actions:{promoteJob:function(t){return function(n){return x((function(){return e.promoteJob(t,n.id)}),"Are you sure that you want to promote this job?")}},retryJob:function(t){return function(n){return x((function(){return e.retryJob(t,n.id)}),"Are you sure that you want to retry this job?")}},retryAll:function(t){return x((function(){return e.retryAll(t)}),"Are you sure that you want to retry all jobs?")},cleanJob:function(t){return function(n){return x((function(){return e.cleanJob(t,n.id)}),"Are you sure that you want to clean this job?")}},cleanAllDelayed:function(t){return x((function(){return e.cleanAllDelayed(t)}),"Are you sure that you want to clean all delayed jobs?")},cleanAllFailed:function(t){return x((function(){return e.cleanAllFailed(t)}),"Are you sure that you want to clean all failed jobs?")},cleanAllCompleted:function(t){return x((function(){return e.cleanAllCompleted(t)}),"Are you sure that you want to clean all completed jobs?")},getJobLogs:function(t){return function(n){return function(){return e.getJobLogs(t,n.id)}}},pauseQueue:function(t){return x((function(){return e.pauseQueue(t)}),"Are you sure that you want to pause queue processing?")},resumeQueue:function(t){return x((function(){return e.resumeQueue(t)}),"Are you sure that you want to resume queue processing?")}},confirmProps:g,selectedStatuses:w}}(v),E=h.state,g=h.actions,y=h.selectedStatuses,w=h.confirmProps;return a.createElement(a.Fragment,null,a.createElement(C,null,(null===(t=E.data)||void 0===t?void 0:t.stats)&&a.createElement(_e,{stats:null===(n=E.data)||void 0===n?void 0:n.stats})),a.createElement("main",null,a.createElement("div",null,E.loading?"Loading...":a.createElement(a.Fragment,null,a.createElement(c.rs,null,a.createElement(c.AW,{path:"/queue/:name",render:function(e){var t,n=e.match.params,r=decodeURIComponent(n.name),l=null===(t=E.data)||void 0===t?void 0:t.queues.find((function(e){return e.name===r}));return a.createElement(Ae,{queue:l,actions:g,selectedStatus:y})}}),a.createElement(c.AW,{path:"/",exact:!0},!!E.data&&Array.isArray(null===(r=E.data)||void 0===r?void 0:r.queues)&&E.data.queues.length>0&&a.createElement(c.l_,{to:"/queue/".concat(encodeURIComponent(null===(l=E.data)||void 0===l?void 0:l.queues[0].name))}))),a.createElement(Fe,w)))),a.createElement(j,{queues:null===(i=E.data)||void 0===i?void 0:i.queues,selectedStatuses:y}),a.createElement(o.Ix,null))},Ue=n(9644),Je=n.n(Ue),ze=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{basePath:""},n=t.basePath;(0,B.Z)(this,e),this.axios=Je().create({baseURL:"".concat(n,"/api")}),this.axios.interceptors.response.use(this.handleResponse,this.handleError)}var t;return(0,M.Z)(e,[{key:"getQueues",value:function(e){var t=e.activeQueue,n=e.status,a=e.page;return this.axios.get("/queues",{params:{activeQueue:t,status:n,page:a}})}},{key:"retryAll",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/retry"))}},{key:"cleanAllDelayed",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/clean/delayed"))}},{key:"cleanAllFailed",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/clean/failed"))}},{key:"cleanAllCompleted",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/clean/completed"))}},{key:"cleanJob",value:function(e,t){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/").concat(encodeURIComponent("".concat(t)),"/clean"))}},{key:"retryJob",value:function(e,t){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/").concat(encodeURIComponent("".concat(t)),"/retry"))}},{key:"promoteJob",value:function(e,t){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/").concat(encodeURIComponent("".concat(t)),"/promote"))}},{key:"getJobLogs",value:function(e,t){return this.axios.get("/queues/".concat(encodeURIComponent(e),"/").concat(encodeURIComponent("".concat(t)),"/logs"))}},{key:"pauseQueue",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/pause"))}},{key:"resumeQueue",value:function(e){return this.axios.put("/queues/".concat(encodeURIComponent(e),"/resume"))}},{key:"handleResponse",value:function(e){return e.data}},{key:"handleError",value:(t=(0,u.Z)(m().mark((function e(t){var n,a;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null!==(n=t.response.data)&&void 0!==n&&n.error&&o.Am.error(null===(a=t.response.data)||void 0===a?void 0:a.error,{autoClose:5e3}),e.abrupt("return",Promise.resolve(t.response.data));case 2:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})}]),e}(),De=window.__basePath__=(null===(Me=document.head.querySelector("base"))||void 0===Me?void 0:Me.getAttribute("href"))||"",He=new ze({basePath:De});(0,r.render)(a.createElement(l.VK,{basename:De},a.createElement(Ie,{api:He})),document.getElementById("root"))}},r={};function l(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return a[e].call(n.exports,n,n.exports,l),n.exports}l.m=a,e=[],l.O=(t,n,a,r)=>{if(!n){var c=1/0;for(i=0;i<e.length;i++){for(var[n,a,r]=e[i],o=!0,u=0;u<n.length;u++)(!1&r||c>=r)&&Object.keys(l.O).every((e=>l.O[e](n[u])))?n.splice(u--,1):(o=!1,r<c&&(c=r));if(o){e.splice(i--,1);var s=a();void 0!==s&&(t=s)}}return t}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[n,a,r]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var r=Object.create(null);l.r(r);var c={};t=t||[null,n({}),n([]),n(n)];for(var o=2&a&&e;"object"==typeof o&&!~t.indexOf(o);o=n(o))Object.getOwnPropertyNames(o).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,l.d(r,c),r},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={main:0};l.O.j=t=>0===e[t];var t=(t,n)=>{var a,r,[c,o,u]=n,s=0;if(c.some((t=>0!==e[t]))){for(a in o)l.o(o,a)&&(l.m[a]=o[a]);if(u)var i=u(l)}for(t&&t(n);s<c.length;s++)r=c[s],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(i)},n=self.webpackChunk_bull_board_ui=self.webpackChunk_bull_board_ui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var c=l.O(void 0,["vendor"],(()=>l(7182)));c=l.O(c)})();