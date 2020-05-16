import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

const UserSearchInput = ({ onChangeText }) => (
  <View>
    <TextInput style={style.input} placeholder="username" autoFocus onChangeText={onChangeText} />
  </View>
)

export default UserSearchInput

const style = StyleSheet.create({
  input: {
    padding: 10,
  },
})
