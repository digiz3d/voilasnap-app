import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

const UserSearchResult = ({
  isFriend,
  isLast,
  isReceivedRequest,
  isSentRequest,
  onAdd,
  onRemove,
  user,
}) => {
  let actions
  if (isFriend)
    actions = (
      <TouchableHighlight onPress={onRemove}>
        <Text style={style.actionButtonText}>Remove</Text>
      </TouchableHighlight>
    )
  else if (isReceivedRequest)
    actions = actions = (
      <>
        <TouchableHighlight onPress={onAdd}>
          <Text style={style.actionButtonText}>Accept</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={onRemove}>
          <Text style={style.actionButtonText}>Decline</Text>
        </TouchableHighlight>
      </>
    )
  else if (isSentRequest)
    actions = (
      <TouchableHighlight onPress={onRemove}>
        <Text style={style.actionButtonText}>Cancel</Text>
      </TouchableHighlight>
    )
  else
    actions = (
      <TouchableHighlight onPress={onAdd}>
        <Text style={style.actionButtonText}>Add</Text>
      </TouchableHighlight>
    )

  return (
    <View style={[style.container, isLast && style.containerLast]}>
      <Text style={style.username}>{user.username}</Text>
      <View style={style.actions}>{actions}</View>
    </View>
  )
}

export default UserSearchResult

const style = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerLast: {
    borderBottomWidth: 1,
  },
  actions: { flexDirection: 'row' },
  username: {
    padding: 20,
  },
  actionButtonText: {
    padding: 20,
  },
})
