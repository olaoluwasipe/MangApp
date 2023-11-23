import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const Synopsis = ({text, lines}) => {
    const [numberOfLines, setNumberOfLines] = useState(lines)
    const change = () => {
        if(numberOfLines == lines){
            setNumberOfLines(200)
        }else{
            setNumberOfLines(lines)
        }
    }

    return (
        <TouchableOpacity onPress={() => change()}>
            <Text numberOfLines={numberOfLines} style={styles.bodyText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Synopsis

const styles = StyleSheet.create({
    bodyText: {
        color: 'white'
    }
})