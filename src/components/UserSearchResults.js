import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import UserSearchResult from './UserSearchResult'

const UserSearchResults = ({ addFriend, isError, isLoading, removeFriend, users }) => {
  if (isLoading) return <Text style={style.pad}>Loading usersearch</Text>
  if (isError) return <Text style={style.pad}>Error usersearch</Text>
  if (!users.length) return <Text style={style.pad}>No result</Text>

  return (
    <ScrollView style={style.container}>
      {users.map((user, i) => (
        <UserSearchResult
          isFirst={i === 0}
          key={user._id}
          onAdd={() => addFriend(user._id)}
          onRemove={() => removeFriend(user._id)}
          user={user}
        />
      ))}
    </ScrollView>
  )
}
export default UserSearchResults

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  pad: {
    padding: 15,
  },
})