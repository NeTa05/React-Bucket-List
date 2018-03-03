import { TASKS_LOAD, TASKS_UNLOAD, TASK_LOAD, TASK_UNLOAD, TASK_DELETE, TASK_DONE } from '../actions';
import { createReducer } from './utils';

const initialState = []

const handlers = {
  [TASKS_LOAD]: (state, action) => {
    if (!action.error) {
      return action.payload;
    }
    return { error: action.payload };
  },
  [TASK_DELETE]: ({tasks}, action) => {
    let newTasks = tasks.filter(task => task.id !== action.payload);
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks }
  },
  [TASK_DONE]: ({tasks}, action) => {

    let newTasks = tasks.map( task => {
      if (task.id === action.payload) {
        return {
          ...task,
          status: 'Done'
        }
      }
      return task;
    });
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks }
  },
};

export default createReducer(initialState, handlers);
