import{S as V,i as G,s as N,e as h,c as v,b as w,f as u,j as b,n as I,q as j,a as q,G as A,u as B,g as O,h as f,E as S,k as g,v as C,l as R,y as $,w as k,x as U,z as M,A as F}from"./chunks/index.29ab6861.js";import{I as H,A as J}from"./chunks/AiOutlineSearch.a6016418.js";/* empty css                                                          */function K(r){let e;return{c(){e=h("div")},l(s){e=v(s,"DIV",{}),w(e).forEach(u)},m(s,t){b(s,e,t)},p:I,i:I,o:I,d(s){s&&u(e)}}}function L(r,e,s){let{item:t}=e;return r.$$set=n=>{"item"in n&&s(0,t=n.item)},[t]}class P extends V{constructor(e){super(),G(this,e,L,K,N,{item:0})}}function T(r){let e,s;return e=new P({props:{item:r[0]}}),{c(){j(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){C(e,t,n),s=!0},p(t,n){const c={};n&1&&(c.item=t[0]),e.$set(c)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){k(e.$$.fragment,t),s=!1},d(t){M(e,t)}}}function Q(r){let e,s,t,n,c,o,_,m,d,p,y,E;n=new H({props:{src:J}});let i=r[1]&&T(r);return{c(){e=h("div"),s=h("div"),t=h("button"),j(n.$$.fragment),c=q(),o=h("img"),m=q(),i&&i.c(),d=A(),this.h()},l(a){e=v(a,"DIV",{class:!0});var l=w(e);s=v(l,"DIV",{class:!0});var z=w(s);t=v(z,"BUTTON",{class:!0});var D=w(t);B(n.$$.fragment,D),D.forEach(u),z.forEach(u),c=O(l),o=v(l,"IMG",{src:!0,alt:!0,class:!0}),l.forEach(u),m=O(a),i&&i.l(a),d=A(),this.h()},h(){f(t,"class","svelte-5wa71z"),f(s,"class","show-details svelte-5wa71z"),S(o.src,_=r[3])||f(o,"src",_),f(o,"alt",r[2]),f(o,"class","svelte-5wa71z"),f(e,"class","image-wrapper svelte-5wa71z")},m(a,l){b(a,e,l),g(e,s),g(s,t),C(n,t,null),g(e,c),g(e,o),b(a,m,l),i&&i.m(a,l),b(a,d,l),p=!0,y||(E=R(t,"click",r[4]),y=!0)},p(a,[l]){(!p||l&8&&!S(o.src,_=a[3]))&&f(o,"src",_),(!p||l&4)&&f(o,"alt",a[2]),a[1]?i?(i.p(a,l),l&2&&$(i,1)):(i=T(a),i.c(),$(i,1),i.m(d.parentNode,d)):i&&(F(),k(i,1,1,()=>{i=null}),U())},i(a){p||($(n.$$.fragment,a),$(i),p=!0)},o(a){k(n.$$.fragment,a),k(i),p=!1},d(a){a&&u(e),M(n),a&&u(m),i&&i.d(a),a&&u(d),y=!1,E()}}}function W(r,e,s){let t,n,{item:c}=e,o=!1;const _=()=>s(1,o=!0);return r.$$set=m=>{"item"in m&&s(0,c=m.item)},r.$$.update=()=>{r.$$.dirty&1&&s(3,t=c.image_url),r.$$.dirty&1&&s(2,n=c.title||`Thumbnail ${c.id}`)},[c,o,n,t,_]}class x extends V{constructor(e){super(),G(this,e,W,Q,N,{item:0})}}export{x as default};
