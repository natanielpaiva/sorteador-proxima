import { Icon } from 'native-base';
import React from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FinalizarPartida = (props) => {

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
                        <Text style={styles.titleModal}>Quem ganhou?</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 50
                        }}>
                            <TouchableOpacity onPress={props.primeiroTime}>
                                <View style={styles.quadrado}>
                                    <Text style={styles.textoQuadrado}>Time 1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.segundoTime}>
                                <View style={styles.quadrado}>
                                    <Text style={styles.textoQuadrado}>Time 2</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.empatou}>
                                <View style={styles.quadrado}>
                                    <Text style={styles.textoQuadrado}>Empatou</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    titleModal: {
        color: 'gray',
        fontSize: 25,
        marginTop: -30
    },
    textoQuadrado: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20
    },
    quadrado: {
        flexDirection: 'column',
        backgroundColor: '#62B1F6',
        marginStart: 5,
        width: 85,
        height: 70,
        borderRadius: 10,
        alignItems: 'center'
    },
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

export default FinalizarPartida;