import React from 'react'
import {ButtonGroup, Button,} from '@material-ui/core'
import {KeyboardArrowDown, KeyboardArrowUp,} from '@material-ui/icons'

type PropsType = {
  alias       : string
  object      : 'valve' | 'controlUnit'
  switchModel : (alias: string, object: 'valve' | 'controlUnit', direction: string) => void
  x           : number
  y           : number
}


const UpAndDownBtnsGroup: React.FC<PropsType> = ({alias, object, switchModel, x, y}) => {
  const onUpClick = () => {
    switchModel(alias, object, 'up')
  }
  const onDownClick = () => {
    switchModel(alias, object, 'down')
  }

  return(
    <foreignObject x={x+10} y={y} width="40" height="40">
      <ButtonGroup orientation="vertical" size="small" variant="text">
        <Button style={{maxHeight: '20px'}} onClick={onUpClick}>
          <KeyboardArrowUp />
        </Button>
        <Button style={{maxHeight: '20px'}} onClick={onDownClick}>
          <KeyboardArrowDown />
        </Button>
      </ButtonGroup>
    </foreignObject>
  )
}

export default React.memo(UpAndDownBtnsGroup)