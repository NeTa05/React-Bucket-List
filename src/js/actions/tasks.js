import { TASKS_LOAD, TASKS_UNLOAD, TASK_LOAD, TASK_UNLOAD, TASK_DELETE, TASK_DONE, TASK_ADD } from '../actions';
import {
  watchTasks, unwatchTasks, watchTask, unwatchTask
} from '../api/tasks';

export function loadTasks() {
  const tasks = JSON.parse(window.localStorage.getItem('tasks'))
  return { type: TASKS_LOAD, payload: {tasks} }
}

export function deleteTask(id) {
  return { type: TASK_DELETE, payload: id }
}

export function doneTask(id) {
  return { type: TASK_DONE, payload: id }
}

export function addTask(task) {
  const tasks = JSON.parse(window.localStorage.getItem('tasks'))
  return { type: TASK_ADD, payload: {tasks, task} }
}

export function unloadTasks() {
  unwatchTasks();
  return { type: TASKS_UNLOAD };
}

export function loadTask(id) {
  return dispatch => (
    watchTask(id)
      .on('success',
        payload => dispatch({ type: TASK_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: TASK_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadTask(id) {
  unwatchTask(id);
  return { type: TASK_UNLOAD };
}
