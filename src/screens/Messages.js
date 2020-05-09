import React from 'react'
import { Text, View, Platform, ScrollView } from 'react-native'
import Constants from 'expo-constants'

const messages = []

const Messages = () => (
  <View style={{ paddingTop: Constants.statusBarHeight, flexGrow: 1 }}>
    <ScrollView>
      {messages.map((message) => (
        <View
          style={{ borderBottomColor: 'black', borderBottomWidth: 1, height: 50 }}
          key={message._id}>
          <Text>{message.content}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)

export default Messages
