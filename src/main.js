import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Navbars from './Components/Navbar.js';
import App from './Components/App.js';

// Styles
import mainStyles from './Styles/Main.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    	<div>
    		<Navbars />
    		<div className={mainStyles.mainContainer}>
      			<App />
      		</div>
    	</div>
    );
  }
}
  
ReactDOM.render(<Main />, document.getElementById('root'));
