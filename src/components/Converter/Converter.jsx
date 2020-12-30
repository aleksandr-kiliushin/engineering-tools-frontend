import React from 'react';
import {Card, CardContent, TextField, Typography} from '@material-ui/core';

function ParamInputField(props) {
  const onChangeHandler = (e) => {
    props.onChangeHandler(props.id, e.target.value);
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
    this.state = {
      pFields: {bar: '', mpa: '', mh2o: '',},
    };
  }

  onChangeHandler = (id, value) => {
    let bar;

    if (id === 'bar') {bar = +value}
    else if (id === 'mpa') {bar = +value * 10}
    else if (id === 'mh2o') {bar = +value * 0.0980665}

    this.setState({
      ...this.state,
      pFields: {
        bar: bar,
        mpa: bar / 10,
        mh2o: bar / 0.0980665,
      },
    });
  }

  render() {
    return (
      <Card style={{width: 250,}}>
        <CardContent>

          <Typography color="textSecondary">Pressure</Typography>

          <ParamInputField id="bar" label="bar" onChangeHandler={this.onChangeHandler} value={this.state.pFields.bar} />
          <ParamInputField id="mpa" label="MPa" onChangeHandler={this.onChangeHandler} value={this.state.pFields.mpa} />
          <ParamInputField id="mh2o" label="mH2O" onChangeHandler={this.onChangeHandler} value={this.state.pFields.mh2o} />

        </CardContent>
      </Card>
    );
  }
}