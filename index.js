const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// //50.64.168.37
// fetchCoordsByIP("50.64.168.37", (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log(data);
// });

//test co-ordinates
// const coord = { latitude: 49.1665898, longitude: -123.133569 };
// //const coord = { latitude: 999999999, longitude: -123.133569 };
// fetchISSFlyOverTimes(coord, (error, flyOverData) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , flyOverData);
// });
