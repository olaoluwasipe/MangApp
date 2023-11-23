import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tag = ({name, active}) => {
  return (
    <View style={active ? styles.letagActi : styles.letagNot}>
      <Text>{name}</Text>
    </View>
  )
}

export default Tag

const styles = StyleSheet.create({
    letagActi: {
        backgroundColor: '#39FF14',
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: 'auto',
        display: 'flex',
        height: 30,
    },
    letagNot: {
        backgroundColor: 'white',
        color: '#16171F',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: 'auto',
        display: 'flex',
        height: 30,
    }
})