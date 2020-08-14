import { Icon, AnimationConfig } from '@ui-kitten/components'
import React from 'react';

// tODO wrap with touchable highlight or opaaity

const animationConfig: AnimationConfig = {
    isInteraction: true,
    cycles: 4,

}
export const SunIcon = ( style ) => (
    <Icon {...style} name='sun-outline' />
);

export const FlashIcon = ( style ) => (
    <Icon {...style} name='flash-outline' />
);

export const MoonIcon = ( style ) => (
    <Icon {...style} name='moon-outline' />
);

export const CalendarIcon = ( style ) => (
    <Icon {...style} name='calendar-outline' />
);
export const ListIcon = ( style ) => (
    <Icon {...style} name='list-outline' />
);
export const ActivityIcon = ( style ) => (
    <Icon {...style} name='activity-outline' />
);
export const ArrowLeftIcon = ( style  ) => (
    <Icon {...style} animation="pulse"  name='arrow-circle-left-outline' />
);
export const ArrowRightIcon = ( style) => (
    <Icon {...style} animation="pulse"  name='arrow-circle-right-outline' />
);
export const PlayIcon = ( style) => (
    <Icon {...style} name='play-circle' />
);
export const PauseIcon = ( style) => (
    <Icon {...style} name='pause-circle' />
);
export const StopIcon = ( style) => (
    <Icon {...style} name='stop-circle'  />
);
export const SaveIcon = ( style) => (
    <Icon {...style} name='save'  />
);
export const ForwardIcon = ( style) => (
    <Icon {...style} name='skip-forward-outline'  />
);
export const BackwardIcon = ( style) => (
    <Icon {...style} name='skip-back-outline'  />
);
export const WaterIcon = ( style) => (
    <Icon {...style} name='droplet-outline'  />
);
export const EyeIcon = ( style) => (
    <Icon {...style} name='eye-outline'  />
);
export const MindfulIcon = ( style) => (
    <Icon {...style} name='twitter-outline'  />
);
export const GainsIcon = ( style) => (
    <Icon {...style} name='shield-outline'  />
);
export const ChargeIcon = ( style) => (
    <Icon {...style} name='charging-outline'  />
);
export const MantraIcon = ( style) => (
    <Icon {...style} name='sync'  />
);
export const ToDoIcon = ( style) => (
    <Icon {...style} name='flash-outline'  />
);
export const IncompleteIcon = ( style) => (
    <Icon {...style} name='unlock-outline'  />
);
export const DoneIcon = ( style) => (
    <Icon {...style} name='flash'  />
);
export const ExpandIcon = ( style) => (
    <Icon {...style} name='expand'  />
);
export const HeartIcon = ( style) => (
    <Icon {...style} name='heart-outline'  />
);
export const GlobeIcon = ( style) => (
    <Icon {...style} name='globe-2-outline'  />
);
export const SkillIcon = ( style) => (
    <Icon {...style} name='award-outline'  />
);
export const PaidIcon = ( style) => (
    <Icon {...style} name='briefcase-outline'  />
);
export const ShuffleIcon = ( style) => (
    <Icon {...style} name='shuffle-2-outline' />
);
export const PlusIcon = ( style) => (
    <Icon {...style} name='plus-square' />
);

export interface GenericIconProps {
    name: string;
}
export const GenericIcon: React.FC<GenericIconProps> = ( {name} ) => (
    <Icon  name={`${name}-outline`} />
);


