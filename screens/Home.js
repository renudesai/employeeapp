import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper';


const Home = () => {

    const data = [
        { id: 1, name: "Mukesh", position: "Web Dev" },
        { id: 2, name: "Suresh", position: "Android Dev" },
        { id: 3, name: "Ramesh", position: "ML Expert" },
        { id: 4, name: "Hitesh", position: "Web Dev" },
        { id: 5, name: "Hitesh", position: "Web Dev" },
        { id: 6, name: "Hitesh", position: "Web Dev" },
        { id: 7, name: "Hitesh", position: "Web Dev" },
        { id: 8, name: "Hitesh", position: "Web Dev" },
        { id: 9, name: "Hitesh", position: "Web Dev" },
        { id: 10, name: "Hitesh", position: "Web Dev" },
        { id: 11, name: "Hitesh", position: "Web Dev" },
        { id: 12, name: "Hitesh", position: "Web Dev" },
    ]

    // const renderList = data.map((item) => {

    const renderList = ((item) => {
        return (
            <Card style={styles.mycard} key={item.id}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: "https://images.unsplash.com/flagged/photo-1536475280412-92f55a99824e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" }}
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
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => { return renderList(item) }}
                keyExtractor={item => item.id.toString()}

            />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:"#006aff"}}}
                onPress={() => console.log('Pressed')}
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
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home;