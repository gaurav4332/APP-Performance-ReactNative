import { FlatList, Image, SafeAreaView, StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React, { useCallback, useEffect, useState ,} from 'react'

let limit = 5
let loadMore =true

const FlatlistPagination = () => {

    const [data, setData] = useState([])
    const [skip, setSkip] = useState(0)
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        FetchData()
    }, [])
    const FetchData = () => {
        let query = `?skip=${skip}&limit=${limit}`
        fetch('https://dummyjson.com/products'+ query)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.products.length == 0){
                    loadMore=false
                }
                setData([...data , ...res.products])
                setSkip(skip+5)
                setShowLoader(false)
            })
            .catch((error => { console.log('error', error) }))
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <View style={styles.FlatStyle}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.ImageStyle}
                />
                <View style={styles.TextView}>
                    <Text style={styles.textStyle}>{item.brand}</Text>
                    <Text style={styles.textStyle}>Rs. {item.price}</Text>
                   
                </View>
                <Text style={[styles.textStyle, {fontSize:12}]}>{item.description}</Text>
            </View>
        )
    }, [data])

    const keyExtractor = useCallback((item) => `${item.id}`)

    const itemSeparatorComponent = useCallback(() => {
        return (
            <View style={{ height: 20, }}></View>
        )
    }, [data])

const onEndReached = () =>{
   if(loadMore){
    setShowLoader(true)
    FetchData()
   }
}

const listFooterComponent = useCallback(()=>{
    return(
        <ActivityIndicator style={{paddingVertical:16}} size={'large'}/>
    )
},[])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={itemSeparatorComponent}
                    onEndReached={onEndReached}
                    ListFooterComponent={ showLoader && listFooterComponent}
                />
            </View>
        </SafeAreaView>
    )
}

export default FlatlistPagination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15
    },
    ImageStyle: {
        height: 200,
        width: "100%",
        borderRadius: 20
    },
    TextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    textStyle: {
        fontSize: 20,
        color: '#000000'
    },
    FlatStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding:8,
        margin:2,
        backgroundColor:'white',
        borderRadius:10
    }
})