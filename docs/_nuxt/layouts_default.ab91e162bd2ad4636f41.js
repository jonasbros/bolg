webpackJsonp([0],{"4M7Q":function(t,e,i){var s=i("t+mk");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("7f879aa9",s,!1,{sourceMap:!1})},"5Okt":function(t,e,i){"use strict";var s=i("Dd8w"),o=i.n(s),n=i("mtWM"),a=(i.n(n),i("NYxO")),r=i("oEaD"),l=i("jqdF");e.a={components:{navbar:r.a,loadingscreen:l.a},head:function(){return{title:"Bolg",meta:[{hid:"robots",name:"robots",content:"index, follow"},{hid:"og:site_name",name:"og:site_name",content:"Bolg"},{hid:"description",name:"description",content:"'Blog hosting website. Where speech is truly free. Kappa"},{hid:"keywords",name:"keywords",content:"bolg, blog, blog hosting, medium, medium alternative, jonas perez, jonasbros, jonas"},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"},{hid:"twitter:title",name:"twitter:title",content:"Bolg — Where speech is truly free."},{hid:"twitter:description",name:"twitter:description",content:"'Blog hosting website. Where speech is truly free. Kappa"},{hid:"twitter:image",name:"twitter:image",content:""},{hid:"fb:app_id",name:"fb:app_id",content:"571629196513066"},{hid:"og:url",name:"og:url",content:"https://jonasbros.github.io/bolg/"},{hid:"og:type",name:"og:type",content:"website"},{hid:"og:title",name:"og:title",content:"Bolg — Where speech is truly free."},{hid:"og:image",name:"og:image",content:""}]}},data:function(){return{config:this.$store.state.config}},computed:o()({},Object(a.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",socialAuth:"getSocialAuth",loadingScreen:"getLoadingScreen",fbResponse:"getFBResponse"})),watch:{isLoggedIn:function(t){t&&(this.$root.$emit("logindialog",!1),this.$root.$emit("signupdialog",!1))},socialAuth:function(t){},"fbResponse.status":function(t){"connected"==t&&this.$store.commit("FBSigninSuccess")}},created:function(){this.$store.commit("setLoadingScreen",!0)},mounted:function(){document.onreadystatechange=function(){"complete"==document.readyState&&this.$store.commit("setLoadingScreen",!1)}.bind(this),this.initFBSdk(),this.checkUserCookie(),document.querySelector(".bolg-application").addEventListener("click",function(t){this.closeIntellisense(t),this.closeUserActions()}.bind(this))},methods:{closeIntellisense:function(t){t.target.classList.contains("sbar-btn")||t.target!=document.querySelector("#sbarinput")&&this.$root.$emit("closeIntellisense",!1)},closeUserActions:function(){this.$root.$emit("closeUserActions",!1)},checkUserCookie:function(){var t=this.$cookie.get("ud");null!=t||""==t?this.$store.commit("setLogin",JSON.parse(t)):this.checkFBStatus()},checkFBStatus:function(){this.$store.commit("FBGetLoginStatus")},initFBSdk:function(){FB.init({appId:"571629196513066",cookie:!0,xfbml:!0,version:"v2.12"})}}}},FFPH:function(t,e,i){"use strict";var s=i("Wu8s"),o=i("Y/tC"),n=i("VU/8")(s.a,o.a,!1,null,null,null);n.options.__file="components\\SignupModal.vue",e.a=n.exports},HhAh:function(t,e){t.exports=function(t,e,i){var s,o,n,a,r;function l(){var c=Date.now()-a;c<e&&c>=0?s=setTimeout(l,e-c):(s=null,i||(r=t.apply(n,o),n=o=null))}null==e&&(e=100);var c=function(){n=this,o=arguments,a=Date.now();var c=i&&!s;return s||(s=setTimeout(l,e)),c&&(r=t.apply(n,o),n=o=null),r};return c.clear=function(){s&&(clearTimeout(s),s=null)},c.flush=function(){s&&(r=t.apply(n,o),n=o=null,clearTimeout(s),s=null)},c}},HjO6:function(t,e,i){"use strict";var s=i("qvjp"),o=i("TJlZ"),n=!1;var a=function(t){n||i("kI5c")},r=i("VU/8")(s.a,o.a,!1,a,"data-v-ff297eea",null);r.options.__file="components\\ProfileContents.vue",e.a=r.exports},KHMk:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-toolbar",{staticClass:"elevation-0",attrs:{fixed:"",color:"white"}},[i("router-link",{attrs:{to:"/"}},[i("v-toolbar-title",[i("img",{attrs:{src:"/bolg/b2.png",alt:"",width:"60"}})])],1),i("searchbar"),i("v-spacer"),i("div",{staticClass:"hidden-sm-and-down"},[i("router-link",{attrs:{to:{path:"/browse/all/newest"}}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                    browse\n                ")])],1),t.isLoggedIn?t._e():i("v-btn",{attrs:{flat:""},on:{click:function(e){e.stopPropagation(),t.logindialog=!t.logindialog}}},[t._v("login")]),t.isLoggedIn?t._e():i("v-btn",{attrs:{flat:""},on:{click:function(e){e.stopPropagation(),t.signupdialog=!t.signupdialog}}},[t._v("sign up")]),t.isLoggedIn?i("v-menu",{attrs:{"offset-y":"",left:""}},[i("v-btn",{attrs:{slot:"activator",icon:"",light:"",large:""},slot:"activator"},[i("div",{staticClass:"user-menu__picture",style:"background-image: url("+t.userData.display_picture+")"})]),i("v-list",[i("v-list-tile",[i("v-list-tile-title",[t._v("pee")])],1),i("v-list-tile",[i("v-list-tile-title",{on:{click:function(e){e.stopPropagation(),t.logout()}}},[t._v("logout")])],1)],1)],1):t._e()],1),i("v-toolbar-side-icon",{staticClass:"hidden-md-and-up",on:{click:function(e){e.stopPropagation(),t.smmenu=!t.smmenu}}})],1),i("v-navigation-drawer",{staticStyle:{"background-color":"white"},attrs:{temporary:"",fixed:"",right:""},model:{value:t.profile,callback:function(e){t.profile=e},expression:"profile"}},[i("profilecontents",{attrs:{userdata:t.userData}})],1),i("v-navigation-drawer",{staticStyle:{"background-color":"white"},attrs:{temporary:"",right:"",fixed:!0},model:{value:t.smmenu,callback:function(e){t.smmenu=e},expression:"smmenu"}},[i("v-list",{staticClass:"pt-0"},[i("v-list-tile",[i("v-list-tile-content",[i("router-link",{attrs:{to:"/browse/all/newest"}},[t._v("Browse")])],1)],1),t.isLoggedIn?i("v-list-tile",{on:{click:function(e){e.stopPropagation(),t.logout()}}},[i("v-list-tile-content",[i("v-list-tile-title",[t._v("Logout")])],1)],1):t._e(),t.isLoggedIn?t._e():i("v-list-tile",{on:{click:function(e){e.stopPropagation(),t.logindialog=!t.logindialog,t.smmenu=!1}}},[i("v-list-tile-content",[i("v-list-tile-title",[t._v("Login")])],1)],1),t.isLoggedIn?t._e():i("v-list-tile",{on:{click:function(e){e.stopPropagation(),t.signupdialog=!t.signupdialog,t.smmenu=!1}}},[i("v-list-tile-content",[i("v-list-tile-title",[t._v("Signup")])],1)],1)],1)],1),i("v-dialog",{attrs:{"max-width":"560"},model:{value:t.logindialog,callback:function(e){t.logindialog=e},expression:"logindialog"}},[i("v-card",{staticStyle:{"background-color":"white"}},[i("loginmodal")],1)],1),i("v-dialog",{attrs:{"max-width":"560"},model:{value:t.signupdialog,callback:function(e){t.signupdialog=e},expression:"signupdialog"}},[i("v-card",{staticStyle:{"background-color":"white"}},[i("signupmodal")],1)],1)],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},MQpK:function(t,e,i){"use strict";var s=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loader-container"},[e("v-progress-circular",{staticClass:"fullscreen-loader",attrs:{indeterminate:"",size:65,width:7,color:"teal"}})],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},Ma2J:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("5Okt"),o=i("STrE"),n=!1;var a=function(t){n||i("fsJZ")},r=i("VU/8")(s.a,o.a,!1,a,null,null);r.options.__file="layouts\\default.vue",e.default=r.exports},STrE:function(t,e,i){"use strict";var s=function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",{staticClass:"bolg-application"},[e("navbar"),e("nuxt"),e("loadingscreen",{directives:[{name:"show",rawName:"v-show",value:this.loadingScreen,expression:"loadingScreen"}]}),e("div",{staticClass:"text-xs-center mt-4"},[e("p",[this._v("bolg 2018 ©")])])],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},TJlZ:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("span",{staticClass:"bolg_ptool"},[t._v("*click on anything you want to edit")]),i("div",[i("router-link",{staticClass:"bolg_pp",style:"background-image: url("+t.userdata.display_picture+");",attrs:{to:"/profile/"+t.userdata.url}}),i("h2",[i("router-link",{attrs:{to:"/profile/"+t.userdata.url}},[t._v(t._s(t.userdata.name))])],1)],1),i("div",{staticClass:"text-xs-center mt-4"},[i("div",[i("v-btn",{attrs:{flat:"",outline:"",to:"/profile/"+t.userdata.url}},[t._v("\n                 Profile\n             ")])],1),i("div",[i("v-btn",{attrs:{flat:"",outline:"",to:"/new-post"}},[t._v("\n                 New post\n             ")])],1),i("div",[i("v-btn",{attrs:{flat:"",outline:"",to:"/profile/settings"}},[t._v("\n                 Settings\n             ")])],1),i("div",{staticClass:"follows"},[i("span",[t._v(t._s(t.userdata.followerCount)+" followers")]),i("span",[t._v("•")]),i("span",[t._v(t._s(t.userdata.followingCount)+" following")])])])])};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},WCrD:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"search-bar"},[i("v-text-field",{staticClass:"term",attrs:{"prepend-icon":"search",placeholder:"Search blog...",flat:"",color:"teal",id:"sbarinput",tabindex:"1"},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.$router.push("/search/"+t.term),t.intellisense=!1},focus:function(e){""!=t.term?t.intellisense=!0:t.intellisense=!1}},model:{value:t.term,callback:function(e){t.term=e},expression:"term"}}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.intellisense,expression:"intellisense"}],staticClass:"intellisense elevation-2"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],staticClass:"results"},[i("div",{staticClass:"posts"},[i("p",{staticClass:"sbar-head"},[t._v("Posts")]),t.posts.length<1?i("div",[i("span",[t._v("No results...")])]):t._e(),t._l(t.posts,function(e){return t.posts.length>0?i("router-link",{staticClass:"post",attrs:{to:"/post/"+e.title+"/"+e.id+"/",tag:"div"}},[i("p",{staticClass:"sbar-title"},[t._v(t._s(e.title))]),i("div",{staticClass:"sbar-result-foot"},[i("p",{staticClass:"sbar-author grey--text"},[t._v("by "+t._s(e.authorName))]),i("p",{staticClass:"sbar-created grey--text"},[t._v(t._s(t._f("DateDiffFilter")(e.created)))])])]):t._e()}),t.posts.length>=5?i("div",{staticClass:"text-xs-center mt-2"},[i("router-link",{staticClass:"teal--text text-xs-center",attrs:{to:"/search/"+t.term}},[t._v("\n                        More results...                       \n                    ")])],1):t._e()],2),i("div",{staticClass:"people"},[i("p",{staticClass:"sbar-head"},[t._v("People")]),t.people.length<1?i("div",[i("span",[t._v("No results...")])]):t._e(),t._l(t.people,function(e){return t.people.length>0?i("div",{staticClass:"person",on:{click:function(i){if(i.target!==i.currentTarget)return null;t.$router.push("/profile/"+e.url)}}},[i("div",{staticClass:"sbar-person__person",on:{click:function(i){t.$router.push("/profile/"+e.url)}}},[i("div",{staticClass:"sbar-dp",style:"background-image: url("+e.display_picture+")"}),i("p",{staticClass:"sbar-name"},[t._v(t._s(e.name))])]),e.isMe?t._e():i("div",{staticClass:"follow"},[i("v-btn",{attrs:{outline:"",color:"black",loading:t.loading,disabled:t.loading},on:{mousedown:function(i){t.follow(e)}}},[t._v("\n                        "+t._s(1==e.isFollowing?"Unfollow":"Follow")+"\n                        ")])],1)]):t._e()})],2)]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"sbar-loader"},[i("v-progress-circular",{attrs:{indeterminate:"",size:40,width:5,color:"teal"}})],1)])],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},Wu8s:function(t,e,i){"use strict";var s=i("mtWM"),o=i.n(s);e.a={watch:{ee:function(t){this.errors.email.length>0&&(this.errors.email=[])}},data:function(){var t=this;return{config:this.$store.state.config,loader:null,loading:!1,epv:!0,epav:!0,signupdialog:!1,valid:!0,ee:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)||"E-mail must be valid"}],ep:"",passwordRules:[function(t){return!!t||"Password is required"},function(t){return t.length>=8||"Password must be at least 8 characters"}],epa:"",passwordAgainRules:[function(t){return!!t||"Please confirm password"},function(t){return t.length>=8||"Password must be at least 8 characters"},function(e){return e===t.ep||"Passwords must match"}],errors:{email:[],password:[],passwordAgain:[]},isLoading:!1}},methods:{FBLogin:function(){this.$store.commit("FBLogin")},reset:function(){this.$refs.signupForm.reset()},close:function(){this.$root.$emit("signupdialog",!1)},signup:function(){var t={email:this.ee,password:this.ep,password_again:this.epa};if(this.errors={email:[],password:[],passwordAgain:[]},this.$refs.signupForm.validate()){this.loader="loading";var e=this.loader;this[e]=!this[e],o.a.post(this.config.api+"register.php",t,this.config.axiosHeader).then(function(t){this[e]=!1,this.loader=null,console.log(t),t.data.hasOwnProperty("error")||(this.close(),this.$store.commit("setLoadingScreen",!0),setTimeout(function(){this.login(t.data.uid)}.bind(this),750)),t.data.hasOwnProperty("email")&&this.errors.email.push(this.$options.filters.ucfirst(t.data.email))}.bind(this))}},login:function(t){var e={session:{session_id:t},remember:[]};console.log(e),this.$store.dispatch("userLogin",e)}}}},"Y/tC":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v("Sign up")])]),i("v-container",[i("v-card-text",[i("v-form",{ref:"signupForm",on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.signup()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Email",rules:t.emailRules,"error-messages":t.errors.email,required:"",color:"teal"},model:{value:t.ee,callback:function(e){t.ee=e},expression:"ee"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Password",hint:"At least 8 characters",min:"8",max:"32",maxlength:"32",counter:"32",rules:t.passwordRules,"append-icon":t.epv?"visibility":"visibility_off","append-icon-cb":function(){return t.epv=!t.epv},type:t.epv?"password":"text","error-messages":t.errors.password,required:"",color:"teal"},model:{value:t.ep,callback:function(e){t.ep=e},expression:"ep"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Confirm password",hint:"At least 8 characters",min:"8",max:"32",maxlength:"32",counter:"32",rules:t.passwordAgainRules,"append-icon":t.epav?"visibility":"visibility_off","append-icon-cb":function(){return t.epav=!t.epav},type:t.epav?"password":"text","error-messages":t.errors.passwordAgain,required:"",color:"teal"},model:{value:t.epa,callback:function(e){t.epa=e},expression:"epa"}})],1)],1),i("v-layout",[i("div",{staticClass:"fb-login-btn",on:{click:function(e){t.FBLogin()}}},[i("svg",{staticClass:"_1pbq",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",color:"#ffffff"}},[i("path",{attrs:{fill:"#ffffff","fill-rule":"evenodd",d:"M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1\n                      3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733\n                      1.667-1.667\n                      1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033\n                      0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467\n                      2.133v1.867H6v2.066h2V14z"}})]),i("span",[t._v("Login with Facebook")])])])],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{outline:"",flat:""},nativeOn:{click:function(e){return t.close(e)}}},[t._v("Close")]),i("v-btn",{attrs:{outline:"",flat:"",disabled:t.loading,loading:t.loading},nativeOn:{click:function(e){return t.signup(e)}}},[t._v("Signup")])],1)],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},Y41T:function(t,e,i){"use strict";var s=i("Dd8w"),o=i.n(s),n=i("NYxO"),a=i("HhAh"),r=i.n(a),l=i("mtWM"),c=i.n(l),u=i("e1SC");e.a={data:function(){return{config:this.$store.state.config,term:"",intellisense:!1,posts:[],people:[],isLoading:!1,loading:!1,loader:null}},computed:o()({},Object(n.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"})),watch:{term:r()(function(t){this.search(),""==t&&(this.intellisense=!1)},500),posts:function(){setTimeout(function(){Object(u.a)(".sbar-title",40)},150)}},created:function(){this.$root.$on("closeIntellisense",function(t){this.intellisense=!1}.bind(this))},methods:{addBtnClass:function(){setTimeout(function(){document.querySelectorAll(".people .follow .btn__content").forEach(function(t){t.className+=" sbar-btn"})},100)},follow:function(t){this.loader="loading";var e=this.loader;this[e]=!this[e];var i={follower_id:this.userID,following_id:t.user_id,follow:!t.isFollowing};c.a.post(this.config.api+"/follow.php",i,this.config.axiosHeader).then(function(i){i.data.success&&(t.isFollowing=!t.isFollowing,this[e]=!1,this.loader=null)}.bind(this)).catch(function(t){console.log(t)})},search:function(){if(""!=this.term){this.intellisense=!0,this.isLoading=!0;var t={term:this.term,people_cpage:1,posts_cpage:1,user_id:this.userID,limit:5};c.a.post(this.config.api+"search.php",t,this.config.axiosHeader).then(function(t){this.people=t.data.people.results,this.posts=t.data.posts.results,this.isLoading=!1,this.addBtnClass()}.bind(this)).catch(function(t){console.log(t)})}}}}},"a+fG":function(t,e,i){"use strict";var s=i("uFxh"),o=i("xx+w"),n=!1;var a=function(t){n||i("yrBt")},r=i("VU/8")(s.a,o.a,!1,a,"data-v-7f5ce3cc",null);r.options.__file="components\\LoginModal.vue",e.a=r.exports},e1SC:function(t,e,i){"use strict";e.a=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)throw Error("maxHeight is required");var s="string"==typeof t?document.querySelectorAll(t):t;if(s){var o=i.character||"…",n=i.classname||"js-shave",a=i.spaces||!0,r='<span class="js-shave-char">'+o+"</span>";"length"in s||(s=[s]);for(var l=0;l<s.length;l+=1){var c=s[l],u=c.style,d=c.querySelector("."+n),p=void 0===c.textContent?"innerText":"textContent";d&&(c.removeChild(c.querySelector(".js-shave-char")),c[p]=c[p]);var f=c[p],g=a?f:f.split(" ");if(!(g.length<2)){var h=u.height;u.height="auto";var v=u.maxHeight;if(u.maxHeight="none",c.offsetHeight<=e)u.height=h,u.maxHeight=v;else{for(var m=g.length-1,b=0,w=void 0;b<m;)w=b+m+1>>1,c[p]=a?g.slice(0,w):g.slice(0,w).join(" "),c.insertAdjacentHTML("beforeend",r),c.offsetHeight>e?m=a?w-2:w-1:b=w;c[p]=a?g.slice(0,m):g.slice(0,m).join(" "),c.insertAdjacentHTML("beforeend",r);var x=a?g.slice(m):g.slice(m).join(" ");c.insertAdjacentHTML("beforeend",'<span class="'+n+'" style="display:none;">'+x+"</span>"),u.height=h,u.maxHeight=v}}}}}},f0iQ:function(t,e,i){var s=i("jzuz");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("7b1c77ea",s,!1,{sourceMap:!1})},fsJZ:function(t,e,i){var s=i("z2+C");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("55c40999",s,!1,{sourceMap:!1})},hXqu:function(t,e,i){var s=i("mjsN");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("02e697d1",s,!1,{sourceMap:!1})},jqdF:function(t,e,i){"use strict";var s=i("MQpK"),o=!1;var n=function(t){o||i("4M7Q")},a=i("VU/8")(null,s.a,!1,n,null,null);a.options.__file="components\\LoadingScreen.vue",e.a=a.exports},jzuz:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"a{color:#000}.toolbar__content{padding:10px 55px 0}.btn__content{font-size:16px}.btn--router{color:#000}.container{min-height:0!important}.input-group--text-field.input-group--no-resize textarea{margin-bottom:10px}.fb-login-btn{cursor:pointer;padding:10px 15px;background-color:#4267b2;color:#fff;font-weight:700;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:2px}.fb-login-btn:hover{background-color:#3b578e}.fb-login-btn ._1pbq,.fb-login-btn span{vertical-align:middle}.fb-login-btn ._1pbq{margin-right:5px;height:26px;width:26px}.toolbar__title{margin:0}.toolbar__title img{-webkit-transform:translateY(15%);transform:translateY(15%)}.user-menu__picture{height:44px;width:44px;border-radius:69%;background-size:cover;background-position:50%}",""])},k5Kh:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"",""])},kI5c:function(t,e,i){var s=i("qhjk");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("17fa39a2",s,!1,{sourceMap:!1})},mjsN:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,".search-bar{position:relative;margin-left:50px;-webkit-transform:translate(5%,5%);transform:translate(5%,5%);width:25%;z-index:999}.intellisense{position:absolute;top:56px;background-color:#fff;min-height:80px;max-height:70vh;height:auto;width:100%;overflow-y:auto;overflow-x:hidden}.results{padding:20px;font-size:17.6px;font-size:1.1rem}.results .sbar-head{border-bottom:1px solid #000;margin:0}.results span{display:inline-block;padding:10px 0}.results .posts{margin-bottom:10px}.results .person,.results .post{padding:10px 0;margin:0;cursor:pointer}.results .person p,.results .post p{margin:0}.results .person .sbar-title,.results .post .sbar-title{margin-bottom:15px;font-weight:400}.results .person .sbar-title span,.results .post .sbar-title span{padding:0}.results .person .sbar-result-foot,.results .post .sbar-result-foot{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.results .person .sbar-author,.results .person .sbar-created,.results .post .sbar-author,.results .post .sbar-created{font-size:16px;font-size:1rem}.results .person{padding:15px 5px}.results .person,.results .person .sbar-person__person{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.results .person .sbar-person__person{-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.results .person .sbar-dp{height:48px;width:48px;margin-right:10px;border-radius:69%;background-size:cover;background-position:50%}.results .person:hover,.results .post:hover{background-color:#f2f2f2}.results .person:not(:last-of-type),.results .post:not(:last-of-type){border-bottom:1px solid grey}.sbar-loader{text-align:center;margin-top:20px}",""])},njqZ:function(t,e,i){"use strict";var s=i("Y41T"),o=i("WCrD"),n=!1;var a=function(t){n||i("hXqu")},r=i("VU/8")(s.a,o.a,!1,a,null,null);r.options.__file="components\\SearchBar.vue",e.a=r.exports},oEaD:function(t,e,i){"use strict";var s=i("y7+l"),o=i("KHMk"),n=!1;var a=function(t){n||i("f0iQ")},r=i("VU/8")(s.a,o.a,!1,a,null,null);r.options.__file="components\\Nav.vue",e.a=r.exports},qhjk:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"a.btn[data-v-ff297eea]{width:100px}.bolg_ptool[data-v-ff297eea]{display:inline-block;text-align:left;margin-top:5px}.bolg_pp[data-v-ff297eea]{display:block;height:136px;width:136px;background-size:cover;background-position:50%;border-radius:69%;margin:30px auto}.follows[data-v-ff297eea]{margin-top:15px}.follows span[data-v-ff297eea]{margin-right:8px}h2[data-v-ff297eea]{text-align:center}",""])},qvjp:function(t,e,i){"use strict";var s=i("Dd8w"),o=i.n(s),n=i("NYxO");e.a={props:["userdata"],computed:o()({},Object(n.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}))}},"t+mk":function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,".loader-container{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:999}.fullscreen-loader{position:fixed;top:50%;left:50%;z-index:1000;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}",""])},uFxh:function(t,e,i){"use strict";var s=i("mtWM"),o=i.n(s);e.a={data:function(){return{config:this.$store.state.config,loader:null,loading:!1,lpv:!0,logindialog:!1,valid:!0,remember:!1,le:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)||"E-mail must be valid"}],lp:"",passwordRules:[function(t){return!!t||"Password is required"},function(t){return t.length>=8||"Password must be at least 8 characters"}],errors:{email:[],password:[]}}},methods:{FBLogin:function(){this.$store.commit("FBLogin")},reset:function(){setTimeout(function(){this.$refs.loginForm.validate()||this.$refs.loginForm.reset()}.bind(this),250)},close:function(){this.$root.$emit("logindialog",!1)},login:function(){var t={email:this.le,password:this.lp,remember:this.remember};if(this.$refs.loginForm.validate()){this.loader="loading";var e=this.loader;this[e]=!this[e],o.a.post(this.config.api+"login.php",t,this.config.axiosHeader).then(function(t){this[e]=!1,this.loader=null,t.data.error?(this.errors.email.push(t.data.login),this.errors.password.push(t.data.login)):(this.close(),this.$store.commit("setLoadingScreen",!0),setTimeout(function(){this.$store.commit("setLoadingScreen",!1),this.$store.dispatch("userLogin",t.data)}.bind(this),750))}.bind(this))}}}}},"xx+w":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v("Login to bolg")])]),i("v-container",[i("v-card-text",[i("v-form",{ref:"loginForm",on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.login()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Email",rules:t.emailRules,"error-messages":t.errors.email,required:"",color:"teal"},model:{value:t.le,callback:function(e){t.le=e},expression:"le"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Password",hint:"At least 8 characters",min:"8",max:"32",maxlength:"32",counter:"32",rules:t.passwordRules,"append-icon":t.lpv?"visibility":"visibility_off","append-icon-cb":function(){return t.lpv=!t.lpv},type:t.lpv?"password":"text","error-messages":t.errors.password,required:"",color:"teal"},model:{value:t.lp,callback:function(e){t.lp=e},expression:"lp"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-checkbox",{attrs:{label:"Remember me",color:"teal"},model:{value:t.remember,callback:function(e){t.remember=e},expression:"remember"}})],1)],1)],1),i("v-layout",[i("div",{staticClass:"fb-login-btn",on:{click:function(e){t.FBLogin()}}},[i("svg",{staticClass:"_1pbq",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",color:"#ffffff"}},[i("path",{attrs:{fill:"#ffffff","fill-rule":"evenodd",d:"M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1\r\n                    3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733\r\n                    1.667-1.667\r\n                    1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033\r\n                    0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467\r\n                    2.133v1.867H6v2.066h2V14z"}})]),i("span",[t._v("Login with Facebook")])])])],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{outline:"",flat:""},nativeOn:{click:function(e){return t.close(e)}}},[t._v("Close")]),i("v-btn",{attrs:{outline:"",flat:"",disabled:t.loading,loading:t.loading},nativeOn:{click:function(e){return t.login(e)}}},[t._v("Login")])],1)],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},"y7+l":function(t,e,i){"use strict";var s=i("Dd8w"),o=i.n(s),n=i("NYxO"),a=i("HjO6"),r=i("a+fG"),l=i("FFPH"),c=i("njqZ");e.a={components:{profilecontents:a.a,loginmodal:r.a,signupmodal:l.a,searchbar:c.a},data:function(){return{profile:!1,smmenu:!1,logindialog:!1,signupdialog:!1}},computed:o()({},Object(n.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",socialAuth:"getSocialAuth",loadingScreen:"getLoadingScreen"})),mounted:function(){this.$root.$on("logindialog",function(t){this.logindialog=t}.bind(this)),this.$root.$on("signupdialog",function(t){this.signupdialog=t}.bind(this))},methods:{logout:function(){this.$store.commit("logout")}}}},yrBt:function(t,e,i){var s=i("k5Kh");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("41e87109",s,!1,{sourceMap:!1})},"z2+C":function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"*{text-transform:none!important;font-weight:400;font-family:Roboto,Helvetica,Arial,sans-serif}* ::-moz-selection{background-color:#d9d9d9}* ::selection{background-color:#d9d9d9}body{background-color:#fff}a{text-decoration:none}a,a:visited{color:#000}.application.theme--light{background-color:#fff}.headline,.post-title{font-family:Open Sans,Helvetica,Arial,sans-serif;font-weight:700}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",""])}});