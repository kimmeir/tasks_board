import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {uuid} from "vue-uuid";
import router from "../router";

axios.defaults.baseURL = "http://localhost:3000/";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: ['User1', 'User2', 'User3', 'User4', 'User5'],
        tasks: [],
        statuses: {
            to_implementation: 'To implementation',
            in_progress: 'In progress',
            in_testing: 'In testing',
            done: 'Done'
        }
    },
    mutations: {
        addTask: (state, tasks) => {
            state.tasks = tasks
        }
    },
    actions: {
        addTask: async ({commit}, task) => {
            axios.post('tasks', task)
        },
        fetchTasks: async ({commit}) => {
            const tasks = await axios.get('tasks')
            commit('addTask', await tasks.data)
        },
        deleteTask: ({commit}, id) => {
            axios({
                method: 'DELETE',
                url: 'tasks/' + id,
            });
        },
        updateTask: async ({commit}, data) => {
            console.log(data.task)
            try {
                const f = await axios.put('tasks/' + data.id, data.task)
                router.push('/')
            } catch (e) {
                console.error(e)
            }

        }
    },
    getters: {
        getUsers: ({users}) => users,
        getStatuses: ({statuses}) => statuses,
        getTasks: state => {
            return state.tasks
        },
        getTaskById: s => id => s.tasks.find(t => t.task_id === id),
        getTasksByUser: s=> user => s.tasks.find(t=> t.user === user)
    },
    modules: {}
})
