import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
  debug,
  Easing,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

function runTiming(value, dest) {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 200,
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

const SnapPreview = () => {
  const [clicked, setClicked] = useState(false)
  const transition = useRef(new Value(0)).current

  useCode(() => set(transition, runTiming(transition, clicked ? 1 : 0)), [clicked])

  const translateX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 50],
    extrapolate: Extrapolate.CLAMP,
  })

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 50],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <View style={style.bg}>
      <TouchableWithoutFeedback onPress={() => setClicked(!clicked)}>
        <Text style={style.txt}>Prems</Text>
      </TouchableWithoutFeedback>
      <Animated.View style={{ transform: [{ translateX, translateY }] }}>
        <Text style={style.txt}>Oui</Text>
      </Animated.View>
    </View>
  )
}

export default SnapPreview

const style = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFill,
    padding: 40,
    backgroundColor: 'red',
  },
  txt: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
  btn: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
})
