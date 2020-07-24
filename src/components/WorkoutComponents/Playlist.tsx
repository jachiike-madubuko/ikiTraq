/**
 * @uflo
 */

import { Asset } from "expo-asset";
import { Audio, Video } from "expo-av";
import React from "react";
import { Dimensions, Image, Slider, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ActivityIcon, FlashIcon, PlayIcon, PauseIcon, StopIcon, ForwardIcon, BackwardIcon } from "../AtomicDesignSystem/Atoms/Icon.atom";
import { MaterialIcons } from "@expo/vector-icons";

interface PlaylistItem {
    name: string;
    uri: string;
    isVideo: boolean;
}


const PLAYLIST: PlaylistItem[] = [
    {
        name: "Comfort Fit - “Sorry”",
        uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
        isVideo: false
    },
    {
        name: "Big Buck Bunny",
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        isVideo: true
    },
    {
        name: "Mildred Bailey – “All Of Me”",
        uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
        isVideo: false
    },
    {
        name: "Popeye - I don't scare",
        uri: "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        isVideo: true
    },
    {
        name: "Podington Bear - “Rubber Robot”",
        uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
        isVideo: false
    }
];


const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
// const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get( "window" );
const BACKGROUND_COLOR = "#FFF8ED";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = ( DEVICE_HEIGHT * 2.0 ) / 5.0 - FONT_SIZE * 2;

export const Playlist: React.FC = props => {
    const [index, setindex] = React.useState( 0 )
    const [video, setvideo] = React.useState( null )
    const [isSeeking, setisSeeking] = React.useState( false )
    const [shouldPlayAtEndOfSeek, setshouldPlayAtEndOfSeek] = React.useState( false )
    const [playbackInstance, setplaybackInstance] = React.useState( null )

    const [showVideo, setshowVideo] = React.useState( false )
    const [playbackInstanceName, setplaybackInstanceName] = React.useState( LOADING_STRING )
    const [loopingType, setloopingType] = React.useState( LOOPING_TYPE_ALL )
    const [muted, setmuted] = React.useState( false )
    const [playbackInstancePosition, setplaybackInstancePosition] = React.useState( null )
    const [playbackInstanceDuration, setplaybackInstanceDuration] = React.useState( null )
    const [shouldPlay, setshouldPlay] = React.useState( false )
    const [isPlaying, setisPlaying] = React.useState( false )
    const [isBuffering, setisBuffering] = React.useState( false )
    const [isLoading, setisLoading] = React.useState( true )
    const [fontLoaded, setfontLoaded] = React.useState( false )
    const [shouldCorrectPitch, setshouldCorrectPitch] = React.useState( true )
    const [volume, setvolume] = React.useState( 1.0 )
    const [rate, setrate] = React.useState( 1.0 )
    const [videoWidth, setvideoWidth] = React.useState( DEVICE_WIDTH )
    const [videoHeight, setvideoHeight] = React.useState( VIDEO_CONTAINER_HEIGHT )
    const [poster, setposter] = React.useState( false )
    const [useNativeControls, setuseNativeControls] = React.useState( false )
    const [fullscreen, setfullscreen] = React.useState( false )
    const [throughEarpiece, setthroughEarpiece] = React.useState( false )

    React.useEffect( () => {
        Audio.setAudioModeAsync( {
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        } );

    }, [] )

    const _loadNewPlaybackInstance = async ( playing ) => {
        if ( playbackInstance != null ) {
            await playbackInstance.unloadAsync();
            // playbackInstance.setOnPlaybackStatusUpdate(null);
            setplaybackInstance( null );
        }

        const source = { uri: PLAYLIST[index].uri };
        const initialStatus = {
            shouldPlay: playing,
            rate: rate,
            shouldCorrectPitch: shouldCorrectPitch,
            volume: volume,
            isMuted: muted,
            isLooping: loopingType === LOOPING_TYPE_ONE
        };

        if ( PLAYLIST[index].isVideo ) {
            console.log( _onPlaybackStatusUpdate );
            await video.loadAsync( source, initialStatus );
            // video.onPlaybackStatusUpdate(_onPlaybackStatusUpdate);
            setplaybackInstance( video);
            const status = await video.getStatusAsync();
        } else {
            const { sound, status } = await Audio.Sound.createAsync(
                source,
                initialStatus,
                _onPlaybackStatusUpdate
            );
            setplaybackInstance( sound);
        }

        _updateScreenForLoading( false );
    }

    const _mountVideo = component => {
         setvideo( component);
        _loadNewPlaybackInstance( false );
    };

    const _updateScreenForLoading = ( isLoading ) => {
        if ( isLoading ) {
            setshowVideo( false )
            setisPlaying( false )
            setplaybackInstanceName( LOADING_STRING )
            setplaybackInstanceDuration( null )
            setplaybackInstancePosition( null )
            setisLoading( true )
        } else {
            setplaybackInstanceName( PLAYLIST[index].name )
            setshowVideo( PLAYLIST[index].isVideo )
            setisLoading( false )
        }
    }

    const _onPlaybackStatusUpdate = status => {
        if ( status.isLoaded ) {

            setplaybackInstancePosition( status.positionMillis )
            setplaybackInstanceDuration( status.durationMillis )
            setshouldPlay( status.shouldPlay )
            setisPlaying( status.isPlaying )
            setisBuffering( status.isBuffering )
            setrate( status.rate )
            setmuted( status.isMuted )
            setvolume( status.volume )
            setloopingType( status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL )
            setshouldCorrectPitch( status.shouldCorrectPitch )
            if ( status.didJustFinish && !status.isLooping ) {
                _advanceIndex( true );
                _updatePlaybackInstanceForIndex( true );
            }
        } else {
            if ( status.error ) {
                console.log( `FATAL PLAYER ERROR: ${status.error}` );
            }
        }
    };

    const _onLoadStart = () => {
        console.log( `ON LOAD START` );
    };

    const _onLoad = status => {
        console.log( `ON LOAD : ${JSON.stringify( status )}` );
    };

    const _onError = error => {
        console.log( `ON ERROR : ${error}` );
    };

    const _onReadyForDisplay = event => {
        const widestHeight =
            ( DEVICE_WIDTH * event.naturalSize.height ) / event.naturalSize.width;
        if ( widestHeight > VIDEO_CONTAINER_HEIGHT ) {
            setvideoWidth( ( VIDEO_CONTAINER_HEIGHT * event.naturalSize.width ) / event.naturalSize.height )
            setvideoHeight( VIDEO_CONTAINER_HEIGHT )
        } else {
            setvideoWidth( DEVICE_WIDTH )
            setvideoHeight( ( DEVICE_WIDTH * event.naturalSize.height ) / event.naturalSize.width )
        }
    };

    const _onFullscreenUpdate = event => {
        console.log(
            `FULLSCREEN UPDATE : ${JSON.stringify( event.fullscreenUpdate )}`
        );
    };

    const _advanceIndex = ( forward ) => {
        setindex (( index + ( forward ? 1 : PLAYLIST.length - 1 ) ) % PLAYLIST.length)
    }

    const _updatePlaybackInstanceForIndex = async ( playing ) => {
        _updateScreenForLoading( true );

            setvideoWidth( DEVICE_WIDTH)
            setvideoHeight( VIDEO_CONTAINER_HEIGHT)

        _loadNewPlaybackInstance( playing );
    }

    const _onPlayPausePressed = () => {
        if ( playbackInstance != null ) {
            if ( isPlaying ) {
                playbackInstance.pauseAsync();
            } else {
                playbackInstance.playAsync();
            }
        }
    };

    const _onStopPressed = () => {
        if ( playbackInstance != null ) {
            playbackInstance.stopAsync();
        }
    };

    const _onForwardPressed = () => {
        if ( playbackInstance != null ) {
            _advanceIndex( true );
            _updatePlaybackInstanceForIndex( shouldPlay );
        }
    };

    const _onBackPressed = () => {
        if ( playbackInstance != null ) {
            _advanceIndex( false );
            _updatePlaybackInstanceForIndex( shouldPlay );
        }
    };

    const _onMutePressed = () => {
        if ( playbackInstance != null ) {
            playbackInstance.setIsMutedAsync( !muted );
        }
    };

    const _onLoopPressed = () => {
        if ( playbackInstance != null ) {
            playbackInstance.setIsLoopingAsync(
                loopingType !== LOOPING_TYPE_ONE
            );
        }
    };

    const _onVolumeSliderValueChange = value => {
        if ( playbackInstance != null ) {
            playbackInstance.setVolumeAsync( value );
        }
    };

    const _trySetRate = async ( rate, shouldCorrectPitch ) => {
        if ( playbackInstance != null ) {
            try {
                await playbackInstance.setRateAsync( rate, shouldCorrectPitch );
            } catch ( error ) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    const _onRateSliderSlidingComplete = async value => {
        _trySetRate( value * RATE_SCALE, shouldCorrectPitch );
    };

    const _onPitchCorrectionPressed = async value => {
        _trySetRate( rate, !shouldCorrectPitch );
    };

    const _onSeekSliderValueChange = value => {
        if ( playbackInstance != null && !isSeeking ) {
            setisSeeking( true);
            setshouldPlayAtEndOfSeek( shouldPlay);
            playbackInstance.pauseAsync();
        }
    };

    const _onSeekSliderSlidingComplete = async value => {
        if ( playbackInstance != null ) {
            setisSeeking( false);
            const seekPosition = value * playbackInstanceDuration;
            if ( shouldPlayAtEndOfSeek ) {
                playbackInstance.playFromPositionAsync( seekPosition );
            } else {
                playbackInstance.setPositionAsync( seekPosition );
            }
        }
    };

    const _getSeekSliderPosition = () => {
        if (
            playbackInstance != null &&
            playbackInstancePosition != null &&
            playbackInstanceDuration != null
        ) {
            return (
                playbackInstancePosition /
                playbackInstanceDuration
            );
        }
        return 0;
    }

    const _getMMSSFromMillis = ( millis ) => {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor( totalSeconds % 60 );
        const minutes = Math.floor( totalSeconds / 60 );

        const padWithZero = number => {
            const string = number.toString();
            if ( number < 10 ) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero( minutes ) + ":" + padWithZero( seconds );
    }

    const _getTimestamp = () =>  {
        if (
            playbackInstance != null &&
            playbackInstancePosition != null &&
            playbackInstanceDuration != null
        ) {
            return `${_getMMSSFromMillis(
                playbackInstancePosition
            )} / ${_getMMSSFromMillis( playbackInstanceDuration )}`;
        }
        return "";
    }

    const _onPosterPressed = () => {
        setposter( !poster );
    };

    const _onUseNativeControlsPressed = () => {
        setuseNativeControls( !useNativeControls );
    };

    const _onFullscreenPressed = () => {
        try {
            video.presentFullscreenPlayer();
        } catch ( error ) {
            console.log( error.toString() );
        }
    };

    // const _onSpeakerPressed = () => {
    //     setthroughEarpiece( !state.throughEarpiece)
    //         },
    //         ( { throughEarpiece } ) =>
    //             Audio.setAudioModeAsync( {
    //                 allowsRecordingIOS: false,
    //                 interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //                 playsInSilentModeIOS: true,
    //                 shouldDuckAndroid: true,
    //                 interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //                 playThroughEarpieceAndroid: throughEarpiece
    //             } )
    //     );
    // };

        return !fontLoaded ? (
            <View style={styles.emptyContainer} />
        ) : (
                <View style={styles.container}>
                    <View />
                    <View style={styles.nameContainer}>
                        <Text style={[styles.text,]}>
                            {playbackInstanceName}
                        </Text>
                    </View>
                    <View style={styles.space} />
                    <View style={styles.videoContainer}>
                        <Video
                            ref={_mountVideo}
                            style={[
                                styles.video,
                                {
                                    opacity: showVideo ? 1.0 : 0.0,
                                    width: videoWidth,
                                    height: videoHeight
                                }
                            ]}
                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                            onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
                            onLoadStart={_onLoadStart}
                            onLoad={_onLoad}
                            onError={_onError}
                            onFullscreenUpdate={_onFullscreenUpdate}
                            onReadyForDisplay={_onReadyForDisplay}
                            useNativeControls={useNativeControls}
                        />
                    </View>
                    <View
                        style={[
                            styles.playbackContainer,
                            {
                                opacity: isLoading ? DISABLED_OPACITY : 1.0
                            }
                        ]}
                    >

                        <View style={styles.timestampRow}>
                            <Text
                                style={[
                                    styles.text,
                                    styles.buffering,
                                ]}
                            >
                                {isBuffering ? BUFFERING_STRING : ""}
                            </Text>
                            <Text
                                style={[
                                    styles.text,
                                    styles.timestamp,
                                ]}
                            >
                                {_getTimestamp()}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.buttonsContainerBase,
                            styles.buttonsContainerTopRow,
                            {
                                opacity: isLoading ? DISABLED_OPACITY : 1.0
                            }
                        ]}
                    >
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onBackPressed}
                            disabled={isLoading}
                        >
                        <BackwardIcon />
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onPlayPausePressed}
                            disabled={isLoading}
                        >
                            <PlayIcon />
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onStopPressed}
                            disabled={isLoading}
                        >
                        <StopIcon/>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onForwardPressed}
                            disabled={isLoading}
                        >
                            <ForwardIcon/>
                        </TouchableHighlight>
                    </View>
                    <View
                        style={[
                            styles.buttonsContainerBase,
                            styles.buttonsContainerMiddleRow
                        ]}
                    >
                        <View style={styles.volumeContainer}>
                            <TouchableHighlight
                                underlayColor={BACKGROUND_COLOR}
                                style={styles.wrapper}
                                onPress={_onMutePressed}
                            >

<Text>>Insert mute </Text>
                            </TouchableHighlight>
<Text>>Insert Volume control </Text>
                        </View>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onLoopPressed}
                            >
                                <Text>>Insert Loop </Text>

                        </TouchableHighlight>
                    </View>
                    <View
                        style={[
                            styles.buttonsContainerBase,
                            styles.buttonsContainerBottomRow
                        ]}
                    >
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={() => _trySetRate( 1.0, shouldCorrectPitch )}
                        >
                            <View style={styles.button}>
                                <Text
                                    style={[styles.text]}
                                >
                                    Rate:
              </Text>
                            </View>
                        </TouchableHighlight>
                        <Text>Rate Slider</Text>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={_onPitchCorrectionPressed}
                        >
                            <View style={styles.button}>
                                <Text
                                    style={[styles.text,]}
                                >
                                    PC: {shouldCorrectPitch ? "yes" : "no"}
                                </Text>
                            </View>
                        </TouchableHighlight>
                        {/* <TouchableHighlight
                            onPress={_onSpeakerPressed}
                            underlayColor={BACKGROUND_COLOR}
                        >
                            <Text>Speaker</Text>
                        </TouchableHighlight> */}
                    </View>
                    <View />
                    {showVideo ? (
                        <View>
                            <View
                                style={[
                                    styles.buttonsContainerBase,
                                    styles.buttonsContainerTextRow
                                ]}
                            >
                                <View />
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={_onPosterPressed}
                                >
                                    <View style={styles.button}>
                                        <Text
                                            style={[styles.text,]}
                                        >
                                            Poster: {poster ? "yes" : "no"}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                <View />
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={_onFullscreenPressed}
                                >
                                    <View style={styles.button}>
                                        <Text
                                            style={[styles.text,]}
                                        >
                                            Fullscreen
                  </Text>
                                    </View>
                                </TouchableHighlight>
                                <View />
                            </View>
                            <View style={styles.space} />
                            <View
                                style={[
                                    styles.buttonsContainerBase,
                                    styles.buttonsContainerTextRow
                                ]}
                            >
                                <View />
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={_onUseNativeControlsPressed}
                                >
                                    <View style={styles.button}>
                                        <Text
                                            style={[styles.text,]}
                                        >
                                            Native Controls:{" "}
                                            {useNativeControls ? "yes" : "no"}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                <View />
                            </View>
                        </View>
                    ) : null}
                </View>
            );

}

const styles = StyleSheet.create( {
    emptyContainer: {
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    wrapper: {},
    nameContainer: {
        height: FONT_SIZE
    },
    space: {
        height: FONT_SIZE
    },
    videoContainer: {
        height: VIDEO_CONTAINER_HEIGHT
    },
    video: {
        maxWidth: DEVICE_WIDTH
    },
    playbackContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        // minHeight: ICON_THUMB_1.height * 2.0,
        // maxHeight: ICON_THUMB_1.height * 2.0
    },
    playbackSlider: {
        alignSelf: "stretch"
    },
    timestampRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        minHeight: FONT_SIZE
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "left",
        paddingLeft: 20
    },
    timestamp: {
        textAlign: "right",
        paddingRight: 20
    },
    button: {
        backgroundColor: BACKGROUND_COLOR
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonsContainerTopRow: {
        // maxHeight: ICON_PLAY_BUTTON.height,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0
    },
    buttonsContainerMiddleRow: {
        // maxHeight: ICON_MUTED_BUTTON.height,
        alignSelf: "stretch",
        paddingRight: 20
    },
    volumeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0
    },
    volumeSlider: {
        // width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
    },
    buttonsContainerBottomRow: {
        // maxHeight: ICON_THUMB_1.height,
        alignSelf: "stretch",
        paddingRight: 20,
        paddingLeft: 20
    },
    rateSlider: {
        width: DEVICE_WIDTH / 2.0
    },
    buttonsContainerTextRow: {
        maxHeight: FONT_SIZE,
        alignItems: "center",
        paddingRight: 20,
        paddingLeft: 20,
        minWidth: DEVICE_WIDTH,
        maxWidth: DEVICE_WIDTH
    }
} );
