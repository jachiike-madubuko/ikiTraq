import React from 'react';
import {
    Layout,
    Button,
    Text,
    List,
    Card,
    CardHeader,
    Input,
    Select,
    SelectOption,
    SelectOptionType,
    Menu,
    ListItem
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { WorkoutTrackerProps, WorkoutTrackerType, emoMap, WorkoutTypeMap, WorkoutTypeRenderMap, getAgenda, seppukuFlo, seppukuLaps, calfFlo } from '../../types';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow'
const Calves: React.FC<WorkoutTrackerProps> = ( props ) => {
    const [checked, setChecked] = React.useState( false );
    const [laps, setlaps] = React.useState<SelectOptionType>( { text: '0' } );
    const { floType } = props;
    interface GainzFlo {
        name: string;
        list: string[];
    }
    type GainzFloList = GainzFlo[]
    const status = ['success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger',]


    const renderCalves = ( { item, index } ) => (
        <Card status={_.sample( status )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={() => <CardHeader title={`${index + 1}.`} />}>

            <Text category="h2" status={_.sample( status )}>{item}</Text>
        </Card>
    )



    return (
        <Layout level="4" style={{ flex: 11 }}>
            <Layout style={{ flex: 1 }}>

                <FlatList
                    style={{ flex: 10 }}
                    data={calfFlo}
                    ListHeaderComponent={() => (
                        <LayoutRow>
                            <Text category="h1">🐄</Text>
                        </LayoutRow>
                    )}
                    numColumns={2}
                    renderItem={renderCalves}
                    columnWrapperStyle={{ margin: 5 }}
                    centerContent
                />
            </Layout>

        </Layout>
    );
};
export default observer( Calves );

