import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { Mycontext } from '../App'
const Home = ({ navigation }) => {

    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    // const dispatch = useDispatch()

    // const {data,loading} = useSelector((state)=>{
    //     return state
    // })

    const { state, dispatch } = useContext(Mycontext)
    const {data,loading} = state


    fetchData = () => {
        fetch("http://15bf73f64f1f.ngrok.io/")
            .then(res => res.json())
            .then(results => {
                dispatch({ type: "ADD_DATA", payload: results })
                dispatch({ type: "SET_LOADING", payload: false })
                // setData(results)
                // setLoading(false)
            }).catch(err => {
                Alert.alert("Something Went Wrong");
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    // const renderList = data.map((item) => {

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard}
                onPress={() => navigation.navigate('Profile', { item: item })}
                key={item._id}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>

                </View>

            </Card>

        )
    })

    return (
        <View style={{ flex: 1 }}>


            <FlatList
                data={data}
                renderItem={({ item }) => { return renderList(item) }}
                keyExtractor={item => item._id.toString()}
                onRefresh={() => fetchData()}
                refreshing={loading}

            />


            <FAB onPress={() => navigation.navigate('Create')}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}

            />
        </View>

    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,

    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 20,

    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
})

export default Home;