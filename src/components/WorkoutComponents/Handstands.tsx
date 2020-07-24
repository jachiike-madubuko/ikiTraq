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
import { Audio, Video } from 'expo-av';

import { WorkoutTrackerProps, WorkoutTrackerType, emoMap, WorkoutTypeMap, WorkoutTypeRenderMap, getAgenda, seppukuFlo, seppukuLaps } from '../../types';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow'
const Handstands: React.FC<WorkoutTrackerProps> = ( props ) => {
    const [checked, setChecked] = React.useState( false );
    const [laps, setlaps] = React.useState<SelectOptionType>( { text: '0' } );
    const { floType } = props;



    interface GainzFlo {
        name: string;
        list: string[];
    }
    type GainzFloList = GainzFlo[]
    const status = ['success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger',]


    const renderSeppuku = ( { item, index } ) => (
        <Card status={_.sample( status )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={() => <CardHeader title={`${index + 1}.`} />}>

            <Text category="h2" status={_.sample( status )}>{item}</Text>
        </Card>
    )

    const renderItem = ( { item, index } ) => (
        <ListItem title={""}>
            <Text category="h5" status={_.sample( status )}>
                {`${index + 1}. ${item}`}
            </Text>
        </ListItem>
    );



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

                <Video
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    useNativeControls
                    style={{ width: width, height: 600 }}
                />
            </Layout>

        </Layout>
    );
};
export default observer( Handstands );

