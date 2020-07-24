import React from 'react';
import {
    Layout,
    Text,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import InputListItem from '../FloComponents/InputListItem'
import { InputListProps, titleLabelObj, descriptionLabelObj } from '../../types';


const InputList: React.FC<InputListProps> = props => {
    const { floType, flo } = props;
    const [inputNum, setinputNum] = React.useState( 0 );
    const [selectedIndex, setselectedIndex] = React.useState( '' );

    const titleLabel = titleLabelObj[floType]
    const descriptionLabel = descriptionLabelObj[floType]

    return (
        <>
            <Layout>
                <Text>{JSON.stringify( flo.data.inputList )}</Text>
                {flo.data.inputList.map( ( item, index ) => {
                    return (
                        <>
                            <InputListItem flo={flo} data={item} titleLabel={titleLabel} descriptionLabel={descriptionLabel} inputId={index} />
                        </>
                    )
                } )}
            </Layout>
        </>
    );
};

export default observer( InputList );

