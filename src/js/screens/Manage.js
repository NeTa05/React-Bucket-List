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

  _setDate(date) {
    console.log(date);
  }

  render() {
    
    return (<Form>
            <Header>
              <Heading>
                Add Task
              </Heading>
            </Header>
            <FormFields>
              <FormField label='Description'
                error='sample error'>
                <TextInput />
              </FormField>
              <FormField>
                <DateTime
                  id='deadline'
                  name='deadline'
                  format='M/D/YYYY'
                  onChange={this._setDate}
                />
              </FormField>
              <t />
            </FormFields>
            <Footer pad={{"vertical": "medium"}}>
              <Button label='Submit'
                type='submit'
                primary={true}
                 />
            </Footer>
          </Form>
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
