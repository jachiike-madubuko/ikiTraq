import React, { useEffect } from 'react';
import {
    Card,
    Input,
    CardHeader,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import { InputListItemProps } from '../../types';


const InputListItem: React.FC<InputListItemProps> = props => {
    const { titleLabel, descriptionLabel, inputId, flo } = props;
    // TODO next option, drop the data.title into the state
    const { inputList } = flo.data;
    const [checkedT, setCheckedT] = React.useState( false );
    const [checkedD, setCheckedD] = React.useState( false );
    const [title, settitle] = React.useState( inputList[inputId].title );
    const [description, setdescription] = React.useState( inputList[inputId].description );

    useEffect( () => {

        const updateTitle = async () => {
            const newlist = [...inputList]
            newlist[inputId].title = title
            flo.update( { inputList: newlist } )
        }
        if ( title !== "" )
            updateTitle()
    }, [checkedT] )

    useEffect( () => {
        const updateDescription = async ( ) => {
            const newlist = [...inputList]
            newlist[inputId].description = description
            flo.update( { inputList: newlist } )
        }
        if ( description !== "" )
            updateDescription()
    }, [checkedD] )



    const Header = () => (
        <CardHeader title={''}>
            <Input
                size="large"
                label={`${inputId + 1}. ${titleLabel}`}
                value={title}
                onChangeText={settitle}
                onBlur={() => setCheckedT( !checkedT )}

            />
        </CardHeader>
    );

    return (
        <>
            <Card header={Header} status={title.length > 1 && description.length > 1 ? "success" : "warning"} accessible={false}>
                <Input
                    size="small"
                    label={descriptionLabel}
                    value={description}
                    onChangeText={setdescription}
                    onBlur={() => setCheckedD(!checkedD)}
                />
            </Card>
        </>
    );
};
export default observer( InputListItem );