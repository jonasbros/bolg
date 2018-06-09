import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _300ea302 = () => import('..\\pages\\new-post\\index.vue' /* webpackChunkName: "pages_new-post_index" */).then(m => m.default || m)
const _5ad6c886 = () => import('..\\pages\\profile\\settings.vue' /* webpackChunkName: "pages_profile_settings" */).then(m => m.default || m)
const _0b03a31d = () => import('..\\pages\\search\\_term.vue' /* webpackChunkName: "pages_search__term" */).then(m => m.default || m)
const _42095fda = () => import('..\\pages\\profile\\_url.vue' /* webpackChunkName: "pages_profile__url" */).then(m => m.default || m)
const _f6d8362c = () => import('..\\pages\\edit\\_id.vue' /* webpackChunkName: "pages_edit__id" */).then(m => m.default || m)
const _4a5348c7 = () => import('..\\pages\\browse\\_by\\_sort.vue' /* webpackChunkName: "pages_browse__by__sort" */).then(m => m.default || m)
const _1d08d45b = () => import('..\\pages\\post\\_title\\_id.vue' /* webpackChunkName: "pages_post__title__id" */).then(m => m.default || m)
const _7cc2cf4c = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/new-post",
			component: _300ea302,
			name: "new-post"
		},
		{
			path: "/profile/settings",
			component: _5ad6c886,
			name: "profile-settings"
		},
		{
			path: "/search/:term?",
			component: _0b03a31d,
			name: "search-term"
		},
		{
			path: "/profile/:url?",
			component: _42095fda,
			name: "profile-url"
		},
		{
			path: "/edit/:id?",
			component: _f6d8362c,
			name: "edit-id"
		},
		{
			path: "/browse/:by?/:sort?",
			component: _4a5348c7,
			name: "browse-by-sort"
		},
		{
			path: "/post/:title?/:id?",
			component: _1d08d45b,
			name: "post-title-id"
		},
		{
			path: "/",
			component: _7cc2cf4c,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
