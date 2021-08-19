import Animated, {
  EasingNode,
  eq,
  or,
  multiply,
} from "react-native-reanimated";

const {
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  block,
  call,
} = Animated;

function runButtonTiming(clock, dest, x, clicked, cb) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 300,
    toValue: new Value(0),
    easing: EasingNode.in(EasingNode.ease),
  };

  return block([
    cond(or(eq(clicked, 1), eq(clicked, -1)), [
      cond(
        clockRunning(clock),
        [
          // if the clock is already running we update the toValue, in case a new dest has been passed in
          set(config.toValue, multiply(dest, clicked)),
        ],
        [
          //   the animation params and start the clock
          set(state.finished, 0),
          set(state.time, 0),
          set(state.position, 0),
          set(state.frameTime, 0),
          set(config.toValue, multiply(dest, clicked)),
          startClock(clock),
        ]
      ),
      // we run the step here that is going to update position
      timing(clock, state, config),
      set(x, state.position),
      // if the animation is over we stop the clock
      cond(state.finished, [
        set(state.position, 0),
        set(clicked, 0),
        stopClock(clock),
        call([x], ([x]) => cb(x)),
      ]),
      // we made the block return the updated position
      state.position,
    ]),
  ]);
}

export default runButtonTiming;
