import React, { useEffect } from 'react';
import {
    Layout,
    Input,
    Divider,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
// import { AirbnbRating } from 'react-native-elements';
import { ReviewProps, defaultDescriptions } from '../../types';

const Review: React.FC<ReviewProps> = props => {
    const { flo, reviewDescriptions } = props;
    const [title, settitle] = React.useState( flo.data.title );
    const [description, setdescription] = React.useState( flo.data.description );
    const [rating, setrating] = React.useState( flo.data.rating );
    const [checkedT, setCheckedT] = React.useState( false );
    const [checkedD, setCheckedD] = React.useState( false );


    useEffect( () => {


        const updateTitle = async () => {
            flo.update( { title } )
        }
        if ( title !== "" )
            updateTitle()
    }, [checkedT] )

    useEffect( () => {
        const updateDescription = async () => {
            flo.update( { description } )

        }
        if ( description !== "" )
            updateDescription()
    }, [checkedD] )



    const update = () => {
        flo.update( { title, description, rating } )
    }
    const descList = reviewDescriptions == [] ? reviewDescriptions : defaultDescriptions

    return (
        <>
            <Layout>
                <Input
                    value={title}
                    size="large"
                    defaultValue={flo.data.title}
                    onChangeText={settitle}
                    onBlur={() => setCheckedT( !checkedT )}
                />
                <Input value={description} size="small" defaultValue={flo.data.description} onChangeText={setdescription} onBlur={update} />
                <Divider />
                {/* <AirbnbRating count={descList.length} showRating defaultRating={flo.data.rating} reviews={descList} onFinishRating={setrating} /> */}
            </Layout>
        </>
    );
};

export default observer( Review );

