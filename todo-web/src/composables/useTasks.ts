import { computed, ref, Ref } from 'vue';
import { Task } from '../models/task';

const tasksApiUrl = `${import.meta.env.VITE_API_BASE_URL}/tasks`

const tasks: Ref<Task[]> = ref([] as Task[])

export function useTasks() {
  loadTasks()
  return {
    tasks: computed(() => tasks.value),
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
  
async function loadTasks() {
  const response = await fetch(tasksApiUrl)
  tasks.value = await response.json()
}

async function addTask(task: Task) {
  const response = await fetch(tasksApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })

  const createdTask = await response.json()
  tasks.value.push(createdTask)
}

async function updateTask(task: Task) {
  await fetch(`${tasksApiUrl}/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })

  const existingTask = tasks.value.find(t => t.id === task.id)
  if (existingTask == null) return;

  existingTask.content = task.content
  existingTask.done = task.done
}

async function deleteTask(id: number) {
  await fetch(`${tasksApiUrl}/${id}`, {
    method: 'DELETE',
  })
  
  tasks.value = tasks.value.filter(t => t.id !== id)
}
