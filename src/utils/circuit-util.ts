import { EquipDbDataType, StateType, EquipType, EquipDbDataArrayType } from './../types/types';

const getPSat = (t: number) => {
	const pSatMap = new Map([
		[0, -0.99],  [1, -0.99],  [2, -0.99],  [3, -0.99],  [4, -0.99],  [5, -0.99],  [6, -0.99],  [7, -0.99],  [8, -0.99],
		[9, -0.99],  [10, -0.99], [11, -0.99], [12, -0.99], [13, -0.99], [14, -0.98], [15, -0.98], [16, -0.98], [17, -0.98],
		[18, -0.98], [19, -0.98], [20, -0.98], [21, -0.98], [22, -0.97], [23, -0.97], [24, -0.97], [25, -0.97], [26, -0.97],
		[27, -0.96], [28, -0.96], [29, -0.96], [30, -0.96], [31, -0.96], [32, -0.95], [33, -0.95], [34, -0.95], [35, -0.94],
		[36, -0.94], [37, -0.94], [38, -0.93], [39, -0.93], [40, -0.93], [41, -0.92], [42, -0.92], [43, -0.91], [44, -0.91],
		[45, -0.90], [46, -0.90], [47, -0.89], [48, -0.89], [49, -0.88], [50, -0.88], [51, -0.87], [52, -0.86], [53, -0.86],
		[54, -0.85], [55, -0.84], [56, -0.83], [57, -0.83], [58, -0.82], [59, -0.81], [60, -0.80], [61, -0.79], [62, -0.78],
		[63, -0.77], [64, -0.76], [65, -0.75], [66, -0.74], [67, -0.73], [68, -0.71], [69, -0.70], [70, -0.69], [71, -0.67],
		[72, -0.65], [73, -0.63], [74, -0.59], [75, -0.61], [76, -0.59], [77, -0.57], [78, -0.55], [79, -0.51], [80, -0.53],
		[81, -0.51], [82, -0.48], [83, -0.44], [84, -0.39], [85, -0.42], [86, -0.40], [87, -0.37], [88, -0.33], [89, -0.27],
		[90, -0.30], [91, -0.27], [92, -0.23], [93, -0.18], [94, -0.11], [95, -0.15], [96, -0.12], [97, -0.08], [98, -0.02],
		[99, 0.06],  [100, 0.01], [101, 0.05], [102, 0.10], [103, 0.17], [104, 0.27], [105, 0.21], [106, 0.25], [107, 0.31],
		[108, 0.38], [109, 0.49], [110, 0.43], [111, 0.48], [112, 0.55], [113, 0.63], [114, 0.76], [115, 0.69], [116, 0.75],
		[117, 0.83], [118, 0.93], [119, 1.08], [120, 0.99], [121, 1.06], [122, 1.15], [123, 1.26], [124, 1.44], [125, 1.34],
		[126, 1.41], [127, 1.50], [128, 1.62], [129, 1.80], [130, 1.70], [131, 1.78], [132, 1.88], [133, 2.02], [134, 2.23],
		[135, 2.11], [136, 2.20], [137, 2.32], [138, 2.47], [139, 2.70], [140, 2.57], [141, 2.68], [142, 2.81], [143, 2.99],
		[144, 3.26], [145, 3.11], [146, 3.24], [147, 3.39], [148, 3.60], [149, 3.92], [150, 3.74],
	]);
	return pSatMap.get(t) || 666
}


export const getNewUnitState = (currentId : number, dataArr: EquipDbDataArrayType, switchDirection: string) => {
	// Calculate a new id.
	let newId = 0
	if      (switchDirection === 'start') newId = 0
	else if (switchDirection === 'up')    newId = (currentId !== dataArr.length - 1) ? currentId + 1 : 0
	else if (switchDirection === 'down')  newId = (currentId !== 0)                  ? currentId - 1 : dataArr.length - 1
	// Return new unit state as the result.
	return {...dataArr[newId], id: newId,}
}


export const getDataArr = (equipDbData: EquipDbDataType, alias: string, object: 'valve' | 'controlUnit') => {
	if (object === 'valve') {
		return (['supCv', 'retCv',].includes(alias) ? equipDbData?.cv_valves : equipDbData?.pr_valves);
	} else if (object === 'controlUnit') {//change to brain
		if      (['downstream1', 'downstream2',].includes(alias)) return equipDbData?.downstream_blocks;
		else if (['upstream1', 'upstream2',].includes(alias))     return equipDbData?.upstream_blocks;
		else if (['supDpr', 'retDpr',].includes(alias))           return equipDbData?.dpr_blocks;
		else if (['supCv', 'retCv',].includes(alias))             return equipDbData?.cv_actuators;
	}
}


export const getStWithCalcs = (st: StateType, equipAliases: Array<string>) => {

	const t1    : number = st.generalParams.t1.value;
	const t2    : number = st.generalParams.t2.value;
	const p1    : number = st.generalParams.p1.value;
	const p2    : number = st.generalParams.p2.value;
	const p3    : number = st.generalParams.p3.value;
	const p8    : number = st.generalParams.p8.value;
	const p9    : number = st.generalParams.p9.value;
	const p10   : number = st.generalParams.p10.value;
	const g     : number = st.generalParams.g.value;
	const hexDp : number = st.generalParams.hexDp.value;

	const supCvDp  : number = (st.equip.supCv.isMounted) ? (g / st.equip.supCv.valve.kvs) ** 2 : 0;
	const retCvDp  : number = (st.equip.retCv.isMounted) ? (g / st.equip.retCv.valve.kvs) ** 2 : 0;
	const supDprDp : number = (st.equip.supDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;
	const retDprDp : number = (st.equip.retDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;

	const downstream1Dp : number = p1 - p2;
	const downstream2Dp : number = p2 - p3;
	const upstream1Dp   : number = p8 - p9;
	const upstream2Dp   : number = p9 - p10;

	const p4 : number = p3 - supDprDp;
	const p5 : number = p4 - supCvDp;
	const p6 : number = p5 - hexDp;
	const p7 : number = p6 - retCvDp;

	const pSatSup : number = getPSat(t1) || 999;
	const pSatRet : number = getPSat(t2) || 999;

	const downstream1DpMax = st.equip.downstream1.valve.z * (p1 - pSatSup);
	const downstream2DpMax = st.equip.downstream2.valve.z * (p2 - pSatSup);
	const supDprDpMax = st.equip.supDpr.valve.z * (p3 - pSatSup);
	const supCvDpMax = st.equip.supCv.valve.z * (p4 - pSatSup);
	const retCvDpMax = st.equip.retCv.valve.z * (p6 - pSatRet);
	const retDprDpMax = st.equip.retDpr.valve.z * (p7 - pSatRet);
	const upstream1DpMax = st.equip.upstream1.valve.z * (p8 - pSatRet);
	const upstream2DpMax = st.equip.upstream2.valve.z * (p9 - pSatRet);

	const downstream1V = g * (18.8 / st.equip.downstream1.valve.dn) ** 2;
	const downstream2V = g * (18.8 / st.equip.downstream2.valve.dn) ** 2;
	const supDprV = g * (18.8 / st.equip.supDpr.valve.dn) ** 2;
	const supCvV = g * (18.8 / st.equip.supCv.valve.dn) ** 2;
	const retCvV = g * (18.8 / st.equip.retCv.valve.dn) ** 2;
	const retDprV = g * (18.8 / st.equip.retDpr.valve.dn) ** 2;
	const upstream1V = g * (18.8 / st.equip.upstream1.valve.dn) ** 2;
	const upstream2V = g * (18.8 / st.equip.upstream2.valve.dn) ** 2;

	const supCvAuthority = (supCvDp / (supCvDp + hexDp)).toFixed(2);
	const retCvAuthority = (retCvDp / (retCvDp + hexDp)).toFixed(2);

	const dps    = [downstream1Dp,    downstream2Dp,    supDprDp,    supCvDp,    retCvDp,    retDprDp,    upstream1Dp,    upstream2Dp,   ];
	const dpMaxs = [downstream1DpMax, downstream2DpMax, supDprDpMax, supCvDpMax, retCvDpMax, retDprDpMax, upstream1DpMax, upstream2DpMax,];
	const vs     = [downstream1V,     downstream2V,     supDprV,     supCvV,     retCvV,     retDprV,     upstream1V,     upstream2V,    ];

	let refreshedEquip : EquipType = {};

	equipAliases.forEach((alias, i) => {
		const newItem = {
			...st.equip[alias],
			valve: {...st.equip[alias].valve, dp: dps[i], dpMax: dpMaxs[i], v: vs[i],},
		};
		if ([0, 1, 6, 7,].includes(i)) newItem.isMounted = dps[i];
		refreshedEquip[alias] = newItem;
	})

	refreshedEquip.supCv.valve.authority = supCvAuthority;
	refreshedEquip.retCv.valve.authority = retCvAuthority;

	return {
		...st,
		equip: refreshedEquip,
		generalParams: {
			...st.generalParams,
			p4: {...st.generalParams.p4, value: p4,},
			p5: {...st.generalParams.p5, value: p5,},
			p6: {...st.generalParams.p6, value: p6,},
			p7: {...st.generalParams.p7, value: p7,},
		},
	};
}