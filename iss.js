const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    //if code is NOT 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //everything gucci
    const data = JSON.parse(body).ip;
    callback(error, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}?fields=longitude,latitude`, (error, response, body) => {
    const data = JSON.parse(body);

    //if code is NOT 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //handle if success is false
    if (data.success === false) {
      callback("invalid ip address", null);
    }

    //handle the error
    if (error) {
      callback(error, null);
    }

    if (data.length === 0) {
      callback(`cannot find coordinates with this IP address: ${ip}`, null);
    }

    //we gucci
    callback(null, data);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {

    //if code is NOT 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when using these coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //handle the error
    if (error) {
      callback(error, null);
    }
    
    //gucci
    const data = JSON.parse(body).response;
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };