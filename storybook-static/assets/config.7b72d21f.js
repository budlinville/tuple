import{w as S,k}from"./iframe.1aab9048.js";import{r as p}from"./index.b461da8a.js";import{r as v,R as x}from"./index.851a5b3f.js";import{j as l}from"./jsx-runtime.3c5536b9.js";function d(t){return d=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(t)}function M(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function D(t,e,r){return e&&E(t.prototype,e),r&&E(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function T(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}function w(t,e){return w=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},w(t,e)}function A(t){var e=F();return function(){var n=m(t),o;if(e){var u=m(this).constructor;o=Reflect.construct(n,arguments,u)}else o=n.apply(this,arguments);return j(this,o)}}function j(t,e){if(e&&(d(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return N(t)}function N(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function F(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},m(t)}function O(t,e,r,n,o,u,a){try{var i=t[u](a),c=i.value}catch(s){r(s);return}i.done?e(c):Promise.resolve(c).then(n,o)}function R(t){return function(){var e=this,r=arguments;return new Promise(function(n,o){var u=t.apply(e,r);function a(c){O(u,n,o,a,i,"next",c)}function i(c){O(u,n,o,a,i,"throw",c)}a(void 0)})}}var f=S.FRAMEWORK_OPTIONS,y=new Map,H=function(e,r){var n=r.id,o=r.component;if(!o)throw new Error("Unable to render story ".concat(n," as the component annotation is missing from the default export"));return l(o,{...e})},W=function(e){var r=e.callback,n=e.children,o=p.exports.useRef();return p.exports.useLayoutEffect(function(){o.current!==r&&(o.current=r,r())},[r]),n},C=function(){var t=R(regeneratorRuntime.mark(function e(r,n){var o;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,$(n);case 2:return o=a.sent,a.abrupt("return",new Promise(function(i){o?o.render(l(W,{callback:function(){return i(null)},children:r})):x.render(r,n,function(){return i(null)})}));case 4:case"end":return a.stop()}},e)}));return function(r,n){return t.apply(this,arguments)}}(),I=v.exports.version&&(v.exports.version.startsWith("18")||v.exports.version.startsWith("0.0.0")),B=(f==null?void 0:f.legacyRootApi)!==!0,P=B&&I,U=function(e){var r=y.get(e);r&&P?(r.unmount(),y.delete(e)):x.unmountComponentAtNode(e)},$=function(){var t=R(regeneratorRuntime.mark(function e(r){var n,o;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(P){a.next=2;break}return a.abrupt("return",null);case 2:if(n=y.get(r),n){a.next=9;break}return a.next=6,k(()=>import("./client.56d276a1.js").then(function(i){return i.c}),["assets/client.56d276a1.js","assets/index.851a5b3f.js","assets/index.b461da8a.js"]);case 6:o=a.sent.default,n=o.createRoot(r),y.set(r,n);case 9:return a.abrupt("return",n);case 10:case"end":return a.stop()}},e)}));return function(r){return t.apply(this,arguments)}}(),G=function(t){T(r,t);var e=A(r);function r(){var n;M(this,r);for(var o=arguments.length,u=new Array(o),a=0;a<o;a++)u[a]=arguments[a];return n=e.call.apply(e,[this].concat(u)),n.state={hasError:!1},n}return D(r,[{key:"componentDidMount",value:function(){var o=this.state.hasError,u=this.props.showMain;o||u()}},{key:"componentDidCatch",value:function(o){var u=this.props.showException;u(o)}},{key:"render",value:function(){var o=this.state.hasError,u=this.props.children;return o?null:u}}],[{key:"getDerivedStateFromError",value:function(){return{hasError:!0}}}]),r}(p.exports.Component),_=f!=null&&f.strictMode?p.exports.StrictMode:p.exports.Fragment;function J(t,e){return b.apply(this,arguments)}function b(){return b=R(regeneratorRuntime.mark(function t(e,r){var n,o,u,a,i,c,s,g;return regeneratorRuntime.wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return n=e.storyContext,o=e.unboundStoryFn,u=e.showMain,a=e.showException,i=e.forceRemount,c=o,s=l(G,{showMain:u,showException:a,children:l(c,{...n})}),g=_?l(_,{children:s}):s,i&&U(r),h.next=7,C(g,r);case 7:case"end":return h.stop()}},t)})),b.apply(this,arguments)}var Q={framework:"react"};export{Q as parameters,H as render,J as renderToDOM};
//# sourceMappingURL=config.7b72d21f.js.map
