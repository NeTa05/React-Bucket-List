import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import { addTask } from '../actions/tasks';
import { pageLoaded } from './utils';

class Manage extends Component {
  componentDidMount() {
    pageLoaded('Manage');
  }

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      deadline: this._getNextYear(),
      errors: {
        description: {
          message : ''
        }
      }
    };
  }

  _handleChangeDescription({ target: { value : description } }) {
    this.setState({description}, function() {
      this._validateDescription()
    });
  }

  _handleOnBlurDescription() {
    this._validateDescription()
  }

  _findLastId(){
    const tasks = JSON.parse(window.localStorage.getItem('tasks'))
    let maxId = 0
    tasks.forEach(function (task) {
      if (task.id > maxId) {
        maxId = task.id
      }
    })
    maxId++
    return maxId
  }

  _handleSubmit(event) {
    event.preventDefault()
    this._validateDescription()
    if (this._canSubmit()) {
      let task = {id: this._findLastId(), 
                  description: this.state.description,
                  deadline: this.state.deadline,
                  status: 'In Progress'};
      this.props.dispatch(addTask(task))
      window.location = '/dashboard'
    } 
  }

  _validateDescription() {

    let message = ''
    if (this.state.description.length > 150) {
      message = 'May not be greater than 150.'
    }
    else if (this.state.description.trim().length === 0 ) {
      message = 'The field is required.' 
    }
    this.setState({
      errors: { ...this.state.errors, 'description' : {message} },
    });
  }

  _onChangeDate(deadline) {
    this.setState({deadline})
  }

  _getNextYear() {
    let nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    return nextYear.getMonth() + 1 + '/' + nextYear.getDate() + '/' + nextYear.getFullYear()
  }

  _canSubmit() {
    return this.state.description.length > 0 && this.state.deadline.length > 0
  }

  _onKeyPressDate(event){
     event.preventDefault()
  }

  _onKeyDownDate(event) {
    var key = event.keyCode || event.charCode;
    if( key == 8 || key == 46 )
      event.preventDefault()
  } 

  render() {
    let descriptionError = this.state.errors.description.message
    return (
            <Box direction='row'
              justify='center'
              align='center'>
              <Form>
                <Header>
                  <Heading>
                    Add Task
                  </Heading>
                </Header>
                <FormFields>
                  <FormField label='Description'
                    error={`${descriptionError}`}>
                    <TextInput 
                      id='description'
                      onDOMChange={this._handleChangeDescription.bind(this)}
                      onBlur={this._handleOnBlurDescription.bind(this)}
                      />
                  </FormField>
                  <FormField>
                    <DateTime
                      id='deadline'
                      format='M/D/YYYY'
                      onChange={this._onChangeDate.bind(this)}
                      onKeyPress={this._onKeyPressDate}
                      onKeyDown={this._onKeyDownDate}
                      onPaste={this._onKeyPressDate}
                      autoComplete='off'
                      value={this.state.deadline}
                    />
                  </FormField>
                  <t />
                </FormFields>
                <Footer pad={{"vertical": "medium"}}>
                  <Button label='Submit'
                    type='submit'
                    primary={true}
                    disabled={true}
                    onClick={this._handleSubmit.bind(this)}
                     />
                </Footer>
              </Form>
            </Box>
          )
  }
}

Manage.defaultProps = {
};

Manage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const select = state => ({ ...state.tasks });

export default connect(select)(Manage);
