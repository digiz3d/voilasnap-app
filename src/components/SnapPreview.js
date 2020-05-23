import React, { useRef } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  Extrapolate,
  interpolate,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
} from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

function runTransition(value, dest) {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ])
}

const SnapPreview = ({ onCancel, onSend, snap }) => {
  const transition = useRef(new Value(0)).current
  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0.5, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(() => set(transition, runTransition(transition, snap !== null ? 1 : 0)), [snap])

  if (!snap) return null

  return (
    <Animated.View style={[style.bg, { opacity }]}>
      <Image
        source={{ uri: snap.uri }}
        width={snap.width}
        height={snap.height}
        fadeDuration={0}
        resizeMode="cover"
        style={style.img}
      />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TouchableWithoutFeedback
          style={style.txt}
          onPress={() => onSend('5eb5c305070721001b4a3e3f')}>
          <Text>Send the snap</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={style.txt} onPress={() => onCancel()}>
          <Text>Cancel</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}

export default SnapPreview

const style = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'orange',
  },
  img: { ...StyleSheet.absoluteFill },
  txt: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
  btn: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
})
