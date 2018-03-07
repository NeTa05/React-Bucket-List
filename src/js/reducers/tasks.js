import { TASKS_LOAD, TASKS_UNLOAD, TASK_LOAD, TASK_UNLOAD, TASK_DELETE, TASK_DONE, TASK_ADD } from '../actions';
import { createReducer } from './utils';
import { dateFromString } from '../helpers/dates.js'

const initialState = []

const handlers = {
  [TASKS_LOAD]: (state, action) => {
    if (!action.error) {

      var date_sort_asc = function ({deadline: deadline1}, {deadline: deadline2}) {

        let deadlineDate1 = dateFromString(deadline1)
        let deadlineDate2 = dateFromString(deadline2)

        if (deadlineDate1 > deadlineDate2) return 1;
        if (deadlineDate1 < deadlineDate2) return -1;
        return 0;
      };

      var date_sort_desc = function ({deadline: deadline1}, {deadline: deadline2}) {
        let deadlineDate1 =  dateFromString(deadline1)
        let deadlineDate2 = dateFromString(deadline2)

        if (deadlineDate1 > deadlineDate2) return -1;
        if (deadlineDate1 < deadlineDate2) return 1;
        return 0;
      };
      let orderTasks = [...action.payload.tasks]
      orderTasks = orderTasks.sort(date_sort_asc);
      //orderTasks = orderTasks.sort(date_sort_desc);
      action.payload.tasks = orderTasks

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
  [TASK_ADD]: ({tasks}, action) => {
    let newTasks = [...action.payload.tasks]
    newTasks.push(action.payload.task)  
    window.localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks }
  },

};

export default createReducer(initialState, handlers);
