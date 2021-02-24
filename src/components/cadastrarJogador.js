import { Button, Form, Icon, Input, Item, Label } from 'native-base';
import React from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CadastrarJogador = (props) => {
    const [nome, setNome] = React.useState('');

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={props.onRequestClose} style={styles.iconCloseContainer}>
                            <Icon name="x-square" type='Feather' size={11} style={styles.iconClose} />
                        </TouchableOpacity>
                        <Form style={{ width: 230, marginStart: -25 }}>
                            <Item stackedLabel>
                                <Label>Nome do Jogador</Label>
                                <Input
                                    onChangeText={nome => setNome(nome)}
                                    value={nome}
                                />
                            </Item>
                        </Form>
                        <Button
                            onPress={() => { props.cadastrar(nome) }}
                            full info
                            style={{
                                marginTop: 20,
                                borderRadius: 3,
                            }}
                        ><Text style={{ color: "#fff" }}>Cadastrar</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: 300,
        height: 250,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 9
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    iconCloseContainer: {
        alignSelf: 'flex-end',
        marginRight: -15,
        marginTop: -20

    },
    iconClose: {
        color: 'gray',
    }
});

export default CadastrarJogador;