import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MenuFooter from '../components/menuFooter';
import Proximos from '../components/proximos';
import Times from '../components/times';
import JogadoresService from '../services/JogadoresService';



export default function ListarJogadores() {
    const [lista, onChangeLista] = React.useState([]);

    React.useEffect(() => {
        initList()
    }, [initList]);


    const initList = () => {
        JogadoresService.findAll().then(data => {
            onChangeLista(lista => data._array)
            // console.log(data._array)
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Times lista={lista} nomeTime='Time 1' status='Jogando' />
                <Times lista={lista} nomeTime='Time 2' status='Jogando' />
                <Proximos lista={lista} />
            </ScrollView>
            <MenuFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
