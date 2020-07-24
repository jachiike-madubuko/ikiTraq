import React from 'react'
import {Layout, Spinner} from '@ui-kitten/components'

interface DataComponentProps {
    render: boolean;
}
const DC: React.FC<DataComponentProps> = props => (

    <Layout>
        {props.render ?
            props.children

        : (
                <Spinner/>
        )}
    </Layout>
)

export default DC;