import * as axios from "axios";

const instance = axios.create({
	baseURL: 'https://oaiyuiapi.herokuapp.com/api/',
});

export const circuitApi = {
	getEquipDbData() {
		return instance.get('equipments/').then(response => response.data);
	},
	downloadCp(mountedUnitsCodes) {
		return instance.post('downloadcp/', mountedUnitsCodes, {responseType: 'blob',}).then(response => response.data);
	},
};