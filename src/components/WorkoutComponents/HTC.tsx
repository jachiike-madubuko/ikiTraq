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
    Modal} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { WorkoutTrackerProps, randomStatus, getAgenda, gainz36Flo, bwbFlo, FloInputProps } from '../../types';
import _ from 'lodash';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
// import BwB from './BwB'
// import Gainz36 from './Gainz36'
import InputSet from './InputSet';
import LayoutRow from '../AtomicDesignSystem/Atoms/LayoutRow';
import { ExpandIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';

const {width, height } = Dimensions.get("window")
const HTC: React.FC<FloInputProps> = ( props ) => {
    const [{ htc }] = React.useState( getAgenda(props.flo.data.dayId    ) );
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



    const BWB = ({item, index}) => (
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


    const renderGainzItem = ( { item, index } ) => (
        <ListItem title={""}>
            <Text category="h5" status={_.sample( randomStatus )}>
                {`${index + 1}. ${item}`}
            </Text>
        </ListItem>
    );

    const Gainz36 = ({item, index}) => (
        <Layout style={{ flex: 11 }}>
            <Card status={_.sample( randomStatus )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={() => <CardHeader title={`${index + 1}. ${item.name}`} />}>
                <List
                    data={item.list}
                    renderItem={renderGainzItem}
                    keyExtractor={key => key}
                    listKey={item.name}
                    key={item.name}
                />
            </Card>
        </Layout>
    );


    const renderGainz36 = ( { item, index } ) => (

        <Gainz36 item={item} index={index}/>
    )
    const renderBwB = ( { item, index } ) => (

        <BWB item={item} index={index}/>
    )


    const renderModalElement = () => (
        <Layout
            level='4'
            >

            <FlatList
                style={{minWidth:width, flex:10}}
                contentContainerStyle={styles.modalContainer}
                ListHeaderComponent={() => (
                    <LayoutRow>
                        <Text category="h1">{htc}</Text>
                        <Button appearance="ghost" status="info" onPress={() => setmodal( !modal )} icon={ExpandIcon} />
                    </LayoutRow>
                )}
                data={htc === "Gainz36" ? gainz36Flo : bwbFlo}
                numColumns={3}
                renderItem={htc === "Gainz36" ? renderGainz36 : renderBwB}
                columnWrapperStyle={{ margin: 5, minWidth: width*.25 }}
                centerContent
                keyExtractor={item => item.name}
                listKey="HTC"
                key="HTC"
            />
        </Layout>
    );


    return (
        <Layout style={{ flex: 11 }}>
            <LayoutRow>

                <Text category="h1">{htc}</Text>
                <Button appearance="ghost" status="info" onPress={()=>setmodal(!modal)} icon={ExpandIcon} />
            </LayoutRow>
            <FlatList
                style={{ flex: 10 }}
                data={htc === "Gainz36" ? gainz36Flo : bwbFlo}
                numColumns={2}
                renderItem={htc === "Gainz36" ? renderGainz36 : renderBwB}
                columnWrapperStyle={{ margin: 5 }}
                centerContent
                keyExtractor={item => item.name}
                listKey="HTC"
                key="HTC"
            />
            <Modal
                backdropStyle={styles.backdrop}
                onBackdropPress={()=>setmodal(!modal)}
                visible={modal}>
                {renderModalElement()}
            </Modal>
        </Layout>
    );
};
export default observer( HTC );

const styles = StyleSheet.create( {
    container: {
        minHeight: 256,
        padding: 16,
    },
    modalContainer: {
        flex:11,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        minWidth: width ,
        height: height,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
} );