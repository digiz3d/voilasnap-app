import React from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'

const UserSearch = () => (
  <View>
    <TextInput style={style.input} placeholder="username" autoFocus />
  </View>
)

export default UserSearch

const style = StyleSheet.create({
  input: {
    padding: 10,
  },
})
