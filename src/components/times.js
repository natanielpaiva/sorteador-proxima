import { List, ListItem, Text, SwipeRow, Button, Icon, View, CheckBox } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';


export default function Times(props) {

    return (
        <List>
            <ListItem itemDivider>
                <Text
                    style={{
                        color: 'gray',
                        fontWeight: 'bold',
                    }}
                >{props.nomeTime}  {props.status}</Text>
            </ListItem>

            {props.lista.map((jogador, key) => {
                let pago = false
                let textPago = "Não Pago"
                if(parseInt(jogador.pago) > 0){
                    pago = true
                    textPago = "Pago"
                }

                if (props.nomeTime === jogador.time) {
                    return (
                        <SwipeRow
                            key={key}
                            // leftOpenValue={75}
                            rightOpenValue={-75}
                            left={
                                <Button success onPress={() => alert('Add')}>
                                    <Icon active name="add" />
                                </Button>
                            }
                            body={
                                <View style={{flexDirection:"row"}}>
                                    <View>
                                        <CheckBox checked={pago} onPress={() => props.pagarJogador(jogador, pago)} />
                                    </View>
                                    <View>
                                        <Text style={{
                                            marginStart: 20,
                                            color: '#76787C'
                                        }}>{textPago}</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            marginStart: 20,
                                            color: '#76787C'
                                        }}>{jogador.nome}</Text>
                                    </View>
                                </View>
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
