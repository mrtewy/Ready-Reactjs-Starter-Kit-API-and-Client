import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

export default class App extends React.Component {
  
  static propTypes = { 
    usersData: React.PropTypes.array
  }
  
  static defaultProps = { 
    usersData: []
  }

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
        <div className="">
           <ul className="">
           {usersListsData}
           </ul>
        </div>
      </div>
    );
  }

}
 