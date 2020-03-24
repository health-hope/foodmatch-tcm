/**
 * @param {Boolean} cache 是否启用路由缓存
 * @param {String} title document.title字段
 */
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { cache: false, title: '中医心系证候饮食推荐' }
    },
    {
        path: '/configure',
        name: 'configure',
        component: () => import('@/views/configure/Configure.vue'),
        meta: { cache: false, title: '配餐条件' }
    },
    
    {
        path: '/result',
        name: 'result',
        component: () => import('@/views/result/Result.vue'),
        meta: { cache: true, title: '中医心系证候饮食推荐' }
    },
    {
        path: '/ingredientsInfo',
        name: 'ingredientsInfo',
        component: () => import('@/views/ingredientsInfo/Ingredients.vue'),
        meta: { cache: false, title: '中医心系证候饮食推荐' }
    },
    {
        path: '/details',
        name: 'details',
        component: () => import('@/views/details/Details.vue'),
        meta: { cache: true, title: '中医心系证候饮食推荐' }
    }
]
export default routes
