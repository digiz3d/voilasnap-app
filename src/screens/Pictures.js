import React from 'react'
import { Text, View, Platform, ScrollView } from 'react-native'
import Constants from 'expo-constants'

const pictures = []

const Pictures = () => (
  <View style={{ paddingTop: Constants.statusBarHeight, flexGrow: 1 }}>
    <ScrollView>
      {pictures.map((picture) => (
        <View
          style={{ borderBottomColor: 'black', borderBottomWidth: 1, height: 50 }}
          key={picture._id}>
          <Text>{picture.content}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)

export default Pictures
