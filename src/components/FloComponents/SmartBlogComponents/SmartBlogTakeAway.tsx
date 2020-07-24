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
import { AnimatedIcon } from '../../AtomicDesignSystem/Atoms/AnimatedIcon.atom';
import { InputListItemProps, SmartBlogProps } from '../../../types';
import { Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

interface SmartBlogTakeAway {
    TakeAway: string;
    blog: string;
}
const { height, width } = Dimensions.get( "window" )


const SmartBlogTakeAway = ( props: SmartBlogProps ) => {
    const { descriptionLabel, flo } = props;
    const { bigTakeAway } = flo.data;
    const [visible, setVisible] = React.useState( false );
    const [checkedD, setCheckedD] = React.useState( false );
    const [blogTakeAway, setBlogTakeAway] = React.useState( bigTakeAway )

    const toggleModal = () => {
        setVisible( !visible );
    };
    const onIconPress = () => {
        toggleModal()
    };
    useEffect( () => {
        const updateBlog = async () => {
            flo.update( { bigTakeAway: blogTakeAway } )
        }
        if ( blogTakeAway !== "" )
            updateBlog()
    }, [checkedD] )

    const Header = () => (
        <CardHeader title={_.startCase( flo.data.floType )} />
    )
    return (
        <>
            <Card header={Header}>
                <Input
                    size="giant"
                    label={"TakeAway"}
                    value={blogTakeAway}
                    onChangeText={setBlogTakeAway}
                    onBlur={() => setCheckedD( !checkedD )}
                />
            </Card>
        </> );

};

export default observer( SmartBlogTakeAway );

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