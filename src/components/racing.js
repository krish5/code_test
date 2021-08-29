import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Card,Container,Row, Col,CardColumns,ButtonGroup,Spinner} from 'react-bootstrap';
import Timer from './timer.js';
import {getModifiedData} from '../helper/racing-helper.js';
import {RACING_CATEGORIES,RACING_DEFAULT,GREYHOUND_RACING_ID,HARNESS_RACING_ID,HORSE_RACING_ID} from '../constants.json';



export default class Racing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      all :[],
      only_five_ids:[],
      race_summaries:{},
      greyhound_racing:[],
      harness_racing:[],
      horse_racing:[],
      racing_categories:RACING_CATEGORIES,
      racing_category:RACING_DEFAULT,
      initialCount : 0
    };
    this.intervalId = () => {};
    this.getOnlyFiveIds = this.getOnlyFiveIds.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.handleSwitchCategory = this.handleSwitchCategory.bind(this);
  }

  componentDidMount() {
    const _this=this;
    fetch("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10")
      .then(res => res.json())
      .then(
        (result) => {
          const {race_summaries,
            greyhound_racing,
            horse_racing,
            harness_racing} = getModifiedData(result.data);
          this.setState({
            isLoaded: true,
            race_summaries,
            horse_racing,
            harness_racing,
            greyhound_racing,
            all:result.data.next_to_go_ids,
            only_five_ids : _this.getOnlyFiveIds(RACING_DEFAULT,0)
          });
          _this.setCountdown(true,RACING_DEFAULT);//call timer after rendering the first 5 races
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //set interval for 1 min to disappear the first race and show the next 5 from the array
  setCountdown(initiateTimer,racing_category){
    clearInterval(this.intervalId);
    
    this.intervalId = setInterval(updateIds, 60000);
   
    this.setState({racing_category:racing_category});
   const _this = this, state=_this.state;
     function updateIds() {
      const count=state.initialCount;
      if(initiateTimer){
        _this.setState({ only_five_ids: _this.getOnlyFiveIds(racing_category,0),initialCount : 0});
        initiateTimer = false;
      } else{
       _this.setState({ only_five_ids: _this.getOnlyFiveIds(racing_category,state.initialCount++),
                      initialCount:state.initialCount});
      }
      if ( count >= 5) {//to display minimum 5 race summeries, so stopping the interval
        clearInterval(_this.intervalId);
      }

    }
    updateIds();
  }

  //At a time, user is allowed to only see 5 races.
  getOnlyFiveIds(racing_category,count){
    var selectedIds = Array.isArray(this.state[racing_category]) ? this.state[racing_category] : this.state.all ,
      only_five_ids = selectedIds.slice(count,5+count) ;

    return only_five_ids;
  }


  handleSwitchCategory(e){
    this.setCountdown(true,e.target.id)
  }

  render() {
     const {error,isLoaded} =this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner animation="grow" />
    } else {
    const _this=this,{   
          only_five_ids,
          race_summaries,
          racing_categories,
          racing_category} = this.state;

      return (
        <Container>
            <Row lg={2} md={3}>
            <ButtonGroup >
            {Object.keys(racing_categories).map(function(key) {
                return (<Button className={key=== racing_category?' active' :''} 
                    style={{width:'5rem'}} id={key} variant="dark" onClick={_this.handleSwitchCategory}>{racing_categories[key]}
                  </Button>);
              })
            }
            </ButtonGroup>
            </Row>
            <CardColumns style={{padding:'1rem'}}>
              {only_five_ids.map((id) => {
                  return (
                  <Card style={{ width: '25rem' }} bg="light">
                    <Card.Body lg={1}>
                      <Card.Title>{race_summaries[id]["meeting_name"]}</Card.Title>
                         <Card.Text>
                            <Row md={2}>
                              <Col>{race_summaries[id]["race_number"]}</Col>
                              <Col><Timer endTime={race_summaries[id]["advertised_start"]["seconds"]}/></Col>
                            </Row>
                          </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })
              }
              </CardColumns>
          </Container>
      );
    }
  }
}