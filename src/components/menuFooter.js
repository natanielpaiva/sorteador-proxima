import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';



export default function MenuFooter(props) {

    const home = () => {
        props.navigation.navigate('Home')
    }


    return (
        <Footer style={{ backgroundColor: '#62B1F6' }}>
            <FooterTab style={{ backgroundColor: '#62B1F6', color: '#fff' }}>
                <Button onPress={home} vertical>
                    <Icon style={styles.fontItens} name="home" type='AntDesign' />
                    <Text style={styles.fontItens}>Início</Text>
                </Button>
                <Button onPress={props.finalizarPartida}  vertical>
                    <Icon style={styles.fontItens} name="add-task" type="MaterialIcons" />
                    <Text style={styles.fontItens}>Fim da partida</Text>
                </Button>
                <Button onPress={props.adicionarJogador} vertical>
                    <Icon style={styles.fontItens} active name="adduser" type="AntDesign" />
                    <Text style={styles.fontItens}>Adicionar Jogador</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fontItens: {
        color: '#fff'
    }
});
