

import {RACING_CATEGORIES,RACING_DEFAULT,GREYHOUND_RACING_ID,HARNESS_RACING_ID,HORSE_RACING_ID} from '../constants.json';


export function getModifiedData(result){
    const race_summariesObj = result.race_summaries,//raceid as key and race summaries as value
          race_summariesArr = Object.values(race_summariesObj),//race summaries as array values to find them by categories
          greyhound_racing = [],horse_racing =[],harness_racing=[];
    race_summariesArr.filter(e => {
          if(e["category_id"] === GREYHOUND_RACING_ID){
            greyhound_racing.push(e.race_id) 
          } else if(e["category_id"] === HORSE_RACING_ID){
            horse_racing.push(e.race_id)
          } else if(e["category_id"] === HARNESS_RACING_ID){
            harness_racing.push(e.race_id)
          } 
      });
    return{
      race_summaries:race_summariesObj,
      greyhound_racing: greyhound_racing,
      horse_racing: horse_racing,
      harness_racing: harness_racing

    }

  }