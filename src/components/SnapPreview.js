import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  block,
  Clock,
  clockRunning,
  concat,
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
    cond(state.finished, debug('stop clock', stopClock(clock))),
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
  const rotateY = concat(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [-90, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
    'deg',
  )

  useCode(() => set(transition, runTransition(transition, snap !== null ? 1 : 0)), [snap])
  useEffect(() => {
    if (snap) setSnapCopy(snap)
    else setTimeout(() => setSnapCopy(snap), 250)
  }, [snap])

  if (!snapCopy) return null

  return (
    <Animated.View
      style={[style.bg, { opacity, transform: [{ perspective: 500 }, { rotateY }], zIndex: 1000 }]}>
      <Image
        source={{ uri: snapCopy.uri }}
        width={snapCopy.width}
        height={snapCopy.height}
        fadeDuration={0}
        resizeMode="cover"
        style={style.img}
      />
      <View>
        <TouchableWithoutFeedback style={style.txt} onPress={() => onCancel()}>
          <Text>Cancel</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={style.txt}
          onPress={() => onSend('5eb5c305070721001b4a3e3f')}>
          <Text>Send the snap</Text>
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
  },
  img: { ...StyleSheet.absoluteFill },
  txt: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
  btn: { color: 'green', margin: 30, padding: 30, backgroundColor: 'yellow' },
})
