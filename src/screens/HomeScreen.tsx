import DayTracker from '../components/DayComponents/DayTracker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Button, Card, Layout, Text, TopNavigation } from '@ui-kitten/components';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TopNav } from '../navigation/TopNav'
type RootStackParamList = {
  Days: undefined;
  Home: undefined;
  Details: { userId: string };
  Settings: { sort: 'latest' | 'top' } | undefined;
};
type HomeScreenRouteProp = DrawerNavigationProp<RootStackParamList>;
const { width, height } = Dimensions.get( "window" )

export default function HomeScreen( props: HomeScreenRouteProp ) {
  return (
    <SafeAreaView style={styles.container}>

      <Layout style={styles.contentContainer} level='4'>
        <Layout level='4' style={{ flex: 11, flexDirection: "column", height: height, marginTop:10}}>

            <DayTracker  />

        </Layout>
      </Layout>
      </SafeAreaView>
  );
}

// TODO implement placeholders https://github.com/tomzaku/react-native-shimmer-placeholder
// https://medium.com/@selvaganesh93/how-to-add-shimmer-effect-to-react-native-app-c210243b8931
// https://www.digitalocean.com/community/tutorials/react-skeleton-screens-react-and-react-native
// https://github.com/mfrachet/rn-placeholder

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    minHeight: height,

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    flex:1,
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
  homeScreenFilename: {
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
