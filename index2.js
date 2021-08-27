const {fetchMyIP} = require('./iss_promised');
const {fetchCoordsByIP} = require('./iss_promised');
const {fetchISSFlyOverTimes} = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body=>console.log(body));

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const exactTime = new Date(0);
    exactTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${exactTime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });