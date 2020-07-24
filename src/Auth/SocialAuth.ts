import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import uuid from 'uuid-js';

import { firebase, firestore } from './Firebase';

// https://github.com/evanbacon/expo-google-sign-in-demo?source=post_page-----d1707579a7ce----------------------
// Calling the following function will open the FB login dialogue:
export async function facebookSignIn () {
    try {
        const {
            type,
            token,
            expires
        } = await Facebook.logInWithReadPermissionsAsync( '428415054461367', {
            'permissions': [ 'public_profile', 'email' ]
        } );



        if ( type === 'success' ) {
            // Get the user's name using Facebook's Graph API
            const response = await fetch( `https://graph.facebook.com/me?access_token=${ token }` );
            const user = await response.json()
            // alert( `Hi ${user.name}!` );

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential( token );

            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential( credential );

            return type
        }
    } catch ( e ) {
        console.error( e );
    }
}

export async function facebookSignUp () {
    try {
        const {
            type,
            token,
            expires
        } = await Facebook.logInWithReadPermissionsAsync( '428415054461367', {
            'permissions': [ 'public_profile', 'email' ]
        } );



        if ( type === 'success' ) {
            // Get the user's name using Facebook's Graph API
            const response = await fetch( `https://graph.facebook.com/me?access_token=${ token }` );
            const user = await response.json()
            // alert( `Hi ${user.name}!` );
            const temp_password = uuid.create().toString()
            const newFBUser = await firebase.auth().createUserWithEmailAndPassword( user.email, temp_password )

            // create user with email and name, and a password then connect credentials
            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential( token );

            newFBUser.user.linkWithCredential( credential )
            // login with credential
            // const firebaseUserCredential = await firebase.auth().signInWithCredential( credential );
            const firebase_user = newFBUser.user
            firestore.collection( 'users' ).doc( firebase_user.uid ).set( {
                email: firebase_user.email,
                phoneNumber: firebase_user.phoneNumber,
                profilePhoto: firebase_user.photoURL,
                name: firebase_user.displayName,
                uid: firebase_user.uid
            } )
            return type
        }
    } catch ( e ) {
        console.error( e );
    }
}

// Calling this function will open Google for login.
export async function googleSignIn () {
    try {
        // add any configuration settings here:
        // await GoogleSignIn.initAsync( {
        //     clientId: '1065040624870-o3g9covps7nhevc0cc67r2loeitbor0h.apps.googleusercontent.com'
        // })

        const data = await GoogleSignIn.signInAsync();

        // create a new firebase credential with the token
        if ( data.type == 'success' ) {
            const credential = firebase.auth.GoogleAuthProvider.credential( data.user.auth.idToken, data.user.auth.idToken )
            const firebaseUserCredential = await firebase.auth().signInWithCredential( credential );
            console.warn( JSON.stringify( firebaseUserCredential.user.toJSON() ) );
        }
    } catch ( e ) {
        console.error( e );
    }
}
// Calling this function will open Google for login.
export async function googleSignUp () {
    try {
        // add any configuration settings here:
        // await GoogleSignIn.initAsync( {
        //     clientId: '1065040624870-o3g9covps7nhevc0cc67r2loeitbor0h.apps.googleusercontent.com'
        // })

        const data = await GoogleSignIn.signInAsync();

        // create a new firebase credential with the token
        if ( data.type == 'success' ) {
            const temp_password = uuid.create().toString()
            const credential = firebase.auth.GoogleAuthProvider.credential( data.user.auth.idToken, data.user.auth.idToken )
            const newGoogleUser = await firebase.auth().createUserWithEmailAndPassword( data.user.email, temp_password )
            newGoogleUser.user.linkWithCredential( credential )
            // const firebaseUserCredential = await firebase.auth().signInWithCredential( credential );
            console.warn( JSON.stringify( newGoogleUser.user.toJSON() ) );

        }
    } catch ( e ) {
        console.error( e );
    }
}