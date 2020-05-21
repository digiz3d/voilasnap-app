import React, { useRef } from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function debounce(func) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, 300)
  }
}

const UserSearchInput = ({ onChangeText, onSearch, text }) => {
  const delayedSearch = useRef(debounce(onSearch)).current

  return (
    <View style={style.container}>
      <TextInput
        autoCapitalize="none"
        autoCompleteType="username"
        clearButtonMode="always"
        onChangeText={(text) => {
          onChangeText(text)
          delayedSearch(text)
        }}
        placeholder="Search"
        style={style.input}
        value={text}
      />
      {Platform.OS === 'android' && text.length > 0 && (
        <Text onPress={() => onChangeText('')} style={style.clear}>
          x
        </Text>
      )}
    </View>
  )
}
export default UserSearchInput

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexGrow: 1,
    height: 40,
    padding: 10,
  },
  clear: {
    backgroundColor: '#cccc',
    borderRadius: 30,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    height: 15,
    lineHeight: 15,
    paddingHorizontal: 5,
    position: 'absolute',
    right: 10,
    textAlign: 'center',
    width: 15,
  },
})
