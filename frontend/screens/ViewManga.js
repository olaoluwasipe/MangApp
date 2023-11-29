import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';

const ViewManga = ({navigation, route}) => {
    const nn = route.params.url;
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    
  const getMangaInfo = async () => {
    try {
      const catchman = await axios.get(`http://192.168.100.168:3000/read_manga`, {headers: {
        'host-name' : 'readmanganato.com',
        url: nn
      }})
      setImages(catchman.data.map((item) => item.img))
      console.log(catchman.data.map((item) => item.img))
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
    <View>
      <Text>ViewManga</Text>
      {images?.map((item, index) => (
        <Image key={index} style={{width: '100%', height: 400, backgroundColor: 'white'}} source={{uri: item}} />
      ))}
    </View>
  )
}

export default ViewManga

const styles = StyleSheet.create({})