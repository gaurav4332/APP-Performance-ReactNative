import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CounterComp from './CounterComp'

const App = () => {

  const [number, setNumber] = useState(0)
  const [randomNumber, sertRandomNumber] = useState(0)
  const onRandom = useCallback(() => {
    sertRandomNumber(Math.random)
  }, [])

  const OnIncreament = useCallback(() => {
    setNumber(number + 1)
  }, [number])

  const OnDecreament = useCallback(() => {
    setNumber(number <= 0 ? 0 : number - 1)
  }, [number])

  return (
    <View style={styles.Main}>

      <View style={{ alignItems: 'center', alignContent: 'center' }}>

        <Text onPress={onRandom} style={styles.text}>{randomNumber}</Text>
        <TouchableOpacity
          onPress={OnDecreament}
        >
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <CounterComp number={number} />
        <TouchableOpacity
          onPress={OnIncreament}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 40
  }
})