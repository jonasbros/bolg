webpackJsonp([4],{"+r8F":function(t,e,i){"use strict";var o=i("526/"),s=i("AvLQ"),a=!1;var n=function(t){a||i("i7u4")},r=i("VU/8")(o.a,s.a,!1,n,null,null);r.options.__file="components\\PostCard.vue",e.a=r.exports},"526/":function(t,e,i){"use strict";var o=i("Dd8w"),s=i.n(o),a=i("mtWM"),n=i.n(a),r=i("NYxO"),l=i("e1SC");e.a={props:["post","titleLength","excerptLength","index"],data:function(){return{config:this.$store.state.config,userActions:!1,deldialog:!1,dashedTitle:""}},computed:s()({},Object(r.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}),{likeColor:function(){return this.post.user_liked?"teal lighten-1":"grey darken-2"},bookmarkColor:function(){return this.post.user_bookmarked?"teal lighten-1":"grey darken-2"}}),mounted:function(){Object(l.a)(".headline",80),Object(l.a)(".black--text",60),this.post.user_post&&this.$root.$on("closeUserActions",function(t){this.userActions&&(this.userActions=t)}.bind(this))},methods:{fbShare:function(){FB.ui({method:"feed",link:"https://bolgia.herokuapp.com/post/"+this.$options.filters.replaceSpaceWithDash(this.post.title)+"/"+this.post.id,app_id:"571629196513066",caption:this.post.excerpt,source:this.post.featured_img},function(t){console.log(t)})},deletePost:function(){this.$root.$emit("deletePost",this.index);var t={sanitize:"false",newint:1,table:"blogs",field:"deleted",where:"id = "+this.post.id};n.a.post(this.config.api+"/update.php",t,this.config.axiosHeader).then(function(t){"success!"==t.data&&this.$root.$emit("deletePost",payload)}.bind(this)).catch(function(t){console.log(t)})},like:function(t){this.post.user_liked=!this.post.user_liked;var e={liked:this.post.user_liked,blog_id:t,user_id:this.userID};n.a.post(this.config.api+"likeupdate.php",e,this.config.axiosHeader).then(function(t){}).catch(function(t){console.log(t)})},bookmark:function(t){this.post.user_bookmarked=!this.post.user_bookmarked;var e={bookmark:this.post.user_bookmarked,blog_id:t,user_id:this.userID};n.a.post(this.config.api+"bookmark.php",e,this.config.axiosHeader).then(function(t){}).catch(function(t){console.log(t)})}}}},AvLQ:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-flex",[i("div",{staticClass:"card-outer",class:{"user-post":1==t.post.user_post}},[i("v-card",{staticClass:"elevation-2"},[""!=t.post.featured_img?i("router-link",{attrs:{to:{path:"/post/"+t.$options.filters.replaceSpaceWithDash(t.post.title)+"/"+t.post.id}}},[i("v-card-media",{attrs:{src:t.post.featured_img,height:"180px"}})],1):t._e(),i("v-card-title",{attrs:{"primary-title":""}},[i("div",{staticClass:"text-xs-left"},[i("router-link",{attrs:{to:{path:"/post/"+t.$options.filters.replaceSpaceWithDash(t.post.title)+"/"+t.post.id}}},[i("span",{staticClass:"headline"},[t._v("                \n              "+t._s(t.post.title)+"\n            ")])]),t.post.user_post?i("v-btn",{staticClass:"user-post-actions",attrs:{flat:"",icon:""},on:{click:function(e){e.stopPropagation(),t.userActions=!t.userActions}}},[i("v-icon",[t._v("more_horiz")])],1):t._e(),t.post.user_post?i("div",{directives:[{name:"show",rawName:"v-show",value:t.userActions,expression:"userActions"}],staticClass:"post-actions-content elevation-1 text-xs-left"},[i("router-link",{attrs:{to:"/edit/"+t.post.id}},[t._v("\n              Edit\n            ")]),i("p",{on:{click:function(e){e.stopPropagation(),t.deldialog=!0,t.userActions=!1}}},[t._v("\n              Delete\n            ")])],1):t._e(),null==t.post.categories?i("router-link",{staticClass:"mb-2 grey--text d-block",attrs:{to:"/browse/uncategorized/newest"}},[t._v("Uncategorized")]):t._e(),null!=t.post.categories?i("router-link",{staticClass:"mb-2 grey--text d-block",attrs:{to:"/browse/"+t.post.categories[0].toLowerCase()+"/newest"}},[t._v(t._s(t.post.categories[0]))]):t._e(),i("div",{staticClass:"black--text",domProps:{innerHTML:t._s(t.post.excerpt)}})],1)]),i("v-card-actions",{staticClass:"text-xs-left"},[i("div",[i("router-link",{attrs:{to:{path:"/profile/"+t.post.author_url}}},[i("div",{staticClass:"card-author-pic d-inline-block",style:"background-image: url("+t.post.authorPic+")"})]),i("div",{staticClass:"card-author-name d-inline-block"},[i("router-link",{attrs:{to:{path:"/profile/"+t.post.author_url}}},[i("div",{staticClass:"grey--text"},[t._v(t._s(t.post.authorName))])]),i("div",{staticClass:"grey--text"},[t._v(t._s(t._f("DateDiffFilter")(t.post.created)))])],1)],1),t.isLoggedIn?i("v-btn",{staticStyle:{"margin-left":"auto"},attrs:{flat:"",icon:"",color:t.likeColor},nativeOn:{click:function(e){t.like(t.post.id)}}},[i("v-icon",[t._v("favorite")])],1):t._e(),i("v-menu",{style:t.isLoggedIn?"":"margin-left: auto;",attrs:{"offset-y":"",top:"",left:""}},[i("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"grey darken-3",dark:""},slot:"activator"},[i("v-icon",[t._v("share")])],1),i("v-list",{attrs:{subheader:""}},[i("v-subheader",[t._v("Share story on: ")]),i("v-list-tile",[i("v-btn",{staticStyle:{"background-color":"#4267b2"},attrs:{dark:"",depressed:""},on:{click:t.fbShare}},[i("svg",{staticClass:"_1pbq",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",color:"#ffffff"}},[i("path",{attrs:{fill:"#ffffff","fill-rule":"evenodd",d:"M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1\n                3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733\n                1.667-1.667\n                1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033\n                0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467\n                2.133v1.867H6v2.066h2V14z"}})]),i("span",[t._v("Facebook")])])],1)],1)],1),t.isLoggedIn?i("v-btn",{attrs:{flat:"",icon:"",color:t.bookmarkColor},on:{click:function(e){e.stopPropagation(),t.bookmark(t.post.id)}}},[i("v-icon",[t._v("bookmark")])],1):t._e()],1)],1)],1),i("v-layout",{staticClass:"delete-modal",attrs:{row:"","justify-center":""}},[i("div",{staticClass:"modal-overlay",class:[{invisible:!t.deldialog},{visible:t.deldialog}]}),i("v-dialog",{attrs:{"max-width":"480"},model:{value:t.deldialog,callback:function(e){t.deldialog=e},expression:"deldialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Delete")]),i("v-card-text",[t._v("Are you sure you want to delete this post?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.deletePost(),t.deldialog=!1}}},[t._v("Delete")]),i("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.deldialog=!1}}},[t._v("Cancel")])],1)],1)],1)],1)],1)};o._withStripped=!0;var s={render:o,staticRenderFns:[]};e.a=s},IryZ:function(t,e,i){var o=i("RVtc");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i("rjj0")("54584044",o,!1,{sourceMap:!1})},MNqr:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,".card{background-color:#fff}.card__title.card__title--primary{display:inline-block;word-break:break-word;width:100%;position:relative}.headline{display:block;margin-bottom:15px;font-weight:700}.card__actions{padding:16px}.black--text{display:inline-block;word-break:break-word}.card-author-name,.card-author-pic{vertical-align:middle}.card-author-pic{height:36px;width:36px;margin-right:10px;border-radius:69%;background-size:cover;background-position:50%}.user-post .headline{max-width:85%}.user-post-actions{display:block;position:absolute;right:0;top:14px}.user-post-actions i{font-size:28px!important}.post-actions-content{width:auto;height:auto;padding:10px 5px;background-color:#fff;position:absolute;right:15px;bottom:16px}.post-actions-content a,.post-actions-content p{display:block;padding:5px 10px;margin:0;cursor:pointer}.post-actions-content a:hover,.post-actions-content p:hover{background-color:#f2f2f2}.delete-modal .modal-overlay{background-color:rgba(0,0,0,.15);position:fixed;top:0;bottom:0;left:0;right:0;-webkit-transition:visibility 0s,opacity .4s linear;transition:visibility 0s,opacity .4s linear;z-index:99}.delete-modal .card{background-color:#fff}.invisible{visibility:hidden!important;opacity:0!important}.visible{visibility:visible!important;opacity:1!important}._1pbq{height:22px;width:22px}.btn__content svg{margin-right:3px}.btn__content span,.btn__content svg{vertical-align:middle}",""])},RVtc:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,".grid{margin-bottom:50px;padding:0}.grid-item{padding:10px;text-align:left}.browse-navigation{margin:100px 0 25px;padding:0 250px}.inf-loader{position:absolute;margin-top:100px;margin-bottom:15px;bottom:-70px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}@media (min-width:0){.flex.xs12{width:100%}}",""])},Tfoi:function(t,e,i){"use strict";var o=i("Dd8w"),s=i.n(o),a=i("NYxO"),n=i("mtWM"),r=i.n(n),l=i("+r8F");e.a={components:{postcard:l.a},data:function(){return{config:this.$store.state.config,posts:[],pagination:{perPage:15,cPage:1,sort:"newest",totalPages:0},otrigger:null,trigger:null,isLoadingPosts:!1,msnry:null}},computed:s()({},Object(a.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}),{browseby:function(){return this.$route.params.by}}),beforeDestroy:function(){window.onscroll=null},created:function(){window.onscroll=function(){this.infiniteScroll()}.bind(this),this.$store.commit("setLoadingScreen",!0),setTimeout(function(){this.getPosts()}.bind(this),150),this.$root.$on("deletePost",function(t){this.posts.splice(t,1),this.msnry.destroy(),this.masonry(!1)}.bind(this))},methods:{masonry:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];imagesLoaded(document.querySelector(".grid"),function(t){this.msnry=new Masonry(".grid",{columnWidth:".grid-item",itemSelector:".grid-item",percentPosition:!0,horizontalOrder:!0})}.bind(this)),null!=this.otrigger&&t&&setTimeout(function(){window.scrollTo(0,this.otrigger-window.innerHeight)}.bind(this),500)},infiniteScroll:function(){this.trigger=document.querySelector(".grid").offsetHeight+71,window.scrollY>=this.trigger-window.innerHeight&&0==this.isLoadingPosts&&this.pagination.cPage<this.pagination.totalPages&&(this.isLoadingPosts=!0,this.pagination.cPage+=1,this.getPosts(),this.otrigger=this.trigger)},getPosts:function(){var t={userID:this.userID,by:this.browseby,page:this.pagination.cPage,perpage:this.pagination.perPage,sort:this.pagination.sort,logged:this.isLoggedIn};r.a.post(this.config.api+"browse.php",t,this.config.axiosHeader).then(function(t){if(1==this.pagination.cPage)this.$store.commit("setLoadingScreen",!1),this.pagination.totalPages=Math.ceil(t.data.totalItems/this.pagination.perPage),this.posts=t.data.posts,this.$root.$emit("publishLoadingPost",!1),this.masonry();else{for(var e=0;e<this.pagination.perPage;e++)void 0!==t.data.posts[e]&&this.posts.push(t.data.posts[e]);setTimeout(function(){this.msnry.destroy(),this.masonry(),this.isLoadingPosts=!1}.bind(this),50)}}.bind(this)).catch(function(t){console.log(t)})}}}},Vpo5:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("Tfoi"),s=i("yA/y"),a=!1;var n=function(t){a||i("IryZ")},r=i("VU/8")(o.a,s.a,!1,n,null,null);r.options.__file="pages\\browse\\_by\\_sort.vue",e.default=r.exports},e1SC:function(t,e,i){"use strict";e.a=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)throw Error("maxHeight is required");var o="string"==typeof t?document.querySelectorAll(t):t;if(o){var s=i.character||"…",a=i.classname||"js-shave",n=i.spaces||!0,r='<span class="js-shave-char">'+s+"</span>";"length"in o||(o=[o]);for(var l=0;l<o.length;l+=1){var c=o[l],d=c.style,p=c.querySelector("."+a),u=void 0===c.textContent?"innerText":"textContent";p&&(c.removeChild(c.querySelector(".js-shave-char")),c[u]=c[u]);var g=c[u],h=n?g:g.split(" ");if(!(h.length<2)){var f=d.height;d.height="auto";var v=d.maxHeight;if(d.maxHeight="none",c.offsetHeight<=e)d.height=f,d.maxHeight=v;else{for(var b=h.length-1,m=0,k=void 0;m<b;)k=m+b+1>>1,c[u]=n?h.slice(0,k):h.slice(0,k).join(" "),c.insertAdjacentHTML("beforeend",r),c.offsetHeight>e?b=n?k-2:k-1:m=k;c[u]=n?h.slice(0,b):h.slice(0,b).join(" "),c.insertAdjacentHTML("beforeend",r);var x=n?h.slice(b):h.slice(b).join(" ");c.insertAdjacentHTML("beforeend",'<span class="'+a+'" style="display:none;">'+x+"</span>"),d.height=f,d.maxHeight=v}}}}}},i7u4:function(t,e,i){var o=i("MNqr");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i("rjj0")("58691d8c",o,!1,{sourceMap:!1})},"yA/y":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-layout",{attrs:{column:"",nowrap:""}},[i("v-flex",{staticClass:"browse-navigation"},[i("v-layout",{staticClass:"text-xs-center",attrs:{row:"",wrap:""}},[i("v-flex",[i("router-link",{attrs:{to:"/browse/all/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        All\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/art/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Art\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/culture/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Culture\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/music/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Music\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/sports/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Sports\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/technology/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Technology\n                    ")])],1)],1),i("v-flex",[i("router-link",{attrs:{to:"/browse/uncategorized/newest"}},[i("v-btn",{attrs:{large:"",flat:""}},[t._v("\n                        Uncategorized\n                    ")])],1)],1)],1)],1),i("v-flex",[i("v-layout",{staticClass:"grid container",attrs:{row:"",wrap:""}},[t._l(t.posts,function(t,e){return i("postcard",{key:t.id,staticClass:"grid-item xs12 sm6 md4",attrs:{post:t,titleLength:50,excerptLength:90,index:e}})}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoadingPosts,expression:"isLoadingPosts"}],staticClass:"inf-loader"},[i("v-progress-circular",{attrs:{indeterminate:"",size:50,width:7,color:"teal"}})],1)],2)],1)],1)};o._withStripped=!0;var s={render:o,staticRenderFns:[]};e.a=s}});