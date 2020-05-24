import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RecipientSelectionItem = ({ friend, isFirst, isSelected, onSelect }) => {
  const refText = useRef()
  const transitionText = (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" durationMs={150} />
      <Transition.In type="scale" durationMs={150} />
      <Transition.Out type="scale" durationMs={150} />
    </Transition.Together>
  )

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={friend._id}
      onPressIn={() => {
        refText.current.animateNextTransition()
        onSelect()
      }}>
      <Transitioning.View
        transition={transitionText}
        ref={refText}
        style={[style.friend, isFirst && style.first]}>
        {isSelected && (
          <View style={style.selected}>
            <Ionicons name="md-checkmark-circle" size={30} color="green" />
          </View>
        )}
        <Text style={style.text}>{friend.username}</Text>
      </Transitioning.View>
    </TouchableOpacity>
  )
}
export default RecipientSelectionItem

const style = StyleSheet.create({
  first: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  friend: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  selected: {
    height: 30,
    width: 30,
    lineHeight: 30,
    marginRight: 10,
  },
  text: {
    color: '#fff',
  },
})
