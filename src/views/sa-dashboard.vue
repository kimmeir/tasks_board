<template>
    <div class="container">
        <div class="row">
            <div class="input-field col s4">
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
            <div class="input-field col s4">
                <input
                        @keydown.enter="searchTask()"
                        v-model="search"
                        id="search"
                        type="text"
                        class="validate">
                <label for="search">Search</label>
            </div>
            <div class="input-field col s4">
                <button @click="tasks = getTasks()"
                        class="waves-effect waves-light btn-small sa-btn right"
                >Reset filter</button>
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
    import {mapActions, mapGetters} from 'vuex'

    export default {

        data: () => ({
            title: 'message',
            statuses: {},
            tasks: null,
            user_filter: null,
            search: null,
        }),
        components: {
            tasksCol
        },
        computed: {
            getTasksComp() {
                this.tasks = this.$store.state.tasks
            },
            getUsers() {
                return this.$store.getters.getUsers
            },
        },
        methods: {
            ...mapGetters(['getTasks']),

            filterByUser() {
                this.tasks = this.getTasks()
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
                    if (new_tasks) {
                        this.tasks = new_tasks
                    }
                }
            },
        },
        mounted() {
            this.tasks = this.getTasks()

            this.statuses = this.$store.getters.getStatuses
            this.user_filter = M.FormSelect.init(this.$refs.user_filter)
        },
    }
</script>

<style lang="scss" scoped>
    .home {
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
</style>
