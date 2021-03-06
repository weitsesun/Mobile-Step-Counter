import React from 'react';

class Goal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let goal = (this.props.curSteps/100).toFixed(2);
    goal > 100 ? 100 : goal;
    return (
      <div className="goal">
        Goal we{goal + ' %'}
      </div>
    )
  }
}

export default Goal;