import { dark, light, mapping } from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Button, Icon, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React, { useState } from 'react';
import { AccessibilityRole, ImageStyle, StyleSheet } from 'react-native';
import "firebase/auth";
import AppRouter from "./src/navigation/AppRouter";
import firebase from "firebase/app";
import { SplashScreen } from 'expo';
import {FirebaseAuthProvider} from "@react-firebase/auth"
import { config } from './configs/fireconfig';
import { observer, Provider } from 'mobx-react';

const themes = {
  light: {
    theme: light,
    icon: "sun",
    text: "LIGHT",
  },
  dark: {
    theme: dark,
    icon: "moon",
    text: "DARK",
  },
};

const App = (): React.ReactFragment => {
  const [themeName, setThemeName] = useState( "dark" );
  const theme = themes[themeName].theme;
  const [isLoadingComplete, setLoadingComplete] = React.useState( false );
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  // const { getInitialState } = useLinking( containerRef );
  // https://medium.com/@joeponzio/the-right-way-to-add-firebase-to-your-react-project-using-react-hooks-a32db20bf1a0
  // https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
  const changeTheme = () => {
    setThemeName( themeName === "light" ? "dark" : "light" );
  };

  const signOut = () => firebase.app().auth().signOut()

  const hideSplash = () => SplashScreen.hide();

  const { text: themeButtonText, icon: themeButtonIcon } =
    themeName === "light" ? themes.dark : themes.light;

  // Load any resources or data that we need prior to rendering the app
  React.useEffect( () => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state

        // Load fonts

      } catch ( e ) {
        // We might want to provide this error information to an error reporting service
        console.warn( e );
      } finally {
        setLoadingComplete( true );
      }
    }

    loadResourcesAndDataAsync();
  }, [] );
  if ( !isLoadingComplete  ) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <Provider >

        <FirebaseAuthProvider firebase={firebase} {...config}>


            <ApplicationProvider mapping={mapping} theme={theme}>
              <NavigationContainer >
                <AppRouter changeTheme={changeTheme} signOut={signOut} hideSplash={hideSplash}/>

              </NavigationContainer>

            </ApplicationProvider>
        </FirebaseAuthProvider>
        </Provider>
      </>
    );
  }
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  iconButton: {
    marginVertical: 16,
  },
  nativeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
} );

export default observer(App);