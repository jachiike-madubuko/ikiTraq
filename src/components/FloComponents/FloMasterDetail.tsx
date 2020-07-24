import React, { useEffect } from 'react';
import {
    Text,
    Layout,
    Card,
    CardHeader,
    Spinner,
    Drawer,
    ViewPager,
} from '@ui-kitten/components';
import { Foundation } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import FloView from './FloView'
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { DayTimeType, FloType } from '../../types';
import { floz, Flo } from '../../store';
import { DoneIcon, IncompleteIcon, ToDoIcon, EyeIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';
interface FloMasterDetailProps {
    data: FloType[];
    type: DayTimeType;
    dayId: string;
    topTabsIndex: number;
    index: number;
}
const FloMasterDetail: React.FC<FloMasterDetailProps> = props => {
    const [checked, setChecked] = React.useState( false );
    const [loading, setloading] = React.useState( true );
    const [selectedIndex, setSelectedIndex] = React.useState( 0 );
    const [completed, setCompleted] = React.useState( [] );
    const [filterDocsDrawerList, setfilterDocsDrawerList] = React.useState( [] );
    const { type, data, dayId, topTabsIndex, index } = props;
    floz.query = ( ref ) => ref.where( "dayId", "==", dayId )

    // TODO completed calculated by the number of floType thats are in the morning that exist in the DAy's completed list
    useEffect( () => {

        if ( loading ) {

            setfilterDocsDrawerList( filterDocsDrawer() )
            setloading(false)
        }

        // floz.query = ( ref ) => ref.where( "dayId", "==", dayId )


        // const floRoutineQuery = async () => {
        //     if ( filteredQuery.length === 0 ) {
        //         const promiseDocSet = data.map( item => floFactory( item, type, dayId ) )
        //         const docSet = await Promise.all( promiseDocSet )
        //         setFloMasterDetail(docSet)
        //     } else {
        //         setFloMasterDetail(filteredQuery)
        //     }
        //     setloaded(true)

        // }
        // if ( !loaded ) {
        //     floRoutineQuery()
        // }

    })
    const onCheckedChange = ( isChecked: boolean ) => {
        setChecked( isChecked );
    };
    const updateDayTypeCompleted = ( flo: string ) => {
        setCompleted( completed => completed.includes( flo ) ? completed.filter( item => item !== flo ) : [...completed, flo] )
    }
    const cap = ( word: string ) => {
        return word.replace( /^\w/, ( c ) => c.toUpperCase() );
    }


    const shouldLoadComponent = ( index ) => index === selectedIndex;

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

    const iconPicker = ( idnum, completeness ) =>
    {
        if ( selectedIndex === idnum )
            return EyeIcon
        else if ( completeness )
            return DoneIcon
        else
            return ToDoIcon
        }
    const filterDocs = () => _.sortBy( floz.docs.filter( doc => doc.id.includes( type ) ), ( doc ) => data.indexOf( doc.data.floType ) )
    const filterDocsDrawer = () => filterDocs().map( ( flo, index ) => { return { title: _.startCase( flo.data.floType ), icon:  iconPicker(index, flo.data.completed ) } } )

    return (
        <>
            {!floz.hasDocs ? (
                <Spinner />
            ) : (
                    <Card header={Header} status={statusPicker()} style={{margin:5}}>
                        {topTabsIndex === index ? (
                            <Layout level='4' style={{ flex: 1, flexDirection: "row" }}>
                                <Layout level='4' style={{ flex: 1, zIndex: 1000 }}>
                                    {!loading && (

                                        <Drawer
                                        style={{ zIndex: 1000 }}
                                        data={(() => filterDocsDrawer())()}
                                        onSelect={setSelectedIndex}

                                        />
                                        )}

                                </Layout>

                                <Layout level='3' style={{ flex: 4, zIndex: 900 }}>
                                    <ViewPager
                                        selectedIndex={selectedIndex}
                                        // onSelect={setSelectedIndex}
                                        shouldLoadComponent={shouldLoadComponent}
                                        style={{ flex: 1, flexWrap: "nowrap", overflow: "hidden" }}
                                    >

                                        {filterDocs().map( ( flo ) => (
                                            <FloView flo={flo} toggleCompleteness={updateDayTypeCompleted} />
                                        ) )}
                                    </ViewPager>
                                </Layout>
                            </Layout>
                        ) :
                            ( <Text></Text> )
                        }
                    </Card>
                )}
        </>
    );
};

export default observer( FloMasterDetail );