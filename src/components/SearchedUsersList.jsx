import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import UserListItem from './UserListItem'

const SearchedUsersList = ({ addFriend, isLoading, removeFriend, users }) => {
  return (
    <ScrollView style={style.scrollView}>
      {users.map((user, i) => (
        <UserListItem
          key={user._id}
          user={user}
          isFirst={i === 0}
          onAdd={() => addFriend(user._id)}
          onRemove={() => removeFriend(user._id)}
        />
      ))}
      {!users.length && <Text style={style.nothing}>Didn&apos;t find anyone, rip.</Text>}
      {isLoading && <Text style={style.nothing}>...</Text>}
    </ScrollView>
  )
}

export default SearchedUsersList

const style = StyleSheet.create({
  scrollView: {
    borderColor: '#ccc',
    borderTopWidth: 1,
  },
  nothing: {
    padding: 5,
  },
})
