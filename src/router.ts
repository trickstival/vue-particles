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
        },
        {
            path: '/gl-triangles',
            name: 'glTriangles',
            component: () => import('./views/GLTriangles.vue')
        },
        {
            path: '/gl-sin',
            name: 'glSin',
            component: () => import('./views/GLSin.vue')
        },
        {
            path: '/gl-smoke',
            name: 'glSmoke',
            component: () => import('./views/GLSmoke.vue')
        }
    ]
})
