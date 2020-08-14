
import React from 'react';
import {
    Icon,
    TopNavigation,
    TopNavigationAction,
} from '@ui-kitten/components';
import { Scene, StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { Route } from '@react-navigation/native';
import StatusBarHeight from '@expo/status-bar-height';

const BackIcon = ( style ) => (
    <Icon {...style} name='arrow-back' />
);


const EditIcon = ( style ) => (
    <Icon {...style} name='edit' />
);

const MenuIcon = ( style ) => (
    <Icon {...style} name='more-vertical' />
);

const BackAction = ( props ) => (
    <TopNavigationAction {...props} icon={BackIcon}  />
);

const EditAction = ( props ) => (
    <TopNavigationAction {...props} icon={EditIcon} />
);

const MenuAction = ( props ) => (
    <TopNavigationAction {...props} icon={MenuIcon} />
);

export interface TopNavProps {
    drawer?: boolean;
    title: string;
    drawerAction?: () => void;
    previous: Scene<Route<string>>
    scene: Scene<Route<string>>
    navigation: StackNavigationProp<Record<string, object>, string>
}

export const TopNav:React.FC<TopNavProps> = props => {

    const onBackPress = () => {
        props.navigation.goBack()
    };

    const renderLeftControl = () => (
        <BackAction onPress={onBackPress} />
    );

    const renderRightControls = () => [
        <EditAction />,
        <MenuAction onPress={props.drawerAction} />,
    ];



    return (
        <TopNavigation
            style={{flex:1,height:50, paddingTop: 30}}
            title={props.title}
            alignment='center'
            titleStyle={{marginTop:15}}


            leftControl={renderLeftControl()}
            rightControls={renderRightControls()}
        />
    );
};

