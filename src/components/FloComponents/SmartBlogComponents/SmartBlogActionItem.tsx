import React, { useEffect } from 'react';
import {
    Card,
    Input,
    CardHeader,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { InputListItemProps, defaultDescriptions, ActionItemStruct} from '../../../types';
// import { AirbnbRating} from 'react-native-elements'

const SmartBlogActionItem: React.FC<InputListItemProps> = props => {
    const { actionPlanLabel, impactLabel, inputId, flo } = props;
    // TODO next option, drop the data.actionPlan into the state
    const { actionItems } = flo.data;
    const [checkedT, setCheckedT] = React.useState( false );
    const [checkedD, setCheckedD] = React.useState( false );
    const [actionPlan, setactionPlan] = React.useState( actionItems[inputId].actionPlan );
    const [impact, setimpact] = React.useState( actionItems[inputId].impact );

    useEffect( () => {

        const updateactionPlan = async () => {
            const newlist = [...actionItems]
            newlist[inputId].actionPlan = actionPlan
            flo.update( { actionItems: newlist } )
        }
        if ( actionPlan !== "" )
            updateactionPlan()
    }, [checkedT] )

    useEffect( () => {
        const updateimpact = async () => {
            const newlist = [...actionItems]
            newlist[inputId].impact = impact
            flo.update( { actionItems: newlist } )
        }
        if ( impact !== 0 )
            updateimpact()
    }, [impact] )

    const descList = defaultDescriptions == [] ? defaultDescriptions : defaultDescriptions


    const Header = () => (
        <CardHeader title={'Swag'}>
            <Input
                size="giant"
                label={`${inputId + 1}. ${actionPlanLabel}`}
                value={actionPlan}
                onChangeText={setactionPlan}
                onBlur={() => setCheckedT( !checkedT )}

            />
        </CardHeader>
    );

    return (
        <>
            <Card header={Header} status={actionPlan.length > 1 && impact > 1 ? "success" : "warning"} accessible={false}>

                <AirbnbRating count={defaultDescriptions.length} showRating defaultRating={impact} reviews={defaultDescriptions} onFinishRating={setimpact} />

            </Card>
        </>
    );
};
export default observer( SmartBlogActionItem );