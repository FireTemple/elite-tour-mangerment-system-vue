import Vue from 'vue';
import Vuex from 'vuex';

// 1. 安装
Vue.use(Vuex);
// 2. 创建对象
let store = new Vuex.Store({
    state: {
        // userId:'1',
        // username:'Bohan'
    },
    mutations: {
        getUserId(state){
            console.log(state.userId);
            return state.userId;
        },
        getUserName(state){
            return state.username;
        }
    }
});

// 3. 导出
export default store
