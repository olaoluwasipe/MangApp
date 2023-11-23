import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text>Welcome</Text>
        </View>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        margin: 'auto',
        height:500,
        width: '100%'
    }
})