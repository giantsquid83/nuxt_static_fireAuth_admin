export { default as AppHeader } from '../..\\components\\appHeader.vue'
export { default as Message } from '../..\\components\\message.vue'
export { default as ModCounter } from '../..\\components\\ModCounter.vue'
export { default as UserCounter } from '../..\\components\\UserCounter.vue'
export { default as UserForm } from '../..\\components\\UserForm.vue'

export const LazyAppHeader = import('../..\\components\\appHeader.vue' /* webpackChunkName: "components_appHeader'}" */).then(c => c.default || c)
export const LazyMessage = import('../..\\components\\message.vue' /* webpackChunkName: "components_message'}" */).then(c => c.default || c)
export const LazyModCounter = import('../..\\components\\ModCounter.vue' /* webpackChunkName: "components_ModCounter'}" */).then(c => c.default || c)
export const LazyUserCounter = import('../..\\components\\UserCounter.vue' /* webpackChunkName: "components_UserCounter'}" */).then(c => c.default || c)
export const LazyUserForm = import('../..\\components\\UserForm.vue' /* webpackChunkName: "components_UserForm'}" */).then(c => c.default || c)
