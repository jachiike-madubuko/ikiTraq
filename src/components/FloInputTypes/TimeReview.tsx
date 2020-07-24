import React from 'react';
import {
    Text,
    Layout,
    Button,
    Modal,
    Icon,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import Review from '../FloComponents/Review'
import { TimeReviewProps,  TimeReviewData } from '../../types';
import _ from 'lodash'
import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get( "screen" )

const TimeReview: React.FC<TimeReviewProps> = props => {
    const [checked, setChecked] = React.useState( false );
    const [showInput, setShowInput] = React.useState( false );
    const [title, settitle] = React.useState( '' );
    const [description, setdescription] = React.useState( '' );
    const [visible, setVisible] = React.useState( false );

    const toggleModal = () => {
        setVisible( !visible );
    };
    const renderItemIcon = ( style ) => (
        <Icon {...style} name='person' />
    );

    const onIconPress = () => {
        toggleModal()
    };


    const renderModalElement = () => (
        <Layout
            level='3'
            style={styles.modalContainer}>
            <Text>Hi! This is modal.</Text>
            <Review reviewDescriptions={[]} floType={floType} flo={flo} save={save} />

        </Layout>
    );
    const { floType, flo, save } = props;

    return (
        <>
            <Layout>
                <Button icon={renderItemIcon} onPress={onIconPress}>Review</Button>
                <Modal
                    backdropStyle={styles.backdrop}
                    onBackdropPress={toggleModal}
                    visible={visible}>
                    {renderModalElement()}
                </Modal>
            </Layout>
        </>
    );
};

export default observer( TimeReview );


const styles = StyleSheet.create( {
    container: {
        minHeight: 256,
        padding: 16,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * .7,
        height: height * .7,
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
} );