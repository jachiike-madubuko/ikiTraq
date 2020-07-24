import React from 'react';
import {
    Text,
    Layout,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import InputList from '../FloInputTypes/InputList'
import SmartBlog from '../FloInputTypes/SmartBlog'
import TimeReview from '../FloInputTypes/TimeReview'
import WorkoutTracker from '../FloInputTypes/WorkoutTracker'
import { FloInputProps, timeReviewTypesList, workoutTrackerTypesList, smartBlogTypesList, inputListTypesList } from '../../types';

const FloInput = ( props: FloInputProps ) => {
    const [checked, setChecked] = React.useState( false );
    const [completed, setCompleted] = React.useState( false );
    const [showInput, setShowInput] = React.useState( false );

    const { floType } = props;
    // referemce component
    const dynamicRender = () => {
        return timeReviewTypesList.includes( floType )
            ? <TimeReview  {...props} />
            : workoutTrackerTypesList.includes( floType )
                ? <WorkoutTracker  {...props} />
                : smartBlogTypesList.includes( floType )
                    ? <SmartBlog  {...props} />
                    : inputListTypesList.includes( floType )
                        ? <InputList  {...props} />
                        : <Text>Nothing</Text>
    }

    return (
            <Layout style={{flex:1, flexGrow:10}}>
                {dynamicRender()}
            </Layout>
    );
};

export default observer( FloInput );