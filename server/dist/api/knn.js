"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../elastic/index.js"));

var _index2 = _interopRequireDefault(require("../qdrant/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res) {
  var _req$query = req.query,
      museum = _req$query.museum,
      id = _req$query.id;
  var k = req.query.k ? parseInt(req.query.k) : 10;
  var z = req.query.z ? parseInt(req.query.z) : 1;
  return !museum || !id ? res.code(400).header('Content-Type', 'application/json').send({
    error: 'Missing parameter: `museum` and/or `id`'
  }) : _index2["default"].getNeighbours(museum, id, k, z).then(function (records) {
    return _index["default"].retrieve(records);
  });
};

exports["default"] = _default;