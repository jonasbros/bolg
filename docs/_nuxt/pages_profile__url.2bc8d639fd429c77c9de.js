webpackJsonp([2],{"+r8F":function(t,e,o){"use strict";var i=o("526/"),s=o("AvLQ"),a=!1;var r=function(t){a||o("i7u4")},l=o("VU/8")(i.a,s.a,!1,r,null,null);l.options.__file="components\\PostCard.vue",e.a=l.exports},"/stw":function(t,e,o){"use strict";var i=o("Dd8w"),s=o.n(i),a=o("NYxO"),r=o("mtWM"),l=o.n(r);e.a={props:["person"],data:function(){return{config:this.$store.state.config,loader:null,loading:!1}},computed:s()({},Object(a.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"})),methods:{follow:function(){if(null==this.loader){this.loader="loading";var t=this.loader;this[t]=!this[t];var e={follower_id:this.userID,following_id:this.person.user_id,follow:!this.person.isFollowing};l.a.post(this.config.api+"/follow.php",e,this.config.axiosHeader).then(function(e){e.data.success&&(this.person.isFollowing=!this.person.isFollowing,this.$root.$emit("changefollowingCount",this.person.isFollowing),this[t]=!1,this.loader=null)}.bind(this)).catch(function(t){console.log(t)})}}}}},"285J":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,'.form-container[data-v-ad83951c]{background-color:#fff;padding:25px 45px}.form-container-inner[data-v-ad83951c]{padding:40px 0 15px}.dp-setting[data-v-ad83951c]{position:relative;margin:0 auto;height:98px;width:98px;background-size:cover;background-position:50%;border-radius:69%;cursor:pointer;font-size:98px;color:#000;text-align:center}.dp-setting.picture-error[data-v-ad83951c]:after{position:absolute;content:"\\D7";height:98px;width:98px;top:50%;left:50%;background-color:#bce0e0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border-radius:69%;line-height:1}',""])},"2HCn":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("5XtA"),s=o("cRO0"),a=!1;var r=function(t){a||o("c3Pf")},l=o("VU/8")(i.a,s.a,!1,r,"data-v-258f60a9",null);l.options.__file="pages\\profile\\_url.vue",e.default=l.exports},"2u4j":function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".flex[data-v-e0e442e6]{margin:7px 0;background-color:#fff;padding:25px}.person-inner[data-v-e0e442e6],.person[data-v-e0e442e6]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:left}.person[data-v-e0e442e6]{cursor:pointer;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.person div[data-v-e0e442e6]:not(:last-of-type){margin-right:15px}.picture[data-v-e0e442e6]{height:64px;width:64px;background-size:cover;background-position:50%;border-radius:69%}",""])},"526/":function(t,e,o){"use strict";var i=o("Dd8w"),s=o.n(i),a=o("mtWM"),r=o.n(a),l=o("NYxO"),n=o("e1SC");e.a={props:["post","titleLength","excerptLength","index"],data:function(){return{config:this.$store.state.config,userActions:!1,deldialog:!1,dashedTitle:""}},computed:s()({},Object(l.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}),{likeColor:function(){return this.post.user_liked?"teal lighten-1":"grey darken-2"},bookmarkColor:function(){return this.post.user_bookmarked?"teal lighten-1":"grey darken-2"}}),mounted:function(){Object(n.a)(".headline",80),Object(n.a)(".black--text",60),this.post.user_post&&this.$root.$on("closeUserActions",function(t){this.userActions&&(this.userActions=t)}.bind(this))},methods:{fbShare:function(){FB.ui({method:"feed",link:"https://bolgia.herokuapp.com/post/"+this.$options.filters.replaceSpaceWithDash(this.post.title)+"/"+this.post.id,app_id:"571629196513066",caption:this.post.excerpt,source:this.post.featured_img},function(t){console.log(t)})},deletePost:function(){this.$root.$emit("deletePost",this.index);var t={sanitize:"false",newint:1,table:"blogs",field:"deleted",where:"id = "+this.post.id};r.a.post(this.config.api+"/update.php",t,this.config.axiosHeader).then(function(t){"success!"==t.data&&this.$root.$emit("deletePost",payload)}.bind(this)).catch(function(t){console.log(t)})},like:function(t){this.post.user_liked=!this.post.user_liked;var e={liked:this.post.user_liked,blog_id:t,user_id:this.userID};r.a.post(this.config.api+"likeupdate.php",e,this.config.axiosHeader).then(function(t){}).catch(function(t){console.log(t)})},bookmark:function(t){this.post.user_bookmarked=!this.post.user_bookmarked;var e={bookmark:this.post.user_bookmarked,blog_id:t,user_id:this.userID};r.a.post(this.config.api+"bookmark.php",e,this.config.axiosHeader).then(function(t){}).catch(function(t){console.log(t)})}}}},"5XtA":function(t,e,o){"use strict";var i=o("fZjL"),s=o.n(i),a=o("Dd8w"),r=o.n(a),l=o("mtWM"),n=o.n(l),c=o("NYxO"),d=o("+r8F"),u=o("oIMZ"),p=o("YTCb"),f=o("HhAh"),h=o.n(f);e.a={components:{postcard:d.a,personcard:u.a,settingsmodal:p.a},data:function(){return{config:this.$store.state.config,profile:[],posts:[],followers:[],following:[],followerModal:!1,followingModal:!1,followerPage:1,followingPage:1,isLoadingFollow:!1,url:this.$route.params.url,isMe:!1,dp:"",about:"",whatdo:"",name:"",nInterests:[],screenWidth:null,per:10,page:1,otrigger:null,trigger:null,isLoadingPosts:!1,totalItems:0,totalPages:0,userDataDupe:this.$store.state.userData,followingCountChange:!1,settingsModal:!1,pictureError:{error:!1,msg:""}}},computed:r()({},Object(c.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}),{followerPages:function(){return Math.ceil(this.profile.followerCount/10)},followingPages:function(){return Math.ceil(this.profile.followingCount/10)}}),watch:{settingsModal:function(t){t||this.$root.$emit("settingsModalClosed",!0)},followingCountChange:h()(function(t){1==t&&this.profile.followingCount++,0==t&&this.profile.followingCount--,this.$store.commit("updateUserCookie",this.profile)},50),userData:function(t){this.userDataDupe=this.userData},followerModal:function(t){this.followingModal||(t?(this.getFollows(),document.querySelector(".follower-modal .dialog--scrollable")&&document.querySelector(".follower-modal .dialog--scrollable").addEventListener("scroll",function(){this.modalScroll("follower")}.bind(this))):(this.followerPage=1,this.followers=[],this.isLoadingFollow=!1,document.querySelector(".follower-modal .dialog--scrollable")&&document.querySelector(".follower-modal .dialog--scrollable").removeEventListener("scroll",function(){this.modalScroll("follower")}.bind(this))))},followingModal:function(t){this.followerModal||(t?(this.getFollows(),document.querySelector(".following-modal .dialog--scrollable")&&document.querySelector(".following-modal .dialog--scrollable").addEventListener("scroll",function(){this.modalScroll("following")}.bind(this))):(this.followingPage=1,this.following=[],this.isLoadingFollow=!1,document.querySelector(".following-modal .dialog--scrollable")&&document.querySelector(".following-modal .dialog--scrollable").removeEventListener("scroll",function(){this.modalScroll("following")}.bind(this))))}},created:function(){this.screenWidth=window.screen.width,window.onscroll=function(){this.infiniteScroll()}.bind(this),setTimeout(function(){this.url==this.userData.url?(this.isMe=!0,this.profile=this.userData,this.about=this.userData.about,this.whatdo=this.userData.whatdo,this.name=this.userData.name,this.dp=this.userData.display_picture,this.url=this.userData.url,this.nInterests=this.userData.interests):(this.isMe=!1,this.getProfile()),this.getPosts()}.bind(this),100),this.$root.$on("changefollowingCount",function(t){this.followingCountChange=t}.bind(this)),this.$root.$on("settingsModal",function(t){this.settingsModal=t}.bind(this))},methods:{validatePicture:function(){return"image"==this.$refs.dpuploadinput.files[0].type.split("/")[0]?(this.pictureError.error=!1,this.pictureError.msg="",!0):(this.pictureError.error=!0,this.pictureError.msg="Image files only.",!1)},uploadPicture:function(){console.log(this);var t=new FormData;t.append("image",this.$refs.dpuploadinput.files[0]),t.append("user_id",this.profile.user_id),t.append("screen_width",window.screen.width),t.append("folder","dp"),this.validatePicture()&&n.a.post(this.config.api+"imageupload.php",t,this.config.axiosHeader).then(function(t){t.data.success&&(this.dp=t.data.url,this.profile.display_picture=t.data.url,this.posts.forEach(function(e){e.authorPic=t.data.url}),this.updateDP({table:"user_profiles",field:"display_picture",where:"user_id = "+this.profile.user_id,newstr:t.data.url}))}.bind(this)).catch(function(t){console.log(t)})},updateDP:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};console.log(t);var e={table:t.table,field:t.field,where:t.where,newstr:t.newstr,id:t.id,sanitize:"false"};n.a.post(this.config.api+"/update.php",e,this.config.axiosHeader).then(function(t){"success!"==t.data&&this.$store.commit("updateUserCookie",this.profile)}.bind(this)).catch(function(t){console.log(t.data)}),this.$root.$emit("settingsModal",!1)},openFollowers:function(){this.profile.followerCount>0&&(this.followerModal=!this.followerModal)},openFollowing:function(){this.profile.followingCount>0&&(this.followingModal=!this.followingModal)},modalScroll:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"follower",e="follower"==t?document.querySelector(".follower-modal .dialog--scrollable"):document.querySelector(".following-modal .dialog--scrollable"),o="follower"==t?document.querySelector(".followers-list"):document.querySelector(".following-list");o.offsetTop+o.offsetHeight+16-e.offsetHeight<=e.scrollTop&&0==this.isLoadingFollow&&(this.followerPages>=this.followerPage||this.followingPages>=this.followingPage)&&(this.isLoadingFollow=!0,"follower"==t?this.followerPage++:this.followingPage++,this.getFollows())},infiniteScroll:function(){this.trigger=document.querySelector(".profile-posts-container").offsetHeight,window.scrollY>=this.trigger+200-window.innerHeight&&0==this.isLoadingPosts&&this.page<this.totalPages&&(this.isLoadingPosts=!0,this.page+=1,this.getPosts(),this.otrigger=this.trigger)},getFollows:function(){var t={follower_id:this.profile.user_id,following_id:this.profile.user_id,per:10,erpage:this.followerPage,ingpage:this.followingPage,follower:this.followerModal,following:this.followingModal};n.a.post(this.config.api+"/getfollow.php",t,this.config.axiosHeader).then(function(t){if(1==this.followerPage)this.followers=t.data.followers;else for(var e=0;e<10;e++)void 0!==t.data.followers[e]&&this.followers.push(t.data.followers[e]);if(1==this.followingPage)this.following=t.data.following;else for(e=0;e<10;e++)void 0!==t.data.following[e]&&this.following.push(t.data.following[e]);setTimeout(function(){this.isLoadingFollow=!1}.bind(this),500)}.bind(this)).catch(function(t){console.log(t)}.bind(this))},follow:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t={follower_id:this.userID,following_id:this.profile.user_id,follow:!this.profile.isFollowing};n.a.post(this.config.api+"/follow.php",t,this.config.axiosHeader).then(function(t){if(t.data.success){if(this.profile.isFollowing=!this.profile.isFollowing,1==this.profile.isFollowing)this.followers.push(this.userData),this.profile.followerCount++,this.userDataDupe.followingCount++;else{var e=this.followers.map(function(t){return t.user_id}).indexOf(this.userData.user_id);this.followers.splice(e,1),this.profile.followerCount--,this.userDataDupe.followingCount--}this.$store.commit("updateUserData",this.userDataDupe),this.$store.commit("updateUserCookie",this.userDataDupe)}}.bind(this)).catch(function(t){console.log(t)})},getProfile:function(){var t={url:this.$route.params.url,visitor:this.userData.user_id};n.a.post(this.config.api+"/getUser.php",t,this.config.axiosHeader).then(function(t){this.profile=t.data[0],this.about=this.profile.about,this.whatdo=this.profile.whatdo,this.name=this.profile.name,this.dp=this.profile.display_picture}.bind(this)).catch(function(t){console.log(t)})},getPosts:function(){var t={url:this.$route.params.url,user_id:this.userID,page:this.page,per:this.per,logged:this.isLoggedIn,screen_width:this.screenWidth};n.a.post(this.config.api+"/getuserposts.php",t,this.config.axiosHeader).then(function(t){if(1==this.page)this.totalItems=t.data.totalItems,this.totalPages=Math.ceil(this.totalItems/this.per),delete t.data.totalItems,this.posts=t.data.posts;else{var e=s()(this.posts).length;setTimeout(function(){for(var o=0;o<e;o++)void 0!==t.data[o]&&this.posts.push(t.data[o]);this.isLoadingPosts=!1}.bind(this),250)}}.bind(this)).catch(function(t){})}}}},AvLQ:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-flex",[o("div",{staticClass:"card-outer",class:{"user-post":1==t.post.user_post}},[o("v-card",{staticClass:"elevation-2"},[""!=t.post.featured_img?o("router-link",{attrs:{to:{path:"/post/"+t.$options.filters.replaceSpaceWithDash(t.post.title)+"/"+t.post.id}}},[o("v-card-media",{attrs:{src:t.post.featured_img,height:"180px"}})],1):t._e(),o("v-card-title",{attrs:{"primary-title":""}},[o("div",{staticClass:"text-xs-left"},[o("router-link",{attrs:{to:{path:"/post/"+t.$options.filters.replaceSpaceWithDash(t.post.title)+"/"+t.post.id}}},[o("span",{staticClass:"headline"},[t._v("                \n              "+t._s(t.post.title)+"\n            ")])]),t.post.user_post?o("v-btn",{staticClass:"user-post-actions",attrs:{flat:"",icon:""},on:{click:function(e){e.stopPropagation(),t.userActions=!t.userActions}}},[o("v-icon",[t._v("more_horiz")])],1):t._e(),t.post.user_post?o("div",{directives:[{name:"show",rawName:"v-show",value:t.userActions,expression:"userActions"}],staticClass:"post-actions-content elevation-1 text-xs-left"},[o("router-link",{attrs:{to:"/edit/"+t.post.id}},[t._v("\n              Edit\n            ")]),o("p",{on:{click:function(e){e.stopPropagation(),t.deldialog=!0,t.userActions=!1}}},[t._v("\n              Delete\n            ")])],1):t._e(),null==t.post.categories?o("router-link",{staticClass:"mb-2 grey--text d-block",attrs:{to:"/browse/uncategorized/newest"}},[t._v("Uncategorized")]):t._e(),null!=t.post.categories?o("router-link",{staticClass:"mb-2 grey--text d-block",attrs:{to:"/browse/"+t.post.categories[0].toLowerCase()+"/newest"}},[t._v(t._s(t.post.categories[0]))]):t._e(),o("div",{staticClass:"black--text",domProps:{innerHTML:t._s(t.post.excerpt)}})],1)]),o("v-card-actions",{staticClass:"text-xs-left"},[o("div",[o("router-link",{attrs:{to:{path:"/profile/"+t.post.author_url}}},[o("div",{staticClass:"card-author-pic d-inline-block",style:"background-image: url("+t.post.authorPic+")"})]),o("div",{staticClass:"card-author-name d-inline-block"},[o("router-link",{attrs:{to:{path:"/profile/"+t.post.author_url}}},[o("div",{staticClass:"grey--text"},[t._v(t._s(t.post.authorName))])]),o("div",{staticClass:"grey--text"},[t._v(t._s(t._f("DateDiffFilter")(t.post.created)))])],1)],1),t.isLoggedIn?o("v-btn",{staticStyle:{"margin-left":"auto"},attrs:{flat:"",icon:"",color:t.likeColor},nativeOn:{click:function(e){t.like(t.post.id)}}},[o("v-icon",[t._v("favorite")])],1):t._e(),o("v-menu",{style:t.isLoggedIn?"":"margin-left: auto;",attrs:{"offset-y":"",top:"",left:""}},[o("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"grey darken-3",dark:""},slot:"activator"},[o("v-icon",[t._v("share")])],1),o("v-list",{attrs:{subheader:""}},[o("v-subheader",[t._v("Share story on: ")]),o("v-list-tile",[o("v-btn",{staticStyle:{"background-color":"#4267b2"},attrs:{dark:"",depressed:""},on:{click:t.fbShare}},[o("svg",{staticClass:"_1pbq",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",color:"#ffffff"}},[o("path",{attrs:{fill:"#ffffff","fill-rule":"evenodd",d:"M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1\n                3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733\n                1.667-1.667\n                1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033\n                0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467\n                2.133v1.867H6v2.066h2V14z"}})]),o("span",[t._v("Facebook")])])],1)],1)],1),t.isLoggedIn?o("v-btn",{attrs:{flat:"",icon:"",color:t.bookmarkColor},on:{click:function(e){e.stopPropagation(),t.bookmark(t.post.id)}}},[o("v-icon",[t._v("bookmark")])],1):t._e()],1)],1)],1),o("v-layout",{staticClass:"delete-modal",attrs:{row:"","justify-center":""}},[o("div",{staticClass:"modal-overlay",class:[{invisible:!t.deldialog},{visible:t.deldialog}]}),o("v-dialog",{attrs:{"max-width":"480"},model:{value:t.deldialog,callback:function(e){t.deldialog=e},expression:"deldialog"}},[o("v-card",[o("v-card-title",{staticClass:"headline"},[t._v("Delete")]),o("v-card-text",[t._v("Are you sure you want to delete this post?")]),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.deletePost(),t.deldialog=!1}}},[t._v("Delete")]),o("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.deldialog=!1}}},[t._v("Cancel")])],1)],1)],1)],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},Dd19:function(t,e,o){var i=o("2u4j");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("f68223ae",i,!1,{sourceMap:!1})},HhAh:function(t,e){t.exports=function(t,e,o){var i,s,a,r,l;function n(){var c=Date.now()-r;c<e&&c>=0?i=setTimeout(n,e-c):(i=null,o||(l=t.apply(a,s),a=s=null))}null==e&&(e=100);var c=function(){a=this,s=arguments,r=Date.now();var c=o&&!i;return i||(i=setTimeout(n,e)),c&&(l=t.apply(a,s),a=s=null),l};return c.clear=function(){i&&(clearTimeout(i),i=null)},c.flush=function(){i&&(l=t.apply(a,s),a=s=null,clearTimeout(i),i=null)},c}},MNqr:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,".card{background-color:#fff}.card__title.card__title--primary{display:inline-block;word-break:break-word;width:100%;position:relative}.headline{display:block;margin-bottom:15px;font-weight:700}.card__actions{padding:16px}.black--text{display:inline-block;word-break:break-word}.card-author-name,.card-author-pic{vertical-align:middle}.card-author-pic{height:36px;width:36px;margin-right:10px;border-radius:69%;background-size:cover;background-position:50%}.user-post .headline{max-width:85%}.user-post-actions{display:block;position:absolute;right:0;top:14px}.user-post-actions i{font-size:28px!important}.post-actions-content{width:auto;height:auto;padding:10px 5px;background-color:#fff;position:absolute;right:15px;bottom:16px}.post-actions-content a,.post-actions-content p{display:block;padding:5px 10px;margin:0;cursor:pointer}.post-actions-content a:hover,.post-actions-content p:hover{background-color:#f2f2f2}.delete-modal .modal-overlay{background-color:rgba(0,0,0,.15);position:fixed;top:0;bottom:0;left:0;right:0;-webkit-transition:visibility 0s,opacity .4s linear;transition:visibility 0s,opacity .4s linear;z-index:99}.delete-modal .card{background-color:#fff}.invisible{visibility:hidden!important;opacity:0!important}.visible{visibility:visible!important;opacity:1!important}._1pbq{height:22px;width:22px}.btn__content svg{margin-right:3px}.btn__content span,.btn__content svg{vertical-align:middle}",""])},YTCb:function(t,e,o){"use strict";var i=o("q2At"),s=o("mft9"),a=!1;var r=function(t){a||o("sv1s")},l=o("VU/8")(i.a,s.a,!1,r,"data-v-ad83951c",null);l.options.__file="components\\SettingsModal.vue",e.a=l.exports},a6wT:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-flex",{attrs:{xs12:""}},[o("div",{staticClass:"person",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.$router.push("/profile/"+t.person.url)}}},[o("div",{staticClass:"person-inner"},[o("div",{staticClass:"picture",style:"background-image: url("+t.person.display_picture+")",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.$router.push("/profile/"+t.person.url)}}}),o("div",{staticClass:"text",on:{click:function(e){t.$router.push("/profile/"+t.person.url)}}},[o("div",[o("h3",[t._v(t._s(t.person.name))])]),o("div",[t._v(t._s(t.person.about))])])]),o("div",[t.person.isMe?t._e():o("div",{staticClass:"follow"},[o("v-btn",{attrs:{outline:"",color:"black",loading:t.loading,disabled:t.loading},on:{click:t.follow}},[t._v("\n                "+t._s(1==t.person.isFollowing?"Unfollow":"Follow")+"\n                ")])],1)])])])};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},c3Pf:function(t,e,o){var i=o("tpOW");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("3ecf44c4",i,!1,{sourceMap:!1})},cRO0:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("v-layout",{attrs:{row:"",wrap:""}},[o("v-flex",{staticClass:"profile-owner clearfix text-xs-left elevation-1",attrs:{xs12:""}},[o("div",{staticClass:"profile-picture",style:"background-image: url("+t.dp+")",on:{click:function(e){t.$refs.dpuploadinput.click()}}},[o("input",{ref:"dpuploadinput",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*"},on:{change:t.uploadPicture}}),o("small",{class:t.pictureError.error?"deep-orange--text":"grey--text"},[t._v(t._s(t.pictureError.error?"Upload image only":"*click to change picture"))])]),o("div",{staticClass:"profile-meta"},[o("h1",[t._v(t._s(t.name))]),o("p",{staticClass:"profile-whatdo grey--text"},[t._v(t._s(t.whatdo))]),o("p",{staticClass:"profile-about grey--text"},[t._v(t._s(t.about))]),o("div",{staticClass:"profile-follows"},[o("span",{on:{click:t.openFollowers}},[t._v(t._s(t.profile.followerCount)+" followers")]),o("span",[t._v("•")]),o("span",{on:{click:t.openFollowing}},[t._v(t._s(t.profile.followingCount)+" following")]),t.isLoggedIn&&!t.isMe?o("v-btn",{attrs:{outline:"",flat:"",small:""},on:{click:function(e){return e.stopPropagation(),t.follow(e)}}},[t._v("\n                  "+t._s(t.profile.isFollowing?"Unfollow":"Follow")+"\n                  ")]):t._e()],1)]),t.isMe?o("router-link",{staticClass:"profile-settings",attrs:{to:"/profile/settings"}},[o("v-btn",{attrs:{fab:"",small:"",outline:"",color:"grey darken-3"}},[o("v-icon",[t._v("settings")])],1)],1):t._e()],1),o("v-layout",{staticClass:"profile-posts-container text-xs-left",attrs:{row:"",wrap:""}},[o("v-flex",{attrs:{xs12:""}},t._l(t.posts,function(t,e){return o("postcard",{key:t.id,staticClass:"profile-post xs12",attrs:{post:t,titleLength:50,excerptLength:90,index:e}})}))],1),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoadingPosts,expression:"isLoadingPosts"}],staticClass:"inf-loader"},[o("v-progress-circular",{attrs:{indeterminate:"",size:50,width:7,color:"teal"}})],1),o("div",[o("v-dialog",{staticClass:"follower-modal",attrs:{scrollable:"","max-width":"480px"},model:{value:t.followerModal,callback:function(e){t.followerModal=e},expression:"followerModal"}},[o("v-card",{attrs:{color:"white"}},[o("v-card-title",{staticClass:"headline"},[t._v("Followers")]),o("div",{staticClass:"followers-list"},t._l(t.followers,function(t){return o("personcard",{staticClass:"follower",attrs:{person:t}})})),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.followerModal=!1}}},[t._v("Close")])],1)],1)],1),o("v-dialog",{staticClass:"following-modal",attrs:{scrollable:"","max-width":"480px"},model:{value:t.followingModal,callback:function(e){t.followingModal=e},expression:"followingModal"}},[o("v-card",{attrs:{color:"white"}},[o("v-card-title",{staticClass:"headline"},[t._v("Following")]),o("div",{staticClass:"following-list"},t._l(t.following,function(t){return o("personcard",{staticClass:"following",attrs:{person:t}})})),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"teal lighten-1",flat:"flat",outline:""},nativeOn:{click:function(e){t.followingModal=!1}}},[t._v("Close")])],1)],1)],1)],1),o("div",[o("v-layout",{attrs:{row:"","justify-center":""}},[o("v-dialog",{attrs:{"max-width":"560"},model:{value:t.settingsModal,callback:function(e){t.settingsModal=e},expression:"settingsModal"}},[o("settingsmodal",{attrs:{toggle:t.settingsModal,profile:t.profile}})],1)],1)],1)],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},e1SC:function(t,e,o){"use strict";e.a=function(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)throw Error("maxHeight is required");var i="string"==typeof t?document.querySelectorAll(t):t;if(i){var s=o.character||"…",a=o.classname||"js-shave",r=o.spaces||!0,l='<span class="js-shave-char">'+s+"</span>";"length"in i||(i=[i]);for(var n=0;n<i.length;n+=1){var c=i[n],d=c.style,u=c.querySelector("."+a),p=void 0===c.textContent?"innerText":"textContent";u&&(c.removeChild(c.querySelector(".js-shave-char")),c[p]=c[p]);var f=c[p],h=r?f:f.split(" ");if(!(h.length<2)){var g=d.height;d.height="auto";var v=d.maxHeight;if(d.maxHeight="none",c.offsetHeight<=e)d.height=g,d.maxHeight=v;else{for(var w=h.length-1,m=0,b=void 0;m<w;)b=m+w+1>>1,c[p]=r?h.slice(0,b):h.slice(0,b).join(" "),c.insertAdjacentHTML("beforeend",l),c.offsetHeight>e?w=r?b-2:b-1:m=b;c[p]=r?h.slice(0,w):h.slice(0,w).join(" "),c.insertAdjacentHTML("beforeend",l);var x=r?h.slice(w):h.slice(w).join(" ");c.insertAdjacentHTML("beforeend",'<span class="'+a+'" style="display:none;">'+x+"</span>"),d.height=g,d.maxHeight=v}}}}}},i7u4:function(t,e,o){var i=o("MNqr");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("58691d8c",i,!1,{sourceMap:!1})},mft9:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-layout",{staticClass:"form-container",attrs:{column:"",nowrap:""}},[o("v-flex",[o("h2",[t._v("Account Settings")])]),o("v-flex",[o("div",{staticClass:"form-container-inner"},[o("v-form",{ref:"settingsForm",model:{value:t.settingsValid,callback:function(e){t.settingsValid=e},expression:"settingsValid"}},[o("v-layout",{attrs:{row:"",wrap:""}},[o("v-flex",{attrs:{xs8:""}},[o("v-text-field",{attrs:{label:"Name",color:"teal","multi-line":"",rows:"2","no-resize":"",rules:[t.rules.required],"validate-on-blur":""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),o("v-flex",{staticClass:"dp-container",attrs:{xs4:""}},[o("div",{staticClass:"dp-setting",class:{"picture-error":t.pictureError.error},style:"background-image: url("+t.picture+")",on:{click:function(e){t.$refs.dpuploadinput.click()}}}),o("p",{staticClass:"ma-0 text-xs-center",class:t.pictureError.error?"deep-orange--text":"grey--text"},[o("small",[t._v(t._s(t.pictureError.error?t.pictureError.msg:"*click to change picture"))])]),o("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"dpuploadinput",attrs:{type:"file"},on:{change:t.uploadPicture}})]),o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"About","multi-line":"","no-resize":"",rows:"2",counter:"255",maxlength:"255",color:"teal","auto-grow":""},model:{value:t.about,callback:function(e){t.about=e},expression:"about"}})],1),o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"What do you do?","multi-line":"","no-resize":"",rows:"2",counter:"255",maxlength:"255",color:"teal","auto-grow":""},model:{value:t.whatdo,callback:function(e){t.whatdo=e},expression:"whatdo"}})],1),o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"Profile URL",counter:"32",maxlength:"32",color:"teal"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}})],1),t.socialAuth?t._e():o("v-flex",[o("h3",[t._v("Change Password")])]),t.socialAuth?t._e():o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"Old Password",counter:"32",maxlength:"32",color:"teal"},model:{value:t.oldPassword,callback:function(e){t.oldPassword=e},expression:"oldPassword"}})],1),t.socialAuth?t._e():o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"New Password",counter:"32",maxlength:"32",color:"teal"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}})],1),t.socialAuth?t._e():o("v-flex",{attrs:{xs12:""}},[o("v-text-field",{attrs:{label:"Confirm New Password",counter:"32",maxlength:"32",color:"teal"},model:{value:t.newPasswordAgain,callback:function(e){t.newPasswordAgain=e},expression:"newPasswordAgain"}})],1)],1)],1)],1)]),o("v-flex",{staticClass:"text-xs-right"},[o("v-spacer"),o("v-btn",{attrs:{outline:"",flat:""},nativeOn:{click:function(e){t.$root.$emit("settingsModal",!1)}}},[t._v("Close")]),o("v-btn",{staticClass:"mr-0",attrs:{outline:"",flat:""},nativeOn:{click:function(e){t.saveSettings()}}},[t._v("Save Changes")])],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},oIMZ:function(t,e,o){"use strict";var i=o("/stw"),s=o("a6wT"),a=!1;var r=function(t){a||o("Dd19")},l=o("VU/8")(i.a,s.a,!1,r,"data-v-e0e442e6",null);l.options.__file="components\\PersonCard.vue",e.a=l.exports},q2At:function(t,e,o){"use strict";var i=o("Dd8w"),s=o.n(i),a=o("mtWM"),r=o.n(a),l=o("NYxO");e.a={props:["profile","toggle"],data:function(){return{config:this.$store.state.config,settingsValid:!0,name:"",about:"",whatdo:"",url:"",picture:"",oldPassword:"",newPassword:"",newPasswordAgain:"",rules:{required:function(t){return!!t||"Field is required."},email:function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||"Invalid e-mail."}},hasEdits:!1,pictureError:{error:!1,msg:""}}},computed:s()({},Object(l.mapGetters)({isLoggedIn:"getLoginState",socialAuth:"getSocialAuth"})),mounted:function(){var t=this;this.modalInit(),this.$root.$on("settingsModalClosed",function(e){e&&t.modalInit()})},methods:{validatePicture:function(){return"image"==this.$refs.dpuploadinput.files[0].type.split("/")[0]?(this.pictureError.error=!1,this.pictureError.msg="",!0):(this.pictureError.error=!0,this.pictureError.msg="Image files only.",!1)},uploadPicture:function(){var t=new FormData;t.append("image",this.$refs.dpuploadinput.files[0]),t.append("user_id",this.profile.user_id),t.append("screen_width",window.screen.width),t.append("folder","dp"),this.validatePicture()&&r.a.post(this.config.api+"imageupload.php",t,this.config.axiosHeader).then(function(t){console.log(t),t.data.success&&(this.picture=t.data.url)}.bind(this)).catch(function(t){console.log(t)})},modalInit:function(){var t=this;setTimeout(function(){t.name=t.profile.name,t.about=t.profile.about,t.whatdo=t.profile.whatdo,t.url=t.profile.url,t.picture=t.profile.display_picture},150)},trimInputs:function(){this.name=this.name.trim(),this.about=this.about.trim(),this.whatdo=this.whatdo.trim(),this.url=this.url.trim(),this.picture=this.picture.trim()},saveSettings:function(){var t=this;this.trimInputs(),setTimeout(function(){t.$refs.settingsForm.validate()&&(t.nameEdit(),t.aboutEdit(),t.whatdoEdit(),t.urlEdit(),t.pictureEdit(),t.profile.name=t.name,t.profile.about=t.about,t.profile.whatdo=t.whatdo,t.profile.url=t.url,t.profile.display_picture=t.picture,t.$store.commit("updateUserData",t.profile),t.$store.commit("updateUserCookie",t.profile),t.$router.push("/profile/"+t.url),t.$router.go())},0)},pictureEdit:function(){this.editExecute({table:"user_profiles",field:"display_picture",where:"user_id = "+this.profile.user_id,newstr:this.picture})},nameEdit:function(){this.editExecute({table:"user_profiles",field:"name",where:"user_id = "+this.profile.user_id,newstr:this.name})},aboutEdit:function(){this.editExecute({table:"user_profiles",field:"about",where:"user_id = "+this.profile.user_id,newstr:this.about})},whatdoEdit:function(){this.editExecute({table:"user_profiles",field:"whatdo",where:"user_id = "+this.profile.user_id,newstr:this.whatdo})},urlEdit:function(){this.editExecute({table:"user_profiles",field:"url",where:"user_id = "+this.profile.user_id,newstr:this.url})},editExecute:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};console.log(t);var e={table:t.table,field:t.field,where:t.where,newstr:t.newstr,id:t.id,sanitize:"false"};r.a.post(this.config.api+"/update.php",e,this.config.axiosHeader).catch(function(t){console.log(t.data)}),this.$root.$emit("settingsModal",!1)}}}},sv1s:function(t,e,o){var i=o("285J");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("e7f13d2c",i,!1,{sourceMap:!1})},tpOW:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,'.clearfix[data-v-258f60a9]:after{content:"";display:table;clear:both}.container[data-v-258f60a9]{margin-top:56px!important;max-width:724px!important}.profile-owner[data-v-258f60a9]{position:relative;padding:20px 25px;background-color:#fff}.profile-meta[data-v-258f60a9],.profile-picture[data-v-258f60a9]{display:inline-block;float:left;vertical-align:text-top}.profile-picture[data-v-258f60a9]{position:relative;width:120px;height:120px;background-size:cover;background-position:50%;background-repeat:no-repeat;background-color:#deeaea;border-radius:69%;text-align:center}.profile-picture small[data-v-258f60a9]{position:absolute;bottom:-2em;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:100%}.profile-meta[data-v-258f60a9]{margin-left:35px;max-width:75%}.profile-about[data-v-258f60a9],.profile-whatdo[data-v-258f60a9]{font-size:16px;font-size:1rem}.profile-follows span[data-v-258f60a9]{margin-right:5px;cursor:pointer}.profile-settings[data-v-258f60a9]{display:inline-block;position:absolute;top:20px;right:25px}.profile-posts-container[data-v-258f60a9]{padding:40px 0 0}.profile-post[data-v-258f60a9]{margin-bottom:20px}.followers-list[data-v-258f60a9],.following-list[data-v-258f60a9]{padding:0 15px;background-color:#fff}.follower[data-v-258f60a9],.following[data-v-258f60a9]{text-align:left;padding:10px;font-size:19.2px;font-size:1.2rem}.follower-dp[data-v-258f60a9],.following-dp[data-v-258f60a9],span[data-v-258f60a9]{display:inline-block;vertical-align:middle}.follower-dp[data-v-258f60a9],.following-dp[data-v-258f60a9]{margin-right:10px;height:48px;width:48px;background-size:cover;background-position:50%;border-radius:69%}.headline[data-v-258f60a9]{margin:0}.card__actions[data-v-258f60a9]{background-color:#fff}.follower-fl-btn[data-v-258f60a9]{float:right;-webkit-transform:translateY(25%);transform:translateY(25%)}.inf-loader[data-v-258f60a9]{text-align:center;width:100%}',""])}});