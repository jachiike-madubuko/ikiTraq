import React, { useEffect } from 'react';
import {
    Text,
    Layout,
    Card,
    CardHeader,
    Spinner,
} from '@ui-kitten/components';
import { Foundation } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import FloView from './FloView'
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { DayTimeType, FloType } from '../../types';
import { floz, Flo } from '../../store';
interface FloTasksProps {
    data: FloType[];
    type: DayTimeType;
    dayId: string;
    topTabsIndex:number;
    index:number;
}
const FloTasks: React.FC<FloTasksProps> = props => {
    const [checked, setChecked] = React.useState( false );
    const [completed, setCompleted] = React.useState( [] );
    const { type, data, dayId, topTabsIndex, index } = props;
    floz.query = ( ref ) => ref.where( "dayId", "==", dayId )

    // TODO completed calculated by the number of floType thats are in the morning that exist in the DAy's completed list
    useEffect( () => {
        floz.query = ( ref ) => ref.where( "dayId", "==", dayId )

        // const floRoutineQuery = async () => {
        //     if ( filteredQuery.length === 0 ) {
        //         const promiseDocSet = data.map( item => floFactory( item, type, dayId ) )
        //         const docSet = await Promise.all( promiseDocSet )
        //         setfloTasks(docSet)
        //     } else {
        //         setfloTasks(filteredQuery)
        //     }
        //     setloaded(true)

        // }
        // if ( !loaded ) {
        //     floRoutineQuery()
        // }

    }, [dayId] )
    const onCheckedChange = ( isChecked: boolean ) => {
        setChecked( isChecked );
    };
    const updateDayTypeCompleted = ( flo: string ) => {
        setCompleted( completed => completed.includes( flo ) ? completed.filter( item => item !== flo ) : [...completed, flo] )
    }
    const cap = ( word: string ) => {
        return word.replace( /^\w/, ( c ) => c.toUpperCase() );
    }


    const statusPicker = () => completed.length === data.length
        ? "success"
        : completed.length > data.length / 2
            ? "warning"
            : "basic"

    const Header = () => (
        <CardHeader title={''} style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setChecked( !checked )} style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }} >
                <Layout style={{ flex: 1, flexDirection: "column", justifyContent: "space-around" }}>
                    <Text category="h2" status={statusPicker()}>{cap( type )}</Text>
                    <Text category="h6">{`${completed.length}/${data.length}`}</Text>
                    <Text category="h6">{dayId}</Text>
                </Layout>
                <TouchableOpacity onPress={() => setChecked( !checked )}>
                    <Foundation name={checked ? "arrows-compress" : "arrows-expand"} size={30} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>
        </CardHeader>
    );

    return (
        <>
            {!floz.hasDocs ? (
                <Spinner />
            ) : (
                    <Card header={Header} status={statusPicker()}>
                        {topTabsIndex === index ? (

                            <Layout>

                            {_.sortBy( floz.docs.filter( doc => doc.id.includes( type ) ), ( doc ) => data.indexOf( doc.data.floType ) ).map( ( flo ) => (
                                <FloView flo={flo} toggleCompleteness={updateDayTypeCompleted} />
                                ) )}
                        </Layout>
                        ) :
                            (<Text></Text>)
                            }
                    </Card>
                )}
        </>
    );
};

export default observer( FloTasks );

