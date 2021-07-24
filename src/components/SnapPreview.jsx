import React, { useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const SnapPreview = ({
  RecipientSelectionComponent,
  currentSnapRecipient,
  isSelectingRecipient,
  onCancel,
  onSend,
  setIsSelectingRecipient,
  snap,
  snapIsFront,
}) => {
  const bgColor = useSharedValue('#fff')
  const transition = useSharedValue(0)

  const animatedBgStyle = useAnimatedStyle(() => {
    return { backgroundColor: withTiming(bgColor.value, { duration: 250, easing: Easing.linear }) }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(transition.value, { duration: 250, easing: Easing.linear }),
      transform: [
        {
          scale: withTiming(transition.value, { duration: 250, easing: Easing.linear }),
        },
      ],
    }
  })

  useEffect(() => {
    if (!snap) {
      transition.value = 0
      bgColor.value = '#fff'
    } else {
      bgColor.value = '#000'
    }
  }, [snap])

  if (!snap) return null

  return (
    <Animated.View style={[style.bg, animatedBgStyle]}>
      <Animated.View style={[style.bg, animatedStyle]}>
        <Image
          source={{ uri: snap.uri }}
          width={snap.width}
          height={snap.height}
          fadeDuration={0}
          resizeMode="cover"
          style={[style.img, { transform: [{ scaleX: snapIsFront ? -1 : 1 }] }]}
          onLoadEnd={() => (transition.value = 1)}
        />
        <View style={[style.bottom, isSelectingRecipient && style.translucent]}>
          {isSelectingRecipient ? (
            <>
              <TouchableWithoutFeedback
                style={style.btn}
                onPress={() => setIsSelectingRecipient(false)}>
                <Text style={style.btnText}>Back</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={style.btn}
                onPress={() => onSend()}
                disabled={currentSnapRecipient === null}>
                {currentSnapRecipient !== null && <Text style={style.btnText}>Send</Text>}
              </TouchableWithoutFeedback>
            </>
          ) : (
            <>
              <TouchableWithoutFeedback
                style={style.btn}
                onPress={() => {
                  transition.value = 0
                  bgColor.value = 'transparent'
                  setTimeout(() => onCancel(), 1000)
                }}>
                <Text style={style.btnText}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setIsSelectingRecipient(true)}
                style={style.btn}>
                <Text style={style.btnText}>Next</Text>
              </TouchableWithoutFeedback>
            </>
          )}
        </View>
        <SafeAreaView style={[style.top, isSelectingRecipient && style.translucent]}>
          {isSelectingRecipient && <RecipientSelectionComponent />}
        </SafeAreaView>
      </Animated.View>
    </Animated.View>
  )
}

export default SnapPreview

const style = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    flexDirection: 'column-reverse',
  },
  top: { flexGrow: 1 },
  bottom: {
    flexDirection: 'row',
    position: 'relative',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  translucent: {
    backgroundColor: '#333C',
  },
  img: {
    ...StyleSheet.absoluteFill,
  },
  btn: {
    margin: 30,
    padding: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
})
