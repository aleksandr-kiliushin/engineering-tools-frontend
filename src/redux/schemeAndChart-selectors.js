export const getUnitsListSelector = (state) => {
	const equip = state.schemeAndChart.equip;
	return [
	  equip.downstream1,
		equip.downstream2,
		equip.supDpr,
		equip.supCv,
		equip.retCv,
		equip.retDpr,
		equip.upstream1,
		equip.upstream2,
	];
}

export const getGeneralParamsListSelector = (state) => {
	const generalParams = state.schemeAndChart.generalParams;
	return [
		generalParams.g,
		generalParams.hexDp,
		generalParams.p1,
		generalParams.p2,
		generalParams.p3,
		generalParams.p4,
		generalParams.p5,
		generalParams.p6,
		generalParams.p7,
		generalParams.p8,
		generalParams.p9,
		generalParams.p10,
		generalParams.t1,
		generalParams.t2,
	];
}