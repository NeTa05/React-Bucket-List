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

import {
  loadTask, unloadTask
} from '../actions/tasks';

import { pageLoaded } from './utils';

class Manage extends Component {
  componentDidMount() {
    pageLoaded('Manage');
    
  }

  render() {
    

    return (
      <Article primary={true} full={true}>
        <Header
          direction='row'
          size='large'
          colorIndex='light-2'
          align='center'
          responsive={false}
          pad={{ horizontal: 'small' }}
        >
          <Anchor path='/dashboard'>
            <LinkPrevious a11yTitle='Back to Dashboard' />
          </Anchor>
          <Heading margin='none' strong={true}>
            Hello
          </Heading>
        </Header>
      </Article>
    );
  }
}

Manage.defaultProps = {
};

Manage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const select = state => ({ ...state.tasks });

export default connect(select)(Manage);
