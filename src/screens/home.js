import { Button, Form, Input, Item, Label, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatabaseInit from '../database/database-init';
import JogadoresService from '../services/JogadoresService';


export default function HomeScreen({ navigation }) {
    const [value, onChangeText] = React.useState('');
    const [qtdPorTime, onChangeQtd] = React.useState(4);

    const sortear = () => {
        new DatabaseInit()

        let listaSemNumeros = value.replace(/[0-9]/g, '')
        let listaCompleta = listaSemNumeros.split(/\n/)
        listaCompleta = embaralharLista(listaCompleta)

        setTimeout(() => {
            JogadoresService.addAllPlayers(listaCompleta, qtdPorTime)
            setTimeout(() => {
                navigation.navigate('Listar')
            }, 1000);
        }, 1000);


    }

    const embaralharLista = (listaCompleta) => {
        return listaCompleta.sort(function (a, b) { return 0.5 - Math.random() })
    }

    return (
        <View style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label>Coloque os nomes por linha</Label>
                    <Input
                        multiline
                        style={{ height: 300}}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Coloque a quantidade por time</Label>
                    <Input
                        keyboardType={'numeric'}
                        onChangeText={text => onChangeQtd(text)}
                        value={qtdPorTime.toString()}
                    />
                </Item>
            </Form>
            <Button
                full info
                onPress={sortear}
                style={{
                    marginTop: 20,
                }}
            ><Text> Sortear </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
