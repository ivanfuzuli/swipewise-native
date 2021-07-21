import Animated from "react-native-reanimated";

var cond = Animated.cond,
  add = Animated.add,
  multiply = Animated.multiply,
  lessThan = Animated.lessThan,
  abs = Animated.abs,
  divide = Animated.divide,
  sub = Animated.sub,
  min2 = Animated.min,
  max2 = Animated.max,
  greaterOrEq = Animated.greaterOrEq,
  Node = Animated.Node;
export var toRad = function toRad(deg) {
  return multiply(deg, Math.PI / 180);
};
export var toDeg = function toDeg(rad) {
  return multiply(rad, 180 / Math.PI);
};
export var min = function min() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }
  return args.reduce(function (acc, arg) {
    return min2(acc, arg);
  });
};
export var max = function max() {
  for (
    var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    args[_key2] = arguments[_key2];
  }
  return args.reduce(function (acc, arg) {
    return max2(acc, arg);
  });
};
export var atan = function atan(rad) {
  return sub(
    multiply(Math.PI / 4, rad),
    multiply(
      multiply(rad, sub(abs(rad), 1)),
      add(0.2447, multiply(0.0663, abs(rad)))
    )
  );
};
export var atan2 = function atan2(y, x) {
  var coeff1 = Math.PI / 4;
  var coeff2 = 3 * coeff1;
  var absY = abs(y);
  var angle = cond(
    greaterOrEq(x, 0),
    [sub(coeff1, multiply(coeff1, divide(sub(x, absY), add(x, absY))))],
    [sub(coeff2, multiply(coeff1, divide(add(x, absY), sub(absY, x))))]
  );
  return cond(lessThan(y, 0), multiply(angle, -1), angle);
};

var event = Animated.event,
  spring = Animated.spring,
  cond = Animated.cond,
  set = Animated.set,
  clockRunning = Animated.clockRunning,
  startClock = Animated.startClock,
  stopClock = Animated.stopClock,
  Value = Animated.Value,
  add = Animated.add,
  multiply = Animated.multiply,
  abs = Animated.abs,
  interpolate = Animated.interpolateNode,
  divide = Animated.divide,
  sub = Animated.sub,
  eq = Animated.eq,
  block = Animated.block,
  debug = Animated.debug,
  timing = Animated.timing,
  Clock = Animated.Clock,
  Node = Animated.Node;
export { timing, clockRunning, add };
export var snapPoint = function snapPoint(value, velocity, points) {
  var point = add(value, multiply(4, velocity));
  var diffPoint = function diffPoint(p) {
    return abs(sub(point, p));
  };
  var deltas = points.map(function (p) {
    return diffPoint(p);
  });
  var minDelta = min(...deltas);
  return points.reduce(function (acc, p) {
    return cond(eq(diffPoint(p), minDelta), p, acc);
  }, new Value());
};
export var binaryInterpolation = function binaryInterpolation(
  value,
  origin,
  destination
) {
  return interpolate(value, {
    inputRange: [0, 1],
    outputRange: [origin, destination],
  });
};
export var lookup = function lookup(array, index) {
  var notFound =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : new Value();
  return array.reduce(function (acc, v, i) {
    return cond(eq(i, index), v, acc);
  }, notFound);
};
export function runSpring(clock, value, dest) {
  var state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  var config = {
    toValue: new Value(0),
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
  };
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}
export function runTiming(clock, value, config) {
  var state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}
export var translateZ = function translateZ(perspective, z) {
  return {
    scale: divide(perspective, sub(perspective, z)),
  };
};
export var onScroll = function onScroll(contentOffset) {
  return event(
    [
      {
        nativeEvent: {
          contentOffset: contentOffset,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );
};
//# sourceMappingURL=index.js.map
