import React from 'react';
import * as axios from 'axios';

export default function Contacts(props) {

  if (props.cvValves.length === 0) {
    axios.get('http://localhost:8000/valves/').then((response) => {
      props.setCvValves(response.data);
    });
  }

  return (
    <div>
      {
        props.cvValves.map((valve) => (
          <div key={valve.id}>{valve.kvs}</div>
        ))
      }
    </div>
  );
}