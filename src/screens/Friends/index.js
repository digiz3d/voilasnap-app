import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import { selectMe } from '../../reducers/users'
import { selectIsUserSearchMode } from '../../reducers/ui'
import { version } from '../../../package.json'

import FriendsList from './containers/FriendsList'
import SearchedUsersList from './containers/SearchedUsersList'
import UserSearchInput from './containers/UserSearchInput'

function Profile({ isLoadingMe, isUserSearchMode, me }) {
  const cancelLogoutTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (cancelLogoutTimer.current) clearTimeout(cancelLogoutTimer.current)
    }
  }, [])

  if (isLoadingMe || !me)
    return (
      <SafeAreaView style={style.screen}>
        <View style={style.card}>
          <Text>Loading me</Text>
        </View>
      </SafeAreaView>
    )

  return (
    <View style={style.screen}>
      <SafeAreaView>
        <View style={style.top}>
          <View style={style.search}>
            <UserSearchInput />
          </View>
          <View style={style.profileButton}>
            <Text style={style.profileButtonText}>{me.username}</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={style.usersList}>
        {isUserSearchMode ? (
          <>
            <Text style={style.usersListTitle}>Searching</Text>
            <SearchedUsersList />
          </>
        ) : (
          <>
            <Text style={style.usersListTitle}>Friends</Text>
            <FriendsList />
          </>
        )}
      </View>

      <View style={style.version}>
        <Text>{version}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  isLoadingMe: state.users.isLoadingMe,
  isUserSearchMode: selectIsUserSearchMode(state),
  me: selectMe(state),
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const style = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  search: {
    flexGrow: 1,
  },
  profileButton: {},
  profileButtonText: {
    padding: 10,
  },
  usersList: {
    flexGrow: 1,
  },
  usersListTitle: { fontSize: 18, padding: 5 },
  version: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
})
