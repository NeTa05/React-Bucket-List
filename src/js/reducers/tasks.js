import { TASKS_LOAD, TASKS_UNLOAD, TASK_LOAD, TASK_UNLOAD, TASK_DELETE } from '../actions';
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
    return { tasks: tasks.filter(task => task.id !== action.payload) }
  },
};

export default createReducer(initialState, handlers);
