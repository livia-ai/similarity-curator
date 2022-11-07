"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./index.js");

var retrieve = function retrieve(client) {
  return function (identifiers) {
    return client.search({
      index: 'livia',
      query: {
        bool: {
          should: identifiers.map(function (_ref) {
            var museum = _ref.museum,
                id = _ref.id;
            return {
              bool: {
                must: [{
                  term: {
                    museum: museum
                  }
                }, {
                  term: {
                    id: "".concat(id)
                  }
                }]
              }
            };
          })
        }
      },
      size: identifiers.length
    }).then(function (results) {
      return (0, _index.simplifySearchResults)(results).hits;
    });
  };
};

var _default = retrieve;
exports["default"] = _default;