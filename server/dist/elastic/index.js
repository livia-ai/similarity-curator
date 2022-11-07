"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplifySearchResults = exports["default"] = void 0;

var _elasticsearch = require("@elastic/elasticsearch");

var _init = _interopRequireDefault(require("./init.js"));

var _random = _interopRequireDefault(require("./random.js"));

var _retrieve = _interopRequireDefault(require("./retrieve.js"));

var _search = _interopRequireDefault(require("./search.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = new _elasticsearch.Client({
  node: 'http://localhost:9200'
});
/**
 * Reduces the full ES result to a smaller representation, 
 * including (mostly) just the '_source' field.
 */

var simplifySearchResults = function simplifySearchResults(esResult) {
  return {
    took: esResult.took,
    total: esResult.hits.total,
    hits: esResult.hits.hits.map(function (hit) {
      return hit._source;
    })
  };
};

exports.simplifySearchResults = simplifySearchResults;
var _default = {
  random: (0, _random["default"])(client),
  init: (0, _init["default"])(client),
  retrieve: (0, _retrieve["default"])(client),
  search: (0, _search["default"])(client)
};
exports["default"] = _default;