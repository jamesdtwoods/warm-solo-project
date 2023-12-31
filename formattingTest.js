let activities=  [
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 1,
      name: 'Swix Hat',
      clothing_type: 'Hat'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 2,
      name: 'Swix Lobster Gloves',
      clothing_type: 'Gloves'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 3,
      name: 'Thick Smartwool Socks',
      clothing_type: 'Socks'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 4,
      name: 'Smartwool baselayer',
      clothing_type: 'Base layer - torso'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 6,
      name: 'Gortex Bike Jacket',
      clothing_type: 'Jacket'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 7,
      name: 'Swix Ski Pants',
      clothing_type: 'Pants'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 8,
      name: 'Clear Bolle Goggles',
      clothing_type: 'Accessories'
    },
    {
      activities_id: 1,
      date: '2024-01-01T06:00:00.000Z',
      temperature: 20,
      weather_conditions: 'Cloudy, windy',
      notes: 'Biked to school',
      activity_type: 'Biking',
      clothes_id: 9,
      name: 'Green Buff',
      clothing_type: 'Other'
    },
    {
      activities_id: 4,
      date: '2023-11-29T06:00:00.000Z',
      temperature: 43,
      weather_conditions: 'rainy',
      notes: 'nonn',
      activity_type: 'CC Skiing (classic)',
      clothes_id: 1,
      name: 'Swix Hat',
      clothing_type: 'Hat'
    },
    {
      activities_id: 4,
      date: '2023-11-29T06:00:00.000Z',
      temperature: 43,
      weather_conditions: 'rainy',
      notes: 'nonn',
      activity_type: 'CC Skiing (classic)',
      clothes_id: 2,
      name: 'Swix Lobster Gloves',
      clothing_type: 'Gloves'
    },
    {
      activities_id: 4,
      date: '2023-11-29T06:00:00.000Z',
      temperature: 43,
      weather_conditions: 'rainy',
      notes: 'nonn',
      activity_type: 'CC Skiing (classic)',
      clothes_id: 3,
      name: 'Thick Smartwool Socks',
      clothing_type: 'Socks'
    },
    {
      activities_id: 4,
      date: '2023-11-29T06:00:00.000Z',
      temperature: 43,
      weather_conditions: 'rainy',
      notes: 'nonn',
      activity_type: 'CC Skiing (classic)',
      clothes_id: 4,
      name: 'Smartwool baselayer',
      clothing_type: 'Base layer - torso'
    },
    {
      activities_id: 8,
      date: '2024-01-25T06:00:00.000Z',
      temperature: 55,
      weather_conditions: 'sunny',
      notes: 'new note',
      activity_type: 'Running',
      clothes_id: 6,
      name: 'Gortex Bike Jacket',
      clothing_type: 'Jacket'
    },
    {
      activities_id: 8,
      date: '2024-01-25T06:00:00.000Z',
      temperature: 55,
      weather_conditions: 'sunny',
      notes: 'new note',
      activity_type: 'Running',
      clothes_id: 7,
      name: 'Swix Ski Pants',
      clothing_type: 'Pants'
    },
    {
      activities_id: 8,
      date: '2024-01-25T06:00:00.000Z',
      temperature: 55,
      weather_conditions: 'sunny',
      notes: 'new note',
      activity_type: 'Running',
      clothes_id: 8,
      name: 'Clear Bolle Goggles',
      clothing_type: 'Accessories'
    },
    {
      activities_id: 8,
      date: '2024-01-25T06:00:00.000Z',
      temperature: 55,
      weather_conditions: 'sunny',
      notes: 'new note',
      activity_type: 'Running',
      clothes_id: 9,
      name: 'Green Buff',
      clothing_type: 'Other'
    }
  ]
  
// NEED TO FIGURE THIS OUT BETTER

function countActivities (all) {
    let activitiesCountArray = []
    for (row of all) {
        activitiesCountArray.push(row.activities_id)
    }
   return [... new Set(activitiesCountArray)]
    // return activitiesCountArray
}

// returns first activity and clothes
function format1 (all) {
    let activitiesArray = [{
        activities_id: all[0].activities_id,
        date: all[0].date,
        temperature: all[0].temperature,
        weather_conditions: all[0].weather_conditions,
        notes: all[0].notes,
        activity_type: all[0].activity_type,
        clothes_id: all[0].clothes_id,
        name: all[0].name,
        clothing_type: all[0].clothing_type
    }]
    for(let i=1; i<all.length; i++) {
        if (all[i].activities_id !== all[i-1].activities_id){
            activitiesArray.push({
                activities_id: all[i].activities_id,
                date: all[i].date,
                temperature: all[i].temperature,
                weather_conditions: all[i].weather_conditions,
                notes: all[i].notes,
                activity_type: all[i].activity_type,
                clothes_id: all[i].clothes_id,
                name: all[i].name,
                clothing_type: all[i].clothing_type
            })
        }
    }
   return activitiesArray
}

// returns first activity and clothes in array within single object - still need clothes information
function format2 (all) {
    let activitiesArray = [{
        activities_id: all[0].activities_id,
        date: all[0].date,
        temperature: all[0].temperature,
        weather_conditions: all[0].weather_conditions,
        notes: all[0].notes,
        activity_type: all[0].activity_type,
        clothes: [{
            clothes_id: all[0].clothes_id,
            name: all[0].name,
            clothing_type: all[0].clothing_type
        }]
    }]
    
    // [{
    //     activities_id: all[0].activities_id,
    //     date: all[0].date,
    //     temperature: all[0].temperature,
    //     weather_conditions: all[0].weather_conditions,
    //     notes: all[0].notes,
    //     activity_type: all[0].activity_type,
    //     clothes:[{
    //         clothes_id: all[0].clothes_id,
    //         name: all[0].name,
    //         clothing_type: all[0].clothing_type
    //     }]
    // }]
    // console.log('activity array before', activitiesArray);
    for(let i=1; i<all.length; i++) {
        if (all[i].activities_id !== all[i-1].activities_id){
            activitiesArray.push({
                activities_id: all[i].activities_id,
                date: all[i].date,
                temperature: all[i].temperature,
                weather_conditions: all[i].weather_conditions,
                notes: all[i].notes,
                activity_type: all[i].activity_type,
                clothes: []
            })
            // console.log('activity array at:', i, activitiesArray);
        }
        for (let j=0; j<activitiesArray.length; j++) {
            if(activitiesArray[j].activities_id === all[i-1].activities_id){
            activitiesArray[j].clothes.push({
              clothes_id: all[i].clothes_id,
              name: all[i].name,
              clothing_type: all[i].clothing_type
            })
          }
        //   console.log('activity array with clothes at:', j, activitiesArray);
        }
    }
   return activitiesArray
}


console.log(format2(activities));


function formatActivityObject(all) {
    // console.log('in formatting function', activities);
    let formattedActivities=[]
    for(let i=1; i<all.length; i++) {
        
      if (all[i].activities_id == all[i-1].activities_id) {
        // console.log(activities[i-1].activities_id);
        let a = {}
  
        a.activities_id = all[i-1].activities_id
        a.date = all[i-1].date
        a.temperature = all[i-1].temperature
        a.weather_conditions = all[i-1].weather_conditions
        a.notes = all[i-1].notes
        a.activity_type = all[i-1].activity_type
        a.clothes = []
        for (let row of all) {
            if(row.activities_id===all[i-1].activities_id){
            a.clothes.push({
              clothes_id: row.clothes_id,
              name: row.name,
              clothing_type: row.clothing_type
            })
          }
        }
        formattedActivities.push(a);
      }
      
    }
    return formattedActivities;
  }

//   console.log(formatActivityObject(activities));