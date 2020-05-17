import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native'

import Friend from './Friend'

const FriendsList = ({ fetchFriends, friends, isLoading }) => {
  return (
    <ScrollView
      style={style.scrollView}
      refreshControl={<RefreshControl onRefresh={fetchFriends} refreshing={isLoading} />}>
      {!friends.length && <Text style={{ padding: 10 }}>No friend yet ! Add some !</Text>}
      {friends.map((friend, i) => (
        <Friend key={friend._id} friend={friend} isFirst={i === 0} />
      ))}
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
})
