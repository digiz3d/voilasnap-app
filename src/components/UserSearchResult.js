import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

const UserSearchResult = ({ user }) => (
  <View style={style.container}>
    <Text style={style.username}>{user.username}</Text>
    <TouchableHighlight style={style.addButton} onPress={() => alert('oui')}>
      <Text>Add</Text>
    </TouchableHighlight>
  </View>
)

export default UserSearchResult

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    padding: 20,
  },
  addButton: {
    padding: 20,
  },
})
