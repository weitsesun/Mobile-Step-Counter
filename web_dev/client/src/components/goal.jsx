import React from 'react';

class Goal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="goal">
        {this.props.curSteps}
      </div>
    )
  }
}

export default Goal;