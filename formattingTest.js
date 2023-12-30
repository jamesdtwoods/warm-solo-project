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

  console.log(formatActivityObject(activities));