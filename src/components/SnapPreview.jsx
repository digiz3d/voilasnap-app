import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  block,
  Clock,
  clockRunning,
  cond,
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
    duration: 250,
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
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position,
  ])
}

const SnapPreview = ({ onCancel, onSend, snap }) => {
  const [snapCopy, setSnapCopy] = useState(snap)
  const transition = useMemo(() => new Value(0), [])

  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  const scale = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(() => set(transition, runTransition(transition, snap !== null ? 1 : 0)), [snap])
  useEffect(() => {
    if (snap) setSnapCopy(snap)
    else setTimeout(() => setSnapCopy(snap), 250)
  }, [snap])

  if (!snapCopy) return null

  return (
    <Animated.View
      style={[
        style.bg,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}>
      <Image
        source={{ uri: snapCopy.uri }}
        width={snapCopy.width}
        height={snapCopy.height}
        fadeDuration={0}
        resizeMode="cover"
        style={style.img}
      />
      <View style={style.bottom}>
        <TouchableWithoutFeedback style={style.btn} onPress={() => onCancel()}>
          <Text style={style.btnText}>Cancel</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={style.btn}
          onPress={() => onSend('5eb5c305070721001b4a3e3f')}>
          <Text style={style.btnText}>Send</Text>
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  )
}

export default SnapPreview

const style = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'orange',
    zIndex: 1000,
    flexDirection: 'column-reverse',
  },
  bottom: {
    flexDirection: 'row',
    position: 'relative',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: { ...StyleSheet.absoluteFill },
  btn: { margin: 30, padding: 30 },
  btnText: { color: '#fff', fontSize: 18 },
})
