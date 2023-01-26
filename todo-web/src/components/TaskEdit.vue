<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { Task } from '../models/task'

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['update:task'])

const editableTask: Ref<Task> = ref({} as Task)
watch(
  () => props.task,
  (newTaskVal) => {
    editableTask.value = { ...newTaskVal }
  },
  { immediate: true }
)
</script>

<template>
  <div class="task-edit-container">
    <input class="task-edit-input" v-model="editableTask.content">
    <button @click="emit('update:task', editableTask)">Save</button>
  </div>
</template>

<style scoped>
.task-edit-input {
  min-width: 365px;
  margin-right: 5px;
}
</style>
