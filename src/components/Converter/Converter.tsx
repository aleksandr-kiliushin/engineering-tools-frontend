import React, {ChangeEvent, useState} from 'react'
import {Card, CardContent, TextField, Typography} from '@material-ui/core'
import {fromBar, scales, toBar} from '../../utils/converterCalcUtil'


export default function Converter () {

  const [isDot,      setIsDot,     ] = useState(false)
  const [scale,      setScale,     ] = useState(scales.p.bar)
  const [valueInBar, setValueInBar,] = useState(5)

  const onChangeHandler = (value: string, scale: string) => {

    const dotCount: number = (value.match(/\./g) || []).length
    if (isNaN(+value) || dotCount > 1) return

    const isDot = (value.endsWith('.') && dotCount === 1)

    const valueInBar = toBar(value, scale)

    setIsDot(isDot)
    setScale(scale)
    setValueInBar(valueInBar)
  }

  let bar   = (+valueInBar.toFixed(2)).toString()
  let mpa   = fromBar(valueInBar, scales.p.mpa)
  let mh2o  = fromBar(valueInBar, scales.p.mh2o)
  let kgcm2 = fromBar(valueInBar, scales.p.kgcm2)

  if (isDot) {
    if      (scale === scales.p.bar)   bar   += '.'
    else if (scale === scales.p.mpa)   mpa   += '.'
    else if (scale === scales.p.mh2o)  mh2o  += '.'
    else if (scale === scales.p.kgcm2) kgcm2 += '.'
  }

  return (
    <Card style={{width: 150}}>
      <CardContent>

        <Typography color="textSecondary">Pressure</Typography>

        <ParamInputField label="bar"    onChangeHandler={onChangeHandler} scale={scales.p.bar}   value={bar}   />
        <ParamInputField label="MPa"    onChangeHandler={onChangeHandler} scale={scales.p.mpa}   value={mpa}   />
        <ParamInputField label="mH2O"   onChangeHandler={onChangeHandler} scale={scales.p.mh2o}  value={mh2o}  />
        <ParamInputField label="kg/cm2" onChangeHandler={onChangeHandler} scale={scales.p.kgcm2} value={kgcm2} />

      </CardContent>
    </Card>
  );
}



type ParamInputFieldPropsType = {
  onChangeHandler : (value: string, scale: string) => void
  label           : string
  scale           : string
  value           : string
};

function ParamInputField(props: ParamInputFieldPropsType) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeHandler(e.target.value, props.scale)
  }
  return (
    <div>
      <TextField label={props.label} onChange={onChangeHandler} style={{width: 100}} value={props.value} />
    </div>
  );
}