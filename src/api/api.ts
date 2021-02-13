import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://oaiyui.herokuapp.com/api/',
	// baseURL: 'http://localhost:8000/api/',
})


export type ResponseType<D = {}> = {
  config     : any
	data       : D
	headers    : any
	request    : any
	status     : number
	statusText : string
}