<script setup lang="ts">
import { Ref, ref } from 'vue';
import { Task } from '../models/task'
import { useTasks } from '../composables/useTasks'
import TaskListItem from './TaskListItem.vue'
import TaskEdit from './TaskEdit.vue'

const { tasks, addTask, updateTask, deleteTask } = useTasks()

const newTask: Ref<Task> = ref(createEmptyTask())

function createEmptyTask() {
  return { id: 0, content: '', done: false } as Task
}

async function handleNewTaskUpdate(updatedTask: Task) {
  await addTask(updatedTask)
  newTask.value = createEmptyTask()
}

function handleExistingTaskUpdate(updatedTask: Task) {
  updateTask(updatedTask)
}

function handleExistingTaskDelete(existingTask: Task) {
  deleteTask(existingTask.id)
}
</script>

<template>
  <h1>To Do</h1>

  <div>Enter new task:</div>
  <TaskEdit :task="newTask" @update:task="handleNewTaskUpdate" />

  <div class="task-list">
    <TaskListItem
      v-for="t in tasks"
      :key="`task-${t.id}`"
      :task="t"
      @update:task="handleExistingTaskUpdate"
      @delete:task="handleExistingTaskDelete(t)"
    />
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 25px;
}
</style>
