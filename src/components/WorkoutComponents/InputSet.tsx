import React from 'react'

import { Input } from '@ui-kitten/components'
import { Statuses } from '../../evaTypes'
interface InputSetProps {
    updateSets: ( index: number, reps: string ) => void
    index: number;
    status: Statuses
    item: any;
}

const InputSet: React.FC<InputSetProps> = ( { index, status, updateSets } ) => {

    const [focused, setfocused] = React.useState( false );

    return (
        <Input
            size={focused ? "large" : "small"}
            status={focused ? "control" : status}
            label={`Set #${index}`}
            placeholder="10"
            onChangeText={text => updateSets( index, text )}
            onFocus={()=>setfocused(true)}
            onBlur={()=>setfocused(false)}

        />
    )
}

export default InputSet