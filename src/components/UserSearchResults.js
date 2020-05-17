import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import UserSearchResult from './UserSearchResult'

const UserSearchResults = ({ users, isLoading, isError }) => {
  if (isLoading) return <Text style={style.pad}>Loading usersearch</Text>
  if (isError) return <Text style={style.pad}>Error usersearch</Text>
  if (!users.length) return <Text style={style.pad}>No result</Text>

  return (
    <ScrollView style={style.container}>
      {users.map((user) => (
        <UserSearchResult key={user._id} user={user} />
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
