import { SelectOptions, SpeedSelect, UseSelect, WhoSelect } from '@/shared/types/select.types';
import Select from 'react-select';
import { speedSelect } from '../constants/speed-options';
import { useSelect } from '../constants/use-options';
import { whoOptions } from '../constants/who-options';
import { SelectType } from '../types/feedback-types';


interface SelectFields {
    who: WhoSelect | null;
    ux: UseSelect | null;
    speed: SpeedSelect | null
}

interface RenderSelectProps {
    type: SelectType;
    filterIds: string;
    className?: string;
    valueFields: SelectFields,
    cb: (name: SelectType, value: string) => void
}


export const renderSelect = (props: RenderSelectProps) => {
    const { type, filterIds, className, valueFields, cb } = props;

    const selectOptions = {
        who: <Select<SelectOptions<WhoSelect>, false>
            options={whoOptions}
            className={className}
            isSearchable={false}
            name='who'
            placeholder="--Select option--"
            instanceId={filterIds}
            value={
                valueFields.who ?
                    whoOptions.find(o => o.value === valueFields.who)
                    : null
            }
            onChange={(option) => {
                if (option) cb('who', option.value)
            }}
        />,
        ux: <Select<SelectOptions<UseSelect>, false>
            options={useSelect}
            className={className}
            isSearchable={false}
            name='ux'
            placeholder="--Select option--"
            instanceId={filterIds}
            value={
                valueFields.ux ?
                    useSelect.find(o => o.value === valueFields.ux)
                    : null
            }
            onChange={(option) => {
                if (option) cb('ux', option.value)
            }}
        />,
        speed: <Select<SelectOptions<SpeedSelect>, false>
            options={speedSelect}
            className={className}
            isSearchable={false}
            name='speed'
            placeholder="--Select option--"
            instanceId={filterIds}
            value={
                valueFields.speed ?
                    speedSelect.find(o => o.value === valueFields.speed)
                    : null
            }
            onChange={(option) => {
                if (option) cb('speed', option.value)
            }}
        />
    }

    return selectOptions[type];
}