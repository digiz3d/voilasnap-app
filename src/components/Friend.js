import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Friend = ({ friend }) => (
  <View style={style.friend}>
    <Text>{friend.username}</Text>
  </View>
)

export default Friend

const style = StyleSheet.create({
  friend: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
})
