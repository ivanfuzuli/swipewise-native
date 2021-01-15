import React, { useRef } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import {
  runSpring,
  binaryInterpolation,
  snapPoint,
} from "../../../helpers/redash";
import Animated from "react-native-reanimated";

const {
  Value,
  event,
  block,
  set,
  cond,
  eq,
  Clock,
  call,
  clockRunning,
} = Animated;

export default ({ style, x, y, snapPoints, onSnap, children }) => {
  const ref = useRef(null);
  const clock = new Clock();
  const spring = new Value(0);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const snapPointX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event([
    {
      nativeEvent: {
        velocityX,
        translationX,
        translationY,
        state,
      },
    },
  ]);
  const points = snapPoints.map((point) => point.x);
  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
      <Animated.View {...{ style }}>
        {children}
        <Animated.Code>
          {() =>
            block([
              cond(eq(state, State.END), [
                set(snapPointX, snapPoint(translationX, velocityX, points)),
                set(spring, runSpring(clock, 0, 1)),

                cond(eq(clockRunning(clock), 0), [
                  call([snapPointX], ([x]) => onSnap({ nativeEvent: { x } })),
                ]),
              ]),
              set(
                x,
                cond(
                  eq(state, State.ACTIVE),
                  translationX,
                  binaryInterpolation(spring, translationX, snapPointX)
                )
              ),
              set(
                y,
                cond(
                  eq(state, State.ACTIVE),
                  translationY,
                  binaryInterpolation(spring, translationY, 0)
                )
              ),
            ])
          }
        </Animated.Code>
      </Animated.View>
    </PanGestureHandler>
  );
};
