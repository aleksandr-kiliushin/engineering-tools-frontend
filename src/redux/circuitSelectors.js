export const selectMountedUnitsCodes = (state) => {
	const unitsList         = Object.values(state.schemeAndChart.equip);
	const mountedUnitsList  = unitsList.filter((unit) => unit.isMounted);
	const mountedUnitsCodes = [];
	for (const unit of mountedUnitsList) {
		mountedUnitsCodes.push(unit.valve.code, unit.controlUnit.code)
	};
	return mountedUnitsCodes;
};