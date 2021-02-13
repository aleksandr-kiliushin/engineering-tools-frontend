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

export type EquipDbDataArray = Array<ValveResData> | Array<BrainResData> | Array<PulseTubeResData>

export type EquipDbData = {
	cv_actuators      : Array<BrainResData>
	cv_valves         : Array<ValveResData>
	downstream_blocks : Array<BrainResData>
	dpr_blocks        : Array<BrainResData>
	pr_valves         : Array<ValveResData>
	pulse_tubes       : Array<PulseTubeResData>
	upstream_blocks   : Array<BrainResData>
} | null



export type GeneralParamType = {
	alias: string
	value: number
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
	aliases: {
		alias    : string
		brain    : string
		position : string
		valve    : string
	}
	brain     : BrainEquipState
	isMounted : number
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