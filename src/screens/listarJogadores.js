import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import CadastrarJogador from '../components/cadastrarJogador';
import MenuFooter from '../components/menuFooter';
import Proximos from '../components/proximos';
import Times from '../components/times';
import ContadorService from '../services/ContadorService';
import JogadoresService from '../services/JogadoresService';


export default function ListarJogadores({ navigation }) {
    const [lista, onChangeLista] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    let listaCompletaUpdate = []

    React.useEffect(() => {
        initList()
    }, [initList]);

    const cadastrar = (nome) => {
        if (nome === '') {
            Alert.alert("Preencha o nome!");
            return
        }

        JogadoresService.findLastRegister().then(data => {
            countNumberUltimoTime(data._array[0], nome)
        })
    }

    const countNumberUltimoTime = (ultimoRegistro, nome) => {
        JogadoresService.countNumberUltimoTime(ultimoRegistro.numeroTime).then(data => {
            countNumberPorTime(data._array[0].contador, ultimoRegistro, nome)
        })
    }

    const countNumberPorTime = (qtdNumberUltimoTime, ultimoRegistro, nome) => {
        JogadoresService.countNumberPorTime().then(data => {
            let countNumberPorTime = data._array[0].contador
            if (parseInt(countNumberPorTime) > parseInt(qtdNumberUltimoTime)) {
                addData(ultimoRegistro.numeroTime, ultimoRegistro, nome)
            } else {
                addData(ultimoRegistro.numeroTime + 1, ultimoRegistro, nome)
            }
        })
    }

    const addData = (numeroTime, ultimoRegistro, nome) => {
        JogadoresService
            .addData(nome, ultimoRegistro.ordem, 'Time ' + numeroTime, numeroTime).then(() => {
                initList()
                onRequestClose()
            })
    }

    const initList = () => {
        JogadoresService.findAll().then(data => {
            onChangeLista(lista => data._array)
            listaCompletaUpdate = data._array
        })
    }

    const onRequestClose = () => {
        setVisible(false)
    }

    const adicionarJogador = () => {
        setVisible(true)
    }

    const confirmarExclusao = (jogador) => {
        JogadoresService.deleteById(jogador.id)
        setTimeout(() => {
            initList()
            setTimeout(() => {
                deleteAll()
            }, 1000);
        }, 1000);

    }

    const deleteAll = () => {
        JogadoresService.deleteAll()
        setTimeout(() => {
            ContadorService.findQtdPorTime().then(data => {
                JogadoresService.addAllPlayers(gerarArrayList(), parseInt(data._array[0].qtdPorTime))
                setTimeout(() => {
                    initList()
                }, 1000);
            })
        }, 1000);
    }

    const gerarArrayList = () => {
        let arrayList = []
        listaCompletaUpdate.forEach(jogador => {
            arrayList.push(jogador.nome)
        });
        return arrayList
    }

    const excluir = (jogador) => {
        Alert.alert(
            "Confirmar exclusão!",
            "Tem certeza? Esse cara desistiu da pelada?",
            [
                {
                    text: "Não desistiu",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Desistiu sim!", onPress: () => confirmarExclusao(jogador) }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Times excluir={excluir} navigation={navigation} lista={lista} nomeTime='Time 1' status='Jogando' />
                <Times excluir={excluir} navigation={navigation} lista={lista} nomeTime='Time 2' status='Jogando' />
                <Proximos excluir={excluir} navigation={navigation} lista={lista} />
            </ScrollView>
            <CadastrarJogador cadastrar={cadastrar} onRequestClose={onRequestClose} visible={visible} />
            <MenuFooter navigation={navigation} adicionarJogador={adicionarJogador} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
