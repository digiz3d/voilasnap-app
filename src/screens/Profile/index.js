import { connect } from 'react-redux'
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  UIManager,
  View,
} from 'react-native'
import Constants from 'expo-constants'
import React, { useEffect, useRef, useState } from 'react'

import { logout } from '../../reducers/auth'
import { setIsUserSearchMode, selectIsUserSearchMode } from '../../reducers/ui'
import { selectMe } from '../../reducers/users'
import { version } from '../../../package.json'
import FriendsList from './containers/FriendsList'
import UserSearchInput from './containers/UserSearchInput'
import UserSearchResults from './containers/UserSearchResults'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

function Profile({ isLoadingMe, isUserSearchMode, logout, me, setIsUserSearchMode }) {
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const cancelLogoutTimer = useRef(null)

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
        <Text>Loading me</Text>
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
          <UserSearchInput />
        </View>
        <UserSearchResults />
        <View style={style.version}>
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
        <FriendsList />
      </View>
      <></>
      <View style={style.version}>
        <Text>{version}</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  isLoadingMe: state.users.isLoadingMe,
  isUserSearchMode: selectIsUserSearchMode(state),
  me: selectMe(state),
})
const mapDispatchToProps = { logout, setIsUserSearchMode }
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
  version: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
})
