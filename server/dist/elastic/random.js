"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nanoid = require("nanoid");

var _index = require("./index.js");

var getRandom = function getRandom(client) {
  return function () {
    return client.search({
      index: 'livia',
      query: {
        function_score: {
          random_score: {
            seed: (0, _nanoid.nanoid)() + new Date().getTime(),
            field: 'record_url'
          }
        }
      },
      size: 1
    }).then(_index.simplifySearchResults);
  };
};

var _default = getRandom;
exports["default"] = _default;