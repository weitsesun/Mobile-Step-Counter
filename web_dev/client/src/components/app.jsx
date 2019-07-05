import React from 'react';
import axios from 'axios';
import Date from './date.jsx';
import CurrentStep from './currentStep.jsx';
import Goal from './goal.jsx';
import Kcal from './Kcal.jsx';
import { getToday } from './getToday.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: getToday(),
      curSteps: 0,
      stepsToday: 0
    }

  }

  componentDidMount() {
    setInterval(this.getSteps.bind(this), 300);
  }

  getSteps() {
    axios.get('/steps', { params: {date: this.state.date} })
      .then((data) => {
        let newData = data.data[0]
        this.setState({
          date: newData.date,
          curSteps: newData.curSteps,
          stepsToday: newData.stepsToday
        })
      })
      .catch(() => {
        this.setState({
          date: getToday(),
          curSteps: 0,
          stepsToday: 0
        })
      })
  }

  render() {
    return (
      <div className="dashboard">
        <Date today={this.state.date}/>
        <CurrentStep curSteps={this.state.curSteps + this.state.stepsToday}/>
        <Goal curSteps={this.state.curSteps + this.state.stepsToday}/>
        <Kcal curSteps={this.state.curSteps + this.state.stepsToday}/>
      </div>
    )
  }
}

export default App;
