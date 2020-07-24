import { FirestoreCollection } from '@react-firebase/firestore';
import { Card, Text, ViewPager, Input } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
const AuthForm = ( props ) => {

    const [selectedIndex, setSelectedIndex] = React.useState( 0 );
    const [email, setEmail] = React.useState( '' );
    const [password, setPassword] = React.useState( '' );

    const submitAuth = ( e: NativeSyntheticEvent<TextInputKeyPressEventData> ) => e.nativeEvent.key === 'Enter' && props.auth()
    const focusPassword = ( e: NativeSyntheticEvent<TextInputKeyPressEventData> ) => e.nativeEvent.key === 'Enter' && setSelectedIndex(selectedIndex + 1)
    const shouldLoadComponent = ( index ) => index === selectedIndex;

    const changeEmail = ( email: string ) => {
        setEmail( email )
        props.changeEmail(email)
    }

    const changePassword = ( password: string ) => {
        setPassword( password )
        props.changePassword( password)
    }
    return (
        <Card>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
                shouldLoadComponent={shouldLoadComponent}
            >
                <Card>
                <Input
                    status='control'
                    value={email}
                    label="Email"
                    onChangeText={changeEmail}
                    autoFocus
                    onKeyPress={focusPassword}
                    />
                </Card>
                <Card>

                <Input
                    status='control'
                    value={password}
                    onChangeText={changePassword}
                    autoFocus
                    label="Password"
                    />
                    </Card>

            </ViewPager>
        </Card>
    );
};

const styles = StyleSheet.create( {
    tab: {
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default AuthForm;