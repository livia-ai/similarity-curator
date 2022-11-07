"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../elastic/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res) {
  var query = req.query.q;
  var size = req.query.size || 25;
  console.log('query', query);
  return !query ? res.code(400).header('Content-Type', 'application/json').send({
    error: 'Missing parameter: `q`'
  }) : _index["default"].search(query, size);
};

exports["default"] = _default;