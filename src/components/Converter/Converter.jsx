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
    this.state = {bar: 5,};
  }

  onChangeHandler = (value, scale) => {
    const bar = toBar(value, scale);
    this.setState((prevState) => ({
      bar,
    }));
  }

  render() {
    const bar = this.state.bar;
    const mpa = fromBar(bar, scales.p.mpa);
    const mh2o = fromBar(bar, scales.p.mh2o);
    const kgcm2 = fromBar(bar, scales.p.kgcm2);
    return (
      <Card style={{width: 250,}}>
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