import { Button, Form, Input, Item, Label, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
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

    const lista = () => {
        navigation.navigate('Listar')
    }

    const embaralharLista = (listaCompleta) => {
        return listaCompleta.sort(function (a, b) { return 0.5 - Math.random() })
    }

    const confirmSorteio = () =>

        JogadoresService.findAll().then(data => {
            if (data._array.length > 4) {
                Alert.alert(
                    "Confirmar sorteio!",
                    "Tem certeza? Se já tiver sorteado os times de hoje, não use essa opção!",
                    [
                        {
                            text: "Não sortear",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Quero sortear sim!", onPress: () => sortear() }
                    ],
                    { cancelable: false }
                );
            } else {
                sortear()
            }
        })

    return (
        <View style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label>Coloque os nomes por linha</Label>
                    <Input
                        multiline
                        style={{ height: 300 }}
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
                full warning
                onPress={confirmSorteio}
                style={{
                    marginTop: 20,
                }}
            ><Text> Sortear </Text>
            </Button>
            <Button
                full info
                onPress={lista}
                style={{
                    marginTop: 20,
                }}
            ><Text> Lista já feita </Text>
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
