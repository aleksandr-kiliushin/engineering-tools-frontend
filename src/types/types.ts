interface EquipItemResData {
	code  : string
	price : number
}
export interface ValveResData extends EquipItemResData {
	dn         : number
	equip_type : 'cv_valve' | 'pr_valve'
	kvs        : number
	type_title : 'VFM2' | 'VFG2'
	z          : number
}
export interface BrainResData extends EquipItemResData {
	equip_type : 'cv_actuator' | 'downstream_block' | 'dpr_block' | 'upstream_block'
	full_title : string
}
export interface PulseTubeResData extends EquipItemResData {
	equip_type : 'pulse_tube'
	full_title : string
}

export type EquipDbDataArray = ValveResData[] | BrainResData[] | PulseTubeResData[]

export type EquipDbData = {
	cv_actuators      : BrainResData[]
	cv_valves         : ValveResData[]
	downstream_blocks : BrainResData[]
	dpr_blocks        : BrainResData[]
	pr_valves         : ValveResData[]
	pulse_tubes       : PulseTubeResData[]
	upstream_blocks   : BrainResData[]
} | null



export type GeneralParamType = {
	alias: string
	value: string
}
export type GeneralParamsType = {
  [key: string]: GeneralParamType
}



export interface ValveEquipState extends ValveResData {
	id        : number
	dp        : number
	dpMax     : number
	v         : number
	authority?: string
}
export interface BrainEquipState extends BrainResData {
	id: number
}
export type EquipUnitState = {
	alias    : EquipAlias
	position : PositionAlias
	brain     : BrainEquipState
	valve     : ValveEquipState
}
export type EquipState = {
	[key: string]: EquipUnitState
}

export type CircuitState = {
  equip        : EquipState
  equipDbData  : EquipDbData
  generalParams: GeneralParamsType
  hoveredTarget: string | null
  isFetching   : boolean
}


export type ObjectToSwitch = 'valve' | 'brain'
export type SwitchDirection = 'down' | 'up' | 'start'


const equipAliases = ['downstream1', 'downstream2', 'supDpr', 'supCv', 'retCv', 'retDpr', 'upstream1', 'upstream2'] as const
export type EquipAlias = typeof equipAliases[number]
const positionAliases = ['Downstream 1', 'Downstream 2', 'Supply DPR', 'Supply CV', 'Return CV', 'Return DPR', 'Upstream 1', 'Upstream 2'] as const
export type PositionAlias = typeof positionAliases[number]







// type EquipItemResData<D = never, E = never, F = never, K = never, T = never, Z = never> = {
// 	code           : string
// 	price          : number
// 	dn            ?: D
// 	equip_type    ?: E
// 	full_title    ?: F
// 	kvs           ?: K
// 	type_title    ?: T
// 	z             ?: Z
// }
// export type ValveResData = EquipItemResData<number, 'cv_valve' | 'pr_valve', never, number, 'VFM2' | 'VFG2', number>
// export type BrainResData = EquipItemResData<never, 'cv_actuator' | 'downstream_block' | 'dpr_block' | 'upstream_block', string>
// type PulseTubeResData = EquipItemResData<never, 'pulse_tube', string>