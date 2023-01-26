<script setup lang="ts">
import { ref } from 'vue'
import { Task } from '../models/task'
import TaskEdit from './TaskEdit.vue'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['update:task', 'delete:task'])

const editing = ref(false)

function handleTaskUpdate(updatedTask: Task) {
  emit('update:task', updatedTask)
  editing.value = false
}

function handleDoneCheck(payload: Event) {
  emit('update:task', { ...props.task, done: (payload.target as HTMLInputElement).checked })
}
</script>

<template>
  <div class="task-list-item">
    <div v-if="!editing" class="task-container">
      <input class="task-container-item task-done" type="checkbox" name="task-done" :checked="props.task.done" @input="handleDoneCheck">
      <label class="task-container-item" for="task-done">{{ props.task.content }}</label>
      <button class="task-container-btn-edit" @click="editing = true">Edit</button>
      <button @click="emit('delete:task', props.task)">Delete</button>
    </div>
    <div v-else class="task-list-edit">
      <TaskEdit :task="props.task" @update:task="handleTaskUpdate" />
    </div>
  </div>
</template>

<style scoped>
.task-list-item {
  min-height: 40px;
  min-width: 500px;
  border: 1px solid;
  margin: 5px;
  box-shadow: 2px 2px 2px gray;
}
.task-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 7px;
}
.task-container-item {
  margin-right: 10px;
}
.task-done {
  cursor: pointer;
}
.task-container-btn-edit {
  margin-left: auto;
  margin-right: 5px;
}
.task-list-edit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
}
</style>
