import * as axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:8000/api/',});

export const circuitApi = {
	getEquipDbData() {
		return instance.get('equipments/').then(response => response.data);
	},
	downloadCp(mountedUnitsCodes) {
		return axios({
			url: 'http://localhost:8000/api/downloadcp/',
			method: 'POST',
			responseType: 'blob',
			data: mountedUnitsCodes,
		}).then(response => response.data);
	},
};