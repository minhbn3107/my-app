import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Headercomponent from './Headercomponent';
import MenuComponent from './MenuComponents';


const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Headercomponent />
            <StatusBar style='dark'/>
            <MenuComponent navigation={navigation} />
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        height: "100%",
        position: "relative",
    }

});