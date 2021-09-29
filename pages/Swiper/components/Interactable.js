import React, { useMemo } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import {
  runSpring,
  binaryInterpolation,
  snapPoint,
} from "../../../helpers/redash";
import Animated from "react-native-reanimated";

const { Value, event, block, set, cond, eq, Clock, call, clockRunning } =
  Animated;
const Interactable = ({
  style,
  x,
  y,
  snapPoints,
  onSnap,
  active,
  children,
}) => {
  const points = snapPoints.map((point) => point.x);
  const clock = useMemo(() => new Clock(), []);
  const spring = useMemo(() => new Value(0), []);
  const translationX = useMemo(() => new Value(0), []);
  const translationY = useMemo(() => new Value(0), []);
  const velocityX = useMemo(() => new Value(0), []);
  const snapPointX = useMemo(() => new Value(0), []);
  const state = useMemo(() => new Value(State.UNDETERMINED), []);

  const onGestureEvent = useMemo(
    () =>
      event([
        {
          nativeEvent: {
            velocityX,
            translationX,
            translationY,
            state,
          },
        },
      ]),
    []
  );

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
                  set(active, 0),
                  set(translationX, 0),
                  set(translationY, 0),
                  set(velocityX, 0),
                  call([snapPointX], ([x]) => onSnap({ nativeEvent: { x } })),
                ]),
              ]),
              cond(eq(state, State.BEGAN), set(active, 1)),
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

export default React.memo(Interactable);
