<template>
    <div class="col s3 sa-column">
        <span class="card-title">{{title}}</span>
        <task-card
                v-for="(task, i) of tasks.filter(t=> t.status === t_key)"
                :key="task.id"
                :task="task"
        />
    </div>
</template>

<script>
    import taskCard from '@/components/sa-card'

    export default {
        components: {
            taskCard
        },
        props: {
            t_key: String,
            title: String,
            tasks: {
                type: Array,
                default: () => ([])
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sa-column {
        border-radius: 10px;
        border: 2px solid #bdbdbd;
        &:not(:last-child){
            margin-right: 5px;
        }

        .card-title {
            color: #212121;
            width: 100%;
            display: inline-flex;
            justify-content: center;
            font-size: 1.2em
        }
    }
</style>
