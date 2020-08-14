import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Card, Input, Layout, List, ListItem, Tab, TabBar, Text, Button } from '@ui-kitten/components';
import * as React from 'react';
import { Platform, StyleSheet, } from 'react-native';
import { TopNav } from '../navigation/TopNav';
import { HeartIcon, GlobeIcon, SkillIcon, PaidIcon, GenericIcon, ShuffleIcon, PlusIcon } from './../components/AtomicDesignSystem/Atoms/Icon.atom';
import LayoutRow from '../components/AtomicDesignSystem/Atoms/LayoutRow';
import IkiSection from './../components/AtomicDesignSystem/Organisms/IkiSection';

// https://github.com/mohebifar/react-native-easy-dnd
type RootStackParamList = {
  Days: undefined;
  Home: undefined;
  Ikigai: { userId: string };
  Settings: { sort: 'latest' | 'top' } | undefined;
};
type IkigaiScreenRouteProp = DrawerNavigationProp<RootStackParamList>;
export type ikigaiType = 'love'| 'skill'| 'paid'| 'need'
export default function IkigaiScreen( props: IkigaiScreenRouteProp ) {


  const data = new Array( 18 ).fill( {
    title: 'Item',
  } );

  const ikigai:ikigaiType[] = ['love', 'skill', 'paid', 'need']
  const [idx, setidx] = React.useState( 0 );
  const renderItem = ( { item, index } ) => (
    <ListItem title={`${ikigai[idx]} ${item.title} ${index + 1}`} />
  );


  return (

    <Layout level='4' style={styles.container}>
      <TabBar
        selectedIndex={idx}
        onSelect={i => setidx( i )}
      >
        <Tab icon={HeartIcon} />
        <Tab icon={SkillIcon} />
        <Tab icon={PaidIcon} />
        <Tab icon={GlobeIcon} />
      </TabBar>
      <IkiSection data={data} ikiType={ikigai[idx]}/>

    </Layout>
  );
}

IkigaiScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create( {
  container: {
    flex: 11,
    paddingTop: 18
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    minHeight: 30,
    flex: 1,
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
  IkigaiScreenFilename: {
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
