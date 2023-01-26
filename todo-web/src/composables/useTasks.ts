import { computed, ref, Ref } from 'vue';
import { Task } from '../models/task';

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
  
function loadTasks() {
  tasks.value = [
    { id: 1, content: 'test', done: true},
    { id: 2, content: 'qwerty', done: false },
    { id: 3, content: 'easy peasy', done: true },
  ]
}

function addTask(task: Task) {
  tasks.value.push(task)
}

function updateTask(task: Task) {
  const existingTask = tasks.value.find(t => t.id === task.id)
  if (existingTask == null) return;
  existingTask.content = task.content
  existingTask.done = task.done
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
