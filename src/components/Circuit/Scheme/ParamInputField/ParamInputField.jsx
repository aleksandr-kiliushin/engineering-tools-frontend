import React from "react";
import {makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles({
  paramInputFieldStem: {stroke: '#7A7A7A',}
});


export default function ParamInputField(props) {
  const s = useStyles();
  const alias = props.param.alias;

  let x;
  if      (['t1', 't2', 'g',].includes(alias)) {x = 10 ;}
  else if (['p1', 'p10',].includes(alias))     {x = 90 ;}
  else if (['p2', 'p9',].includes(alias))      {x = 255;}
  else if (['p3', 'p8',].includes(alias))      {x = 430;}
  else if (['p4', 'p7',].includes(alias))      {x = 620;}
  else if (['p5', 'p6',].includes(alias))      {x = 770;}
  else if (alias === 'hexDp')                  {x = 880;}

  let y;
  if      (['t1', 'p1', 'p2', 'p3', 'p4', 'p5',].includes(alias))  {y = 55 ;}
  else if (['p6', 'p7', 'p8', 'p9', 'p10', 't2',].includes(alias)) {y = 250;}
  else if (['g', 'hexDp',].includes(alias))                        {y = 180;}

  let value = props.param.value;
  let disabled = false;
  if (['p4', 'p5', 'p6', 'p7',].includes(props.param.alias)) {
    value = value.toFixed(2);
    disabled = true;
  }

  const onChangeHandler = (e) => {
    props.changeGeneralParam(alias, e.target.value);
  }

  return (
    <g>
      {!(['g', 'hexDp',].includes(alias)) && <line className={s.paramInputFieldStem} x1={x+25} y1={y+25} x2={x+25} y2={y+40}/>}
      <foreignObject x={x} y={y} width="50" height="50">
        <TextField
          disabled   = {disabled}
          inputProps = {{style: {height: 25, padding: 0, fontSize: 14, textAlign: 'center',},}}
          onChange   = {onChangeHandler}
          style      = {{height: 25,}}
          value      = {value}
        />
      </foreignObject>
    </g>
  );
}