import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';



export default function MenuFooter() {


    return (
        <Footer style={{ backgroundColor: '#62B1F6' }}>
            <FooterTab style={{ backgroundColor: '#62B1F6', color: '#fff' }}>
                <Button vertical>
                    <Icon style={styles.fontItens} name="apps" />
                    <Text style={styles.fontItens}>Apps</Text>
                </Button>
                <Button vertical>
                    <Icon style={styles.fontItens} name="camera" />
                    <Text style={styles.fontItens}>Camera</Text>
                </Button>
                <Button vertical>
                    <Icon style={styles.fontItens} active name="navigate" />
                    <Text style={styles.fontItens}>Navigate</Text>
                </Button>
                {/* <Button vertical>
                    <Icon style={styles.fontItens} name="person" />
                    <Text style={styles.fontItens}>Contact</Text>
                </Button> */}
            </FooterTab>
        </Footer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fontItens: {
        color: '#fff'
    }
});
