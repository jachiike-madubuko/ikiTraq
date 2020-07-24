import React from 'react';
import {
    Layout,
    Text,
    List,
    Card,
    CardHeader,
    ListItem
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { randomStatus, getAgenda, GainzFlo } from '../../types';
import _ from 'lodash';

interface Gainz36Props {
    item: GainzFlo;
    index: number;
}
const Gainz36: React.FC<Gainz36Props> = ( { item, index } ) => {

    const renderGainzItem = ( { item, index } ) => (
        <ListItem title={""}>
            <Text category="h5" status={_.sample( randomStatus )}>
                {`${index + 1}. ${item}`}
            </Text>
        </ListItem>
    );

    return (
        <Layout style={{ flex: 11 }}>
            <Card status={_.sample( randomStatus )} style={{ flex: 1, margin: 5, borderRadius: 10, justifyContent: "center" }} header={() => <CardHeader title={`${index + 1}. ${item.name}`} />}>
                <List
                    data={item.list}
                    renderItem={renderGainzItem}
                    keyExtractor={key => key}
                    listKey={item.name}
                    style={{ minWidth: "100%" }}
                    columnWrapperStyle={{minWidth:"100%"}}
                    key={item.name}
                />
            </Card>
        </Layout>
    );
};
export default observer( Gainz36 );

