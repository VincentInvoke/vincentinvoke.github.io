var radpack=function(){"use strict";var e=e=>e.load?e.load:e.load=e.url?new Promise((r,t)=>{e.resolve=r,e.reject=t;const s=document,n=s.createElement("script");n.crossOrigin="Anonymous",n.addEventListener("error",t),n.src=e.url,s.head.appendChild(n)}):Promise.resolve(),r=e=>{const[r,t=0,s=0,n=""]=e,o=`${r}.${t}.${s}${n}`;return{major:r,minor:t,patch:s,release:n,version:o,array:e,short:n?o:e.join("."),tilde:`~${e.slice(0,2).join(".")}`,caret:`^${r}`}},t=({major:e,minor:r,patch:t,release:s})=>{if(s)return[e,r,t,s];const n=[e];return t?(n.push(r),n.push(t)):r&&n.push(r),n};const s=/^([~^]|)(\d+)(?:\.(\d+))?(?:\.(\d+))?([^+]+|)/;var n=({exp:e,tmp:n},o)=>{let i=e.get(o);if(!i){const{id:a,name:c,path:l,version:d}=((e,r)=>{const t="$e:"+e;let s=r&&r.get(t);if(!s){const n=e.split("/"),o=n[0].startsWith("@")?n.shift()+"/":"",[i,a]=(n.shift()||"").split("@"),c=o+i,l=n.join("/")||"index",d="index"===l?"":`/${l}`;s={id:c+d,version:a,name:c,entry:l,path:d},r&&r.set(t,s)}return s})(o,n);if(d)try{let h=[];const{prefix:u,release:f,short:p,tilde:v,caret:m}=((e,n)=>{const o="$v:"+e;let i=n&&n.get(o);if(!i){const[,a,c,l=0,d=0,h]=e.match(s);i={prefix:a,...r(t({major:+c,minor:+l,patch:+d,release:h}))},n&&n.set(o,i)}return i})(d,n),g=e=>`${c}@${e}${l}`,$=g(p);if(f)h=[$];else{const e=g(v),r=g(m);u?"~"===u?h=[e,$,r,a]:"^"===u&&(h=[r,e,$,a]):h=[$,e,r,a]}let y;for(y of h)if(i=e.get(y))break;i&&console.warn(`resolve called with '${o}', change to '${y}'`)}catch{}else i=e.get(a),i&&console.warn(`resolve called with '${o}', change to '${a}'`)}return i},o=({cache:e},r,t=!0)=>{const{id:s,url:n}=r,o=n||s;let i=e.get(o);return t&&!i&&(i={url:n},e.set(o,i)),i};function i(e,r){if(Array.isArray(r))return Promise.all(r.map(r=>i(e,r)));const t=n(e,r);if(!t)return Promise.reject(new Error(`Unable to resolve ${r}`));const s=o(e,t);return(s.load?s.load:e.loader(e,t,s)).then(()=>s.result||{})}var a=(e,r)=>{const t=n(e,r);if(!t)throw new Error(`Unknown export ${r}`);return(o(e,t,!1)||{}).result},c=(e,r,t)=>{const s=n(e,r);if(!s)throw new Error(`Unknown export ${r}`);const i=o(e,s);i.result=t,i.load||(i.load=Promise.resolve())};function l(e,r=[],t,s){const n={},o=this(r.filter(e=>"require"!==e&&"exports"!==e&&"radpack"!==e));t&&o.then(()=>{t(...r.map(e=>{switch(e){case"require":return this.require;case"exports":return n;case"radpack":return this;default:return this.static(e)}}))}),s&&o.catch(s)}function d(e,r,t=[],s,i){const a=n(e,r);if(!a)return void(i&&i(new Error(`Unable to resolve ${r}`)));const c=o(e,a,!1)||{},l=e.define=Promise.all([e.define,new Promise((e,n)=>{this.require(["exports"].concat(t),(t,...n)=>{s&&s(...n),this.set(r,t),e(),c.resolve&&c.resolve()},e=>{i&&i(e),n(e),c.reject&&c.reject(e)})})]).then(()=>{l===e.define&&(e.define=Promise.resolve())})}const h=({fetch:e,loader:r,register:t,hydrate:s,dehydrate:n,exp:o=new Map,cache:u=new Map,tmp:f=new Map,registers:p=[]})=>{const v={fetch:e,loader:r,exp:o,cache:u,tmp:f,registers:p,register:Promise.resolve(),define:Promise.resolve()},m=e=>m.register().then(()=>i(v,e));return v.loader=r.bind(m),m.create=o=>h({fetch:e,loader:r,register:t,hydrate:s,dehydrate:n,...o}),m.clone=()=>m.register().then(()=>m.create({exp:new Map(o),cache:new Map(u),tmp:new Map(f),registers:[...p]})),m.register=t.bind(m,v),m.hydrate=s&&s.bind(m,v),m.dehydrate=n&&(e=>m.register().then(()=>n.call(m,v,e))),m.require=l.bind(m,v),m.define=d.bind(m,v),m.static=a.bind(m,v),m.set=c.bind(m,v),m};const u=/\${\s*(\w+)\s*}/g;var f=(e,r)=>"index"===r?e:`${e}/${r}`,p={url:"${baseUrl}/${file}"},v=(e,{resolveEntry:r,resolveVersion:t})=>Object.keys(e.exports).reduce((s,n)=>{const o=e.exports[n],i=o.v.map(e=>t(e)),a=o.d.slice(0),c=a.findIndex(e=>!Array.isArray(e)),l=a.slice(0,~c?c:void 0),d={vars:{...p,...e.vars},name:n};return l.forEach(([e],t)=>{a[t]=r(e,d)}),l.forEach(([e,r])=>{const t=((e,r,{name:t,vars:s})=>({id:f(t,e),vars:s,name:t,entry:e,versions:r}))(e,r.reduce((e,{v:r,u:t=null,f:s=null,s:n=[],d:o=[]})=>{const c=n.map(e=>a[e]),l=o.map(e=>a[e]);return[].concat(r).forEach(r=>{e.push(((e,{version:r})=>({version:r,statics:[],dynamics:[],...e}))({url:t,file:s,statics:c,dynamics:l},{version:i[r]}))}),e},[]),d);s.push(t)}),s},[]);const m=(e,{name:r})=>f(r,e),g=e=>{const{version:t,release:s,short:n,caret:o,tilde:i}=r(e);return{version:t,versions:s?[n]:[n,o,i]}};var $=(e,r)=>{if(!r||!r.exports)return;const{register:t=!0}=r;"_index"in r&&(e.registers[r._index]=r),(({exp:e,cache:r},t)=>{const s={};Object.keys(t).forEach(r=>{const n=e.get(r);!n||n.url in s||(s[n.url]=!0);const o=t[r];s[o.url]=!1,e.set(r,o)}),Object.keys(s).forEach(e=>{s[e]&&r.delete(e)})})(e,v(r,{resolveEntry:m,resolveVersion:g}).reduce((e,{vars:r,name:s,entry:n,versions:o})=>{const i={...r,name:s,entry:n},a=f("",n);return o.forEach(n=>{const{version:o,file:c}=n;let l=n.url||c&&r.url;l=!!l&&((e,r={})=>e.replace(u,(e,t)=>r[t]||""))(l,{...i,file:c});const d={url:l,data:n,internal:!t};let h=!1;c&&(h=!0,e[d.id=`${s}/${c}`]=d),[s+a].concat(o.versions.map(e=>`${s}@${e}${a}`)).forEach(r=>{r in e||(e[r]=h?d:{id:r,...d})})}),e},{}))};const y=["register","_index"],w=["vars","exports"];var x="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")();const b=h({fetch:x.fetch,loader:(r,t,s)=>{const{data:{statics:n=[]}}=t;return Promise.all([e(s),i(r,n)])},register:(e,r)=>{if((r=[].concat(r||[])).length){const t=Promise.all(r.map(r=>{const t="string"==typeof r?{url:r}:r,{url:s}=t;if(s){const r=s.slice(0,s.lastIndexOf("/"));return((e,r,t=!1)=>{const{fetch:s}=e,n=o(e,{url:r}),i=t?"json":"text";return n.fetch?n.fetch:n.fetch=s(r).then(e=>{if(!e.ok)throw new Error(`${r} returned ${e.status}`);return e[i]()}).then(e=>n[i]=e)})(e,s,!0).then(e=>((e,r)=>[].concat(r).map(r=>(e=e||{},r=r||{},y.forEach(t=>{r[t]=null!=e[t]?e[t]:r[t]}),w.forEach(t=>{r[t]=Object.assign(r[t]||{},e[t])}),r)))(t,e).map(e=>(e.vars.baseUrl=e.vars.baseUrl||r,e))).catch(e=>(console.error("radpack.register.error:",e.message),!1))}return Promise.resolve(t).then(e=>[].concat(e))}));e.register=e.register.then(()=>Promise.all([t,Promise.all(Array.from(e.cache.values()).map(e=>e.load))]).then(([r])=>{r.forEach(r=>[].concat(r||[]).forEach(r=>$(e,r)))}))}const t=e.register;return Promise.resolve(t).then(()=>{e.register===t&&(e.register=Promise.resolve())})},hydrate:function(e,r){return this.register(r||[])}});return x.define=b.define,b}();