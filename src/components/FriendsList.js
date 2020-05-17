import React from 'react'
import { ScrollView, Text } from 'react-native'

import Friend from './Friend'

const FriendsList = ({ friends, isLoading }) => {
  if (isLoading) return <Text style={{ padding: 10 }}>Loading...</Text>

  if (!friends.length) return <Text style={{ padding: 10 }}>No friend yet ! Add some !</Text>

  return (
    <ScrollView>
      {friends.map((friend) => (
        <Friend key={friend._id} friend={friend} />
      ))}
    </ScrollView>
  )
}

export default FriendsList
