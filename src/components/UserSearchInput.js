import React, { useRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function debounce(func) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, 300)
  }
}

const UserSearchInput = ({ onChangeText }) => {
  const delayedOnChangeText = useRef(debounce(onChangeText)).current

  return (
    <View>
      <TextInput
        style={style.input}
        placeholder="username"
        autoFocus
        onChangeText={delayedOnChangeText}
      />
    </View>
  )
}
export default UserSearchInput

const style = StyleSheet.create({
  input: {
    padding: 10,
  },
})
