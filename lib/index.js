"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.gettingTimeZone = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var GOOGLE_KEY = process.env.GOOGLE_KEY;

var gettingTimeZone =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(city) {
    var geoDataResponse, yandexCoord, coord, timestamp, timeZoneResponse, timeZoneId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios.default.get("https://geocode-maps.yandex.ru/1.x/", {
              params: {
                geocode: city,
                format: 'json',
                results: 1
              }
            });

          case 3:
            geoDataResponse = _context.sent;
            yandexCoord = geoDataResponse.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            coord = "".concat(yandexCoord[1], ",").concat(yandexCoord[0]);
            timestamp = 1458000000;
            _context.next = 9;
            return _axios.default.get("https://maps.googleapis.com/maps/api/timezone/json?location=".concat(coord, "&timestamp=").concat(timestamp, "&key=").concat(GOOGLE_KEY));

          case 9:
            timeZoneResponse = _context.sent;
            timeZoneId = timeZoneResponse.data.timeZoneId;
            return _context.abrupt("return", timeZoneId);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.response && _context.t0.response.status == 429)) {
              _context.next = 18;
              break;
            }

            throw new Error('request rate limit');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function gettingTimeZone(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.gettingTimeZone = gettingTimeZone;
var _default = {
  gettingTimeZone: gettingTimeZone
};
exports.default = _default;