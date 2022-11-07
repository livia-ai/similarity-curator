"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./index.js");

var search = function search(client) {
  return function (query, size) {
    return client.search({
      index: 'livia',
      query: {
        match: {
          title: query
        }
      },
      size: size
    }).then(_index.simplifySearchResults);
  };
};

var _default = search;
exports["default"] = _default;