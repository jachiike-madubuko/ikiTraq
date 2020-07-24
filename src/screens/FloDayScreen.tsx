import { DrawerNavigationProp } from '@react-navigation/drawer';
import { observer } from 'mobx-react';
import * as React from 'react';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment'
import FloDay from '../components/FloComponents/FloDay'
import { morningFloTasks, grindFloTasks, nightFloTasks}  from '../types'
import { Layout } from '@ui-kitten/components';
type RootStackParamList = {
  Days: undefined;
  Home: undefined;
  Details: { userId: string };
  MorningRoutine: { dayId: string };
  Settings: { sort: 'latest' | 'top' } | undefined;
};
type FloDayScreenRouteProp = DrawerNavigationProp<RootStackParamList>;


const FloDayScreen = ( { route, navigation } ) => {


  const flos= {morningFloTasks, grindFloTasks, nightFloTasks}

  const { dayId, dayNum } = route.params;
  // routines.query = ( ref ) => ref.where( 'dayId', '==', dayId )
/* {
    query: ( ref ) => ref.where( "dayId", "==", dayId )
  }
  */

  const nextDay = () => {
    const nxtDay = moment( dayId ).add( 1, 'd' ).format( "YYYY-MM-DD" )
    navigation.dispatch( CommonActions.setParams( { dayId: nxtDay } ) );
  }

  const previousDay = () => {
    const prevDay = moment( dayId ).add( -1, 'd' ).format( "YYYY-MM-DD" )
    navigation.dispatch( CommonActions.setParams( { dayId: prevDay } ) );
  }

  return (

    <FloDay previousDay={previousDay} nextDay={nextDay} dayId={dayId} flos={flos}/>
  );
}

FloDayScreen.navigationOptions = {
  header: null,
};


export default observer( FloDayScreen )