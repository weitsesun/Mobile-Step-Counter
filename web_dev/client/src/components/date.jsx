import React from 'react';
import { getToday } from './getToday.jsx';

class Date extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let today = getToday();
    if(today === this.props.today) {
      return (
        <div className="date">
          Today
        </div>
      )
    }
    else {
      return (
        <div className="date">
          {this.props.today}
        </div>
      )
    }
  }
}

export default Date;