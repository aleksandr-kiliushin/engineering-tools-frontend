const CHANGE_GENERAL_PARAM  = 'CHANGE_GENERAL_PARAM';
const CHANGE_HOVERED_TARGET = 'CHANGE_HOVERED_TARGET';
const SET_EQUIPS_DB_DATA    = 'SET_EQUIPS_DB_DATA';
const SWITCH_MODEL          = 'SWITCH_MODEL';
const SET_IS_FETCHING       = 'SET_IS_FETCHING';


// ToDo: Delete these objects and leave just {id: 0,}.
const initialPrValveState    = {code: '', dn: 0, dp: 0, dpMax: 0, id: 0, kvs: 0, price: 0, type: '', v: 0, z: 0,};
const initialCvValveState    = {...initialPrValveState, authority: 0,};

// ToDo: If data from db will not be added to state, add 'dataArray' field to return in the very end of schemeAndChartReducer.

const initialState = {
  dataArrays: null,
  equip: {
    downstream1: {
      aliases: {
        controlUnit: 'downstream1Block',
        position: 'Downstream 1',
        valve: 'downstream1Valve',
      },
      controlUnit: {id: 0,},
      isMounted: false,
      valve: initialPrValveState,
    },
    downstream2: {
      aliases: {
        controlUnit: 'downstream2Block',
        position: 'Downstream 2',
        valve: 'downstream2Valve',
      },
      controlUnit: {id: 0,},
      isMounted: false,
      valve: initialPrValveState,
    },
    supDpr: {
      aliases: {
        controlUnit: 'supDprBlock',
        position: 'Supply DPR',
        valve: 'supDprValve',
      },
      controlUnit: {id: 0,},
      isMounted: true,
      valve: initialPrValveState,
    },
    supCv: {
      aliases: {
        controlUnit: 'supCvDrive',
        position: 'Supply CV',
        valve: 'supCvValve',
      },
      controlUnit: {id: 0,},
      isMounted: true,
      valve: initialCvValveState,
    },
    retCv: {
      aliases: {
        controlUnit: 'retCvDrive',
        position: 'Return CV',
        valve: 'retCvValve',
      },
      controlUnit: {id: 0,},
      isMounted: false,
      valve: initialCvValveState,
    },
    retDpr: {
      aliases: {
        controlUnit: 'retDprBlock',
        position: 'Return DPR',
        valve: 'retDprValve',
      },
      controlUnit: {id: 0,},
      isMounted: false,
      valve: initialPrValveState,
    },
    upstream1: {
      aliases: {
        controlUnit: 'upstream1Block',
        position: 'Upstream 1',
        valve: 'upstream1Valve',
      },
      controlUnit: {id: 0,},
      isMounted: false,
      valve: initialPrValveState,
    },
    upstream2: {
      aliases: {
        controlUnit: 'upstream2Block',
        position: 'Upstream 2',
        valve: 'upstream2Valve',
      },
      controlUnit: {id: 0,},
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
  isFetching: false,
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

    case SET_EQUIPS_DB_DATA: {
      st = {
        ...state,
        dataArrays: action.equipsDbData,
      };
      break;
    }

    case SET_IS_FETCHING: {
      st = {
        ...state,
        isFetching: action.isFetching,
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
                valve: getNewUnitState(state.equip.downstream1.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.downstream1.controlUnit.id, state.dataArrays.downstream_blocks, action.direction),
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
                valve: getNewUnitState(state.equip.downstream2.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.downstream2.controlUnit.id, state.dataArrays.downstream_blocks, action.direction),
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
                valve: getNewUnitState(state.equip.supDpr.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.supDpr.controlUnit.id, state.dataArrays.dpr_blocks, action.direction),
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
                valve: getNewUnitState(state.equip.supCv.valve.id, state.dataArrays.cv_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.supCv.controlUnit.id, state.dataArrays.cv_actuators, action.direction),
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
                valve: getNewUnitState(state.equip.retCv.valve.id, state.dataArrays.cv_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.retCv.controlUnit.id, state.dataArrays.cv_actuators, action.direction)
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
                valve: getNewUnitState(state.equip.retDpr.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.retDpr.controlUnit.id, state.dataArrays.dpr_blocks, action.direction),
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
                valve: getNewUnitState(state.equip.upstream1.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.upstream1.controlUnit.id, state.dataArrays.upstream_blocks, action.direction),
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
                valve: getNewUnitState(state.equip.upstream2.valve.id, state.dataArrays.pr_valves, action.direction),
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
                controlUnit: getNewUnitState(state.equip.upstream2.controlUnit.id, state.dataArrays.upstream_blocks, action.direction),
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

export const changeGeneralParamAC  = (field, value)      => ({type: CHANGE_GENERAL_PARAM,  field,       value,    });
export const changeHoveredTargetAC = (target)            => ({type: CHANGE_HOVERED_TARGET, target,                });
export const setEquipsDbDataAC     = (equipsDbData)      => ({type: SET_EQUIPS_DB_DATA,    equipsDbData,          });
export const setIsFetchingAC       = (isFetching)        => ({type: SET_IS_FETCHING,       isFetching,            });
export const switchModelAC         = (object, direction) => ({type: SWITCH_MODEL,          object,      direction,});


export default schemeAndChartReducer;