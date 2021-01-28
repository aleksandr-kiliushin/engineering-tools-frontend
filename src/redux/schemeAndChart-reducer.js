const CHANGE_GENERAL_PARAM  = 'CHANGE_GENERAL_PARAM';
const CHANGE_HOVERED_TARGET = 'CHANGE_HOVERED_TARGET';
const SWITCH_MODEL          = 'SWITCH_MODEL';

const initialPrValveState     = {code: '', dn: 0, dp: 0, dpMax: 0, id: 0, kvs: 0, price: 0, type: '', v: 0, z: 0,};
const initialCvValveState     = {...initialPrValveState, authority: 0,};
const initialControlUnitState = {code: '', id: 0, model: '', price: 0,};

const initialState = {
  dataArrays: {
    cvValves: [
      // API returns a variant with valve_type.
      {id: 1,  code: '065B3050', dn: 15,  kvs: 0.25, price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 2,  code: '065B3051', dn: 15,  kvs: 0.4,  price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 3,  code: '065B3052', dn: 15,  kvs: 0.63, price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 4,  code: '065B3053', dn: 15,  kvs: 1,    price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 5,  code: '065B3054', dn: 15,  kvs: 1.6,  price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 6,  code: '065B3055', dn: 15,  kvs: 2.5,  price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 7,  code: '065B3056', dn: 15,  kvs: 4,    price: 353.43,   type: 'VFM2', z: 0.5, },
      {id: 8,  code: '065B3057', dn: 20,  kvs: 6.3,  price: 383.61,   type: 'VFM2', z: 0.5, },
      {id: 9,  code: '065B3058', dn: 25,  kvs: 10,   price: 387.30,   type: 'VFM2', z: 0.5, },
      {id: 10, code: '065B3059', dn: 32,  kvs: 16,   price: 442.21,   type: 'VFM2', z: 0.5, },
      {id: 11, code: '065B3060', dn: 40,  kvs: 25,   price: 544.00,   type: 'VFM2', z: 0.5, },
      {id: 12, code: '065B3061', dn: 50,  kvs: 40,   price: 665.10,   type: 'VFM2', z: 0.5, },
      {id: 13, code: '065B3500', dn: 65,  kvs: 63,   price: 1159.05,  type: 'VFM2', z: 0.45,},
      {id: 14, code: '065B3501', dn: 80,  kvs: 100,  price: 1383.25,  type: 'VFM2', z: 0.4, },
      {id: 15, code: '065B3502', dn: 100, kvs: 160,  price: 2167.15,  type: 'VFM2', z: 0.35,},
      {id: 16, code: '065B3503', dn: 125, kvs: 250,  price: 2388.16,  type: 'VFM2', z: 0.35,},
      {id: 17, code: '065B3504', dn: 150, kvs: 400,  price: 2478.23,  type: 'VFM2', z: 0.35,},
      {id: 18, code: '065B3505', dn: 200, kvs: 630,  price: 10621.73, type: 'VFM2', z: 0.25,},
      {id: 19, code: '065B3506', dn: 250, kvs: 900,  price: 14086.47, type: 'VFM2', z: 0.21,},
    ],
    downstreamBlocks: [
      {id: 1, code: '003G1006', model: 'AFD 0.05..0.35', price: 1317.15},
      {id: 2, code: '003G1004', model: 'AFD 0.1..0.7',   price: 719.20 },
      {id: 3, code: '003G1005', model: 'AFD 0.15..1.5',  price: 719.20 },
      {id: 4, code: '003G1003', model: 'AFD 0.5..3',     price: 655.30 },
      {id: 5, code: '003G1002', model: 'AFD 1..6',       price: 655.30 },
      {id: 6, code: '003G1001', model: 'AFD 3..12',      price: 655.30 },
      {id: 7, code: '003G1000', model: 'AFD 8..16',      price: 996.06 },
    ],
    dprBlocks: [
      {id: 1, code: '003G1018', model: 'AFP 0.05..0.35', price: 1518.66,},
      {id: 2, code: '003G1017', model: 'AFP 0.1..0.7',   price: 1012.42,},
      {id: 3, code: '003G1016', model: 'AFP 0.15..1.5',  price: 1012.42,},
      {id: 4, code: '003G1015', model: 'AFP-09 0.5..3',  price: 1012.42,},
      {id: 5, code: '003G1014', model: 'AFP-09 1..6',    price: 1012.42,},
    ],
    drives: [
      {id: 1, code: '082G6007', model: 'ARV152 230/pulse',    price: 564.01,},
      {id: 2, code: '082G6008', model: 'ARV152 24/pulse',     price: 564.01,},
      {id: 3, code: '082G6015', model: 'ARV152 24/an',        price: 638.39,},
      {id: 4, code: '082G6011', model: 'ARV153 230/pulse',    price: 719.67,},
      {id: 5, code: '082G6012', model: 'ARV153 24/pulse',     price: 719.67,},
      {id: 6, code: '082G6017', model: 'ARV153 24/an',        price: 815.61,},
      {id: 7, code: '082G3443', model: 'AME655 230/pulse/an', price: 1324.60,},
      {id: 8, code: '082G3442', model: 'AME655 24/pulse/an',  price: 1324.60,},
    ],
    pressureRegulatorValves: [
      {id: 1, code: '065B2388',  dn: 15,  kvs: 4,   price: 733.44,   type: 'VFG2',  z: 0.6, },
      {id: 1, code: '065B2389',  dn: 20,  kvs: 6.3, price: 801.61,   type: 'VFG2',  z: 0.6, },
      {id: 1, code: '065B2390',  dn: 25,  kvs: 8,   price: 842.14,   type: 'VFG2',  z: 0.6, },
      {id: 1, code: '065B2391',  dn: 32,  kvs: 16,  price: 963.86,   type: 'VFG2',  z: 0.55,},
      {id: 1, code: '065B2392',  dn: 40,  kvs: 20,  price: 1090.42,  type: 'VFG2',  z: 0.55,},
      {id: 1, code: '065B2393',  dn: 50,  kvs: 32,  price: 1298.10,  type: 'VFG2',  z: 0.5, },
      {id: 1, code: '065B2394',  dn: 65,  kvs: 50,  price: 1844.94,  type: 'VFG2',  z: 0.5, },
      {id: 1, code: '065B2395',  dn: 80,  kvs: 80,  price: 1935.81,  type: 'VFG2',  z: 0.45,},
      {id: 1, code: '065B2396',  dn: 100, kvs: 125, price: 2865.55,  type: 'VFG2',  z: 0.4, },
      {id: 1, code: '065B2397',  dn: 125, kvs: 160, price: 4632.63,  type: 'VFG2',  z: 0.35,},
      {id: 1, code: '065B2398',  dn: 150, kvs: 280, price: 8273.80,  type: 'VFG2',  z: 0.3, },
      {id: 1, code: '065B2399',  dn: 200, kvs: 320, price: 13782.63, type: 'VFG2',  z: 0.2, },
      {id: 1, code: '065B2400', dn: 250, kvs: 400, price: 18009.61, type: 'VFG2',  z: 0.2, },
    ],
    upstreamBlocks: [
      {id: 1, code: '003G1013', model: 'AFA 0.05..0.35', price: 1620.23},
      {id: 2, code: '003G1012', model: 'AFA 0.1..0.6',   price: 1200.84},
      {id: 3, code: '003G1011', model: 'AFA 0.15..1.2',  price: 1200.84},
      {id: 4, code: '003G1010', model: 'AFA 0.5..2.5',   price: 1058.31},
      {id: 5, code: '003G1009', model: 'AFA 1..5',       price: 1058.31},
      {id: 6, code: '003G1008', model: 'AFA 3..11',      price: 1058.31},
      {id: 7, code: '003G1007', model: 'AFA 10..16',     price: 1367.91},
    ],
  },
  equip: {
    downstream1: {
      aliases: {
        controlUnit: 'downstream1Block',
        position: 'Downstream 1',
        valve: 'downstream1Valve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialPrValveState,
    },
    downstream2: {
      aliases: {
        controlUnit: 'downstream2Block',
        position: 'Downstream 2',
        valve: 'downstream2Valve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialPrValveState,
    },
    supDpr: {
      aliases: {
        controlUnit: 'supDprBlock',
        position: 'Supply DPR',
        valve: 'supDprValve',
      },
      controlUnit: initialControlUnitState,
      isMounted: true,
      valve: initialPrValveState,
    },
    supCv: {
      aliases: {
        controlUnit: 'supCvDrive',
        position: 'Supply CV',
        valve: 'supCvValve',
      },
      controlUnit: initialControlUnitState,
      isMounted: true,
      valve: initialCvValveState,
    },
    retCv: {
      aliases: {
        controlUnit: 'retCvDrive',
        position: 'Return CV',
        valve: 'retCvValve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialCvValveState,
    },
    retDpr: {
      aliases: {
        controlUnit: 'retDprBlock',
        position: 'Return DPR',
        valve: 'retDprValve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialPrValveState,
    },
    upstream1: {
      aliases: {
        controlUnit: 'upstream1Block',
        position: 'Upstream 1',
        valve: 'upstream1Valve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialPrValveState,
    },
    upstream2: {
      aliases: {
        controlUnit: 'upstream2Block',
        position: 'Upstream 2',
        valve: 'upstream2Valve',
      },
      controlUnit: initialControlUnitState,
      isMounted: false,
      valve: initialPrValveState,
    },
  },
  generalParams: {
    g:     {alias: 'g',     value: 10,  },
    hexDp: {alias: 'hexDp', value: 0.15,},
    p1:    {alias: 'p1',    value: 8,   },
    p2:    {alias: 'p2',    value: 8,   },
    p3:    {alias: 'p3',    value: 8,   },
    p4:    {alias: 'p4',    value: 0,   },
    p5:    {alias: 'p5',    value: 0,   },
    p6:    {alias: 'p6',    value: 0,   },
    p7:    {alias: 'p7',    value: 0,   },
    p8:    {alias: 'p8',    value: 6,   },
    p9:    {alias: 'p9',    value: 6,   },
    p10:   {alias: 'p10',   value: 6,   },
    t1:    {alias: 't1',    value: 150, },
    t2:    {alias: 't2',    value: 70,  },
  },
  hoveredTarget: null,
  pulseTubePrice: 45.46,
}

const schemeAndChartReducer = (state = initialState, action) => {

  let st;

  switch (action.type) {
    
    case CHANGE_GENERAL_PARAM: {
      if (!Number.isNaN(+action.value)) {
        let changedValue;
        if (action.value.endsWith('.')) {changedValue = action.value;}
        else {changedValue = +action.value;}
        st = {
          ...state,
          generalParams: {
            ...state.generalParams,
            [action.field]: {...state.generalParams[action.field], value: changedValue,},
          },
        };
      } else {
        st = state;
      }
      break;
    }

    case CHANGE_HOVERED_TARGET: {
      st = {
        ...state,
        hoveredTarget: action.target,
      };
      break;
    }

    case SWITCH_MODEL: {
      const getNewUnitState = (currentId, dataArr, switchDirection) => {
        // Calculate new id // ===========
        let newId;
        if (switchDirection === 'up') {
          if (currentId !== dataArr.length - 1) {newId =  currentId + 1;}
          else {newId = 0;}
        } else {
          if (currentId !== 0) {newId = currentId - 1;}
          else {newId = dataArr.length - 1;}
        }
        // Return new unit state as result.
        return ({
          ...dataArr[newId],
          id: newId,
        });
      }
      switch (action.object) {
        case state.equip.downstream1.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              downstream1: {
                ...state.equip.downstream1,
                valve: getNewUnitState(state.equip.downstream1.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
            },
          };
          break;
        }
        case state.equip.downstream1.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              downstream1: {
                ...state.equip.downstream1,
                controlUnit: getNewUnitState(state.equip.downstream1.controlUnit.id, state.dataArrays.downstreamBlocks, action.direction),
              },
            },
          };
          break;
        }

        case state.equip.downstream2.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              downstream2: {
                ...state.equip.downstream2,
                valve: getNewUnitState(state.equip.downstream2.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
            },
          };
          break;
        }
        case state.equip.downstream2.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              downstream2: {
                ...state.equip.downstream2,
                controlUnit: getNewUnitState(state.equip.downstream2.controlUnit.id, state.dataArrays.downstreamBlocks, action.direction),
              },
            },
          };
          break;
        }

        case state.equip.supDpr.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              supDpr: {
                ...state.equip.supDpr,
                isMounted: true,
                valve: getNewUnitState(state.equip.supDpr.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
              retDpr: {
                ...state.equip.retDpr,
                isMounted: false,
              },
            },
          };
          break;
        }
        case state.equip.supDpr.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              supDpr: {
                ...state.equip.supDpr,
                isMounted: true,
                controlUnit: getNewUnitState(state.equip.supDpr.controlUnit.id, state.dataArrays.dprBlocks, action.direction),
              },
              retDpr: {
                ...state.equip.retDpr,
                isMounted: false,
              },
            },
          };
          break;
        }

        case state.equip.supCv.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              supCv: {
                ...state.equip.supCv,
                isMounted: true,
                valve: getNewUnitState(state.equip.supCv.valve.id, state.dataArrays.cvValves, action.direction),
              },
              retCv: {
                ...state.equip.retCv,
                isMounted: false,
              },
            },
          };
          break;
        }
        case state.equip.supCv.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              supCv: {
                ...state.equip.supCv,
                isMounted: true,
                controlUnit: getNewUnitState(state.equip.supCv.controlUnit.id, state.dataArrays.drives, action.direction),
              },
              retCv: {
                ...state.equip.retCv,
                isMounted: false,
              },
            },
          };
          break;
        }

        case state.equip.retCv.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              retCv: {
                ...state.equip.retCv,
                isMounted: true,
                valve: getNewUnitState(state.equip.retCv.valve.id, state.dataArrays.cvValves, action.direction),
              },
              supCv: {
                ...state.equip.supCv,
                isMounted: false,
              },
            }
          };
          break;
        }
        case state.equip.retCv.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              retCv: {
                ...state.equip.retCv,
                isMounted: true,
                controlUnit: getNewUnitState(state.equip.retCv.controlUnit.id, state.dataArrays.drives, action.direction)
              },
              supCv: {
                ...state.equip.supCv,
                isMounted: false,
              },
            },
          };
          break;
        }

        case state.equip.retDpr.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              retDpr: {
                ...state.equip.retDpr,
                isMounted: true,
                valve: getNewUnitState(state.equip.retDpr.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
              supDpr: {
                ...state.equip.supDpr,
                isMounted: false,
              },
            },
          };
          break;
        }
        case state.equip.retDpr.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              retDpr: {
                ...state.equip.retDpr,
                isMounted: true,
                controlUnit: getNewUnitState(state.equip.retDpr.controlUnit.id, state.dataArrays.dprBlocks, action.direction),
              },
              supDpr: {
                ...state.equip.supDpr,
                isMounted: false,
              },
            },
          };
          break;
        }

        case state.equip.upstream1.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              upstream1: {
                ...state.equip.upstream1,
                valve: getNewUnitState(state.equip.upstream1.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
            },
          };
          break;
        }
        case state.equip.upstream1.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              upstream1: {
                ...state.equip.upstream1,
                controlUnit: getNewUnitState(state.equip.upstream1.controlUnit.id, state.dataArrays.upstreamBlocks, action.direction),
              },
            },
          };
          break;
        }

        case state.equip.upstream2.aliases.valve: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              upstream2: {
                ...state.equip.upstream2,
                valve: getNewUnitState(state.equip.upstream2.valve.id, state.dataArrays.pressureRegulatorValves, action.direction),
              },
            },
          };
          break
        }
        case state.equip.upstream2.aliases.controlUnit: {
          st = {
            ...state,
            equip: {
              ...state.equip,
              upstream2: {
                ...state.equip.upstream2,
                controlUnit: getNewUnitState(state.equip.upstream2.controlUnit.id, state.dataArrays.upstreamBlocks, action.direction),
              },
            },
          };
          break;
        }

        default: console.error('SWITCH_MODEL has an error.');
      }
    }
    break;

    default:
      return state;
  }


  const t1    = st.generalParams.t1.value;
  const t2    = st.generalParams.t2.value;
  const p1    = st.generalParams.p1.value;
  const p2    = st.generalParams.p2.value;
  const p3    = st.generalParams.p3.value;
  const p8    = st.generalParams.p8.value;
  const p9    = st.generalParams.p9.value;
  const p10   = st.generalParams.p10.value;
  const g     = st.generalParams.g.value;
  const hexDp = st.generalParams.hexDp.value;

  const supCvDp = (st.equip.supCv.isMounted) ? (g / st.equip.supCv.valve.kvs) ** 2 : 0;
  const retCvDp = (st.equip.retCv.isMounted) ? (g / st.equip.retCv.valve.kvs) ** 2 : 0;

  const supDprDp = (st.equip.supDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;
  const retDprDp = (st.equip.retDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;

  const downstream1Dp = p1 - p2;
  const downstream2Dp = p2 - p3;
  const upstream1Dp   = p8 - p9;
  const upstream2Dp   = p9 - p10;

  const p4 = p3 - supDprDp;
  const p5 = p4 - supCvDp;
  const p6 = p5 - hexDp;
  const p7 = p6 - retCvDp;

  const getPSat = (t) => {
    const pSatMap = new Map([
      [0, -0.99],  [1, -0.99],  [2, -0.99],  [3, -0.99],  [4, -0.99],  [5, -0.99],  [6, -0.99],  [7, -0.99],
      [8, -0.99],  [9, -0.99],  [10, -0.99], [11, -0.99], [12, -0.99], [13, -0.99], [14, -0.98], [15, -0.98],
      [16, -0.98], [17, -0.98], [18, -0.98], [19, -0.98], [20, -0.98], [21, -0.98], [22, -0.97], [23, -0.97],
      [24, -0.97], [25, -0.97], [26, -0.97], [27, -0.96], [28, -0.96], [29, -0.96], [30, -0.96], [31, -0.96],
      [32, -0.95], [33, -0.95], [34, -0.95], [35, -0.94], [36, -0.94], [37, -0.94], [38, -0.93], [39, -0.93],
      [40, -0.93], [41, -0.92], [42, -0.92], [43, -0.91], [44, -0.91], [45, -0.90], [46, -0.90], [47, -0.89],
      [48, -0.89], [49, -0.88], [50, -0.88], [51, -0.87], [52, -0.86], [53, -0.86], [54, -0.85], [55, -0.84],
      [56, -0.83], [57, -0.83], [58, -0.82], [59, -0.81], [60, -0.80], [61, -0.79], [62, -0.78], [63, -0.77],
      [64, -0.76], [65, -0.75], [66, -0.74], [67, -0.73], [68, -0.71], [69, -0.70], [70, -0.69], [71, -0.67],
      [72, -0.65], [73, -0.63], [74, -0.59], [75, -0.61], [76, -0.59], [77, -0.57], [78, -0.55], [79, -0.51],
      [80, -0.53], [81, -0.51], [82, -0.48], [83, -0.44], [84, -0.39], [85, -0.42], [86, -0.40], [87, -0.37],
      [88, -0.33], [89, -0.27], [90, -0.30], [91, -0.27], [92, -0.23], [93, -0.18], [94, -0.11], [95, -0.15],
      [96, -0.12], [97, -0.08], [98, -0.02], [99, 0.06],  [100, 0.01], [101, 0.05], [102, 0.10], [103, 0.17],
      [104, 0.27], [105, 0.21], [106, 0.25], [107, 0.31], [108, 0.38], [109, 0.49], [110, 0.43], [111, 0.48],
      [112, 0.55], [113, 0.63], [114, 0.76], [115, 0.69], [116, 0.75], [117, 0.83], [118, 0.93], [119, 1.08],
      [120, 0.99], [121, 1.06], [122, 1.15], [123, 1.26], [124, 1.44], [125, 1.34], [126, 1.41], [127, 1.50],
      [128, 1.62], [129, 1.80], [130, 1.70], [131, 1.78], [132, 1.88], [133, 2.02], [134, 2.23], [135, 2.11],
      [136, 2.20], [137, 2.32], [138, 2.47], [139, 2.70], [140, 2.57], [141, 2.68], [142, 2.81], [143, 2.99],
      [144, 3.26], [145, 3.11], [146, 3.24], [147, 3.39], [148, 3.60], [149, 3.92], [150, 3.74],
    ]);
    return pSatMap.get(t);
  }

  const pSatSup = getPSat(t1);
  const pSatRet = getPSat(t2);

  const downstream1DpMax = st.equip.downstream1.valve.z * (p1 - pSatSup);
  const downstream2DpMax = st.equip.downstream2.valve.z * (p2 - pSatSup);
  const supDprDpMax      = st.equip.supDpr.valve.z      * (p3 - pSatSup);
  const supCvDpMax       = st.equip.supCv.valve.z       * (p4 - pSatSup);
  const retCvDpMax       = st.equip.retCv.valve.z       * (p6 - pSatRet);
  const retDprDpMax      = st.equip.retDpr.valve.z      * (p7 - pSatRet);
  const upstream1DpMax   = st.equip.upstream1.valve.z   * (p8 - pSatRet);
  const upstream2DpMax   = st.equip.upstream2.valve.z   * (p9 - pSatRet);

  const downstream1V = g * (18.8 / st.equip.downstream1.valve.dn) ** 2;
  const downstream2V = g * (18.8 / st.equip.downstream2.valve.dn) ** 2;
  const supDprV      = g * (18.8 / st.equip.supDpr.valve.dn)      ** 2;
  const supCvV       = g * (18.8 / st.equip.supCv.valve.dn)       ** 2;
  const retCvV       = g * (18.8 / st.equip.retCv.valve.dn)       ** 2;
  const retDprV      = g * (18.8 / st.equip.retDpr.valve.dn)      ** 2;
  const upstream1V   = g * (18.8 / st.equip.upstream1.valve.dn)   ** 2;
  const upstream2V   = g * (18.8 / st.equip.upstream2.valve.dn)   ** 2;

  const supCvAuthority = `${supCvDp.toFixed(2)} > ${(0.5 * (supCvDp + hexDp)).toFixed(2)}`;
  const retCvAuthority = `${retCvDp.toFixed(2)} > ${(0.5 * (retCvDp + hexDp)).toFixed(2)}`;


  return {
    ...st,
    equip: {
      downstream1: {
        ...st.equip.downstream1,
        isMounted: downstream1Dp,
        valve: {...st.equip.downstream1.valve, dp: downstream1Dp, dpMax: downstream1DpMax, v: downstream1V,},
      },
      downstream2: {
        ...st.equip.downstream2,
        isMounted: downstream2Dp,
        valve: {...st.equip.downstream2.valve, dp: downstream2Dp, dpMax: downstream2DpMax, v: downstream2V,},
      },
      supDpr: {
        ...st.equip.supDpr,
        valve: {...st.equip.supDpr.valve, dp: supDprDp, dpMax: supDprDpMax, v: supDprV,},
      },
      supCv: {
        ...st.equip.supCv,
        valve: {...st.equip.supCv.valve, authority: supCvAuthority, dp: supCvDp, dpMax: supCvDpMax, v: supCvV,},
      },
      retCv: {
        ...st.equip.retCv,
        valve: {...st.equip.retCv.valve, authority: retCvAuthority, dp: retCvDp, dpMax: retCvDpMax, v: retCvV,},
      },
      retDpr: {
        ...st.equip.retDpr,
        valve: {...st.equip.retDpr.valve, dp: retDprDp, dpMax: retDprDpMax, v: retDprV,},
      },
      upstream1: {
        ...st.equip.upstream1,
        isMounted: upstream1Dp,
        valve: {...st.equip.upstream1.valve, dp: upstream1Dp, dpMax: upstream1DpMax, v: upstream1V,},
      },
      upstream2: {
        ...st.equip.upstream2,
        isMounted: upstream2Dp,
        valve: {...st.equip.upstream2.valve, dp: upstream2Dp, dpMax: upstream2DpMax, v: upstream2V,},
      },
    },
    generalParams: {
      ...st.generalParams,
      p4: {...st.generalParams.p4, value: p4,},
      p5: {...st.generalParams.p5, value: p5,},
      p6: {...st.generalParams.p6, value: p6,},
      p7: {...st.generalParams.p7, value: p7,},
    },
  }

}

export const changeGeneralParamAC  = (field, value) =>      ({type: CHANGE_GENERAL_PARAM,  field,  value,    });
export const changeHoveredTargetAC = (target) =>            ({type: CHANGE_HOVERED_TARGET, target,           });
export const switchModelAC         = (object, direction) => ({type: SWITCH_MODEL,          object, direction,});

export default schemeAndChartReducer;