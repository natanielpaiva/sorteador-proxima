import { Button, Icon, List, ListItem, SwipeRow, Text, CheckBox } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Proximos(props) {

    return (
        <List>
            <ListItem itemDivider>
                <Text
                    style={{
                        // fontSize: 27,
                        fontWeight: 'bold', color: '#76787C'
                    }}
                >Próximos</Text>
            </ListItem>
            {props.lista.map((jogador, key) => {
                let pago = false
                let textPago = "Não Pago"
                if (parseInt(jogador.pago) > 0) {
                    pago = true
                    textPago = "Pago"
                }

                if ('Time 1' !== jogador.time && 'Time 2' !== jogador.time) {
                    return (
                        <SwipeRow
                            key={key}
                            // leftOpenValue={75}

                            directionalDistanceChangeThreshold={20}
                            rightOpenValue={-75}
                            left={
                                <Button success onPress={() => alert('Add')}>
                                    <Icon active name="add" />
                                </Button>
                            }
                            body={

                                <ListItem style={{ marginStart: 20, }}>
                                    <View>
                                        <CheckBox checked={pago} onPress={() => props.pagarJogador(jogador, pago)} />
                                    </View>
                                    <Text style={{
                                        marginStart: 20,
                                        color: '#76787C'
                                    }}>{textPago}</Text>
                                    <Text style={{
                                        // fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#76787C'
                                    }}>{jogador.time}: </Text>
                                    <Text style={{
                                        // fontSize: 25,
                                        color: '#76787C'
                                    }}>{jogador.nome}</Text>
                                </ListItem>
                            }
                            right={
                                <Button danger onPress={() => props.excluir(jogador)}>
                                    <Icon active name="trash" />
                                </Button>
                            }
                        >
                        </SwipeRow>
                    )
                }
            })}
        </List>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00E84E',
    },
    nome: {
        color: '#fff'

    }
});
