import { Statuses } from './evaTypes';

import { Collection, Document, Mode }
    from "firestorter";
import moment from "moment";
import { Flo, day } from "./store";

export type TimeReviewType = 'morningAffirmation' |'morningYoga' |'wimViz' |'morningHygiene' |'magicMirror' |'winnersWrath' |'pathrise' |'meditate' |'nightYoga' |'nightHygiene' |'improvements' |'nightAffirmation';
export type WorkoutTrackerType ='hyperbolicTimeChamber' |'bboyGainz' |'seppuku'
export type SmartBlogType = 'powerPages' | 'superLearning' | 'tku' | 'powerHour' | 'creativeFlex'
export type InputListType = 'gratitudeList' | 'greatDay' | 'banqIdeas' | 'highlights'
export type FloType = WorkoutTrackerType | SmartBlogType | InputListType | TimeReviewType
export const morningFloTasks  : FloType[] =['gratitudeList', 'greatDay', 'morningAffirmation', 'morningYoga', 'wimViz', 'seppuku', 'morningHygiene', 'magicMirror', 'winnersWrath', 'powerPages']
export const grindFloTasks: FloType[] = ['pathrise', 'superLearning', 'meditate', 'hyperbolicTimeChamber', 'banqIdeas', 'tku', ]
export const nightFloTasks : FloType[] = ['creativeFlex', 'powerHour', 'nightHygiene', 'highlights', 'improvements', 'bboyGainz', 'nightYoga', 'nightAffirmation', ]
export const timeReviewTypesList: FloType[] =['morningAffirmation' ,'morningYoga' ,'wimViz' ,'morningHygiene' ,'magicMirror' ,'winnersWrath' ,'pathrise' ,'meditate' ,'nightYoga' ,'nightHygiene' ,'improvements' ,'nightAffirmation'];
export const workoutTrackerTypesList: FloType[] = ['hyperbolicTimeChamber', 'bboyGainz', 'seppuku']
export const smartBlogTypesList: FloType[] =['powerPages' ,'superLearning' ,'tku' ,'powerHour' ,'creativeFlex']
export const selectTitle: FloType[] =['hyperbolicTimeChamber', 'bboyGainz' ,'tku' ,'powerHour' ]
export const inputListTypesList: FloType[] = ['gratitudeList', 'greatDay', 'banqIdeas', 'highlights']




export interface SmartBlogItem {
    title: string;
    description: string;
}



export interface SmartBlogProps extends FloInputProps {
}

export interface TimeReviewData {
    title: string;
    description: string;
    rating: number;
}
export interface  TimeReviewProps extends FloInputProps {
    // goToFlo: ( dayId: string) => void;
}
export type InputDataState = ReviewData
export type SmartBlogSectionType = 'title' | 'expandableTextArea' | 'actionItems' | 'bigTakeAway'
export interface SmartBlogListItem {
    item: SmartBlogSectionType;
    index: number;
}
export interface ActionItem {
    actionPlan: string;
    impact: number;

}
export interface SmartBlogData {
    title: string;
    blog: string;
    actionItems: ActionItem[];
    bigTakeAway: string;

}
export type BBoyGainzType = 'Gainz36' | 'Body Weight Beast'
export type HTCType = 'Sacrifical Calves' | 'Handstand Progression'
export interface WorkoutTrackerData {
    workoutType: HTCType | BBoyGainzType;
    description: string;
    workoutStats: {};
    postWorkoutFeels: number;
}
export interface WorkoutTrackerProps {
    floType: WorkoutTrackerType;
    // goToFlo: ( dayId: string) => void;
}

export type LabelMap = {
    [key in FloType]?: string;
};
export const descriptionLabelObj: LabelMap = {
    gratitudeList: "Why is it so great?",
    highlights: "Why was it dope?",
    greatDay: "What would it mean for this to happen?",
    banqIdeas: "What's the elevator pitch",
}

export const titleLabelObj: LabelMap = {
    gratitudeList: "Grateful for...",
    highlights: "So what had happened was...",
    greatDay: "Today would trill if...",
    banqIdeas: "{inital of BANQ tech used} : {Idea}",
}

export type WorkoutTypeMap = {
        [key in WorkoutTrackerType]: string;
    };

export type WorkoutTypeRenderMap = {
        [key in WorkoutTrackerType]: JSX.Element;
    };
  export  const emoMap: WorkoutTypeMap = {
        bboyGainz: '🤸🏿‍♂️💪🏿',
        hyperbolicTimeChamber: '⏳💪🏿',
        seppuku: '🐱‍👤💪🏿',
    }


export interface InputListProps extends FloInputProps {
}

export type InputListData = InputListItemStruct[]

export type SmartBlogLayout = SmartBlogSectionType[]
export const fullLayout: SmartBlogLayout = ['title', 'expandableTextArea', 'actionItems', 'bigTakeAway']
export const basicLayout: SmartBlogLayout = ['title', 'expandableTextArea']
export interface TodoType {
	finished?: boolean;
	text: string;
}



export interface ReviewData {
    title: string;
    description: string;
    rating: number;
}
export interface ReviewProps extends FloInputProps {
    floType: TimeReviewType;
    flo: Flo;
    reviewDescriptions: string[];
    // goToFlo: ( dayId: string) => void;
}
export const defaultDescriptions = ['Eh😎', 'Chill🍩', 'Dope🤖', 'Trill🚀 ', '🔥Lit🔥']

export interface DayType {
	dayId: string;
	day: string;
	day_num: number;
	water_counter: number;
	wakeUp: string;
	goToSleep: string;
    timeAsleep: number;
    mindful_mins: number;
	mantra_counter: number;
	completed: FloType[];

}
export interface RoutineType {
	dayId: string;
	routineId: string;
	routineType: string;
	userId: string;
}
export type DayTimeType = 'morning' | 'grind' | 'night';
export interface FloStruct {
    dayId: string;
    floId: string;
    floType: FloType;
    dayType: DayTimeType;
    userId: string;
    completed: boolean;
    startTime: string;
    endTime: string;
    duration: number;
}
export interface SmartBlogFloStruct  {
    title: string;
    description: string;
    blog: string;
    actionItems: ActionItem[];
    bigTakeAway: string;
}
export interface TimeReviewFloStruct  {
    title: string;
    description: string;
    rating: number;
}
export interface WorkoutTrackerFloStruct  {
    workoutType: WorkoutType;
    description: string;
    workoutStats: {};
    postWorkoutFeels: number;
}
export interface InputListFloStruct  {
    inputList: InputListData;
}
export interface DayTrackerProps {
}

export interface InputListItemStruct {
    title: string;
    description: string;
}
export interface ActionItemStruct {
    actoinPlan: string;
    impact: number;
}
export interface InputListItemProps {
    titleLabel: string;
    data: InputListItemStruct;
    descriptionLabel: string;
    inputId: number;
    flo: Flo;
}
export interface SuperFlo extends FloStruct, InputListFloStruct , SmartBlogFloStruct, TimeReviewFloStruct, WorkoutTrackerFloStruct{ }


type FloGenData = {
    floId: string;
    floType: FloType;
    dayType: DayTimeType;
    dayId: string;
}

export interface FloInputProps {
    floType: FloType;
    flo: Flo;
    save: boolean;

}


export interface TimeLog  {
    startTime: string;
    endTime: string;
    duration: number;
}
export interface TimeTrackerProps {
    floType: FloType;
    flo: Flo
}
    // TODO use moment to generate a more dynamic week list
    export const weekList = [...Array( 7 ).fill(1)].map( ( _, i ) => moment().startOf('week').add( i, 'd' ).format( 'YYYY-MM-DD' ) )

export const tkuMap = {
    Monday: 'Self Driving Car (SDC 472)',
    Tuesday: 'Product Management (PM 360)',
    Wednesday: 'Blockchain Development (BCD 420)',
    Thursday: 'User Experience Design (UXD 293)',
    Friday: 'React, Redux & React Native (RRR 333)',
    Saturday: 'Digital Marketing (DM 215)',
    Sunday: 'AI for Trading (AIT 417)',
}

export const hyperbolicTimeChamberMap = {
    Monday: 'Gainz36',
    Tuesday: 'Body Weight Beast',
    Wednesday: 'Gainz36',
    Thursday: 'Body Weight Beast',
    Friday: 'Gainz36',
    Saturday: 'Body Weight Beast',
    Sunday: 'Active Recovery',
}

export const bboyGainzMap = {
    Monday: 'Handstand Progression',
    Tuesday: 'Sacrificial Calves',
    Wednesday: 'Handstand Progression',
    Thursday: 'Sacrificial Calves',
    Friday: 'Handstand Progression',
    Saturday: 'Sacrificial Calves',
    Sunday: 'Active Recovery',
}
export const powerHourMap = {
    Monday: 'Mastery',
    Tuesday: 'Think and Grow Ricj',
    Wednesday: '4 Hour Work Week',
    Thursday: 'Magic of Thinking BIG',
    Friday: 'MAKE',
    Saturday: 'Running Lean',
    Sunday: 'The Power of Now',
}


interface agenda {
    tku: string,
    bbg: string,
    htc: string,
    ph: string,

}
export const getAgenda = ( dayId: string = moment().format('YYYY-MM-DD') ) => {
    return {
    tku: tkuMap[moment(dayId).format( 'dddd' )],
    htc: hyperbolicTimeChamberMap[moment(dayId).format( 'dddd' )],
    bbg: bboyGainzMap[moment(dayId).format( 'dddd' )],
    ph: powerHourMap[moment(dayId).format( 'dddd' )],

    }
}

export const randomStatus:Statuses[] = ['success', 'warning', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', 'success', 'warning', 'info', 'danger', ]


 export   const bwbFlo = [
        {
            name: "set 1"
        },
        {
            name: "set 2"
        },
        {
            name: "set 3"
        },
        {
            name: "set 4"
        },
        {
            name: "set 5"
        },
        {
            name: "set 6"
        },
    ]
 export   const gainz36Flo: GainzFloList = [
        {
            name: "Shoulders",
            list: [
                'Hi-Claps',
                'Forward Circles',
                'Backward Circles',
                'Pike Pushups',
                'Elevated Pike Pushups',
                'Wall Walk',
            ]
        },
        {
            name: "Arms",
            list: [
                '1-🦾 Pushup (👈🏿)',
                '1-🦾 Pushup (👉🏿)',
                '1-🦾 Tri-Ext (👈🏿)',
                '1-🦾 Tri-Ext (👉🏿)',
                'Forward Lean Pushups',
                'Plank2Push',
            ]
        },
        {
            name: "Abs",
            list: [
                'L-Sit',
                'Hollow Body 🚲',
                'Hollow Body ✂',
                'V-Crunch',
                'Star Crunch (LHRF)',
                'Star Crunch (RHLF)',
            ]
        },
        {
            name: "Obliques",
            list: [
                'Side Plank Thrust (👈🏿)',
                'Side Plank Thrust (👉🏿)',
                'Elbow2Knee Crunch (👈🏿)',
                'Elbow2Knee Crunch (👉🏿)',
                'Rotating Side Crunch (👈🏿)',
                'Rotating Side Crunch (👉🏿)',
            ]
        },
        {
            name: "Buns",
            list: [
                'Donkey Kick (👈🏿)',
                'Donkey Kick (👉🏿)',
                '🔥 Hydrant (👈🏿)',
                '🔥 Hydrant (👉🏿)',
                '🦿 Ext Hip Thrust (👈🏿)',
                '🦿 Ext Hip Thrust (👉🏿)',

            ]
        },
        {
            name: "Trunks",
            list: [
                '🔫 Squat (👈🏿)',
                '🔫 Squat (👉🏿)',
                '1-🦿 Deadlift (👈🏿)',
                '1-🦿 Deadlift (👉🏿)',
                'Pulse Lunge (👈🏿)',
                'Pulse Lunge (👉🏿)',
            ]
        },
    ]

  export  interface BwB {
    name: string;
    sets: number[]
}

export interface BwBProps {
    item: BwB;
    name: string;
    index: number;
}

export interface BwBWorkoutStats {
    sets: BwB[];

}
  export   const seppukuLaps = [
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
        { text: '7' },
        { text: '8' },
        { text: '9' },
        { text: '10' },
        { text: '11' },
        { text: '12' },
    ];

  export  interface GainzFlo {
        name: string;
        list: string[];
    }
export    type GainzFloList = GainzFlo[]

  export  const seppukuFlo = ['Toe Grab & Go', 'Knee2Ankle Pull', 'Hi-Kickback', 'Crossover', 'Side Lunge', 'Lunge Twist', 'Hurdle Walk', 'FWF Lateral', 'FWF Forward', 'FWF Alternate',]
  export  const calfFlo = ['Inner Toe', 'Outer Toe', 'Inner Toe (Slow)', 'Outer Toe (Slow)', 'Left Toe', 'Right Toe', 'Raise and Hold']

export const todayNum = moment().weekday()