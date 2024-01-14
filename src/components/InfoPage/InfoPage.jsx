import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h5>Technologies Used:</h5>
      <li>React, Redux, Node, Express, React-Bootstrap</li>
      <li>Mapbox geocoding API - to get coordinates from a searched location</li>
      <li>weather.gov api - to get weather forcast for coordinate location</li>
      <br />
      <h5>Biggest acheivements:</h5>
      <li>Data maniuplation and conditional rendering of clothing items/activities to and from the database</li>
      <li>Handling state of the clothing item checkboxes</li>
      <br />
      <h5>Future Development:</h5>
      <li>User specific clothing and activity types</li>
      <br />
      <h5>Many Thanks to:</h5>
      <li>You</li>
      <li>Matt and the Moonstones</li>
      <li>Riley Harrison and Ash Shephard</li>
      <li>The greater prime network of alumni and staff</li>
    </div>
  );
}

export default InfoPage;
