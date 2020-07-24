import { Layout, Text } from '@ui-kitten/components';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require( '../assets/images/flowchart.jpg' ),
    backgroundColor: '#59b2ab',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require( '../assets/images/flowchart.jpg' ),
    backgroundColor: '#febe29',
  },
  {
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require( '../assets/images/flowchart.jpg' ),
    backgroundColor: '#22bcb5',
  }
];
export default function OnboardingScreen( { navigation } ) {
  const login = () => navigation.navigate( 'Login' )
  return (
    <Layout style={styles.container}>

      <AppIntroSlider renderItem={_renderItem} data={slides} showSkipButton onSkip={login} onDone={login} />
    </Layout>
  );
}

OnboardingScreen.navigationOptions = {
  header: null,
};

const _renderItem = ( { item } ) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}



const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  OnboardingScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
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
    backgroundColor: '#fbfbfb',
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
