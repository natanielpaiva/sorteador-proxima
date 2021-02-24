import { List, ListItem, Text, SwipeRow, Button, Icon, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';


export default function Times(props) {

    return (
        <List>
            <ListItem itemDivider>
                <Text
                    style={{
                        // fontSize: 27,
                        color: 'gray',
                        fontWeight: 'bold',
                        // color: '#fff',
                        // alignSelf:'center'
                    }}
                >{props.nomeTime}  {props.status}</Text>
            </ListItem>

            {props.lista.map((jogador, key) => {
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
                                <View>
                                    <Text style={{
                                        marginStart:20,
                                        // fontSize: 25,
                                        color: '#76787C'
                                    }}>{jogador.nome}</Text>
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
