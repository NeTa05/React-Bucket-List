import { createStore, compose, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';

if (window.localStorage.getItem('tasks') === null ){
	window.localStorage.setItem('tasks', JSON.stringify([
    {
      id: 'task-1',
      description: 'Initializing instance',
      deadline: 0,
      status: 'Progress'
    },
    {
      id: 'task-2',
      description: 'Adding components',
      deadline: 0,
      status: 'Fail'
    },
    {
      id: 'task-3',
      description: 'Testing infrastructure',
      deadline: 0,
      status: 'Done'
    }
  ]));
}





export default compose(applyMiddleware(thunk))(createStore)(root);
