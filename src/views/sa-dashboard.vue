<template>
    <div class="container">
        <div class="row">
            <div class="input-field col s6">
                <select
                        @change="filterByUser()"
                        v-model="user_filter"
                        ref="user_filter"
                >
                    <option value="" disabled selected>Choose user</option>
                    <option
                            v-for="(name, i) of getUsers"
                            :key="i"
                            :value="name"
                    >{{name}}
                    </option>
                </select>
            </div>
            <div class="input-field col s6">
                <input
                        @keydown.enter="searchTask()"
                        v-model="search"
                        id="search"
                        type="text"
                        class="validate">
                <label for="search">Search</label>
            </div>
        </div>

        <div v-if="tasks"
             class="home row"
        >
            <tasks-col
                    v-for="(s,i) of statuses"
                    :key="i"
                    :t_key="i"
                    :title="s"
                    :tasks="tasks"
            />
        </div>
        <div v-else
             class="home row"
        >
            No tasks yet.
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import tasksCol from '@/components/sa-task-column'
    import {mapActions} from 'vuex'

    export default {
        data: () => ({
            title: 'message',
            statuses: {},
            tasks: [],
            user_filter: null,
            search: null,

        }),
        components: {
            tasksCol
        },
        computed: {
            getTasks() {
                this.fetchTasks();
                this.tasks = this.$store.getters.getTasks
            },
            getUsers() {
                return this.$store.getters.getUsers
            },
        },
        methods: {
            filterByUser() {
                this.tasks = this.tasks.filter(t => {
                        if (!this.user_filter)
                            return true
                        else
                            return t.user === this.user_filter
                    }
                )
            },
            searchTask() {
                if (this.search) {
                    let new_tasks = []
                        this.tasks.forEach(t => {
                        if (t.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            new_tasks.push(t)
                        }
                    })
                    if(new_tasks){
                        this.tasks = new_tasks
                    }
                }
                else
                    this.getTasks
            },
            ...mapActions(['fetchTasks'])
        },
        mounted() {
            this.statuses = this.$store.getters.getStatuses
            this.user_filter = M.FormSelect.init(this.$refs.user_filter)
            this.getTasks
        },
        watch: {
            /*tasks() {
                console.log(this.tasks)
            }*/
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
</style>
