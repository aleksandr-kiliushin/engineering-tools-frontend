// type EquipDbArrayUnitType = {
//   code            : string
//   dn             ?: number
//   equip_type      : string
//   full_title     ?: string
//   kvs            ?: number
//   price           : number
//   type_title     ?: string
//   z              ?: number
//   discount_group  : string
// }

export type EquipDbDataArrayType = any//Array<EquipDbArrayUnitType>//

export type EquipDbDataType = {
	[key: string]: EquipDbDataArrayType
} | null

export type GeneralParamType = {
	alias: string
	value: number
}

export type GeneralParamsType = {
  [key: string]: GeneralParamType
}

export type StateType = {
  equip         : EquipType
  equipDbData   : EquipDbDataType
  generalParams : GeneralParamsType
  hoveredTarget : string | null
  isFetching    : boolean
}

export type EquipUnitType = {
	aliases: {
		alias       : string
		controlUnit : string
		position    : string
		valve       : string
	}
	controlUnit : any
	isMounted   : number
	valve       : any
}

export type EquipType = {
	[key: string]: EquipUnitType
}