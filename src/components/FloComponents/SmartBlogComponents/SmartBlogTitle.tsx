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
import { InputListItemProps, SmartBlogProps, selectTitle, tkuMap, powerHourMap } from '../../../types';
import { Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

interface SmartBlogTitle {
    title: string;
    blog: string;
}
const { height, width } = Dimensions.get( "window" )


const SmartBlogTitle = ( props: SmartBlogProps ) => {
    const { titleLabel, descriptionLabel, flo } = props;
    const { title, dayId } = flo.data;
    const [visible, setVisible] = React.useState( false );


    const [checkedD, setCheckedD] = React.useState( false );
    const [blogTitle, setBlogTitle] = React.useState( flo.data.floType === "tku" ? tkuMap[moment( dayId ).format( 'dddd' )] : flo.data.floType === "powerHour" ? powerHourMap[moment( dayId ).format( 'dddd' )] : flo.data.title )

    const toggleModal = () => {
        setVisible( !visible );
    };
    const onIconPress = () => {
        toggleModal()
    };





    useEffect( () => {

        const updateBlog = async () => {

            flo.update( { title: blogTitle } )
        }
        if ( blogTitle !== "" )
            updateBlog()
    }, [checkedD] )

    const Header = () => (
        <CardHeader title={_.startCase( flo.data.floType )} />
    )

    const setTKUCourse = () => {
        setBlogTitle( tkuMap[moment().format( 'dddd' )] )
        setCheckedD( !checkedD )
        return true
    }
    const setPowerHourBook = () => {
        setBlogTitle( powerHourMap[moment().format( 'dddd' )] )
        setCheckedD( !checkedD )
        return true
    }

    return (
        <>
            <Card header={Header}>
                {selectTitle.includes( flo.data.floType ) ? (
                    <Text category="h1" status="info">{blogTitle}</Text>

                ) : (
                        <Input
                            size="giant"
                            label={"Title"}
                            value={blogTitle}
                            onChangeText={setBlogTitle}
                            onBlur={() => setCheckedD( !checkedD )}
                        />
                    )}
            </Card>
        </> );

};

export default observer( SmartBlogTitle );

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