import { createRouter, createWebHistory }from 'vue-router'
import DataCards from "@/components/DataCards";
import HomePage from "@/components/HomePage";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/data',
        name: 'DataCards',
        component: DataCards
    }
];

const router = createRouter({
    history: createWebHistory(), routes,

    }
)

export default router;