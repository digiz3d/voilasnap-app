import { connect } from 'react-redux'
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  UIManager,
} from 'react-native'
import Constants from 'expo-constants'
import React, { useEffect, useRef, useState } from 'react'

import { logout } from '../reducers/auth'
import { selectMe, selectMyFriends } from '../reducers/users'
import { version } from '../../package.json'
import FriendsList from '../components/FriendsList'
import UserSearch from '../components/UserSearch'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

function Profile({ isFriendsListLoading, isMeLoading, logout, me, friends }) {
  const [searchFriendsMode, setSearchFriendsMode] = useState(false)
  const [logoutConfirm, setLogoutConfirm] = useState(false)
  const cancelLogoutTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (cancelLogoutTimer.current) clearTimeout(cancelLogoutTimer.current)
    }
  }, [])

  const toggleSearchFriendsMode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSearchFriendsMode(!searchFriendsMode)
  }

  const logoutClick = () => {
    if (logoutConfirm) logout()
    else {
      cancelLogoutTimer.current = setTimeout(() => setLogoutConfirm(false), 2000)
      setLogoutConfirm(true)
    }
  }

  if (isMeLoading || !me)
    return (
      <SafeAreaView style={style.screen}>
        <Text>Loading</Text>
      </SafeAreaView>
    )

  if (searchFriendsMode) {
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
          <UserSearch />
        </View>
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
        <FriendsList friends={friends} isLoading={isFriendsListLoading} />
      </View>
      <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
        <Text>{version}</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  friends: selectMyFriends(state),
  isFriendsListLoading: state.users.isFriendsListLoading,
  isMeLoading: state.users.meIsLoading,
  me: selectMe(state),
})
const mapDispatchToProps = { logout }
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
