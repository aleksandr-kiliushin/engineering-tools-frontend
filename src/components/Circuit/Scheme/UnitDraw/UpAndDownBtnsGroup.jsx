import React from "react";
import {ButtonGroup, Button,} from "@material-ui/core";
import {KeyboardArrowDown, KeyboardArrowUp,} from "@material-ui/icons";

const UpAndDownBtnsGroup = React.memo((props) => {
  const onUpClick = () => {
    props.switchModel(props.alias, props.objectToSwitch, 'up');
  }
  const onDownClick = () => {
    props.switchModel(props.alias, props.objectToSwitch, 'down');
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
});

export default UpAndDownBtnsGroup;