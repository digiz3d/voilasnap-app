import { connect } from 'react-redux'
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import React from 'react'

import { logout } from '../reducers/auth'
import { selectMe, selectMyFriends } from '../reducers/users'
import { version } from '../../package.json'
import FriendsList from '../components/FriendsList'

function Profile({ isFriendsListLoading, isMeLoading, logout, me, friends }) {
  if (isMeLoading || !me)
    return (
      <SafeAreaView style={style.screen}>
        <Text>Loading</Text>
      </SafeAreaView>
    )

  return (
    <SafeAreaView style={style.screen}>
      <View style={[style.card, style.cardHeader]}>
        <Text style={style.accountUsername}>{me.username}</Text>
        <TouchableHighlight
          style={style.cardHeaderButton}
          onPress={() => logout()}
          underlayColor="#fcc">
          <Text style={style.accountLogoutButtonText}>Log out</Text>
        </TouchableHighlight>
      </View>
      <View style={style.card}>
        <View style={style.cardHeader}>
          <Text style={style.cardHeaderTitle}>Friends</Text>
          <TouchableHighlight
            style={style.cardHeaderButton}
            onPress={() => alert('oui')}
            underlayColor="#ccf">
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
  isFriendsListLoading: state.users.isFriendsListLoading,
  isMeLoading: state.users.meIsLoading,
  me: selectMe(state),
  friends: selectMyFriends(state),
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
    borderRadius: 8,
  },
  accountUsername: {
    padding: 10,
  },
  accountLogoutButtonText: {
    color: '#f00',
  },
  friendsAddButtonText: {
    color: '#009',
  },
})
