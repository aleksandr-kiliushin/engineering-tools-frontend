import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InstrumentCard from './InstrumentCard/InstrumentCard';


const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexDireсtion: 'row',
    justifyContent: 'flex-start',
  },
});


export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      <InstrumentCard
        description="Select optimal valves for individual heating point."
        imgSrc="https://i.ibb.co/L5vLVnm/valves-for-home-page.png"
        linkTo={"/valves"}
        title="Valves calculator"
      />
      <InstrumentCard
        description="Select your TDU configuration."
        imgSrc="https://i.ibb.co/BC0gg7B/tdu-for-home-page.png"
        linkTo={"/tdu"}
        title="TDU configurator"
      />
    </div>
  );
}