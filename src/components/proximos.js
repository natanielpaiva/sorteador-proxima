import { Button, Icon, List, ListItem, SwipeRow, Text } from 'native-base';
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

                                <ListItem style={{ marginStart:20,}}>
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
                                <Button danger onPress={()  => props.excluir(jogador)}>
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
