import React from "react";

import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from '@material-ui/core';
import {GetApp as GetAppIcon,} from '@material-ui/icons';


export default function Chart (props) {

  const mountedRows = props.mountedRows.map((row) => (
    <TableRow
      key          = {row.position}
      selected     = {row.position === props.hoveredTarget}
      onMouseEnter = {() => props.changeHoveredTargetAC(row.position)}
      onMouseOut   = {() => props.changeHoveredTargetAC(null)}
    >
      <TableCell>              {row.position}        </TableCell>
      <TableCell align="right">{row.valveModel}      </TableCell>
      <TableCell align="right">{row.controlUnitModel}</TableCell>
      <TableCell align="right">{row.dp}              </TableCell>
      <TableCell align="right">{row.dpMax}           </TableCell>
      <TableCell align="right">{row.v}               </TableCell>
      <TableCell align="right">{row.authority}       </TableCell>
      <TableCell align="right">{row.price}           </TableCell>
    </TableRow>
  ))

  const totalPriceRow = (
    <TableRow>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell/>
      <TableCell align="right">
        <Button startIcon={<GetAppIcon />} onClick={props.downloadCp}>Total:</Button>
      </TableCell>
      <TableCell align="right">{props.totalPrice}</TableCell>
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
              <TableCell align="right">Valve       </TableCell>
              <TableCell align="right">Control Unit</TableCell>
              <TableCell align="right">ΔP, bar     </TableCell>
              <TableCell align="right">ΔPmax, bar  </TableCell>
              <TableCell align="right">V, m/s      </TableCell>
              <TableCell align="right">Authority   </TableCell>
              <TableCell align="right">Price       </TableCell>
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