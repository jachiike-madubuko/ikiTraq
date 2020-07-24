import React, { useEffect } from 'react';
import {
    CheckBox,
    Text,
    Layout,
    Card,
    Button,
    Input,
    ViewPager,
    List,
    ListItem,
    Icon,
    Modal,
    CardHeader,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { database } from 'firebase';
import { AnimatedIcon } from '../../../components/AtomicDesignSystem/Atoms/AnimatedIcon.atom';
import { InputListItemProps, SmartBlogProps } from '../../../types';
import { Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

// TODO add NLU https://www.npmjs.com/package/node-nlp#react-native
// https://monkeylearn.com/api/v3/#javascript
// https://blog.logrocket.com/natural-language-processing-for-node-js/
// could just use python cloud function and use NLTK and other analysis tools
interface SmartBlogTextAreaItem {
    title: string;
    blog: string;
    resetIndex: () => void;
}
const { height, width } = Dimensions.get( "window" )


const SmartBlogTextArea = ( props: SmartBlogProps ) => {
    const { titleLabel, descriptionLabel, resetIndex,flo } = props;
    const { blog } = flo.data;


    const [checkedD, setCheckedD] = React.useState( false );
    const [blogText, setblogText] = React.useState( blog );

    const [visible, setVisible] = React.useState( false );
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
            <Input
                multiline
                numberOfLines={50}
                size="large"
                label={"Blog"}
                value={blogText}
                onChangeText={setblogText}
                onBlur={() => setCheckedD( !checkedD )}

                style={styles.modalContainer}

            />
        </Layout>
    );




    useEffect( () => {

        const updateBlog = async () => {

            flo.update( { blog: blogText } )
        }
        if ( blogText !== "" )
            updateBlog()
    }, [checkedD] )

    const Header = () => (

        <CardHeader title={_.startCase( flo.data.floType )} description={`Word Count: ${blog.length}`}/>
        )

    return (
        <>
            <Card header={Header}>
            <AnimatedIcon name="expand" feel="success" look="ghost" cyc={2} ani={"shake"} pressed={onIconPress} sized="giant" />
            <Input
                multiline
                numberOfLines={15}
                size="large"
                label={"Blog"}
                value={blogText}
                onChangeText={setblogText}
                    onBlur={() => setCheckedD( !checkedD )}

                />

                <Modal
                    backdropStyle={styles.backdrop}
                    onBackdropPress={toggleModal}
                    visible={visible}>
                    {renderModalElement()}
                </Modal>
                </Card>
        </> );

};

export default observer( SmartBlogTextArea );

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
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
} );