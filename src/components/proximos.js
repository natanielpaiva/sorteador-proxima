import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'native-base';

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
                        <List key={key}>
                            <ListItem>
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
                        </List>
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
