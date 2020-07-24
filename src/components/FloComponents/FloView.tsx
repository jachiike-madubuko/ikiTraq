import { Foundation } from '@expo/vector-icons';
import { Button, ButtonGroup, Card, CardHeader, Layout, Text, Spinner } from '@ui-kitten/components';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import FloInput from './FloInput';
import { Flo } from '../../types';
import TimeTracker from '../FloInputTypes/TimeTracker';
import { ScrollView } from 'react-native-gesture-handler';
import { AnimatedIcon } from '../AtomicDesignSystem/Atoms/AnimatedIcon.atom';
const {height, width} = Dimensions.get('window')
interface FloProps {
    flo: Flo;
    toggleCompleteness: ( string ) => void;
}
const FloView = ( props: FloProps ) => {
    const [loading, setloading] = React.useState( true );
    const [listView, setListView] = React.useState( false );
    const [save, setsave] = React.useState( false );
    const [showInput, setShowInput] = React.useState( true );
    const [timeData, settimeData] = React.useState( {} );
    const { flo, toggleCompleteness } = props;
    const { floType, completed  } = flo.data;

    const startTask = () => {
        setShowInput( true )
    }

    const markCompleted = () => {
        console.log( flo.data.completed );
        flo.update( {
            completed: !flo.data.completed,
        } )

        toggleCompleteness( floType )

    }
    const saveInput = () => {
        setsave( !save )
    };


    const Header = () => (
        <CardHeader title={floType} >
            <TouchableOpacity onPress={() => setShowInput( !showInput )} style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }} >
                <Layout style={{flexDirection:"row"}}>
                <Text category="h4" style={{ marginRight: 50 }}>{_.startCase( floType )}</Text>
                    <ButtonGroup>
                        <AnimatedIcon beforePress ani="pulse" cyc={Infinity}  feel={flo.data.completed ? "success" : "danger"} look="ghost" pressed={markCompleted} sized="giant" name={flo.data.completed ? "checkmark-circle-outline" : "flash-outline"}  />

                    </ButtonGroup>
                    <TimeTracker flo={flo}/>
                <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => setShowInput( !showInput )}>
                    <Foundation name={showInput ? "arrows-compress" : "arrows-expand"} size={30} color="white" />
                </TouchableOpacity>
</Layout>

            </TouchableOpacity>
        </CardHeader>

    );


    return (
        <>
            <Layout level='3' style={{ padding: 5, margin: 5 }}>

                {!flo.hasData ? (
                    <Spinner size="giant" />
                    ) : (
                        <Card style={{ marginVertical: 8, maxHeight: height * .57, minHeight: height * .57, overflow:"scroll" }} header={Header} status={flo.data.completed ? 'success' : 'danger'}>

                            {showInput && (
                                <FloInput save={save} flo={flo} floType={floType} markCompleted={markCompleted} />
                                )}
                        </Card>
                    )}
            </Layout >
        </>
    );
};

export default observer( FloView );