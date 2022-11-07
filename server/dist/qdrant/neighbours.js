"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var shuffle = function shuffle(array) {
  var currentIndex = array.length,
      randomIndex; // While there remain elements to shuffle.

  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.

    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }

  return array;
};

var getNeighbours = function getNeighbours(museum, id) {
  var k = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var stretch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  // Step 1. fetch record (museum/id)
  var query = {
    filter: {
      must: [{
        key: 'museum',
        match: {
          value: museum
        }
      }, {
        key: 'id',
        match: {
          value: id
        }
      }]
    },
    with_vector: true
  };
  return (0, _nodeFetch["default"])('http://localhost:6333/collections/livia/points/scroll', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var points = data.result.points;
    if (points.length === 0) throw new Error("Not found: ".concat(museum, ", ").concat(id)); // Step 2. get item vector and search k nearest neighbours

    var vector = points[0].vector;
    return (0, _nodeFetch["default"])('http://localhost:6333/collections/livia/points/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vector: vector,
        limit: stretch * k + 1,
        // Response *may* include the item itself, which we'll filter
        with_payload: true
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var neighbours = data.result.map(function (r) {
        return r.payload;
      }) // Filter original item
      .filter(function (r) {
        return r.id !== id;
      });
      return shuffle(neighbours).slice(0, k);
    });
  });
};

var _default = getNeighbours;
exports["default"] = _default;