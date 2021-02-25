import { Button, Form, Input, Item, Label, Text, Icon } from 'native-base';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Load from '../components/load';
import DatabaseInit from '../database/database-init';
import ContadorService from '../services/ContadorService';
import JogadoresService from '../services/JogadoresService';


export default function HomeScreen({ navigation }) {
    const [value, onChangeText] = React.useState('');
    const [qtdPorTime, onChangeQtd] = React.useState(4);
    const [loading, setLoading] = React.useState(false);

    const sortear = () => {
        setLoading(true)
        new DatabaseInit()

        let listaSemNumeros = value.replace(/[0-9]/g, '')
        let listaCompleta = listaSemNumeros.split(/\n/)
        listaCompleta = embaralharLista(listaCompleta)

        setTimeout(() => {
            ContadorService.addData(parseInt(qtdPorTime))
            JogadoresService.addAllPlayers(listaCompleta, qtdPorTime)
            setTimeout(() => {
                setLoading(false)
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
            <Load visible={loading} />
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
