import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableHighlight, FlatList, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import ContentLoader from 'react-native-easy-content-loader';
import Tag from '../components/Tag'
import axios from 'axios'
import Manga from '../components/Manga'
import TopManga from '../components/TopManga'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')
const options = {
  method: 'GET',
  url: 'https://myanimelist.p.rapidapi.com/manga/21',
  headers: {
    'X-RapidAPI-Key': 'ed61e46ec2msh607303505f70932p1ebe48jsn5392ebda1e0e',
    'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
  }
};

const Home = ({navigation}) => {
  const [fManga, setManga] = useState([])
  const [recomm, setRecomm] = useState([])
  const [seop, setTop] = useState([])
  const [genres, setGenres] = useState([])
  const [featuredManga, setFeaturedManga] = useState(null)
  const [topNums, setTopNums] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const manga = async () => {
    try {
      const genres = await axios.get('https://api.jikan.moe/v4/genres/manga');
      const response = await axios.get('https://api.jikan.moe/v4/manga/2/full');
      const recommendations = await axios.get('https://api.jikan.moe/v4/recommendations/manga');
      const top = await axios.get('https://api.jikan.moe/v4/top/manga');
      setGenres(genres.data)
      setTop(top.data)
      const filt = top?.data?.data?.map((item) => item.mal_id)
      setTopNums(filt)
      setRecomm(recommendations.data)
      setManga(response.data);
      setIsLoading(false)
    }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getManga = async () => {
      noanga = await manga();
    }  
  
    setInterval(() => {
      const ran = Math.floor(Math.random() * topNums?.length)
      setFeaturedManga(ran)
    }, 5000);

    getManga()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Ionicons name='person-circle' size={40} color='#39FF14' />
          <ScrollView contentContainerStyle={styles.tags} horizontal={true}>
            <Tag name='All' active={true}/>
            {genres?.data?.map((genre) => (
              <Tag name={genre.name} key={genre.mal_id} active={false}/>
            ))}
          </ScrollView>
        </View>
        <ImageBackground imageStyle={{width: '150%', alignSelf: 'center', opacity: 0.4, marginHorizontal: -30}} source={{uri: topNums.length > 3 ? seop?.data[featuredManga]?.images?.jpg?.image_url : 'https://placehold.co/600x400'}} style={styles.hero}>
          <View style={{backgroundColor: '#F5F5F5', borderRadius: 20, display:'flex', justifyContent: 'center'}}>
          <Image resizeMode='cover' style={{width: 300, height: 350, borderWidth: 2, borderColor: '#F5F5F5', borderRadius: 20}} source={{uri: topNums.length > 3 ? seop?.data[featuredManga]?.images?.jpg?.image_url : 'https://placehold.co/300x350'}} />
            <View style={{padding: 20, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{textTransform: 'capitalize', fontWeight: '600', fontSize: 20}}>{topNums.length > 3 ? seop?.data[featuredManga]?.title : ''}</Text>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name='star' size={20} color='#FFD700'/>
                <Text>{topNums.length > 3 ? seop?.data[featuredManga]?.score : 0}</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1}}>
                <View style={{backgroundColor: '#39FF14', padding: 10 }}>
                  <Text style={{textAlign: 'center'}}>VIEW</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1}} >
                <View style={{backgroundColor: '#d8083c', padding: 10 }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>ADD TO LIST</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Recommendations */}
        <View>
          <Text style={styles.sectionText}>Recommendations</Text>
          <FlatList 
            style={styles.recommendation}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recomm?.data?.slice(0, 10)}
            renderItem={({item, index}) => (
              <Manga item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.mal_id}
          />
        </View>

        {/* Top Manga */}
        <View>
          <Text style={styles.sectionText}>Top Manga</Text>
          <FlatList 
            style={styles.recommendation}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={seop?.data?.slice(0, 10)}
            renderItem={({item, index}) => (
              <TopManga item={item} navigation={navigation}/>
            )}
            keyExtractor={item => item.mal_id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    padding: 20,
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