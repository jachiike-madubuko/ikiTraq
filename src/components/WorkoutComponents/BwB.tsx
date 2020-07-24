import React from 'react';
import {
    Layout,
    Button,
    Text,
    List,
    Card,
    CardHeader,
    Input,
    ListItem
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { randomStatus, getAgenda, BwBProps } from '../../types';
import _ from 'lodash';
import InputSet from './InputSet';




const BwB: React.FC<BwBProps> = ( props ) => {
    const [checked, setChecked] = React.useState( false );
    const [showInput, setShowInput] = React.useState( false );
    const [today, settoday] = React.useState( getAgenda() );
    const [list, setList] = React.useState( [0,0,0] )
    const [name, setname] = React.useState("" )

    const bwbHeader = () => (
        <CardHeader title="">
            <Input
                size="large"
                status={_.sample( randomStatus)}
                caption="Name of Exercise"
                value={name}
                placeholder="Name of Exercise"
            />
        </CardHeader>
    )

    const updateSets = ( index: number, reps: string ) => {
        const newList = [...list]
        newList[index] = _.toNumber( reps )
        setList(newList)
    }

    const renderInput = ( { item, index } ) => (
        <InputSet updateSets={updateSets} item={item} index={index} status={_.sample( randomStatus )} />
    )



    return (
        <Layout style={{ flex: 11 }}>
            <Card status={_.sample( randomStatus )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={bwbHeader}>

                <List
                    data={list}
                    renderItem={renderInput}
                    listKey={props.name}
                    key={props.name}
                    keyExtractor={item => _.random().toString()}

                    />
            </Card>
        </Layout>
    );
};
export default observer( BwB );

