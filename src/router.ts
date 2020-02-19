import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'positionParticles'
            }
        },
        {
            path: '/position',
            name: 'positionParticles',
            component: () => import('./views/Main.vue')
        },
        {
            path: '/single',
            name: 'singleParticles',
            component: () => import('./views/SingleParticles.vue')
        },
        {
            path: '/trigonometry',
            name: 'trigonometry',
            component: () => import('./views/Trigonometry.vue')
        }
    ]
})
