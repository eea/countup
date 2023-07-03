function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function useCountup() {
  var _useState = React.useState(0),
    counter = _useState[0],
    setCounter = _useState[1];
  var _useState2 = React.useState(0),
    paused = _useState2[0],
    setPaused = _useState2[1];
  var pauseResume = function pauseResume() {
    setPaused(!paused);
  };
  var start = function start() {
    setPaused(false);
  };
  var reset = function reset() {
    setPaused(true);
    setCounter(0);
  };
  return {
    pauseResume: pauseResume,
    start: start,
    reset: reset,
    Countup: function Countup(_ref) {
      var end = _ref.end,
        duration = _ref.duration,
        decimals = _ref.decimals,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? '' : _ref$prefix,
        _ref$suffix = _ref.suffix,
        suffix = _ref$suffix === void 0 ? '' : _ref$suffix,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? /*#__PURE__*/React__default.createElement(Fragment, null) : _ref$children;
      React.useEffect(function () {
        var start = 0;
        var increment = 1;
        if (decimals > 0) {
          increment /= Math.pow(10, decimals);
        }
        if (Math.abs(start - end) <= increment / 10) return;
        var totalMilSecDur = parseInt(duration);
        var incrementTime = totalMilSecDur / Math.abs(end * Math.pow(10, decimals || 0)) * 1000;
        var timer = setInterval(function () {
          if (!paused) {
            if (start < end) start += increment;else start -= increment;
            setCounter(start.toFixed(decimals));
            if (Math.abs(start - end) <= increment / 10) clearInterval(timer);
            console.log(start);
          }
        }, incrementTime);
        return function () {
          return clearInterval(timer);
        };
      }, [duration, end, decimals]);
      return /*#__PURE__*/React__default.createElement("div", null, prefix, counter, suffix, " ", children);
    }
  };
}

var applyConfig = function applyConfig(config) {
  return config;
};

exports.default = applyConfig;
exports.useCountup = useCountup;
//# sourceMappingURL=index.js.map
