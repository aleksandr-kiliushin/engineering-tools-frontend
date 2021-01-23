import React from 'react';
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