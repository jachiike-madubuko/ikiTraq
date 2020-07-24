import React from 'react';
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
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import TimeTracker from '../TimeTracker'
import { database } from 'firebase';

interface SmartBlogItem {
    title: string;
    description: string;
}
interface SmartBlogProps {
    floType: string;
    getData: ( data: {} ) => void;
    listSize: number;
    // goToFlo: ( dayId: string) => void;
}
// https://medium.com/@j5bot/react-dynamically-rendering-different-components-without-switch-the-capitalized-reference-e668d89e460b
const Components = {
    Type1,
    Type2
};
const SmartBlog = ( props: SmartBlogProps ) => {


    // a component that will render one or more components
    // that it doesn't explicitly include in it's JSX

        // make a reference using a Capitalized variable name
        // to the component you need to render
        // where props.type is one of 'Type1' or 'Type2'
        let Component = Components[props.type];

        // use the reference to the component with the
        // Capitalized variable name to render it
        return ( <Component {...props} /> );

};

export default observer( SmartBlog );

