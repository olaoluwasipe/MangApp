import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'

const TopMangaView = ({navigation, route}) => {
  const item = route.params.item;
  console.log(item)
  return (
    <SafeAreaView>
      <ImageBackground backgroundColor='#39ff14' opacity={0.5} source={{uri: item.images.jpg.image_url}} style={styles.top}>
        <TouchableOpacity style={{backgroundColor: '#F5F5F5', borderRadius: 50, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 10, top: 10}}>
          <Ionicons name='arrow-back' size={30} color='#16171F' onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <View style={{backgroundColor: '#F5F5F5', borderRadius: 20, display:'flex', justifyContent: 'center', marginTop: 200, marginLeft: 10}}>
          <Image resizeMode='cover' style={{width: 150, height: 200, borderWidth: 2, borderColor: '#F5F5F5', borderRadius: 20}} source={{uri: item.images.jpg.image_url}} />
        </View>
      </ImageBackground>
      <ScrollView style={styles.container}>
        <View style={{display: 'flex', justifyContent: 'right', flexDirection: 'row-reverse'}}>
          <View></View>
          <View style={{paddingVertical: 5, width: '55%'}}>
              <Text style={styles.titleText}>{item.title}</Text>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name='star' size={20} color='#FFD700'/>
                  <Text style={styles.bodyText}>{item?.score}</Text>
              </View>
              {/* <Text style={styles.bodyText}>{manga?.data?.chapters} Chapters</Text> */}
            <Text style={styles.bodyText}>Genres: {item?.genres?.map((item) => item.name+", ")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TopMangaView

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 20,
    marginTop: -10
  },
  bodyText: {
    color: 'white'
  },
  sectionText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 50,
    marginBottom: 20
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
    padding: 10,
    width: '100%',
    height: 200
  },
  tags: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  hero: {
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendation: {
    marginTop: 5, 
    // marginLeft: Math.round(width * 0.04),
  },
})