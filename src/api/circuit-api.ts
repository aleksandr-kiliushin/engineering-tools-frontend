import {saveAs} from 'file-saver'
import { instance } from './api';
import { EquipDbData } from './../types/types'


export const circuitApi = {
	async getEquipDbData() {
		const response = await instance.get<EquipDbData>('equipments/')
		return response.data
	},
	async downloadCp(mountedUnitsCodes: string[]) {
		const response = await instance.post('downloadcp/', mountedUnitsCodes, {responseType: 'blob'})
  	saveAs(response.data, 'cp.xlsx')
	},
}