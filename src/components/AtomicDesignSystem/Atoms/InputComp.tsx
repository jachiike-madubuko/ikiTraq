

import React from 'react'

import {
    Layout,
    Text
} from '@ui-kitten/components'

interface InputCompProps {

}

const InputComp: React.FC<InputCompProps> = props => {
    const { } = props;
    const [focused, setfocused] = React.useState( false );

    return (
        <Layout>
            <Text>
                InputComp
            </Text>
        </Layout>

    )
}

export default InputComp