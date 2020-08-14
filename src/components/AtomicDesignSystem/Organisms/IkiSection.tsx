
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Card, Input, Layout, List, ListItem, Tab, TabBar, Text, Button } from '@ui-kitten/components';
import * as React from 'react';
import { Platform, StyleSheet, } from 'react-native';
import { HeartIcon, GlobeIcon, SkillIcon, PaidIcon, GenericIcon, ShuffleIcon, PlusIcon } from './../Atoms/Icon.atom';
import LayoutRow from '../Atoms/LayoutRow';
import ikiPrompts from './../../../ikiPrompts';
import { ikigaiType } from '@src/screens/IkigaiScreen';
import { onChange } from 'react-native-reanimated';

interface IkiSectionProps {
    data: string[]
    ikiType: ikigaiType
}
const IkiSection: React.FC<IkiSectionProps> = props => {



    const [ikiItem, setikiItem] = React.useState( '' );


    const [ikiItems, setikiItems] = React.useState( [] );

    const [promptIdx, setpromptIdx] = React.useState( 0 );

    const renderItem = ( { item, index } ) => (
        <ListItem title={` ${item.title} `} />
    );

    const { data, ikiType } = props
    const prompts = ikiPrompts[ikiType]

    function getRandomInt( max ) {
        return Math.floor( Math.random() * Math.floor( max ) );
    }
    const shuffle = () => {
        setpromptIdx( getRandomInt( prompts.length ) )
    }

    const addIkiItem = () => {
        setikiItems( [...ikiItems, {title: ikiItem}] )
        setikiItem( '' )
    }

    return (
        <Card
            appearance="filled"
        >
            <Card style={{ flex: 1 }}>
                <Text category="h3">{ikiType}</Text>
                <Text>{prompts[promptIdx]}</Text>
                <Button
                    icon={ShuffleIcon}
                    onPress={shuffle}
                >
                    Shuffle
          </Button>
            </Card>
            <Card style={{ flex: 1 }}>
                <LayoutRow>
                    <Input
                        label="Ikigai"
                        style={{ flex: 3 }}
                        value={ikiItem}
                        onChangeText={setikiItem}
                    />
                    <Button
                        onPress={addIkiItem}
                        icon={PlusIcon}
                        status='success'
                        appearance='ghost'
                        size='medium'
                        style={{ flex: 1, marginTop: 18, height: 20, width: 10 }}
                    ></Button>
                </LayoutRow>

            </Card>
            <Card style={{ flex: 2 }}>
                <List
                    data={ikiItems}
                    renderItem={renderItem}
                    style={{ flex: 1 }}
                />
            </Card>

        </Card>
    )
}

export default IkiSection