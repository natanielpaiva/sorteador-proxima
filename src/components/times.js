import { List, ListItem, Text } from 'native-base';
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
                        <ListItem key={key}>
                            <Text style={{
                                // fontSize: 25,
                                color: '#76787C'
                            }}>{jogador.nome}</Text>
                        </ListItem>
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
