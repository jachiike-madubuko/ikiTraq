import React from 'react';
import {
    Layout,
    Text,
    SelectOptionType} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { WorkoutTypeRenderMap, FloInputProps } from '../../types';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import Seppuku from '../WorkoutComponents/Seppuku'
import HTC from '../WorkoutComponents/HTC'
import BBoyGainz from '../WorkoutComponents/BBoyGainz'
const WorkoutTracker: React.FC<FloInputProps> = ( props ) => {
    const { floType } = props;

    interface GainzFlo {
        name: string;
        list: string[];
    }

    const htc = () => <HTC {...props} />

    const seppuku = () => <Seppuku {...props} />
    const bboygainz = () => <BBoyGainz {...props} />


    const renderMap: WorkoutTypeRenderMap = {
        bboyGainz: bboygainz(),
        hyperbolicTimeChamber: htc(),
        seppuku: seppuku()
    }
    return (
        <Layout level="4" style={{ flex: 11 }}>
            {renderMap[floType]}
        </Layout>
    );
};
export default observer( WorkoutTracker );

