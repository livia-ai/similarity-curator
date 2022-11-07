"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _init = _interopRequireDefault(require("./init.js"));

var _neighbours = _interopRequireDefault(require("./neighbours.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  init: _init["default"],
  getNeighbours: _neighbours["default"]
};
exports["default"] = _default;