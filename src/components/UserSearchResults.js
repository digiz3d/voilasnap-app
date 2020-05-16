import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import UserSearchResult from './UserSearchResult'

const UserSearchResults = ({ users }) => (
  <ScrollView style={style.container}>
    {users.map((user) => (
      <UserSearchResult key={user._id} user={user} />
    ))}
  </ScrollView>
)

export default UserSearchResults

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  input: {
    padding: 10,
  },
})
