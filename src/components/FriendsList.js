import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native'

import UserListItem from './UserListItem'

const FriendsList = ({ fetchFriends, friends, isLoading }) => {
  return (
    <ScrollView
      style={style.scrollView}
      refreshControl={<RefreshControl onRefresh={fetchFriends} refreshing={isLoading} />}>
      {friends.map((user, i) => (
        <UserListItem key={user._id} user={user} isFirst={i === 0} />
      ))}
      {!friends.length && <Text style={style.nothing}>No friend yet ! Add some !</Text>}
    </ScrollView>
  )
}

export default FriendsList

const style = StyleSheet.create({
  scrollView: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    height: 100,
  },
  nothing: {
    padding: 5,
  },
})
