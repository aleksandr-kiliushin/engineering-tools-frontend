import { RootState } from './store'

export const selectMountedUnitsCodes = (state: RootState) => {
	const unitsList = Object.values(state.circuit.equip)
	const mountedUnitsList = unitsList.filter((unit) => unit.valve.dp)
	const mountedUnitsCodes: string[] = []
	mountedUnitsList.forEach((unit) => {
		mountedUnitsCodes.push(unit.valve.code, unit.brain.code)
	})
	return mountedUnitsCodes
}