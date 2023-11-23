import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Manga = ({item, navigation}) => {
    const finItem = item.entry[0]
    const [manga, setManga] = useState([])
    const getManga = async () => {
        const idd = item.mal_id.split('-');
        const response = await axios.get(`https://api.jikan.moe/v4/manga/${idd[0]}/full`)
        setManga(response.data);
    }

    useEffect(() => {
      const man = async () =>  {
        const mann = await getManga();
      }
      man();
    }, [])
  return (
    <TouchableOpacity style={styles.manga} onPress={() => navigation.navigate('MangaView', {screens: 'MangaView', item: item})}>
        <Image resizeMode='cover' style={{width: '100%', height: 200, borderRadius: 4}} source={{uri: finItem.images.jpg.image_url}} />
        <View style={{paddingVertical: 5}}>
            <Text numberOfLines={1} style={styles.titleText}>{finItem.title}</Text>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='star' size={20} color='#FFD700'/>
                <Text style={styles.bodyText}>{manga?.data?.score}</Text>
            </View>
            <Text style={styles.bodyText}>{manga?.data?.chapters} Chapters</Text>
            {/* <Text style={styles.bodyText}>{manga?.genres[0]?.name}</Text> */}
        </View>
    </TouchableOpacity>
  )
}

export default Manga

const styles = StyleSheet.create({
    manga: {
        width: 150,
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