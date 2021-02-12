import { EquipDbDataType } from './../types/types'
import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://oaiyui.herokuapp.com/api/',
	// baseURL: 'http://localhost:8000/api/',
})


type GetEquipDbDataResponse = {
	config     : any
	data       : EquipDbDataType
	headers    : any
	request    : any
	status     : number
	statusText : string
}


export const circuitApi = {
	async getEquipDbData() {
		const response = await instance.get<GetEquipDbDataResponse>('equipments/')
		return response.data
	},
	async downloadCp(mountedUnitsCodes: Array<string>) {
		const response = await instance.post('downloadcp/', mountedUnitsCodes, {responseType: 'blob'})
		return response.data
	},
}