import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import CadastrarJogador from '../components/cadastrarJogador';
import FinalizarPartida from '../components/finalizarPartida';
import Load from '../components/load';
import MenuFooter from '../components/menuFooter';
import Proximos from '../components/proximos';
import Times from '../components/times';
import ContadorService from '../services/ContadorService';
import JogadoresService from '../services/JogadoresService';


export default function ListarJogadores({ navigation }) {
    const [lista, onChangeLista] = React.useState([]);
    const [primeiroTime, setPrimeiroTime] = React.useState([]);
    const [segundoTime, setSegundoTime] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [visiblePartida, setVisiblePartida] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    var listaCompletaUpdate = []

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
        setLoading(true)
        JogadoresService.findAll().then(data => {
            onChangeLista(lista => data._array)
            listaCompletaUpdate = data._array
            setLoading(false)
            preencherTimes()
        })
    }

    const onRequestClose = () => {
        setVisible(false)
    }
    const onRequestClosePartida = () => {
        setVisiblePartida(false)
    }

    const adicionarJogador = () => {
        setVisible(true)
    }

    const finalizarPartida = () => {
        setVisiblePartida(true)
    }

    const confirmarExclusao = (jogador) => {
        setLoading(true)
        JogadoresService.deleteById(jogador.id)
        setTimeout(() => {
            initList()
            setTimeout(() => {
                let arrayFinal = gerarArrayList(listaCompletaUpdate)
                deleteAll(arrayFinal)
            }, 1000);
        }, 1000);

    }

    const deleteAll = (arrayFinal) => {
        setLoading(true)
        JogadoresService.deleteAll()
        setTimeout(() => {
            ContadorService.findQtdPorTime().then(data => {
                JogadoresService.addAllPlayers(arrayFinal, parseInt(data._array[0].qtdPorTime))
                setTimeout(() => {
                    initList()
                }, 1000);
            })
        }, 1000);
    }

    const gerarArrayList = (listaCompletaUpdate) => {
        let arrayList = []
        for (let i in listaCompletaUpdate) {
            arrayList.push(listaCompletaUpdate[i].nome)
        };
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

    const preencherTimes = () => {
        JogadoresService.findByNumeroTime(1).then(data => {
            setPrimeiroTime(data._array)
        })
        JogadoresService.findByNumeroTime(2).then(data => {
            setSegundoTime(data._array)
        })
    }

    const convertTimeEmString = (time) => {
        let nomes = ''
        time.forEach(jogador => {
            if (nomes !== '')
                nomes = nomes + ", " + jogador.nome
            else
                nomes = jogador.nome
        });
        return nomes
    }

    const escolherPrimeiroTime = () => {
        Alert.alert(
            "Tem certeza que foi o primeiro time?",
            "Com os jogadores " + convertTimeEmString(primeiroTime),
            [
                {
                    text: "Me enganei, foi não!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Foram eles sim!", onPress: () => { descerTime(segundoTime, 2) } }
            ],
            { cancelable: false }
        );
    }
    const escolherSegundoTime = () => {
        Alert.alert(
            "Tem certeza que foi o segundo time?",
            "Com os jogadores " + convertTimeEmString(segundoTime),
            [
                {
                    text: "Me enganei, foi não!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Foram eles sim!", onPress: () => { descerTime(primeiroTime, 1) } }
            ],
            { cancelable: false }
        );
    }

    const escolherEmpatou = () => {
        Alert.alert(
            "Tem certeza que a partida terminou empatada?",
            "Se tiver mais de dois times, sairá os dois. Caso tenha menos será feito um ajuste nos times",
            [
                {
                    text: "Me enganei, não empatou!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Empatou sim!", onPress: () => {
                        descerTimes(primeiroTime, segundoTime)
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const descerTime = (time, numeroTime) => {
        let arrayList = [...lista];

        for (let index in lista) {
            if (parseInt(numeroTime) === parseInt(lista[index].numeroTime)) {
                delete arrayList[index]
            }
        };
        let arrayFinal = gerarArrayList(arrayList)

        for (let i in time) {
            arrayFinal.push(time[i].nome)
        };
        deleteAll(arrayFinal)
        setVisiblePartida(false)
    }

    const descerTimes = (time1, time2) => {
        let arrayList = [...lista];

        for (let index in lista) {
            if (1 === parseInt(lista[index].numeroTime) || 2 === parseInt(lista[index].numeroTime)) {
                delete arrayList[index]
            }
        };
        let arrayFinal = gerarArrayList(arrayList)

        for (let i in time1) {
            arrayFinal.push(time1[i].nome)
        };
        for (let i in time2) {
            arrayFinal.push(time2[i].nome)
        };
        deleteAll(arrayFinal)
        setVisiblePartida(false)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Times excluir={excluir} navigation={navigation} lista={lista} nomeTime='Time 1' status='Jogando' />
                <Times excluir={excluir} navigation={navigation} lista={lista} nomeTime='Time 2' status='Jogando' />
                <Proximos excluir={excluir} navigation={navigation} lista={lista} />
            </ScrollView>
            <CadastrarJogador cadastrar={cadastrar} onRequestClose={onRequestClose} visible={visible} />
            <FinalizarPartida
                primeiroTime={escolherPrimeiroTime}
                segundoTime={escolherSegundoTime}
                empatou={escolherEmpatou}
                onRequestClose={onRequestClosePartida} visible={visiblePartida} />
            <MenuFooter finalizarPartida={finalizarPartida} navigation={navigation} adicionarJogador={adicionarJogador} />
            <Load visible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
