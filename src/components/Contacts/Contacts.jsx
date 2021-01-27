import React from 'react';
import * as axios from 'axios';


/*
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  sentence: {
    margin: '20px',
  },
});


export default function Contacts() {
  const classes = useStyles();
  return (
    <div className={classes.sentence}>
      If you have any suggestions or ideas, you can send them to <i>thedevelopmnt@gmail.com</i>.
    </div>
  );
}
*/



export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valves: [],}
  }

  componentDidMount() {
    axios.get('http://localhost:8000/valves/').then((response) => {
      this.setState((prevState) => ({
        valves: response.data,
      }));
    });
  }

  render() {
		const valvesForJsx = this.state.valves.map((valve) => {
			return (<li key={valve.id}>{valve.kvs}</li>);
		});
		const theValve = this.state.valves.length && this.state.valves[0].kvs;
    return (
      <div>
        If you are {theValve}, contact me via me@google.com.
        <ul>{valvesForJsx}</ul>
      </div>
    );
  }
}