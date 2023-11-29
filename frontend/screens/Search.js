import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopManga from '../components/TopManga'
import axios from 'axios'

const Search = ({navigation}) => {
  const [mangas, setMangas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searched, setSearched] = useState('')
  const [minScore, setMinScore] = useState('')
  const [status, setStatus] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [letter, setLetter] = useState('')
  const [typer, setTyper] = useState('')

  const data = {
    q: searched,
    min_score: minScore,
    status: status,
    order_by: orderBy,
    letter: letter,
    type: typer
  }
  const search = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${searched}`, data);
      setMangas(response.data)
      setIsLoading(false)
      // console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const makeSearch = (value) => {
    setIsLoading(true)
    const dnd = () => {
      setTimeout( () => {
        search();
      }, 3000);
      // await search();
    }
    dnd()
  }
  useEffect(() => {
    const dnd = async () => {
      await search();
    }
    dnd()
  }, [])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder='Find a Manga'
          onChangeText={text => {setSearched(text); makeSearch(text)}}
        />
        {isLoading ? (
          <View style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={40} color='#39ff14' />
          </View>
        ) :  (
          <FlatList 
              style={styles.recommendation}
              numColumns={2}
              contentContainerStyle={{gap: 30}}
              showsHorizontalScrollIndicator={false}
              data={mangas?.data}
              renderItem={({item, index}) => (
                <TopManga item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.mal_id}
            />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    padding: 20
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
  searchBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    // margin: 8
  },
  recommendation: {
    paddingVertical: 30
  }
})