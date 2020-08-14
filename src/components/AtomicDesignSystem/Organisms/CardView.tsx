import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Button, Card, Layout, Text, TopNavigation, List, CardHeader } from '@ui-kitten/components';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Dimensions, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CardView = props => {

    const { item } = props;
    const Header = () => (
        <CardHeader
            title={item.title}
            description={item.date}
        />
    );

    const Footer = () => (
        <View style={styles.footerContainer}>
            <Button
                style={styles.footerControl}
                size='small'
                status='basic'>
                CANCEL
    </Button>
            <Button
                style={styles.footerControl}
                size='small'>
                ACCEPT
    </Button>
        </View>
    );

    return (
        <Card header={Header} status='success' style={{marginVertical: 5}}>

            <Text>{item.content}</Text>
            <Footer/>

    </Card>

    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,

    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        padding: 10
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 4,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    journalScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select( {
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        } ),
        alignItems: 'center',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
} );

export default CardView