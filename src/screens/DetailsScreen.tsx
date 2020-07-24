import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Button, Layout, Text, Card } from '@ui-kitten/components';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TopNav } from '../navigation/TopNav';
// https://github.com/mohebifar/react-native-easy-dnd
type RootStackParamList = {
  Days: undefined;
  Home: undefined;
  Details: { userId: string };
  Settings: { sort: 'latest' | 'top' } | undefined;
};
type DetailsScreenRouteProp = DrawerNavigationProp<RootStackParamList>;

export default function DetailsScreen( props: DetailsScreenRouteProp ) {
  return (
    <>
      <TopNav drawer title="Detail" />
      <Layout level='4' style={styles.container}>
        <Layout level='4' style={{ flex: 1, flexDirection: "row", margin: "2%" }}>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Performance Stat
            </Text>
          </Card>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Streak Stat
            </Text>
          </Card>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Progress Stats
            </Text>
          </Card>
        </Layout>
        <Layout level='4' style={{ flex: 1, flexDirection: "row", margin: "2%" }}>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Performance Stat
            </Text>
          </Card>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Streak Stat
            </Text>
          </Card>
          <Card style={{ flex: 1, marginHorizontal: "2%" }}>
            <Text>
              Progress Stats
            </Text>
          </Card>
        </Layout>


      </Layout>
    </>
  );
}

DetailsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create( {
  container: {
    flex: 11,
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
  DetailsScreenFilename: {
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
