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

import {
  loadTask, unloadTask
} from '../actions/tasks';

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
        },
        deadline: {
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

  _handleSubmit(event) {
    event.preventDefault();
    if (this._canSubmit()) {
      alert('An essay was submitted: ' + JSON.stringify(this.state));
    }
  }

  _validateDescription() {
    const message = this.state.description.length > 5 ?  'May not be greater than 150.' : ''
    this.setState({
      errors: { ...this.state.errors, 'description' : {message} },
    });
  }

  _onChangeDate(deadline) {
    this.setState({deadline});
    console.log(deadline);
  }

  _getNextYear() {
    let nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    return nextYear.getMonth() + 1 + '/' + nextYear.getDate() + '/' + nextYear.getFullYear()
  }

  _canSubmit() {
    //TODO: Validate correct date format
    return this.state.description.length > 0 && this.state.deadline.length > 0
  }

  render() {
    let error = this.state.errors.description.message
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
                    error={`${error}`}>
                    <TextInput 
                      id='description'
                      onDOMChange={this._handleChangeDescription.bind(this)}
                      />
                  </FormField>
                  <FormField>
                    <DateTime
                      id='deadline'
                      format='M/D/YYYY'
                      onChange={this._onChangeDate.bind(this)}
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
