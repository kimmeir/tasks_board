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
        addTasks: (state, tasks) => {
            state.tasks = tasks
        },
        addTask: ({tasks}, task) => {
            tasks.push(task)
        },
        deleteTask: ({tasks}, id) => {
            let idx = tasks.findIndex(t => t.id === id)
            tasks.splice(idx, 1)
        },
        updateTask: (state, task) => {
            let idx = state.tasks.findIndex(t => t.id === task.id)
            state.tasks[idx] = task
        }
    },
    actions: {
        addTask: async ({commit}, task) => {
            let new_task = await axios.post('tasks', task)
            commit('addTask', await new_task.data)
        },
        fetchTasks: async ({commit}) => {
            const tasks = await axios.get('tasks')
            commit('addTasks', await tasks.data)
        },
        deleteTask: async ({commit}, id) => {
            let resp = await axios({
                method: 'DELETE',
                url: 'tasks/' + id,
            });
            commit('deleteTask', id)
        },
        updateTask: async ({commit}, data) => {
            console.log(data.task)
            try {
                const res = await axios.put('tasks/' + data.id, data.task)

                console.log(await res.data)
                commit('updateTask', await res.data)
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
        getTasksByUser: s => user => s.tasks.find(t => t.user === user)
    },
    modules: {}
})
