import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import styles from '../Styles/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '/api/users/all',
      users: props.usersData
    };
  }
  
  componentDidMount() {
    this.serverRequest = $.get(this.state.source, function (result) {
      this.setState({
        users: result.callback
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const usersListsData = this.state.users.map(function(callback, index) {
      return <li key={callback.id}>{callback.author}</li>;
    });

    return (
      <div>
        <div className={styles.main_container}>
           <ul className={styles.main_headline}>
           {usersListsData}
           </ul>
        </div>
      </div>
    );
  }

}

App.propTypes = { 
  usersData: React.PropTypes.array
};
App.defaultProps = { 
  usersData: []
};
  