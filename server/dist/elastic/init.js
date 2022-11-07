"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _zlib = _interopRequireDefault(require("zlib"));

var _lineByLine = _interopRequireDefault(require("line-by-line"));

var _Config = _interopRequireDefault(require("../Config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MAPPING = {
  properties: {
    id: {
      type: 'keyword'
    },
    museum: {
      type: 'keyword'
    },
    title: {
      type: 'text'
    },
    description: {
      type: 'text'
    },
    record_url: {
      type: 'keyword',
      index: false
    },
    image_url: {
      type: 'keyword',
      index: false
    }
  }
};
var INGEST_BATCH_SIZE = 5000;

var init = function init(client) {
  return function () {
    console.log('[ElasticSearch] Checking if index exists');
    client.indices.exists({
      index: 'livia'
    }).then(function (exists) {
      if (exists) {
        console.log('[ElasticSearch] index exists - skipping');
      } else {
        client.indices.create({
          index: 'livia',
          body: {
            mappings: MAPPING
          }
        }).then(function () {
          console.log('[ElasticSearch] No index - created new');
          console.log('[ElasticSearch] Loading data');
          ingest(client).then(function (data) {
            console.log('[ElasticSearch] Ingest complete');
          });
        });
      }
    });
  };
};

var ingest = function ingest(client) {
  var ingestOneBatch = function ingestOneBatch(data) {
    var operations = data.flatMap(function (doc) {
      return [{
        index: {
          _index: 'livia'
        }
      }, doc];
    });
    console.log("[ElasticSearch] Ingesting batch (".concat(data.length, " records)"));
    return client.bulk({
      refresh: true,
      operations: operations
    }).then(function () {
      console.log('[ElasticSearch] Done');
    });
  };

  var ingestOneDataset = function ingestOneDataset(museum, path) {
    return new Promise(function (resolve) {
      console.log("[ElasticSearch] Ingesting dataset: ".concat(path));

      var stream = _fs["default"].createReadStream(path).pipe(_zlib["default"].createGunzip());

      var lr = new _lineByLine["default"](stream);
      var batch = [];
      lr.on('line', function (line) {
        var json = JSON.parse(line);
        batch.push({
          id: String(json.id),
          museum: museum,
          title: json.title,
          description: json.description ? json.description : null,
          record_url: json.url,
          image_url: json.reproduction
        });

        if (batch.length === INGEST_BATCH_SIZE) {
          lr.pause();
          ingestOneBatch(batch).then(function () {
            batch = [];
            lr.resume();
          });
        }
      });
      lr.on('end', function () {
        if (batch.length > 0) {
          ingestOneBatch(batch).then(function () {
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  };

  return _Config["default"].DATA.reduce(function (res, d) {
    var _d2 = _slicedToArray(d, 2),
        museum = _d2[0],
        path = _d2[1];

    return res.then(function () {
      return ingestOneDataset(museum, path);
    });
  }, new Promise(function (resolve) {
    return resolve();
  }));
};

var _default = init;
exports["default"] = _default;