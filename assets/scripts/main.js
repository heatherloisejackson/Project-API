console.log('js connected');

// ticketmaster API using the city query

let tmApiRequest = 'https://app.ticketmaster.com/discovery/v2/events.json?city=philadelphia&apikey=0PYM69m0qo3ESz77SMGYGdnR0YZKo3oM';
// open weather API call using the city query
let owApiRequest = 'https://api.openweathermap.org/geo/1.0/direct?q=philadelphia,pa,us&limit=2&appid=84d61ff029585a95fbd34cf405a10229';
 
  // TICKET MASTER API CALL
  const getTmData = async () => {
    const tmResponse = await fetch(tmApiRequest);
    const tmData = await tmResponse.json();
    let tmEmbeddedKey = tmData._embedded;
    // events object
    let tmEvents = tmEmbeddedKey.events;
    console.log(tmEvents)
    return tmData;
}

  // OPEN WEATHER API CALL
  const getOwData = async () => {
    const owResponse = await fetch(owApiRequest);
    const owData = await owResponse.json();
/*     let owKey = owData[0];
 */    // name object
/*     let cityName = owKey.name;
 */    
    console.log(owData);
    return owData;
}

// call functions to get data from url querys


function geoLocate() {
  // check if browswer supports navigator method
  function gotPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // use obj literal to concat lat & lon to url query
    tmApiRequest = `https://upenn-cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?latlon=${lat}${lon}&apikey=0PYM69m0qo3ESz77SMGYGdnR0YZKo3oM`;
    // open weather API call using the city query
    owApiRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=84d61ff029585a95fbd34cf405a10229`;

    console.log(lat, lon);
    getTmData();
    getOwData();
  }

  function positionFailed(err) {

  }

  if (navigator.geolocation) {
    // 30sec
    let giveUp = 1000 * 30;
    // 1hr
    let tooOld = 100 * 60 * 60;
    let options = {
      // drains users battery faster by providing more calls and increased location accuracy
      enableHighAccuracy: true,
      // set interval on how long until giving up on receiving a response
      timeout: giveUp,
      // last know location age set to parameter of time
      maximumAge: tooOld
    }
    navigator.geolocation.getCurrentPosition(gotPosition, positionFailed, options);
  } else {
    console.log('user is on an unsupported browser')
  }

}

geoLocate();