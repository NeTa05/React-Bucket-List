import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';
import Button from 'grommet/components/Button';



import NavControl from '../components/NavControl';

import {
  loadTasks, unloadTasks, deleteTask, doneTask
} from '../actions/tasks';

import { pageLoaded } from './utils';

class Tasks extends Component {
  componentDidMount() {
    pageLoaded('Tasks');
    this.props.dispatch(loadTasks());
  }

  _done(id){
    this.props.dispatch(doneTask(id));
  }

  _delete(id){
    this.props.dispatch(deleteTask(id));
  }

  render() {
    const { error, tasks } = this.props;
    const { intl } = this.context;

    const tasksNode = (tasks || []).map(task => {



      let deleteButton;
      if (['Done', 'Fail'].includes(task.status)) {
        deleteButton = <Button 
            label='Delete'
            onClick={this._delete.bind(this, task.id)} />
      }

      return <TableRow  key={`task_${task.id}`}>
        <td>
          {task.id}
        </td>
        <td className='secondary'>
          {task.description}
        </td>
        <td className='secondary'>
          {task.deadline}
        </td>
        <td className='secondary'>
          {task.status}
        </td>
        <td className='secondary'>
          <Button 
            label='Done'
            onClick={this._done.bind(this, task.id)} />
          {deleteButton}
        </td>
      </TableRow>      
    }

    );
   
    return (
      <Table>
        <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Description
            </th>
            <th>
              Deadline
            </th>
            <th>
              Status
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasksNode}
        </tbody>
      </Table>
    );
  }
}

Tasks.defaultProps = {
  error: undefined,
  tasks: []
};

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Tasks.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.tasks });

export default connect(select)(Tasks);
