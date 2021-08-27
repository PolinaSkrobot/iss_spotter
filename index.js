const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('172.103.156.58', (error, coordinates) => {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }
  console.log('It worked! Returned coordinates:' , coordinates);
});

fetchISSFlyOverTimes({ latitude: 49.1251, longitude: -122.6224 }, (error, passTimes)=> {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }
  console.log('It worked! Returned passes times:' , passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const exactTime = new Date(0);
    exactTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${exactTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
