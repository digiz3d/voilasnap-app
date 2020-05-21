import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const UserListItem = ({ isFirst, onAdd, onRemove, user }) => {
  let actions

  if (user.isFriend)
    actions = (
      <TouchableOpacity onPress={onRemove}>
        <Text style={style.actionButtonText}>Remove</Text>
      </TouchableOpacity>
    )
  else if (user.isReceived)
    actions = actions = (
      <>
        <TouchableOpacity onPress={onAdd}>
          <Text style={style.actionButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove}>
          <Text style={style.actionButtonText}>Decline</Text>
        </TouchableOpacity>
      </>
    )
  else if (user.isSent)
    actions = (
      <TouchableOpacity onPress={onRemove}>
        <Text style={style.actionButtonText}>Cancel</Text>
      </TouchableOpacity>
    )
  else
    actions = (
      <TouchableOpacity onPress={onAdd}>
        <Text style={style.actionButtonText}>Add</Text>
      </TouchableOpacity>
    )

  return (
    <View style={[style.user, isFirst && style.isFirst]}>
      <Text>{user.username}</Text>
      <View style={style.actions}>{actions}</View>
    </View>
  )
}

export default UserListItem

const style = StyleSheet.create({
  user: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  isFirst: {
    borderTopWidth: 0,
  },
  actionButtonText: { padding: 5 },
})
