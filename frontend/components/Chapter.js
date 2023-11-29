import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Chapter = ({ item}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.chapter} onPress={() => navigation.navigate('ViewManga', {url: item.chapterLink})}>
        <View>
            <Text style={styles.bodyText}>{item.chapterTitle}</Text>
            <Text style={styles.secondaryText}>Views: {item.chapterViews}</Text>
        </View>
      <Text style={{color: '#C3C3C3', fontSize: 12}}>Released {item.uploadedDate}</Text>
    </TouchableOpacity>
  )
}

export default Chapter

const styles = StyleSheet.create({
    chapter: {
        borderBottomWidth: 0.5,
        borderColor: '#C3C3C3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bodyText: {
      color: 'white'
    },
    secondaryText: {
        color: '#808080'
    }
})