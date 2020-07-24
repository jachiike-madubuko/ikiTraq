import React from 'react';
import {
    Layout,
    Text,
    Modal,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import SmartBlogActionItem from './SmartBlogActionItem'
import { InputListProps, titleLabelObj, descriptionLabelObj } from '../../../types';
import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get( "window" )


const InputList: React.FC<InputListProps> = props => {
    const { floType, flo } = props;
    const [inputNum, setinputNum] = React.useState( 0 );
    const [selectedIndex, setselectedIndex] = React.useState( '' );

    const titleLabel = titleLabelObj[floType]
    const descriptionLabel = descriptionLabelObj[floType]

    const [visible, setVisible] = React.useState( true );
    const toggleModal = () => {
        setVisible( !visible );
    };
    const onIconPress = () => {
        toggleModal()
    };




    const renderModalElement = () => (
        <Layout
            level='4'
            style={styles.modalContainer}>
            {/* USE THIS TO ADD A CODE EDITOR https://reactnative.dev/docs/webview.html#onmessage OR https://www.npmjs.com/package/react-native-cn-richtext-editor*/}
            {/* Find an api for  Regressive Imagery Dictionary and Linguistic Inquiry and Word Coun */}
            {/* https://www.javascripting.com/view/wordcount-js */}
            {flo.data.actionItems.map( ( item, index ) => {
                return (
                    <Layout level='4' style={{flex:1 , width:width*.8}}>
                        <SmartBlogActionItem flo={flo} titleLabel={titleLabel} descriptionLabel={descriptionLabel} inputId={index} />
</Layout>
                )
            } )}
        </Layout>
    );
    return (
        <>
            <Layout>
                <Text>{JSON.stringify( flo.data.inputList )}</Text>

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

export default observer( InputList );

const styles = StyleSheet.create( {
    container: {
        minHeight: 256,
        padding: 16,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * .9,
        height: height * .9,
        flex:1, 
        padding: 6,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
} );