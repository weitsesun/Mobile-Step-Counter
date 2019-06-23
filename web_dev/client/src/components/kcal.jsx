import React from 'react';

class Kcal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="kcal">
        🔥 {(this.props.curSteps * 0.05).toFixed(1)} cals
      </div>
    )
  }
}

export default Kcal;