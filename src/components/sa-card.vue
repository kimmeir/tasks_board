<template>
    <div class="row">
        <div class="col s12">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">{{task.title}}</span>
                    <p class="description">{{task.description}}</p>
                    <p>Until: {{new Date(task.date).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}}</p>
                    <p>Executor: {{task.user}}</p>
                </div>
                <div class="card-action">
                    <router-link
                            :to="{path: '/task/', name:'Task', params:{id: task.task_id}}"
                    >View more</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            task: {
                type:Object,
                default: ()=>({})
            }
        }
    }
</script>

<style scoped>
    .description{
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
