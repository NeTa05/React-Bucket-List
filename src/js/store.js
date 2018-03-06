import { createStore, compose, applyMiddleware } from 'redux';
import root from './reducers/root';
import thunk from 'redux-thunk';

if (window.localStorage.getItem('tasks') === null ){
	window.localStorage.setItem('tasks', JSON.stringify([
    {
      id: 1,
      description: 'Initializing instance',
      deadline: '3/6/2019',
      status: 'In Progress'
    },
    {
      id: 2,
      description: 'Adding components',
      deadline: '3/6/2019',
      status: 'Fail'
    },
    {
      id: 3,
      description: 'Testing infrastructure',
      deadline: '3/6/2019',
      status: 'Done'
    }
  ]));
}





export default compose(applyMiddleware(thunk))(createStore)(root);
