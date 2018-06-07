import Vue from 'vue';
import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor';
import ImageResize from 'quill-image-resize-module';
import VideoResize from 'quill-video-resize-module';
 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/videoResize', VideoResize);
Vue.use(VueQuillEditor)
