import React from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import {GetApp as GetAppIcon,} from '@material-ui/icons';


const Chart = (props) => {

  const downstream1 = props.equip.downstream1;
  const downstream2 = props.equip.downstream2;
  const supDpr = props.equip.supDpr;
  const supCv = props.equip.supCv;
  const retCv = props.equip.retCv;
  const retDpr = props.equip.retDpr;
  const upstream1 = props.equip.upstream1;
  const upstream2 = props.equip.upstream2;

  const hoveredTarget = props.hoveredTarget;
  const UNITS_ALIASES = props.UNITS_ALIASES;

  const changeHoveredTarget = props.changeHoveredTarget

  const pulseTubePrice = 45.46;

  const rows = [
    {
      alias: UNITS_ALIASES.downstream1.unit,
      controlUnitModel: downstream1.controlUnit.model,
      dp: downstream1.valve.dp,
      dpMax: downstream1.valve.dpMax,
      isMounted: downstream1.isMounted,
      position: 'Downstream 1',
      price: downstream1.valve.price + downstream1.controlUnit.price + pulseTubePrice,
      v: downstream1.valve.v,
      valveModel: `${downstream1.valve.type} ${downstream1.valve.dn}/${downstream1.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.downstream2.unit,
      controlUnitModel: downstream2.controlUnit.model,
      dp: downstream2.valve.dp,
      dpMax: downstream2.valve.dpMax,
      isMounted: downstream2.isMounted,
      position: 'Downstream 2',
      price: downstream2.valve.price + downstream2.controlUnit.price + pulseTubePrice,
      v: downstream2.valve.v,
      valveModel: `${downstream2.valve.type} ${downstream2.valve.dn}/${downstream2.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.supDpr.unit,
      controlUnitModel: supDpr.controlUnit.model,
      dp: supDpr.valve.dp,
      dpMax: supDpr.valve.dpMax,
      isMounted: supDpr.isMounted,
      position: 'Supply DPR',
      price: supDpr.valve.price + supDpr.controlUnit.price + pulseTubePrice * 2,
      v: supDpr.valve.v,
      valveModel: `${supDpr.valve.type} ${supDpr.valve.dn}/${supDpr.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.supCv.unit,
      authority: supCv.valve.authority,
      controlUnitModel: supCv.controlUnit.model,
      dp: supCv.valve.dp,
      dpMax: supCv.valve.dpMax,
      isMounted: supCv.isMounted,
      position: 'Supply Control Valve',
      price: supCv.valve.price + supCv.controlUnit.price,
      v: supCv.valve.v,
      valveModel: `${supCv.valve.type} ${supCv.valve.dn}/${supCv.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.retCv.unit,
      authority: retCv.valve.authority,
      controlUnitModel: retCv.controlUnit.model,
      dp: retCv.valve.dp,
      dpMax: retCv.valve.dpMax,
      isMounted: retCv.isMounted,
      position: 'Return Control Valve',
      price: retCv.valve.price + retCv.controlUnit.price,
      v: retCv.valve.v,
      valveModel: `${retCv.valve.type} ${retCv.valve.dn}/${retCv.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.retDpr.unit,
      controlUnitModel: retDpr.controlUnit.model,
      dp: retDpr.valve.dp,
      dpMax: retDpr.valve.dpMax,
      isMounted: retDpr.isMounted,
      position: 'Return DPR',
      price: retDpr.valve.price + retDpr.controlUnit.price + pulseTubePrice * 2,
      v: retDpr.valve.v,
      valveModel: `${retDpr.valve.type} ${retDpr.valve.dn}/${retDpr.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.upstream1.unit,
      controlUnitModel: upstream1.controlUnit.model,
      dp: upstream1.valve.dp,
      dpMax: upstream1.valve.dpMax,
      isMounted: upstream1.isMounted,
      position: 'Upstream 1',
      price: upstream1.valve.price + upstream1.controlUnit.price + pulseTubePrice,
      v: upstream1.valve.v,
      valveModel: `${upstream1.valve.type} ${upstream1.valve.dn}/${upstream1.valve.kvs}`,
    },
    {
      alias: UNITS_ALIASES.upstream2.unit,
      controlUnitModel: upstream2.controlUnit.model,
      dp: upstream2.valve.dp,
      dpMax: upstream2.valve.dpMax,
      isMounted: upstream2.isMounted,
      position: 'Upstream 2',
      price: upstream2.valve.price + upstream2.controlUnit.price + pulseTubePrice,
      v: upstream2.valve.v,
      valveModel: `${upstream2.valve.type} ${upstream2.valve.dn}/${upstream2.valve.kvs}`,
    },
  ];

  const rowsAreMounted = rows.filter((row) => row.isMounted);

  const rowsAreMountedJsx = rowsAreMounted.map((row) => (
    <TableRow key={row.position} selected={row.alias === hoveredTarget}
              onMouseEnter={() => {changeHoveredTarget(row.alias)}} onMouseOut={() => {changeHoveredTarget(null)}}>
      <TableCell scope="row">{row.position}</TableCell>
      <TableCell align="right">{row.valveModel}</TableCell>
      <TableCell align="right">{row.controlUnitModel}</TableCell>
      <TableCell align="right">{row.dp.toFixed(2)}</TableCell>
      <TableCell align="right">{row.dpMax.toFixed(2)}</TableCell>
      <TableCell align="right">{row.v.toFixed(2)}</TableCell>
      <TableCell align="right">{row.authority}</TableCell>
      <TableCell align="right">{row.price.toFixed(2)}</TableCell>
    </TableRow>
  ))

  let total = 0;
  for (let row of rowsAreMounted) {total += row.price;}

  const totalPriceAndDownloadButtonRow = (
    <TableRow>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell align="right">
        <Button startIcon={<GetAppIcon />} size="small">Total:</Button>
      </TableCell>
      <TableCell align="right">{total.toFixed(2)}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">

          <colgroup>
            <col width="20%" />
            <col width="15%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>

          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell align="right">Valve</TableCell>
              <TableCell align="right">Control Unit</TableCell>
              <TableCell align="right">ΔP, bar</TableCell>
              <TableCell align="right">ΔPmax, bar</TableCell>
              <TableCell align="right">V, m/s</TableCell>
              <TableCell align="right">Authority</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rowsAreMountedJsx}
            {totalPriceAndDownloadButtonRow}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}

export default Chart;