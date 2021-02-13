import { instance, ResponseType } from './api';
import { EquipDbDataType } from './../types/types'

type GetEquipDbDataResponseType = {
	data: EquipDbDataType
}

export const circuitApi = {
	async getEquipDbData() {
		const response = await instance.get<ResponseType<GetEquipDbDataResponseType>>('equipments/')
		return response.data
	},
	async downloadCp(mountedUnitsCodes: Array<string>) {
		const response = await instance.post('downloadcp/', mountedUnitsCodes, {responseType: 'blob'})
		return response.data
	},
}