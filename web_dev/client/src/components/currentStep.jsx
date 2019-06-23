import React from 'react';

class CurrentStep extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="currentStep">
        {this.props.curSteps}
      </div>
    )
  }
}

export default CurrentStep;