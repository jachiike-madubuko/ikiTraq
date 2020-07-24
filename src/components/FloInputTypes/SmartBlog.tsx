import { Button, Card, Icon, Input, Layout, List, ListItem, Modal, Text } from '@ui-kitten/components';
import { observer } from 'mobx-react';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { fullLayout, SmartBlogListItem, SmartBlogProps, ActionItem } from '../../types';
import { AnimatedIcon } from '../AtomicDesignSystem/Atoms/AnimatedIcon.atom';
import { ExpandIcon } from '../AtomicDesignSystem/Atoms/Icon.atom';
import SmartBlogTextArea from '../FloComponents/SmartBlogComponents/SmartBlogTextArea';
import SmartBlogTitle from '../FloComponents/SmartBlogComponents/SmartBlogTitle';
import SmartBlogAction from '../FloComponents/SmartBlogComponents/SmartBlogAction';
import SmartBlogTakeAway from '../FloComponents/SmartBlogComponents/SmartBlogTakeAway';
import SmartBlogActionItem from '../FloComponents/SmartBlogComponents/SmartBlogActionItem';
import _ from 'lodash';

const { height, width } = Dimensions.get( "window" )


const SmartBlog = ( props: SmartBlogProps ) => {
    const { floType, flo } = props;
    /*
    Component should be a multiline textbox for longform writing

    List of subcomponents:
        Textarea w/ word count, and timer
        Action Item list
            5 item list
        Biggest take away
    */

    const [checked, setChecked] = React.useState( false );
    const [completed, setCompleted] = React.useState( false );
    const [showInput, setShowInput] = React.useState( false );
    const [title, settitle] = React.useState( '' );
    const [expanded, setExpanded] = React.useState( -1 );
    const [description, setdescription] = React.useState( '' );

    const [selectedIndex, setselectedIndex] = React.useState( '' );
    const [layoutList, setList] = React.useState( fullLayout )
    const [inputData, setInputData] = React.useState( {} )

    const [visible, setVisible] = React.useState( false );
    const [edit, setedit] = React.useState( true );

    const toggleModal = () => {
        setVisible( !visible );
    };
    interface RenderAction {
        actionPlan: string;
        impact: number;
}

    const renderItemAccessory = ( style, index ) => (
        <Button
            onPress={() => setExpanded( index )}
            style={style}
            icon={ExpandIcon}></Button>
    );

    const renderItemIcon = ( style ) => (
        <Icon {...style} name='person' />
    );


    const renderActionItem = ( { item } ) => (
            <ListItem title={item.actionPlan} description={`Impact ${item.impact}`} />
    )

    const renderItem = ( { item, index }: SmartBlogListItem ) => (
        <>
            {index == expanded ? (
                <Card >
                    {item == "expandableTextArea" ? (
                        <SmartBlogTextArea {...props} />
                    ) : item == "actionItems" ? (
                        <SmartBlogAction {...props} />
                    ) : item == "title" ? (
                        <SmartBlogTitle {...props} />
                    ) : item == "bigTakeAway" && (
                        <SmartBlogTakeAway {...props} />
                    )
                    }
                </Card>
            ) : (
                    <ListItem
                        title={`${_.startCase( item )} ${index + 1}`}
                        icon={renderItemIcon}
                        accessory={style => renderItemAccessory( style, index )}
                        onPress={() => setExpanded( index )}
                    />
                )
            }
        </>
    );

    return (
        <>
            <Layout>
                    <AnimatedIcon  name={"edit"} look={"ghost"} ani={"shake"} cyc={5} pressed={() => setedit(!edit)}/>
                <Card>

                    {edit ? (

                        <List
                        data={layoutList}
                            renderItem={renderItem}
                        />
                    ) : (

                            <Layout>


                                <Text style={{flex:1}} category="h1">{flo.data.title}</Text>
                                <Text style={{flex:1}}>{flo.data.blog}</Text>
                                <Text>Action Items</Text>
                                <List
                                    data={flo.data.actionItems}
                                    renderItem={renderActionItem}
                                    />
                                <Text>{flo.data.bigTakeAway}</Text>
                            </Layout>
                        )}


                </Card>
            </Layout>
        </>
    );
};

export default observer( SmartBlog );

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