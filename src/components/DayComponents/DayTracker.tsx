import { useNavigation } from '@react-navigation/native';
import { Calendar, Layout, Spinner, Tab, TabView, ViewPager } from '@ui-kitten/components';
import { observer } from 'mobx-react';
import moment from "moment";
import { Placeholder, PlaceholderMedia, PlaceholderLine, Progressive } from 'rn-placeholder'
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { days } from '../../store';
import { DayTrackerProps, weekList } from '../../types';
import { AnimatedIcon } from '../AtomicDesignSystem/Atoms/AnimatedIcon.atom';
import { ActivityIcon, CalendarIcon, ListIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';
import DayTrackerListItem from './DayTrackerListItem';
const { width, height } = Dimensions.get( "window" )
const DayTracker: React.FC<DayTrackerProps> = ( props ) => {
    // TODO function to accurately set the day

    // console.log( dayOfWeek )
    days.query = ( ref ) => ref.where( "dayId", "in", weekList );
    const day_num = moment().weekday()
    const [selectedIndex, setSelectedIndex] = React.useState( 0 );
    const [trigger, settrigger] = React.useState( 0 );
    const [topTabsIndex, setTopTabsIndex] = React.useState( 0 );
    const [weekNum, setweekNum] = React.useState( 0 );


    const shouldLoadTab = ( index ) => index === topTabsIndex;
    const shouldLoadComponent = ( index ) => index === selectedIndex;
    const navigation = useNavigation();

    const goToDay = ( dayId: string ) => {
        navigation.navigate( 'FloDay', { dayId } )
    }

    const renderDayListItem = ( { item } ) => (
        <DayTrackerListItem
            key={item.id}
            doc={item}
            goToDay={goToDay}
            card={"list"}
        />
    )

    const nextWeek = () => {
        setweekNum( weekNum + 1 )

        const week = moment().startOf( 'week' ).add( weekNum, 'weeks' )

        const newWeek = [...Array( 7 ).fill( 1 )].map( ( _, i ) => week.add( i, 'd' ).format( 'YYYY-MM-DD' ) )

        days.query = ( ref ) => ref.where( "dayId", "in", newWeek );

    }

    const prevWeek = () => {
        setweekNum( weekNum - 1 )

        const week = moment().startOf( 'week' ).add( weekNum, 'weeks' )

        const newWeek = [...Array( 7 ).fill( 1 )].map( ( _, i ) => week.add( i, 'd' ).format( 'YYYY-MM-DD' ) )

        days.query = ( ref ) => ref.where( "dayId", "in", newWeek );

    }
    const thisWeek = () => {
        setweekNum( 0 )

        const week = moment().startOf( 'week' ).add( weekNum, 'weeks' )

        const newWeek = [...Array( 7 ).fill( 1 )].map( ( _, i ) => week.add( i, 'd' ).format( 'YYYY-MM-DD' ) )

        days.query = ( ref ) => ref.where( "dayId", "in", newWeek );

    }




    return (
        <Layout level='4' style={{ marginHorizontal: "5%", height: height }}>

            <TabView
                selectedIndex={topTabsIndex}
                style={{ height: height }}
                onSelect={setTopTabsIndex}>
                <Tab icon={ActivityIcon}>

                    <Layout  >
                        {days.hasDocs ? (
                            <ViewPager
                                style={{ overflow: "hidden", zIndex: 500, width: width }}
                                selectedIndex={selectedIndex}
                                shouldLoadComponent={shouldLoadComponent}
                                onSelect={setSelectedIndex}>
                                {days.hasDocs && days.docs.map( ( doc, index, days ) => (
                                    <DayTrackerListItem
                                        key={doc.id}
                                        doc={doc}
                                        goToDay={goToDay}
                                        card="card"
                                    />
                                ) )}
                        </ViewPager>
                        ) : (
                                <Placeholder
                                    Animation={Progressive}
                                >
                                    <PlaceholderMedia
                                        isRound
                                        // size={width}
                                        style={{ flex: 1, minWidth: width*.95, minHeight: width*.85 }}
                                    />
                                </Placeholder>
                            )}
                        <Layout style={{ flex: 1, flexDirection: 'row' }}>
                            <AnimatedIcon
                                cyc={1}
                                sized="giant"
                                dissed={selectedIndex < 1}
                                stylez={{ flex: 1, zIndex: 1000, }}
                                look="ghost"
                                width={50}
                                height={50}
                                feel='primary'
                                pressed={() => setSelectedIndex( selectedIndex - 1 )}
                                name={"arrow-circle-left"}
                                ani="pulse"
                            />

                            <AnimatedIcon
                                width={50}
                                cyc={1}
                                height={50}
                                sized="giant"
                                dissed={selectedIndex === weekList.length - 1}
                                stylez={{ flex: 1, zIndex: 1000, }}
                                look="ghost"
                                feel='success'
                                pressed={() => setSelectedIndex( moment().weekday() )}
                                name={"gift"}
                                ani="pulse"
                            />
                            <AnimatedIcon
                                cyc={1}
                                width={80}
                                sized="giant"
                                dissed={selectedIndex === weekList.length - 1}
                                height={50}
                                stylez={{ flex: 1, zIndex: 1000, }}
                                look="ghost"
                                feel='primary'
                                pressed={() => setSelectedIndex( selectedIndex + 1 )}
                                name={"arrow-circle-right"}
                                ani="pulse"
                            />
                        </Layout>
                    </Layout>
                </Tab>
                <Tab icon={ListIcon}>
                    <Layout level='4' style={{ padding: 10 }} >

                        {days.hasDocs && days.docs.map( ( doc ) =>
                            renderDayListItem( { item: doc } )
                        )}


                    </Layout>
                </Tab>
                <Tab icon={CalendarIcon}>
                    <Layout>
                        <Calendar style={{ flex: 1, minHeight: height * .25, width: "100%" }} onSelect={date => goToDay( moment( date ).format( 'YYYY-MM-DD' ) )} />
                        <Calendar style={{ flex: 1, minHeight: height * .25, width: "100%" }} date={moment().add( 1, 'M' ).toDate()} onSelect={date => goToDay( moment( date ).format( 'YYYY-MM-DD' ) )} />
                    </Layout>
                </Tab>
            </TabView>

        </Layout >
    );
};

const styles = StyleSheet.create( {
    tab: {
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 9,
    },
    containerC: {
        overflow: "scroll",
    }
} );

export default observer( DayTracker );