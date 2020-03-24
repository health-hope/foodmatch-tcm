import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { getUrlParam } from '@/assets/js/util.js'
Vue.use(Router)
const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0, y: 0
			}
		}
	},
	routes
})
router.beforeEach((to, from, next) => {
	if (navigator.onLine) {
		let code = getUrlParam('code')
		switch (Number(code)) {
			case 1:
				document.title = '中医心系证候饮食推荐'
				break;
			case 2:
				document.title = '中医肝系证候饮食推荐'
				break;
			case 3:
				document.title = '中医肺系证候饮食推荐'
				break;
			case 4:
				document.title = '中医脾系证候饮食推荐'
				break;
			case 5:
				document.title = '中医胃系证候饮食推荐'
				break;
			case 6:
				document.title = '中医肾系证候饮食推荐'
				break;
			case 7:
				document.title = '中医小肠系证候饮食推荐'
				break;
			case 8:
				document.title = '中医大肠系证候饮食推荐'
				break;
			case 9:
				document.title = '中医胆系证候饮食推荐'
				break;
		}
		next()
	} else {
		Vue.prototype.$toast('网络好像有点问题，请检查后重试！')
		next(false)
	}
})
export default router