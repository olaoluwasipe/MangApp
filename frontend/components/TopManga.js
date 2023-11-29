import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'

const TopManga = ({item, navigation}) => {
  return (
    <TouchableOpacity style={styles.manga} onPress={() => navigation.navigate('TopMangaView', {screens: 'TopMangaView', item: item})}>
        <Image resizeMode='cover' style={{width: '100%', height: 200, borderRadius: 4}} source={{uri: item.images.jpg.image_url}} />
        <View style={{paddingVertical: 5}}>
            <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
            
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name='star' size={20} color='#FFD700'/>
                    <Text style={styles.bodyText}>{item.score}</Text>
                </View>
            <Text style={styles.bodyText}>{item?.chapters} Chapters</Text>
            </View>
            <Text numberOfLines={2} style={styles.bodyText}>Genres: {item.genres?.map((item) => item.name+", ")}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default TopManga

const styles = StyleSheet.create({
    manga: {
        width: 150,
        flex: 1,
        padding: 5,
        marginRight: 10,
        backgroundColor: '#292c35',
        borderRadius: 5
    },
    titleText: {
        color: '#F5F5F5',
        fontWeight: '700',
        fontSize: 18
    },
    bodyText: {
        color: '#F5F5F5',
        // fontWeight: '600'
    }
})