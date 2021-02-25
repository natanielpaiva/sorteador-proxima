import { Text } from 'native-base';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export default function Load(props) {

    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            transparent
        >
            <View style={styles.container} >
                <ActivityIndicator size="large" color='black' />
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={styles.textMenu}>Peraê um pouco...</Text>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        flexGrow: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',

    },
    textMenu: {
        color: 'black',
        fontWeight: 'bold',
        width: '90%',
        fontSize: 16,
        textAlign: 'center'
    }
});