import { useNavigation } from '@react-navigation/native';
import { FloType } from '@src/types';
import { Button, ButtonGroup, Icon, Layout, Spinner, Tab, TabView, Text } from '@ui-kitten/components';
import { Mode } from 'firestorter';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { day } from '../../store';
import { ChargeIcon, MantraIcon, MindfulIcon, WaterIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';
import FloMasterDetail from './FloMasterDetail';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow';
import DC from '../AtomicDesignSystem/Atoms/DataComponent';

interface FloDayProps {
    dayId: string;
    flos: {
        morningFloTasks: Array<FloType>;
        grindFloTasks: Array<FloType>;
        nightFloTasks: Array<FloType>;
    };
    nextDay: () => void;
    previousDay: () => void;
    // goToRoutine: ( dayId: string) => void;
}
const FloDay = ( props: FloDayProps ) => {
    const { dayId, nextDay, previousDay, flos } = props;
    day.path = `days/${dayId}`
    day.mode = Mode.On
    const [checked, setChecked] = React.useState( false );
    const [morningCompleted, setMorningCompleted] = React.useState( [] );
    const [grindCompleted, setGrindCompleted] = React.useState( [] );
    const [nightCompleted, setNightCompleted] = React.useState( [] );
    const [expanded, setExpanded] = React.useState( "" );
    const nav = useNavigation()
    const [topTabsIndex, setTopTabsIndex] = React.useState( 0 );
    const [bottomTabsIndex, setBottomTabsIndex] = React.useState( 0 );

    const { morningFloTasks, grindFloTasks, nightFloTasks } = flos
    // TODO convert drink water and mantra annd mindul minutes to lists of {countNum: int, timestamp: DateTime} so that I cam see where there are gaps
    const drinkMoreWater = () => day.update( { water_counter: day.data.water_counter + 1 } )
    const moreMantra = () => day.update( { mantra_counter: day.data.mantra_counter + 1 } )

    const mantraString = () => {
        return 'Mantra Recited (' + day.data.mantra_counter.toString() + ')'
    }

    const waterString = () => {
        return 'Bottles Drank (' + day.data.water_counter.toString() + '/10)'
    }
    const sleepString = () => {
        return 'Hours Slept (' + day.data.timeAsleep.toString() + ')'
    }
    const mindfulString = () => {
        return 'Time in Meditation (' + day.data.timeAsleep.toString() + ')'
    }

    const openSleepLog = () => {
        // TODO create a modol that will have input boxes for sleep log and calculate sleep
        console.info( 'opening sleep log' )
    }
    const openMeditationLog = () => {
        // TODO create a modol that will have input for minutes meditating to increment
        console.info( 'opening sleep log' )
    }

    const PersonIcon = ( style ) => (
        <Icon {...style} name='sun-outline' />
    );

    const BellIcon = ( style ) => (
        <Icon {...style} name='flash-outline' />
    );

    const EmailIcon = ( style ) => (
        <Icon {...style} name='moon-outline' />
    );

    const shouldLoadComponent = ( index ) => index === topTabsIndex;

    return (

        <Layout level='4' style={styles.container}>
            <DC render={day.hasData}>
                <ButtonGroup>
                    <Button onPress={previousDay}>Previous Day</Button>
                    <Button onPress={nextDay}>Next Day</Button>
                    <Button disabled={true}> </Button>
                    <Button icon={WaterIcon} onPress={drinkMoreWater}>{day.hasData && waterString()}</Button>
                    <Button icon={MantraIcon} onPress={moreMantra}>{day.hasData && mantraString()}</Button>
                    <Button icon={ChargeIcon} onPress={openSleepLog}>{day.hasData && sleepString()}</Button>
                    <Button icon={MindfulIcon} onPress={openMeditationLog}>{day.hasData && mindfulString()}</Button>
                </ButtonGroup>
            </DC>
            <LayoutRow>
                <DC render={day.hasData}>
                    <Text category="h3">{day.hasData ? day.data.dayId : ""}</Text>
                </DC>
                <Text category="h3">{"  "}</Text>
                <DC render={day.hasData}>

                    <Text category="h4">{day.hasData && day.data.completed.length.toString()}/25</Text>
                </DC>
            </LayoutRow>
            {/* https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/ */}

            <TabView
                selectedIndex={topTabsIndex}
                shouldLoadComponent={shouldLoadComponent}

                onSelect={setTopTabsIndex}>

                <Tab icon={PersonIcon}>
                    <Layout level={"4"}>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <FloMasterDetail topTabsIndex={topTabsIndex} index={0} dayId={dayId} type={"morning"} data={morningFloTasks} />
                        </ScrollView>
                    </Layout>
                </Tab>
                <Tab icon={BellIcon}>
                    <Layout level={"4"}>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <FloMasterDetail topTabsIndex={topTabsIndex} index={1} dayId={dayId} type={"grind"} data={grindFloTasks} />
                        </ScrollView>
                    </Layout>
                </Tab>
                <Tab icon={EmailIcon}>
                    <Layout level={"4"}>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <FloMasterDetail topTabsIndex={topTabsIndex} index={2} dayId={dayId} type={"night"} data={nightFloTasks} />
                        </ScrollView>
                    </Layout>
                </Tab>
            </TabView>
        </Layout>
    )
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },

    contentContainer: {
        margin: 35,
    },

} );



export default observer( FloDay );

