import { connect } from 'react-redux'
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  UIManager,
} from 'react-native'
import Constants from 'expo-constants'
import React, { useEffect, useRef, useState } from 'react'

import { logout } from '../reducers/auth'
import { setIsUserSearchMode, selectIsUserSearchMode } from '../reducers/ui'
import { searchUsers, selectMe, selectMyFriends, selectSearchedUsers } from '../reducers/users'
import { version } from '../../package.json'
import FriendsList from '../components/FriendsList'
import UserSearchInput from '../components/UserSearchInput'
import UserSearchResults from '../components/UserSearchResults'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

function debounce(func) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, 300)
  }
}

function Profile({
  friends,
  isLoadingFriendsList,
  isLoadingMe,
  isUserSearchMode,
  logout,
  me,
  searchUsers,
  setIsUserSearchMode,
  users,
}) {
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const cancelLogoutTimer = useRef(null)
  const delayedSearch = useRef(debounce(searchUsers)).current

  useEffect(() => {
    return () => {
      if (cancelLogoutTimer.current) clearTimeout(cancelLogoutTimer.current)
    }
  }, [])

  const toggleSearchFriendsMode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsUserSearchMode(!isUserSearchMode)
  }

  const logoutClick = () => {
    if (logoutConfirm) logout()
    else {
      cancelLogoutTimer.current = setTimeout(() => setLogoutConfirm(false), 2000)
      setLogoutConfirm(true)
    }
  }

  if (isLoadingMe || !me)
    return (
      <SafeAreaView style={style.screen}>
        <Text>Loading</Text>
      </SafeAreaView>
    )

  if (isUserSearchMode) {
    return (
      <SafeAreaView style={style.screen}>
        {/* the fragments are needed so react can compare */}
        <></>
        <View style={style.card}>
          <View style={style.cardHeader}>
            <Text style={style.cardHeaderTitle}>Search for friends</Text>
            <TouchableHighlight
              onPress={toggleSearchFriendsMode}
              style={style.cardHeaderButton}
              underlayColor="transparent">
              <Text style={style.accountLogoutButtonText}>Back</Text>
            </TouchableHighlight>
          </View>
          <UserSearchInput onChangeText={(text) => delayedSearch(text)} />
        </View>
        <UserSearchResults users={users} />
        <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
          <Text>{version}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.card, style.cardHeader]}>
        <Text style={style.cardHeaderTitle}>{me.username}</Text>
        <TouchableHighlight
          style={style.cardHeaderButton}
          onPress={logoutClick}
          underlayColor="transparent">
          <Text style={style.accountLogoutButtonText}>
            {logoutConfirm ? 'Confirm ?' : 'Log out'}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={style.card}>
        <View style={style.cardHeader}>
          <Text style={style.cardHeaderTitle}>Friends</Text>
          <TouchableHighlight
            onPress={toggleSearchFriendsMode}
            style={style.cardHeaderButton}
            underlayColor="transparent">
            <Text style={style.friendsAddButtonText}>Add</Text>
          </TouchableHighlight>
        </View>
        <FriendsList friends={friends} isLoading={isLoadingFriendsList} />
      </View>
      <></>
      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
        <Text>{version}</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  friends: selectMyFriends(state),
  isLoadingFriendsList: state.users.isLoadingFriendsList,
  isLoadingMe: state.users.meIsLoading,
  isUserSearchMode: selectIsUserSearchMode(state),
  me: selectMe(state),
  users: selectSearchedUsers(state),
})
const mapDispatchToProps = { logout, searchUsers, setIsUserSearchMode }
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  cardHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    padding: 10,
    fontWeight: 'bold',
  },
  cardHeaderButton: {
    padding: 10,
  },
  accountLogoutButtonText: {
    color: '#f00',
  },
  friendsAddButtonText: {
    color: '#009',
  },
})
