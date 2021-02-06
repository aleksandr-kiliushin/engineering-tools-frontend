import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InstrumentCard from './InstrumentCard';
import tduPhoto from '../../assets/img/tdu-for-home-page.png';
import valvesPhoto from '../../assets/img/valves-for-home-page.png';

const useStyles = makeStyles({
  cards: {display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',},
});


export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      <InstrumentCard
        description="Select optimal valves for individual heating point."
        imgSrc={valvesPhoto}
        linkTo={"/valves"}
        title="Valves calculator"
      />
      <InstrumentCard
        description="Select your TDU configuration."
        imgSrc={tduPhoto}
        linkTo={"/tdu"}
        title="TDU configurator"
      />
    </div>
  );
}