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
      date: "",
      curSteps: 0,
      stepsToday: 0
    }

    // this.getToday = this.getToday.bind(this);
  }

  componentDidMount() {
    setInterval(this.getSteps.bind(this), 300);
  }

  getSteps() {
    axios.get('/steps')
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
    // console.log(getToday());
    return (
      <div className="dashboard">
        <Date today={this.state.date}/>
        <CurrentStep curSteps={this.state.curSteps + this.state.stepsToday}/>
      </div>
    )
  }
}

export default App;


// function getToday() {
//   let today = new Date();
//   // console.log(today);
//   let dd = today.today();
//   let mm = today.getMonth() + 1;
//   let yyyy = today.getFullYear();
//   if (dd < 10) {
//     dd = '0' + dd;
//   }
//   if (mm < 10) {
//     mm = '0' + mm;
//   }
//   return mm + '/' + dd + '/' + yyyy;
// }