import React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { selectMe } from '../reducers/users'
import { logout } from '../reducers/auth'

function Profile({ isLoading, logout, me }) {
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{me.username}</Text>
      <Button onPress={() => logout()} title="Log out" />
    </View>
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.users.meIsLoading,
  me: selectMe(state),
})
const mapDispatchToProps = { logout }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
