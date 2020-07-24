import React from 'react';
import {
    Layout,
    Text,
    Card,
    CardHeader,
    Select,
    SelectOptionType,
    ListItem
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { FloInputProps, seppukuFlo, seppukuLaps } from '../../types';
import _ from 'lodash';
import { FlatList } from 'react-native';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow'
const Seppuku: React.FC<FloInputProps> = ( props ) => {
    const [laps, setlaps] = React.useState<SelectOptionType>( { text: '0' } );



    interface GainzFlo {
        name: string;
        list: string[];
    }
    const status = ['success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger',]


    const renderSeppuku = ( { item, index } ) => (
        <Card status={_.sample( status )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={() => <CardHeader title={`${index + 1}.`} />}>

            <Text category="h2" status={_.sample( status )}>{item}</Text>
        </Card>
    )




    return (
        <Layout level="4" style={{ flex: 11 }}>
            <Layout style={{ flex: 1 }}>
                <LayoutRow>
                    <Select
                        label={`🏃🏿‍♂💨 Seppuku total ${laps.text}`}
                        labelStyle={{ fontSize: 20 }}
                        data={seppukuLaps}
                        size="giant"
                        onSelect={setlaps}
                        placeholder={laps.text}

                    />
                </LayoutRow>
                <FlatList
                    style={{ flex: 10 }}
                    data={seppukuFlo}
                    numColumns={2}
                    renderItem={renderSeppuku}
                    columnWrapperStyle={{ margin: 5 }}
                    centerContent

                />
            </Layout>

        </Layout>
    );
};
export default observer( Seppuku );

