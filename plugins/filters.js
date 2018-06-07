import Vue from 'vue';
import moment from 'moment';
import moment_tz from 'moment-timezone';

//uppercase first letter
Vue.filter('ucfirst', function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

//date time difference from current time and date ( example: 10 days ago )
Vue.filter('DateDiffFilter', function (datetime, suffix = false) {
    return moment(datetime).fromNow(suffix);
});

//replace spaces with dashes
Vue.filter('replaceSpaceWithDash', function (str) {
    //replace special chars first, then replace spaces with dashes
    return str.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
});

//lowercase letters
Vue.filter('tolowercase', function (str) {
    //replace special chars first, then replace spaces with dashes
    return str.toLowerCase();
});

//strip text of tags
Vue.filter('stripTags', function(str) {
    return str.replace(/(<([^>]+)>)/ig, "");
});