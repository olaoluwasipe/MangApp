import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chapter from '../components/Chapter'
import Synopsis from '../components/Synopsis'

const {width, height} = Dimensions.get('screen');
const TopMangaView = ({navigation, route}) => {
  const item = route.params.item;
  const [manga, setManga] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const title = item.title;
  const url = title.split(" ").splice(0, 3).join("%20")

  const getMangaInfo = async () => {
    try {
      const response = await axios.get(`http://192.168.100.168:3000/manga_list?keyw=${url}`);
      const id = response.data[0].data[0].id
      const catchman = await axios.get(`http://192.168.100.168:3000/manga_info?id=${id}`, {headers: {
        'host-name' : 'readmanganato.com'
      }})
      setManga(catchman.data[0])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const man = async () =>  {
      const mann = await getMangaInfo();
    }
    man();
  }, [])

  return (
    <SafeAreaView>
      <ImageBackground backgroundColor='#39ff14' opacity={0.5} source={{uri: item.images.jpg.image_url}} style={styles.top}>
        <TouchableOpacity style={{backgroundColor: '#F5F5F5', borderRadius: 50, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 10, top: 10}}>
          <Ionicons name='arrow-back' size={30} color='#16171F' onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <View style={{backgroundColor: '#F5F5F5', borderRadius: 20, display:'flex', justifyContent: 'center', marginTop: 200, marginLeft: 10}}>
          <Image resizeMode='cover' style={{width: 150, height: 200, borderWidth: 2, borderColor: '#F5F5F5', borderRadius: 20, zIndex: 30, position: 'relative'}} source={{uri: item.images.jpg.image_url}} />
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
            <Text style={styles.genreText}>Genres: {item?.genres?.map((item) => item.name+", ")}</Text>
          </View>
        </View>
        <Synopsis text={item?.synopsis} lines={5}/>
        <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '800',
            marginBottom: 10,
            marginTop: 30,
        }}>Chapters:</Text>
        <ScrollView style={styles.chapters}>
          {isLoading ? (
            <ActivityIndicator
              color='#39FF14'
              style={{height: 200}}
              size={50}
            />
          ) : (
            manga?.chapters?.map((item, index) => (
            <Chapter key={index} navigation={navigation} item={item} />
          )))}
          
        </ScrollView>
      </ScrollView>
      <TouchableOpacity style={{position: 'absolute', top: Math.round(height - 130), backgroundColor: '#39FF14', padding: 20, flex: 1, right: 20, borderRadius: 30}}>
        <Text>Start Reading</Text>
      </TouchableOpacity>
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
  genreText: {
    color: 'white',
    marginBottom: 20
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
    width: '120%',
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
  chapters: {
    backgroundColor: '#292c35',
    borderRadius: 20, 
    overflow: 'hidden',
    display: 'flex',
    height: 300,
    gap: 15,
    paddingVertical: 15,
    paddingHorizontal: 5
  },
})