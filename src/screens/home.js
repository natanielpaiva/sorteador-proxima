import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import DatabaseInit from '../database/database-init';
import JogadoresService from '../services/JogadoresService';


export default function HomeScreen() {
  const [value, onChangeText] = React.useState('');
  const [qtdPorTime, onChangeQtd] = React.useState(4);

  React.useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    new DatabaseInit()
  });

  const sortear = () => {
    new DatabaseInit()

    onChangeText(value.replace(/[0-9]/g, ''))
    let listaCompleta = value.split(/\n/)
    embaralharLista(listaCompleta)
    console.log(listaCompleta, 'lista alterada')
    JogadoresService.addAllPlayers(listaCompleta)
  }

  const verJogadores = () => {
    JogadoresService.findAll().then(data => {
      console.log(data)
    })
  }

  const embaralharLista = (listaCompleta) => {
    listaCompleta.sort(function (a, b) { return 0.5 - Math.random() })
  }

  return (
    <View style={styles.container}>
      <Text>Coloque um nome por linha:</Text>
      <TextInput
        multiline
        style={{ height: 300, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Text>Coloque a quantidade por time:</Text>
      <TextInput
        keyboardType={'numeric'}
        dataDetectorTypes={'phoneNumber'}
        style={{ height: 40, width: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeQtd(text)}
        value={qtdPorTime.toString()}
      />
      <TouchableOpacity
        onPress={sortear}
        style={{
          backgroundColor: 'blue', width: 200, height: 60, alignItems: 'center', borderRadius: 10
        }}>
        <Text style={{ fontSize: 20, alignItems: 'center', color: '#fff' }}>Sortear</Text>
      </TouchableOpacity>
       <TouchableOpacity
        onPress={verJogadores}
        style={{
          backgroundColor: 'blue', width: 200, height: 60, alignItems: 'center', borderRadius: 10
        }}>
        <Text style={{ fontSize: 20, alignItems: 'center', color: '#fff' }}>Ver Jogadores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
