
import * as React from 'react';
import { createDrawerNavigator, DrawerContentOptions, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, Button, Layout, Icon, useTheme, Text, Input, DrawerProps } from '@ui-kitten/components';
import { Platform } from 'react-native';

import {
    FirebaseAuthConsumer,
} from "@react-firebase/auth"
import DaysScreen from '../screens/DaysScreen';
import HomeScreen from '../screens/HomeScreen';
import BlogScreen from '../screens/JournalScreen';
import IkigaiScreen from '../screens/IkigaiScreen';
import FloDayScreen from '../screens/FloDayScreen';
import HabitScreen from '../screens/HabitScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

import AuthNavigator from '../Auth';
import { observer } from 'mobx-react';

import { BottomNav } from './BottomNav'
import { PlayIcon } from '../components/AtomicDesignSystem/Atoms/Icon.atom';
import { TopNav } from './TopNav';
type AppRouterProps = {
    changeTheme: () => void;
    signOut: () => void;
    hideSplash: () => void;

}
const AppRouter = ( { changeTheme, signOut, hideSplash }: AppRouterProps ): React.ReactFragment => {

    // TODO make the outermost nav a drawer create a remder component that renders options based on current screen
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    // const Tab = createTabNavigator();
    const HomeStack = createStackNavigator();
    const JournalStack = createStackNavigator();
    const MainDrawerNav = createDrawerNavigator();
    const HabitStack = createStackNavigator();
    const IkigaiStack = createStackNavigator();

    const showApp = () => hideSplash();

    const DrawerContent = ( { navigation, state }: DrawerContentComponentProps ) => {
        const [taskName, settaskName] = React.useState( '' );
        const [index, setindex] = React.useState( 0 );
        const data = [{ title: 'Flo' }, { title: 'Stats' }, { title: 'Blog' }, { title: 'Settings' }]
        const onSelect = ( index ) => {
            navigation.navigate( "Main", { screen: data[index].title } );
            setindex( index )
        };
        return (
            <>
                <Layout>
                    <Button
                        onPress={changeTheme}>
                        Toggle Theme
                     </Button>

                    <Text category="h5">Pomodoro</Text>
                    <Input placeholder="task" />
                    <Button icon={PlayIcon}></Button>
                </Layout>
                <Drawer
                    data={data}
                    selectedIndex={index}
                    onSelect={onSelect}
                />
                <Layout>
                    <Button
                        onPress={signOut}>
                        SignOut
                     </Button>
                </Layout>

            </>
        );
    };

    const HomeStackScreen = () => {
        return (
            <HomeStack.Navigator

                initialRouteName={"Home"}
                mode="card"
                screenOptions={{
                    animationEnabled: true,
                    header: ( { scene, previous, navigation } ) => {
                        const { options } = scene.descriptor;
                        const title = scene.route.name;

                        return (
                            <TopNav title={title} previous={previous} scene={scene} navigation={navigation} />
                        );
                    }
                }}

            >
                <HomeStack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <HomeStack.Screen
                    name="Days"
                    component={DaysScreen}
                />
                <HomeStack.Screen
                    name="FloDay"
                    component={FloDayScreen}
                />
            </HomeStack.Navigator>
        );
    }

    const IkigaiStackScreen = () => {
        return (
            <IkigaiStack.Navigator
                initialRouteName={"Ikigai"}
                mode="card"
                screenOptions={{
                    animationEnabled: true,
                    header: ( { scene, previous, navigation } ) => {
                        const { options } = scene.descriptor;
                        const title = scene.route.name;

                        return (
                            <TopNav title={title} previous={previous} scene={scene} navigation={navigation} />
                        );
                    }
                }}

            >
                <IkigaiStack.Screen
                    name="Ikigai"
                    component={IkigaiScreen}
                />
            </IkigaiStack.Navigator>
        );
    }

    const HabitStackScreen = () => {
        return (
            <HabitStack.Navigator
                initialRouteName={"Home"}
                mode="card"
                screenOptions={{
                    animationEnabled: true,
                    header: ( { scene, previous, navigation } ) => {
                        const { options } = scene.descriptor;
                        const title = scene.route.name;

                        return (
                            <TopNav title={title} previous={previous} scene={scene} navigation={navigation} />
                        );
                    }
                }}
            >
                <HabitStack.Screen
                    name="Habit"

                    component={HabitScreen}
                />
            </HabitStack.Navigator>
        );
    }
    const JournalStackScreen = () => {
        return (
            <JournalStack.Navigator
                screenOptions={{
                    animationEnabled: true,
                    header: ( { scene, previous, navigation } ) => {
                        const { options } = scene.descriptor;
                        const title = scene.route.name;

                        return (
                            <TopNav title={title} previous={previous} scene={scene} navigation={navigation} />
                        );
                    }
                }}
            >
                <JournalStack.Screen
                    name="Journal"
                    component={BlogScreen}
                />
            </JournalStack.Navigator>
        );
    }


    const MainStack = () => {
        return (
            <Tab.Navigator key={"Main"} tabBar={props => <BottomNav {...props} />}>
                <Tab.Screen name="Dashboard" component={HomeStackScreen} />
                <Tab.Screen name="Ikigai" component={IkigaiStackScreen} />
                <Tab.Screen name="Journal" component={JournalStackScreen} />
                <Tab.Screen name="Habit" component={HabitStackScreen} />
            </Tab.Navigator>
        )
    }

    const d: DrawerContentOptions = {

    }
    return (
        <FirebaseAuthConsumer>
            {( { isSignedIn } ) => {
                showApp()
                if ( isSignedIn === true ) {
                    return (
                        <MainDrawerNav.Navigator drawerContentOptions={d} drawerStyle={{ borderColor: "transparent", backgroundColor: "transparent" }} drawerPosition="left" drawerContent={props => <DrawerContent {...props} />}>
                            <MainDrawerNav.Screen component={MainStack} name="Main" />
                        </MainDrawerNav.Navigator>
                    )
                } else {
                    return (
                        <Stack.Navigator headerMode="none">
                            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                            <Stack.Screen name="Login" component={AuthNavigator} />
                        </Stack.Navigator>
                    )
                }
            }}
        </FirebaseAuthConsumer>
    )
}

export default AppRouter;


// let iconName: IconNames;
// let feel: Statuses;
// feel = focused
//     ? 'danger'
//     : 'primary';

// const iconRef = React.useRef( null )
// const onPress = () => {
//     iconRef.current.startAnimation()
// }

// // if ( route.name === 'Flo' ) {
// //     iconName = focused
// //         ? 'github'
// //         : 'github-outline';
// // } else if ( route.name === 'Stats' ) {
// //     iconName = focused ? 'bulb' : 'bulb-outline';
// // } else if ( route.name === 'Blog' ) {
// //     iconName = focused ? 'color-palette' : 'color-palette-outline';
// // } else if ( route.name === 'Setting' ) {
// //     iconName = focused ? 'settings-2' : 'settings-2-outline';
// // }
// const theme = useTheme();

// // You can return any component that you like here!
// return (
//     <TouchableOpacity onPress={onPress} >
//         <Icon
//             ref={iconRef}
//             width={40}
//             height={40}
//             fill={focused ? theme['color-success-default'] : theme['color-danger-default']}
//             name={iconName}
//             animation="shake"
//             animationConfig={{ cycles: Infinity, useNativeDriver: true }}
//             size="giant"
//         />
//     </TouchableOpacity>
// )
