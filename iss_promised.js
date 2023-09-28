// iss_promised.js
const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}?fields=longitude,latitude`);
};

const fetchISSFlyOverTimes = function(body) {
  const coord = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`;

  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const flyOverData = JSON.parse(data);
      return flyOverData.response;
    });
};

module.exports = { nextISSTimesForMyLocation };

