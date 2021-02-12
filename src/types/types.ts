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


export type GeneralParamsType = {
  [key: string]: {
    alias: string
    value: number
  }
}

export type StateType = {
  equip         : EquipType
  equipDbData   : EquipDbDataType
  generalParams : GeneralParamsType
  hoveredTarget : string
  isFetching    : boolean
}

export type EquipType = {
	[key: string]: {
		aliases: {
			alias       : string
			controlUnit : string
			position    : string
			valve       : string
		},
		controlUnit : any
		isMounted   : number
		valve       : any
	};
};