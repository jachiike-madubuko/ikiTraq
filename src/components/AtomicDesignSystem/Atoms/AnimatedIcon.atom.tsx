import { Icon, Button, ButtonProps } from '@ui-kitten/components'
import React, { useEffect } from 'react';
import { Appearances, Animations, Statuses, IconNames, Sizes } from '../../../evaTypes'
import { StyleProp, ViewStyle } from 'react-native';

export interface AnimatedIconProps {
    sized: Sizes;
    pressed: () => void;
    name: IconNames;
    dissed: boolean;
    ani: Animations;
    cyc: number;
    height: number;
    width: number;
    feel: Statuses;
    look: Appearances;
    stylez: ViewStyle
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = props => {
    const iconRef = React.useRef( null );
    const onPress = () => {
        iconRef.current.startAnimation();
        props.pressed()
    };

    useEffect( () => {
    })

    const renderIcon = ( style ) => (
        <Icon
            {...style}
            ref={iconRef}
            name={props.name}
            animation={props.ani}
            animationConfig={{ cycles: props.cyc }}
            width={props.width}
            height={props.height}
        />

    );


    return props.children ? (

        <Button
            appearance={props.look}
            disabled={props.dissed}
            icon={renderIcon}
            onPress={onPress}
            style={props.stylez}
            status={props.feel}
            size={props.sized}
            >{props.children}</Button>
            ) : (
                <Button
                size={props.sized}
                appearance={props.look}
                disabled={props.dissed}
                icon={renderIcon}
                onPress={onPress}
                style={props.stylez}
                status={props.feel}
            />
        );
};