import { Button, Layout, Text } from '@ui-kitten/components';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import AuthForm from './AuthForm';
export default function LoginScreen( { navigation } ) {
  const [email, changeEmail] = React.useState( '' )
  const [password, changePassword] = React.useState( '' )
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FirebaseAuthConsumer>
          {( { isSignedIn, firebase } ) => {
            if ( isSignedIn === true ) {
              return (
                <Layout>
                  <Text>You're signed in 🎉 </Text>
                  <Button
                    onPress={() => {
                      firebase
                        .app()
                        .auth()
                        .signOut();
                    }}
                  >
                    Sign out
                    </Button>
                </Layout>
              );
            } else {
              return (
                <Layout>
                  <Text>You're not signed in </Text>
                  <AuthForm
                    changeEmail={changeEmail}
                    changePassword={changePassword}
                  />
                  <Button onPress={() => { firebase.app().auth().createUserWithEmailAndPassword( email, password ) }}>
                    Sign Up
                    </Button>
                  <Button onPress={() => { firebase.app().auth().signInWithEmailAndPassword( email, password ) }}>
                    Login
                    </Button>
                  <Button onPress={() => { firebase.app().auth().signInAnonymously() }}>
                    Sign in anonymously
                    </Button>
                </Layout>
              );
            }
          }}
        </FirebaseAuthConsumer>
      </ScrollView>
    </Layout>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};


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
  LoginScreenFilename: {
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
