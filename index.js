//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // need to convert and format the msg to make it nice and pretty
  passTimes.forEach((x) => {
    const date = new Date(x.risetime * 1000);
    console.log(`Next pass at ${date.toString()} for ${x.duration} seconds!`);
  });

});