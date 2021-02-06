import React from "react";

import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from '@material-ui/core';
import {GetApp as GetAppIcon,} from '@material-ui/icons';


export default function Chart (props) {

  const TableCellR = (props) => <TableCell align="right">{props.children}</TableCell>;

  const mountedRows = props.mountedRows.map((row) => (
    <TableRow
      key          = {row.alias}
      selected     = {row.alias === props.hoveredTarget}
      onMouseEnter = {() => props.changeHoveredTarget(row.alias)}
      onMouseOut   = {() => props.changeHoveredTarget(null)}
    >
      <TableCell> {row.position}        </TableCell>
      <TableCellR>{row.valveModel}      </TableCellR>
      <TableCellR>{row.controlUnitModel}</TableCellR>
      <TableCellR>{row.dp}              </TableCellR>
      <TableCellR>{row.dpMax}           </TableCellR>
      <TableCellR>{row.v}               </TableCellR>
      <TableCellR>{row.authority}       </TableCellR>
      <TableCellR>{row.price}           </TableCellR>
    </TableRow>
  ))

  const totalPriceRow = (
    <TableRow>
      <TableCell/><TableCell/><TableCell/><TableCell/><TableCell/><TableCell/>
      <TableCellR>
        <Button startIcon={<GetAppIcon />} onClick={props.downloadCircuitCp}>Total:</Button>
      </TableCellR>
      <TableCellR>{props.totalPrice}</TableCellR>
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
              <TableCellR>Valve       </TableCellR>
              <TableCellR>Control Unit</TableCellR>
              <TableCellR>ΔP, bar     </TableCellR>
              <TableCellR>ΔPmax, bar  </TableCellR>
              <TableCellR>V, m/s      </TableCellR>
              <TableCellR>Authority   </TableCellR>
              <TableCellR>Price       </TableCellR>
            </TableRow>
          </TableHead>

          <TableBody>
            {mountedRows}
            {totalPriceRow}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}