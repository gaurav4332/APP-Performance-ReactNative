import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CounterComp = ({number}) => {
    console.log("re-render",number)
  return (
    <Text style={{ color:'#000000',
    fontWeight:'bold',
    fontSize:40}}>{number}</Text>
  )
}

export default React.memo(CounterComp)

