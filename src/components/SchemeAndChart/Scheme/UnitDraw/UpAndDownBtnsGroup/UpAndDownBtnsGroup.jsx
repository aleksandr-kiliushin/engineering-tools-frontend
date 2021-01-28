import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {KeyboardArrowDown, KeyboardArrowUp,} from "@material-ui/icons";
import React from "react";

export default function UpAndDownBtnsGroup(props) {

  const onUpClick = () => {
    props.switchModelAC(props.objectToSwitch, 'up');
  }
  const onDownClick = () => {
    props.switchModelAC(props.objectToSwitch, 'down');
  }

  return(
    <foreignObject x={props.x+10} y={props.y} width="40" height="40">
      <ButtonGroup orientation="vertical" size="small" variant="text">
        <Button style={{maxHeight: '20px',}} onClick={onUpClick}>
          <KeyboardArrowUp />
        </Button>
        <Button style={{maxHeight: '20px',}} onClick={onDownClick}>
          <KeyboardArrowDown />
        </Button>
      </ButtonGroup>
    </foreignObject>
  );

}