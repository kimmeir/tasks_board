<template>
    <div>
        <h3 class="center title">{{task.title}}</h3>
        <div class="row">
            <form @submit.prevent="updateTask" class="col s6 offset-s3">
                <div class="row">
                    <div class="input-field col s12">
                        <input
                                v-model="task.title"
                                id="title"
                                type="text"
                                class="validate"
                                placeholder="Title"
                                required
                        >
                        <label for="title">Title</label>
                        <span class="helper-text"
                              data-error="This field is required"></span>
                    </div>
                    <div class="col s12">
                        <input type="text"
                               ref="datepicker"
                        >
                    </div>
                    <div class="input-field col s12">
                        <textarea
                                v-model="task.description"
                                id="textarea1"
                                class="materialize-textarea"
                                placeholder="Description"
                        ></textarea>
                        <label for="textarea1">Description</label>
                    </div>

                    <div class="input-field col s12">
                        <select
                                v-model="task.user"
                                class="browser-default"
                        >
                            <option v-for="(name, idx) of getUsers"
                                    :key="idx"
                                    :value="name"
                            >{{name}}
                            </option>
                        </select>
                    </div>

                    <div class="input-field col s12">
                        <select
                                v-model="task.status"
                                class="browser-default">
                            <option v-for="(name, idx) of statuses"
                                    :key="idx"
                                    :value="idx"
                            >{{name}}
                            </option>
                        </select>
                    </div>
                    <div class="col s12">
                        <button
                                class="btn left"
                                type="submit"
                        >Update task
                        </button>
                        <button
                                type="button"
                                class="red btn left delete"
                                @click="deleteTask()"
                        >Delete task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        data: () => ({
            date: null,
            task: {},
            statuses: {},
        }),
        methods: {
            getTask() {
                return this.$store.getters.getTaskById(this.$route.params.id)
            },
            updateTask() {
                const task = {...this.task}
                delete task.id
                task.date = this.date.date
                this.$store.dispatch('updateTask', {task, id: this.task.id})
            },
            deleteTask() {
                this.$store.dispatch('deleteTask', this.task.id)
                router.push({path: '/'})
            }
        },
        computed: {
            getUsers() {
                return this.$store.getters.getUsers
            }
        },
        mounted() {
            this.task = this.getTask()
            M.updateTextFields();

            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true,
                disableDayFn: (date) => {
                    const newDate = new Date()
                    if ((date.getMonth() === newDate.getMonth() && date.getDate() === newDate.getDate())
                        || date > newDate)
                        return false
                    else
                        return true
                }
            });
            this.statuses = this.$store.getters.getStatuses
        },
        destroyed() {
            if (this.date && this.date.destroy) {
                this.date.destroy()
            }
        }
    }
</script>

<style scoped>
    .title {
        margin-bottom: 30px;
    }

    .delete {
        margin-left: 20px;
    }

    #textarea1 {
        min-height: 100px;
    }
</style>
