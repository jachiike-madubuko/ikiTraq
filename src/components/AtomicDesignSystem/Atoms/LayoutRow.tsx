import React from 'react'
import {Layout} from '@ui-kitten/components'

const LayoutRow: React.FC = props => (

    <Layout style={[{ flexDirection: "row" }]}>
        {props.children}
    </Layout>
)

export default LayoutRow;