import { Card, CardHeader, CheckBox, Divider, Layout, Text, Spinner } from '@ui-kitten/components';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Day } from '../../store';
import { getAgenda } from '../../types';
interface DayTrackerListItemProps {
    doc: Day;
    goToDay: ( dayId: string ) => void;
    card: string;
}

const { height, width } = Dimensions.get( "screen" )
const DayTrackerListItem = ( props: DayTrackerListItemProps ) => {
    const { doc, goToDay, card } = props;
    const { data, isLoading, hasData } = doc
    const { day, dayId, day_num, mantra_counter, water_counter, timeAsleep, completed } = data
    const [checked, setChecked] = React.useState( false );
    const [todaysAgenda, settodaysAgenda] = React.useState( getAgenda( dayId ) );

    const onCheckBoxCheckedChange = ( index ) => {
        setChecked( !checked );

    };

    const renderAccessory = ( style, index ) => (
        <CheckBox
            style={style}
            checked={checked}
            onChange={() => onCheckBoxCheckedChange( index )}
        />
    );

    const Header = () => {
        const textSize = card == "list" ? "h5" : "h1"
        return (

            <CardHeader>
                <TouchableOpacity onPress={() => goToDay( dayId )}>
                    {!isLoading ? (

                        <Text category={textSize}>{moment( dayId ).format( "dddd, MMMM Do YYYY" )}</Text>
                    ) : (
                            <Spinner/>
                        )}
                </TouchableOpacity>
            </CardHeader>
        )
    }

    const statusChecker = () => {
        // TODO add a check for completeness of day 100-85 = success, 85-60 = warning , 60 > = danger
        return moment().format( 'YYYY-MM-DD' ) === dayId ? 'danger' : moment().isAfter( dayId ) ? 'success' : 'basic'
    }
    return (
        <Layout>
            <Card header={Header} status={statusChecker()} onPress={() => goToDay( dayId )} style={{ flex: 3, marginBottom: 10, minHeight: card == "list" ? height * .1 : height }}>
                <Layout style={{ flex: 1 }}>

                    {card == "list" ? (
                        <Layout style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                            {!isLoading ? (
                                <Text status="success">{`Flo completion ${100 * completed.length / 25}%`}</Text>
                            ) : (
                                    <Spinner />
                                )}
                            {!isLoading ? (
                                <Text status="primary">{`Water Drank: ${water_counter}/10`}</Text>
                            ) : (
                                    <Spinner />
                                )}
                            {!isLoading ? (
                                <Text status="warning">{`Mantras recited: ${mantra_counter}`}</Text>
                            ) : (
                                    <Spinner />
                                )}
                        </Layout>

                    ) : (
                            <Layout style={{ flex: 1, flexDirection: "row", marginBottom: 20, justifyContent: "space-around" }}>
                                {!isLoading ? (
                                    <Text style={{ flex: 1 }} category="h4" status="success">{`Flo completion ${100 * completed.length / 25}%`}</Text>
                                ) : (
                                        <Spinner />
                                    )}
                                {!isLoading ? (
                                    <Text style={{ flex: 1 }} category="h4" status="primary">{`Water Drank: ${water_counter}/10`}</Text>
                                ) : (
                                        <Spinner />
                                    )}
                                {!isLoading ? (
                                    <Text style={{ flex: 1 }} category="h4" status="warning">{`Mantras recited: ${mantra_counter}`}</Text>
                                ) : (
                                        <Spinner />
                                    )}
                            </Layout>

                        )}
                    {card === "card" ? (
                        <Layout style={{ flex: 10, justifyContent:"center" }}>
                            <Divider />
                            <Text category="h1">Agenda</Text>
                            <Divider />
                            <Text category="h2" status="danger">Knowledge:</Text>
                            <Text category="h3" status="success">TKU Course:</Text>
                            <Text category="h5" status="warning">{todaysAgenda.tku}</Text>
                            <Divider />
                            <Text category="h3" status="success">Power Hour Book:</Text>
                            <Text category="h5" status="warning">{todaysAgenda.ph}</Text>
                            <Divider />
                            <Divider />
                            <Text category="h2" status="danger">Gainz:</Text>
                            <Text category="h3" status="success">Hyperbolic Time Chamber Training:</Text>
                            <Text category="h5" status="warning">{todaysAgenda.htc}</Text>
                            <Divider />
                            <Text category="h3" status="success">Bboy Gains:</Text>
                            <Text category="h5" status="warning">{todaysAgenda.bbg}</Text>
                            <Divider />
                        </Layout>
                    ) : ( <></> )}
                </Layout>

            </Card>
        </Layout>
    );
};

export default observer( DayTrackerListItem );