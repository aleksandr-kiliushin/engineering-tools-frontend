import * as axios from "axios";

const instance = axios.create({
	baseURL: 'https://oaiyuiapi.herokuapp.com/api/',
});

export const circuitApi = {
	async getEquipDbData() {
		const response = await instance.get('equipments/');
		return response.data;
	},
	async downloadCp(mountedUnitsCodes) {
		const response = await instance.post('downloadcp/', mountedUnitsCodes, {responseType: 'blob',});
		return response.data;
	},
};