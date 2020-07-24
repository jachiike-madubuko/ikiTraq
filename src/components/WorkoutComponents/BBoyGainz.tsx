import React from 'react';
import {
    Layout,
    Text,
    Card,
    CardHeader,
    Input,
    List,
    ListItem,
    Button,
    Modal
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { WorkoutTrackerProps, randomStatus, getAgenda, gainz36Flo, bwbFlo, FloInputProps } from '../../types';
import _ from 'lodash';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
// import BwB from './BwB'
// import Gainz36 from './Gainz36'
import InputSet from './InputSet';
import Handstands from './Handstands';
import Calves from './Calves';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow';
import { ExpandIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';

const { width, height } = Dimensions.get( "window" )
const BBoyGainz: React.FC<FloInputProps> = ( props ) => {
    const [{ bbg }] = React.useState( getAgenda( props.flo.data.dayId ) );
    const [list, setList] = React.useState( [0, 0, 0] )
    const [name, setname] = React.useState( "" )
    const [modal, setmodal] = React.useState( false )

    const bwbHeader = () => (
        <CardHeader title="">
            <Input
                size="large"
                status={_.sample( randomStatus )}
                caption="Name of Exercise"
                value={name}
                placeholder="Name of Exercise"
            />
        </CardHeader>
    )

    const updateSets = ( index: number, reps: string ) => {
        const newList = [...list]
        newList[index] = _.toNumber( reps )
        setList( newList )
    }

    const renderInput = ( { item, index } ) => (
        <InputSet updateSets={updateSets} item={item} index={index} status={_.sample( randomStatus )} />
    )

    const BWB = ( { item, index } ) => (
        <Layout style={{ flex: 11 }}>
            <Card status={_.sample( randomStatus )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={bwbHeader}>

                <List
                    data={list}
                    renderItem={renderInput}
                    listKey={item.name}
                    key={item.name}
                    keyExtractor={key => key}

                />
            </Card>
        </Layout>
    );


    const renderModalElement = () => (
        <Layout
            level='4'
        >
            <LayoutRow>
                <Text category="h1">{bbg}</Text>
                <Button appearance="ghost" status="info" onPress={() => setmodal( !modal )} icon={ExpandIcon} />
            </LayoutRow>
            <Layout>
                {bbg === "Handstand Progression" ? (
                    <Handstands {...props} />
                ) : (
                        <Calves {...props} />
                    )}
            </Layout>
        </Layout>
    );



    return (
        <Layout level="4" style={{ flex: 11 }}>
            <LayoutRow>

                <Text category="h1">{bbg}</Text>
                <Button appearance="ghost" status="info" onPress={() => setmodal( !modal )} icon={ExpandIcon} />
            </LayoutRow>
            <Layout>
                {bbg === "Handstand Progression" ? (
                    <Handstands {...props} />
                ) : (
                        <Calves {...props} />
                    )}
            </Layout>

            <Modal
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setmodal( !modal )}
                visible={modal}>
                {renderModalElement()}
            </Modal>
        </Layout>
    );
};
export default observer( BBoyGainz );

const styles = StyleSheet.create( {
    container: {
        minHeight: 256,
        padding: 16,
    },
    modalContainer: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        minWidth: width,
        height: height,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
} );