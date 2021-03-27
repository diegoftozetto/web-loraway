(function(t){function e(e){for(var a,s,o=e[0],c=e[1],u=e[2],d=0,v=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&v.push(n[s][0]),n[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(v.length)v.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],a=!0,o=1;o<r.length;o++){var c=r[o];0!==n[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},n={app:0},i=[];function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-app-bar",{attrs:{app:"",color:"secondary",dark:""}},[a("div",{staticClass:"d-flex align-center"},[a("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:r("cf05"),transition:"scale-transition",width:"40"}})],1),a("v-spacer"),a("v-btn",{attrs:{href:"",target:"_blank",text:""}},[a("span",{staticClass:"mr-2"},[t._v("LoRaWay")])])],1),a("v-main",{staticClass:"mt-4"},[a("router-view")],1)],1)},i=[],s={name:"App",components:{},data:function(){return{}}},o=s,c=r("2877"),u=r("6544"),l=r.n(u),d=r("7496"),v=r("40dc"),p=r("8336"),f=r("adda"),m=r("f6c4"),h=r("2fa4"),b=Object(c["a"])(o,n,i,!1,null,null,null),g=b.exports;l()(b,{VApp:d["a"],VAppBar:v["a"],VBtn:p["a"],VImg:f["a"],VMain:m["a"],VSpacer:h["a"]});var _=r("f309");a["a"].use(_["a"]);var y=new _["a"]({}),x=r("8c4f"),w=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.readings?r("div",[r("p",{staticClass:"mt-2 mb-4",attrs:{align:"center"}},[r("b",[t._v("Identificador do Dispositivo: "+t._s(t.$route.params.id))])]),t._l(t.readings,(function(e){return r("v-card",{key:e._id,staticClass:"mx-auto mb-4 ml-4 mr-4"},[r("v-list-item",{attrs:{"two-line":""}},[r("v-list-item-content",[r("v-list-item-subtitle",[r("v-alert",{staticClass:"mb-1",attrs:{dense:"",outlined:"",type:"info"}},[t._v("Identificador da Mensagem: "+t._s(e.messageId))])],1)],1)],1),r("v-card-text",[r("v-row",{attrs:{align:"center"}},[r("v-col",{attrs:{cols:"6"}},[r("b",{staticClass:"uppercase"},[t._v("Atributos:")]),r("div",t._l(e.attributes,(function(e,a){return r("ul",{key:a},[r("li",{staticClass:"uppercase"},[t._v(t._s(a)+": "+t._s(e))])])})),0)])],1)],1),r("v-divider"),r("v-card-actions",[r("v-btn",{attrs:{text:""}},[t._v(t._s(new Date(1e3*e.timestamp).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"})))])],1)],1)}))],2):r("div",[r("p",{staticClass:"display-1 mt-6",attrs:{align:"center"}},[t._v("Carregando...")])])])},C=[],V=r("1da1"),I=(r("96cf"),r("d3b7"),{name:"DeviceReadings",created:function(){this.request()},mounted:function(){var t=this;this.interval=setInterval((function(){t.request()}),3e3)},data:function(){return{readings:void 0,interval:void 0}},methods:{request:function(){var t=this;return Object(V["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0!==t.$route.params.id){e.next=4;break}clearInterval(t.interval),e.next=11;break;case 4:return e.next=6,fetch("http://api-loraway.herokuapp.com/readings/"+t.$route.params.id);case 6:return r=e.sent,e.next=9,r.json();case 9:a=e.sent,t.readings=a;case 11:case"end":return e.stop()}}),e)})))()}}}),j=I,k=(r("eb11"),r("0798")),O=r("b0af"),L=r("99d9"),S=r("62ad"),A=r("ce7e"),P=r("da13"),R=r("5d23"),M=r("0fd9"),$=Object(c["a"])(j,w,C,!1,null,"3ca5b2dd",null),q=$.exports;l()($,{VAlert:k["a"],VBtn:p["a"],VCard:O["a"],VCardActions:L["a"],VCardText:L["b"],VCol:S["a"],VDivider:A["a"],VListItem:P["a"],VListItemContent:R["a"],VListItemSubtitle:R["b"],VRow:M["a"]});var D=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.deviceIds?r("div",t._l(t.deviceIds,(function(e){return r("v-card",{key:e,staticClass:"mx-auto mb-4 ml-4 mr-4"},[r("v-card-text",[r("p",{staticClass:"display-1 text--primary"},[t._v("Dispositivo "+t._s(e))]),r("div",[t._v("...")])]),r("v-card-actions",[r("v-btn",{attrs:{text:"",color:"teal accent-4",to:t.test(e)},on:{click:function(e){t.reveal=!0,t.clearInterval(this.interval)}}},[t._v("Visualizar Leituras")])],1)],1)})),1):r("div",[r("p",{staticClass:"display-1 mt-6",attrs:{align:"center"}},[t._v("Carregando...")])])])},T=[],B={name:"DeviceList",created:function(){this.request()},mounted:function(){console.log("HTML à disposição");var t=this;this.interval=setInterval((function(){t.request()}),2e4)},data:function(){return{deviceIds:void 0,interval:void 0}},methods:{request:function(){var t=this;return Object(V["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://api-loraway.herokuapp.com/devices");case 2:return r=e.sent,e.next=5,r.json();case 5:a=e.sent,t.deviceIds=a.deviceIds;case 7:case"end":return e.stop()}}),e)})))()},test:function(t){return clearInterval(this.interval),"/device/".concat(t,"/readings")}}},E=B,J=Object(c["a"])(E,D,T,!1,null,"3d1dd93a",null),z=J.exports;l()(J,{VBtn:p["a"],VCard:O["a"],VCardActions:L["a"],VCardText:L["b"]});var H=[{path:"/home",component:z},{path:"/device/:id/readings",component:q},{path:"",redirect:"/home"}];a["a"].use(x["a"]),a["a"].config.productionTip=!1;var W=new x["a"]({routes:H,mode:"history"});new a["a"]({vuetify:y,router:W,render:function(t){return t(g)}}).$mount("#app")},8500:function(t,e,r){},cf05:function(t,e,r){t.exports=r.p+"img/logo.68f34a0c.png"},eb11:function(t,e,r){"use strict";r("8500")}});
//# sourceMappingURL=app.6f77872b.js.map