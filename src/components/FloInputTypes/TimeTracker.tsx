import React from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
} from '@ui-kitten/components';
import { observer } from 'mobx-react'
import moment from 'moment'
import { TimeTrackerProps } from '../../types';


const TimeTracker = ( props: TimeTrackerProps ) => {
    const { floType, flo } = props;
    const [startTime, setStartTime] = React.useState<moment.Moment>( moment() );
    const [endTime, setEndTime] = React.useState<moment.Moment>( moment() );
    const [duration, setDuration] = React.useState( 0 );
    const [timerAcive, settimerAcive] = React.useState( false );
    const [start, setstart] = React.useState( false );
    const [end, setend] = React.useState( false );
    const [done, setDone] = React.useState( false );
    const [timer, setTimer] = React.useState<NodeJS.Timeout>( null );

    const startTimer = () => {
        duration == 0 && setStartTime( moment() )
        setTimer( setInterval( timerUpdate, 1000 ) );
        setstart( true )
        settimerAcive( !timerAcive )
        setDone( false )
    }

    const timerUpdate = () => setDuration( duration + 1 )

    const reset = () => setDuration( 0 )

    const stopTimer = () => {
        clearInterval( timer )
        settimerAcive( !timerAcive )
        setEndTime( moment() )
        setDone( true )
        flo.update( {
            startTime: startTime.format( 'hh:mm:ss' ),
            endTime: startTime.add( duration, 'seconds' ).format( 'hh:mm:ss' ),
            duration
        } )
    }

    const converter = ( seconds: number ) => {
        const duration = moment.duration( seconds, 'seconds' );
        const hours = duration.get( 'hours' ) < 10 ? `0${duration.get( 'hours' )}` : duration.get( 'hours' );
        const minutes = duration.get( 'minutes' ) < 10 ? `0${duration.get( 'minutes' )}` : duration.get( 'minutes' );
        const sec = duration.get( 'seconds' ) < 10 ? `0${duration.get( 'seconds' )}` : duration.get( 'seconds' );
        return `${hours}:${minutes}:${sec}`
    }

    const Header = () => (
        <CardHeader title={`${start ? startTime.format( 'hh:mm:ss' ) : "00:00:00"}-${done ? endTime.format( 'hh:mm:ss' ) : "00:00:00"} (${converter( duration )})`} />
    )

    return (
        <>
            <Card header={Header} style={{ width: 350 }} status={!timerAcive ? "basic" : duration % 2 == 1 ? "success" : "danger"}>
                <ButtonGroup size="small" status={!timerAcive ? "success" : "danger"} >
                    <Button disabled={timerAcive} status="success" onPress={startTimer}>{!timerAcive ? "Start Timer" : converter( duration )}</Button>
                    <Button disabled={!timerAcive} status="danger" onPress={stopTimer}>Stop Timer</Button>
                    <Button disabled={!done} status="danger" onPress={reset}>Reset</Button>
                </ButtonGroup>
            </Card>
        </>
    )
}

export default observer( TimeTracker );