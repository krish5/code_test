import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingMin:0,
      remainingSec :0
    };
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
    this.initializeClock = this.initializeClock.bind(this);
  }

//setting interval for every second for countdown of the race
 initializeClock(endtime) {
  const timeinterval = setInterval(updateClock, 1000),
  _this = this;
   function updateClock() {
    const t = _this.getTimeRemaining(endtime*1000);
    _this.setState({remainingMin : t.minutes,remainingSec:t.seconds})
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
}

//to calculate remaining time for the race
getTimeRemaining(endtime){
  const total = Date.parse(new Date(endtime)) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}
  componentDidMount() {
    this.initializeClock(this.props.endTime)
  }

  render() {
    return (
        <>Starts in {this.state.remainingMin} M {this.state.remainingSec}</>
       )
  }
  
      
}