webpackJsonp([6],{"/SB9":function(e,t,i){"use strict";var r=i("GaXC");t.a={components:{postcomp:r.a}}},DBWV:function(e,t,i){"use strict";var r=function(){var e=this.$createElement;return(this._self._c||e)("postcomp",{attrs:{edit:!1}})};r._withStripped=!0;var a={render:r,staticRenderFns:[]};t.a=a},GaXC:function(e,t,i){"use strict";var r=i("jHTt"),a=i("issQ"),o=!1;var s=function(e){o||i("wOHJ")},l=i("VU/8")(r.a,a.a,!1,s,null,null);l.options.__file="components\\PostComp.vue",t.a=l.exports},SEsI:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("/SB9"),a=i("DBWV"),o=i("VU/8")(r.a,a.a,!1,null,null,null);o.options.__file="pages\\new-post\\index.vue",t.default=o.exports},issQ:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",{staticClass:"new-post-container text-xs-left"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{staticClass:"new-post-title",attrs:{label:"Title",textarea:"","no-resize":"","auto-grow":"",rows:"3",counter:150,maxlength:"150",color:"teal"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}})],1),i("v-flex",{attrs:{xs12:""}},[i("quill-editor",{ref:"myQuillEditor",attrs:{options:e.quillOptions},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{staticClass:"new-post-excerpt mb-0",attrs:{label:"Custom excerpt",textarea:"","no-resize":"","auto-grow":"",rows:"2",counter:150,maxlength:"150",color:"teal"},model:{value:e.excerpt,callback:function(t){e.excerpt=t},expression:"excerpt"}})],1),i("v-flex",{staticClass:"new-post-category text-xs-left",attrs:{xs12:"",md2:""}},[i("label",{attrs:{for:"category-select"}},[e._v("Category: ")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.category,expression:"category"}],attrs:{id:"category-select"},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.category=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"Uncategorized:0"}},[e._v("Uncategorized")]),e._l(e.categories,function(t){return i("option",{domProps:{value:t.category+":"+t.id}},[e._v(e._s(t.category))])})],2)]),i("v-flex",{staticClass:"featured-img",attrs:{xs12:"",sm8:"",md5:""}},[i("label",{attrs:{for:"featured-img"}},[e._v("Upload Featured Image(Optional): ")]),i("input",{attrs:{type:"file",accept:"image/*",id:"featured-img"},on:{change:function(t){e.uploadImageError.error=!1,e.uploadImageSuccess.success=!1}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:""!=e.featuredImage,expression:"featuredImage != ''"}],staticClass:"remove-img",on:{click:e.clearFeaturedImage}},[e._v("×")]),i("v-btn",{staticClass:"featured-img-upload-btn d-inline-block ma-0 ml-2",attrs:{flat:"",outline:"",loading:e.iloading,disabled:e.iloading},on:{click:function(t){e.featuredImageUpload(),e.iloader="iloading"}}},[e._v("\n            Upload\n      ")]),i("p",{directives:[{name:"show",rawName:"v-show",value:1==e.uploadImageError.error,expression:"uploadImageError.error == true"}],staticClass:"red--text"},[e._v(e._s(e.uploadImageError.msg))]),i("p",{directives:[{name:"show",rawName:"v-show",value:1==e.uploadImageSuccess.success,expression:"uploadImageSuccess.success == true"}],staticClass:"teal--text"},[e._v(e._s(e.uploadImageSuccess.msg))])],1),i("v-flex",{staticClass:"publish-btn text-xs-left text-lg-right",attrs:{xs12:"",md4:""}},[i("v-btn",{attrs:{flat:"",outline:""},on:{click:e.publish}},[e._v("Publish")]),i("p",{directives:[{name:"show",rawName:"v-show",value:e.publishError.error,expression:"publishError.error"}],staticClass:"red--text"},[e._v(e._s(e.publishError.msg))])],1)],1),i("form",[i("input",{staticClass:"image",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*",name:"image"}})])],1)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};t.a=a},jHTt:function(e,t,i){"use strict";var r=i("Dd8w"),a=i.n(r),o=i("NYxO"),s=i("mtWM"),l=i.n(s);t.a={props:["edit"],data:function(){return{config:this.$store.state.config,title:"",content:"",excerpt:"",categories:[],category:"Uncategorized:0",screenWidth:null,featuredImage:"",uploadImageError:{error:!1,msg:""},uploadImageSuccess:{success:!1,msg:"Image upload success!"},iloader:null,iloading:!1,uploadFile:null,disableUpload:!0,publishError:{error:!1,msg:""},quillOptions:{modules:{toolbar:{container:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image","video"],["formula","clean"]],handlers:{image:this.imageHandler}},history:{delay:2e3,maxStack:500,userOnly:!0},imageResize:{},videoResize:{},formula:!0},theme:"snow",placeholder:"Share your story..."}}},computed:a()({},Object(o.mapGetters)({isLoggedIn:"getLoginState",userData:"getUserData",userID:"getUserID"}),{categoryID:function(){return this.category.split(":")[1]},categoryName:function(){return this.category.split(":")[0]}}),created:function(){this.getCategories(),this.edit&&setTimeout(function(){this.getPost()}.bind(this),250)},mounted:function(){this.screenWidth=window.screen.width;var e=document.querySelector(".quill-editor");document.querySelector(".application--wrap").addEventListener("click",function(t){t.target.classList.contains("ql-editor")||e.classList.remove("is-writing")}),e.addEventListener("click",function(){this.classList.add("is-writing")})},methods:{getPost:function(){var e="id="+this.$route.params.id+"&user_id="+this.userID+"&screen_width="+this.screenWidth+"&comments_per=10";l.a.post(this.config.api+"blog.php",e,this.config.axiosHeader).then(function(e){console.log(e),this.title=e.data[0].title,this.content=e.data[0].body,this.excerpt=e.data[0].excerpt,this.featuredImage=e.data[0].featured_img,this.category=null!=e.data[0].categories?e.data[0].categories:"Uncategorized:0"}.bind(this))},validate:function(){var e=document.querySelector("#featured-img");return void 0!==e.files[0]&&0!=e.files[0].size&&""==this.featuredImage?(this.publishError.error=!0,this.publishError.msg="You selected a featured image, but didn't upload it.",!1):""==this.title?(this.publishError.error=!0,this.publishError.msg="Please enter a title.",!1):""!=this.content||(this.publishError.error=!0,this.publishError.msg="You didn't write anything.",!1)},publish:function(){var e={user_id:this.userID,user_url:this.userData.url,is_verified:this.userData.verified,post_title:this.title,post_body:this.content,post_excerpt:this.excerpt,post_category_id:this.categoryID,post_category_name:this.categoryName,featured_img:this.featuredImage,edit:this.edit,edit_id:this.$route.params.id};this.validate()&&(this.publishError.error=!1,l.a.post(this.config.api+"publish.php",e,this.config.axiosHeader).then(function(e){if(1==e.data.success){var t=e.data.post_id;this.$store.commit("setLoadingScreen",!0),setTimeout(function(){this.$router.push({path:"/post/"+this.$options.filters.replaceSpaceWithDash(this.title)+"/"+t})}.bind(this),1500)}else this.publishError.error=!0,this.publishError.msg=e.data.error}.bind(this)).catch(function(e){console.log(e)}))},clearFeaturedImage:function(){document.querySelector("#featured-img").value="",this.featuredImage="",this.uploadImageError.error=!1,this.uploadImageSuccess.success=!1},featuredImageUpload:function(){var e=document.querySelector("#featured-img"),t=document.querySelector(".featured-img-upload-btn");if(void 0!==e.files[0]){var i=e.files[0].type.split("/");console.log(this.uploadImageError),"image"==i[0]?(e.disabled=!0,t.disabled=!1,this.uploadImageError.error=!1,this.uploadImage(e.files[0],!0)):(this.uploadImageError.error=!0,this.uploadImageError.msg="Please upload image files only.")}else this.featuredImage=""},getCategories:function(){l.a.get(this.config.api+"getcategories.php",this.config.axiosHeader).then(function(e){this.categories=e.data}.bind(this)).catch(function(e){console.log(e)})},imageHandler:function(e){if(e){var t=document.querySelector(".image");t.click(),t.onchange=function(){"image"==t.files[0].type.split("/")[0]?this.uploadImage(t.files[0]):console.log("image only!")}.bind(this)}},uploadImage:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(0!=e.size){if(1==t){this.iloader="iloading";var i=this.iloader;this[i]=!this[i]}var r=new FormData;r.append("image",e),r.append("user_id",this.userID),r.append("screen_width",this.screenWidth),r.append("folder","posts"),l.a.post(this.config.api+"imageupload.php",r,this.config.axiosHeader).then(function(e){e.data.success&&!t&&this.insertImagetoEditor(e.data.url),e.data.success&&t&&(this[i]=!1,this.iloader=null,document.querySelector("#featured-img").disabled=!1,this.featuredImage=e.data.url,this.uploadImageSuccess.success=!0)}.bind(this)).catch(function(e){console.log(e)})}},insertImagetoEditor:function(e){var t=this.$refs.myQuillEditor.quill.getSelection();this.$refs.myQuillEditor.quill.insertEmbed(t.index,"image",e)}}}},jQNC:function(e,t,i){(e.exports=i("FZ+f")(!1)).push([e.i,".container{padding-top:90px}.quill-editor{height:420px}.quill-editor iframe{pointer-events:none}.quill-editor.is-writing .ql-container.ql-snow,.quill-editor.is-writing .ql-toolbar.ql-snow{border-color:#009688!important;-webkit-transition:border-color .3s ease;transition:border-color .3s ease}.new-post-excerpt,.new-post-title{padding:0;margin-bottom:15px}@media only screen and (max-width:600px){.new-post-excerpt{margin-top:100px}}.ql-container{height:360px}.ql-container.ql-snow,.ql-toolbar.ql-snow{border:2px solid grey}.ql-toolbar button.ql-active,.ql-toolbar button.ql-active svg .ql-fill,.ql-toolbar button.ql-active svg .ql-stroke{-webkit-transition:fill .3s;transition:fill .3s;color:#009688!important}.ql-toolbar button.ql-active svg .ql-fill{fill:#009688!important}.ql-toolbar button.ql-active svg .ql-stroke{stroke:#009688!important}.ql-picker-label.ql-active .ql-fill,.ql-toolbar button:hover>svg .ql-fill{fill:#009688!important}.ql-picker-label.ql-active .ql-stroke,.ql-toolbar .ql-picker:hover>.ql-picker-label .ql-stroke,.ql-toolbar button:hover>svg .ql-stroke{stroke:#009688!important}.ql-picker-item:hover,.ql-picker-label.ql-active,.ql-toolbar .ql-picker:hover>.ql-picker-label{color:#009688!important}.new-post-category{margin-right:20px}.new-post-category select{font-size:16px;font-size:1rem;padding:8px 10px;width:100%;border:1px solid #d3d3d3}label{top:13px!important}.featured-img{position:relative}@media only screen and (max-width:1264px){.featured-img{margin-top:18px}}.featured-img-upload-btn{height:35px;-webkit-transform:translateY(-1px);transform:translateY(-1px)}@media only screen and (max-width:600px){.featured-img-upload-btn{margin:10px 0!important}}#featured-img{padding:5px 30px 5px 5px;border:1px solid #d3d3d3}.remove-img{position:absolute;cursor:pointer;right:117px;font-size:32px;font-size:2rem;font-weight:700}.publish-btn{margin-top:21px;margin-left:60px}@media only screen and (max-width:1264px){.publish-btn{margin:18px 0}.publish-btn button{margin:0}}@media only screen and (min-width:1264px){.container{max-width:1024px!important}}",""])},wOHJ:function(e,t,i){var r=i("jQNC");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);i("rjj0")("27ec3da3",r,!1,{sourceMap:!1})}});