import React from 'react';
import {Card, CardContent, TextField, Typography} from '@material-ui/core';
import {fromBar, scales, toBar,} from './../../utils/calcFunctions';

function ParamInputField(props) {
  const onChangeHandler = (e) => {
    props.onChangeHandler(e.target.value, props.scale);
  }
  return (
    <div>
      <TextField label={props.label} onChange={onChangeHandler} style={{width: 100,}} value={props.value} />
    </div>
  );
}


export default class Converter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {bar: 5, scale: scales.p.bar, isDot: false,};
  }

  onChangeHandler = (value, scale) => {
    const bar = toBar(value, scale);
    const dotCount = (value.match(/\./g) || []).length;

    if (isNaN(value) || dotCount > 1) {
      return;
    }

    let isDot = false;
    if (value.endsWith('.') && dotCount === 1) {
      isDot = true;
    }

    this.setState((prevState) => ({
      bar, scale, isDot,
    }));
  }

  render() {
    let bar = this.state.bar;
    const scale = this.state.scale;

    let mpa = fromBar(bar, scales.p.mpa);
    let mh2o = fromBar(bar, scales.p.mh2o);
    let kgcm2 = fromBar(bar, scales.p.kgcm2);

    if (this.state.isDot) {
      if (scale === scales.p.bar) {bar += '.';}
      else if (scale === scales.p.mpa) {mpa += '.';}
      else if (scale === scales.p.mh2o) {mh2o += '.';}
      else if (scale === scales.p.kgcm2) {kgcm2 += '.';}
    }

    return (
      <Card style={{width: 150,}}>
        <CardContent>

          <Typography color="textSecondary">Pressure</Typography>

          <ParamInputField label="bar" onChangeHandler={this.onChangeHandler} scale={scales.p.bar} value={bar} />
          <ParamInputField label="MPa" onChangeHandler={this.onChangeHandler} scale={scales.p.mpa} value={mpa} />
          <ParamInputField label="mH2O" onChangeHandler={this.onChangeHandler} scale={scales.p.mh2o} value={mh2o} />
          <ParamInputField label="kg/cm2" onChangeHandler={this.onChangeHandler} scale={scales.p.kgcm2} value={kgcm2} />

        </CardContent>
      </Card>
    );
  }
}