import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, FlatList, Modal, Alert } from 'react-native';
import { Title, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile = (props) => {

    const { _id, name, picture, phone, salary, position, email } = props.route.params.item

    console.log(_id)
    const deleteEmployee = () => {
        fetch("http://15bf73f64f1f.ngrok.io/delete", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
            .then(res => res.json())
            .then(text => {

                console.log(text)
                Alert.alert(`${text.name} deleted`)
                props.navigation.navigate("Home")
            })
            .catch(err => {
                console.log(err)
                Alert.alert("someting went wrong")
                
            })

    }

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`);
        } else {
            Linking.openURL(`telprompt:${phone}`);
        }
    }



    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "20%" }}
            />
            <View style={styles.imageView}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 70, marginTop: -50 }}
                    source={{ uri: picture }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 18 }}>{position}</Text>
            </View>
            <Card style={styles.myCard} onPress={() => {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#006aff" />
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.myCard} onPress={() => openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#006aff" />
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff" />
                    <Text style={styles.myText}>£{salary}</Text>
                </View>
            </Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
                <Button theme={theme} style={{ marginTop: 10 }} icon="account-edit" mode="contained" onPress={() => {
                    props.navigation.navigate("Create",
                    { _id:_id, name, picture, phone, salary, position, email })
                    }}>
                    Edit
                        </Button>
                <Button theme={theme} style={{ marginTop: 10 }} icon="delete" mode="contained" onPress={() => deleteEmployee()}>
                    Delete
                        </Button>
            </View>


        </View>

    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    imageView: {
        alignItems: "center"
    },
    myCard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    },
    myText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    }
})

export default Profile;