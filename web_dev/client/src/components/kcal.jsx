import React from 'react';

class Kcal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="kcal">
        {this.props.curSteps}
      </div>
    )
  }
}

export default Kcal;