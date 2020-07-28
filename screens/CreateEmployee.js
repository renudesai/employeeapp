import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Modal, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const CreateEmployee = ({ navigation, route }) => {

    const getDetails = (type) => {
        if (route.params) {

            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "salary":
                    return route.params.salary
                case "position":
                    return route.params.position
                case "email":
                    return route.params.email
                case "picture":
                    return route.params.picture
            }
        }
        return ""

    }


    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false)
    const [enableShift, setEnableShift] = useState(false)

    const submitData = () => {
        fetch("http://7646fef891b3.ngrok.io/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is saved successfuly`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("someting went wrong")
            })
    }

    const updateDetails = () => {
        fetch("http://7646fef891b3.ngrok.io/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is updated`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("someting went wrong")
            })

    }


    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`

                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`

                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }


    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", "renudesai29")

        fetch("https://api.cloudinary.com/v1_1/renudesai29/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                setPicture(data.url)
                setModal(false)
                console.log(data)
            })

    }


    return (
        <KeyboardAvoidingView
            behavior="position"
            enabled={enableShift}
            style={styles.root}>

            <View>

                <TextInput
                    label='Name'
                    style={styles.inputStyle}
                    value={name}
                    mode="outlined"
                    theme={theme}
                    onFocus={()=> setEnableShift(false)}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label='Email'
                    style={styles.inputStyle}
                    value={email}
                    mode="outlined"
                    theme={theme}
                    onFocus={()=> setEnableShift(false)}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label='Phone'
                    style={styles.inputStyle}
                    value={phone}
                    mode="outlined"
                    keyboardType="number-pad"
                    theme={theme}
                    onFocus={()=> setEnableShift(false)}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label='Salary'
                    style={styles.inputStyle}
                    value={salary}
                    mode="outlined"
                    theme={theme}
                    onFocus={()=> setEnableShift(false)}
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label='Position'
                    style={styles.inputStyle}
                    value={position}
                    mode="outlined"
                    theme={theme}
                    onFocus={()=> setEnableShift(false)}
                    onChangeText={text => setPosition(text)}
                />
                <Button theme={theme} style={styles.inputStyle} icon={picture == "" ? "upload" : "check"} mode="contained" onPress={() => setModal(true)}>
                    Upload Image
            </Button>
                {route.params ?
                    <Button theme={theme}
                        style={styles.inputStyle}
                        icon="content-save"
                        mode="contained" onPress={() => updateDetails()}>
                        Update
                 </Button>
                    :
                    <Button theme={theme}
                        style={styles.inputStyle}
                        icon="content-save"
                        mode="contained" onPress={() => submitData()}>
                        Save
             </Button>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => setModal(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalBtnView}>
                            <Button theme={theme} style={{ marginTop: 10 }} icon="camera" mode="contained" onPress={() => pickFromCamera()}>
                                camera
                        </Button>
                            <Button theme={theme} style={{ marginTop: 10 }} icon="image-area" mode="contained" onPress={() => pickFromGallery()}>
                                Gallery
                        </Button>

                        </View>
                        <Button theme={theme} onPress={() => setModal(false)}>
                            cancel
                    </Button>
                    </View>

                </Modal>
            </View>
        </KeyboardAvoidingView>
    )

}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        backgroundColor: "#e0e0e0"

    },
    modalBtnView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default CreateEmployee