import React from 'react';

class Goal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="goal">
        Goal: {this.props.curSteps} / 10000
      </div>
    )
  }
}

export default Goal;