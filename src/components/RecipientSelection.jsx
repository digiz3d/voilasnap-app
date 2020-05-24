import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import RecipientSelectionItem from './RecipientSelectionItem'

const RecipientSelection = ({ friends, onSelect, selectedRecipientId }) => {
  return (
    <>
      <Text style={style.title}>Select a recipient</Text>
      <ScrollView>
        {friends.map((friend, i) => (
          <RecipientSelectionItem
            friend={friend}
            isFirst={i === 0}
            isSelected={selectedRecipientId === friend._id}
            key={friend._id}
            onSelect={() => onSelect(friend._id)}
          />
        ))}
      </ScrollView>
    </>
  )
}

export default RecipientSelection

const style = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 33,
    padding: 10,
    paddingTop: 10 + Constants.statusBarHeight,
  },
})
