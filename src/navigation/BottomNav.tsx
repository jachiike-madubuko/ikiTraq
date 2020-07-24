import { View, Text, TouchableOpacity } from 'react-native';
import { BottomNavigation, Icon, BottomNavigationTab, useTheme } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconNames, Statuses } from '@src/evaTypes';

export const BottomNav: React.FC<BottomTabBarProps> = ( { state, descriptors, navigation } ) => {
    const [selectedIndex, setSelectedIndex] = React.useState( 0 );
    const onSelect = ( index ) => {
        navigation.navigate( state.routeNames[index] );
    };
    return (
        <SafeAreaView>
            <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
                {state.routes.map( ( route, index ) => {
                    const { options } = descriptors[route.key];
                    const focused = state.index === index;
                    let iconName: IconNames;
                    let feel: Statuses;
                    feel = focused
                        ? 'danger'
                        : 'primary';

                    const iconRef = React.useRef( null )
                    const onPress = () => {
                        iconRef.current.startAnimation()
                        onSelect(index)
                    }

                    if ( route.name === 'Flo' ) {
                        iconName = focused ? 'eye-outline' : 'github-outline';
                    } else if ( route.name === 'Stats' ) {
                        iconName = focused ? 'pie-chart-outline' : 'trending-up';
                    } else if ( route.name === 'Blog' ) {
                        iconName = focused ? 'book-open-outline' : 'edit';
                    } else if ( route.name === 'Setting' ) {
                        iconName = focused ? 'settings' : 'options-2-outline';
                    }
                    const theme = useTheme();

                    const renderIcon = ( style ) => (
                        <Icon
                            ref={iconRef}
                            width={40}
                            height={40}
                            fill={focused ? theme['color-success-default'] : theme['color-danger-default']}
                            name={iconName}
                            animation="shake"
                            animationConfig={{ cycles: Infinity, useNativeDriver: true }}
                            size="giant"
                            {...style}
                        />
                    )

                    return (
                        <BottomNavigationTab  icon={renderIcon}  onPress={onPress} />
                    )
                } )}
            </BottomNavigation>
        </SafeAreaView>
    );
}