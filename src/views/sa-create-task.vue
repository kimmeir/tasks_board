<template>
    <div>
        <h3 class="center title">{{title}}</h3>
        <div class="row">
            <form @submit.prevent="createTask" class="col s6 offset-s3">
                <div class="row">
                    <div class="input-field col s12">
                        <input
                                v-model="task_title"
                                id="title"
                                type="text"
                                class="validate"
                                required
                        >
                        <label for="title">Title</label><span class="helper-text"
                                                              data-error="This field is required"></span>
                    </div>
                    <div class="col s12">
                        <input type="text"
                               ref="datepicker"
                               v-model="date"
                        >
                    </div>
                    <div class="input-field col s12">
                        <textarea
                                v-model="description"
                                id="textarea1"
                                class="materialize-textarea"></textarea>
                        <label for="textarea1">Description</label>
                    </div>


                    <div class="input-field col s12">
                        <select
                                v-model="user"
                                ref="select">
                            <option value="" disabled selected>Select User</option>
                            <option v-for="(name, idx) of getUsers"
                                    :key="idx"
                                    :value="name">{{name}}
                            </option>
                        </select>
                    </div>

                    <div class="col s12">
                        <button
                                class="btn left"
                                type="submit"
                        >Create task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {uuid} from 'vue-uuid';
    import router from "../router";

    export default {
        data: () => ({
            title: 'Create new task',
            task_title: '',
            description: '',
            date: null,
            user: '',
        }),
        methods: {
            createTask() {
                const task = {
                    task_id: uuid.v1(),
                    status: 'to_implementation',
                    title: this.task_title,
                    date: this.date.date,
                    description: this.description,
                    user: this.user,
                }
                console.log(task)

                this.$store.dispatch('addTask', task)
                router.push({path: '/'})

            }
        },
        computed: {
            getUsers() {
                return this.$store.getters.getUsers
            }
        },
        mounted() {
            M.updateTextFields();
            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd.mm.yyyy',
                defaultDate: new Date(),
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

            M.FormSelect.init(this.$refs.select)

        },
        destroyed() {
            if (this.date && this.date.destroy) {
                this.date.destroy()
            }
            if (this.user && this.user.destroy) {
                this.user.destroy()
            }
        }
    }
</script>

<style scoped>
    .title {
        margin-bottom: 30px;
    }

    #textarea1 {
        min-height: 100px;
    }
</style>
