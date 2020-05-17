import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Friend = ({ friend, isFirst }) => (
  <View style={[style.friend, isFirst && style.friendFirst]}>
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
  friendFirst: {
    borderTopWidth: 0,
  },
})
