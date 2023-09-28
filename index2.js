const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((flyOverData) => {

    //Sample fly over data
    // [
    //   { risetime: 1695992177, duration: 498 },
    //   { risetime: 1696028577, duration: 447 },
    //   { risetime: 1696064977, duration: 526 },
    //   { risetime: 1696101377, duration: 596 },
    //   { risetime: 1696137777, duration: 549 }
    // ]

    // success, print out the deets!
    // need to convert and format the msg to make it nice and pretty
    flyOverData.forEach((x) => {
      const date = new Date(x.risetime * 1000);
      console.log(`Next pass at ${date.toString()} for ${x.duration} seconds!`);
    });
  })
  //if there is ever an error anywhere along our chain of promises, execution will jump to our catch callback instead.
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });