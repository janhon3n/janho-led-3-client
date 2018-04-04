import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import ColorPicker from './ColorPicker'

const styles = theme => ({
  HoldEdit: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  Duration: {
    margin: '20px',
    width: '100px',
  },
})

class HoldEdit extends Component {
  setColor = color => {
    this.props.onEdit({
      type: 'hold',
      color: color,
      duration: this.props.phase.duration,
    })
  }

  setDuration = event => {
    this.props.onEdit({
      type: 'hold',
      color: this.props.phase.color,
      duration: event.target.value,
    })
  }

  render() {
    return (
      <div className={this.props.classes.HoldEdit}>
        <ColorPicker
          width={320}
          color={this.props.phase.color}
          onChange={this.setColor}
        />
        <TextField
          className={this.props.classes.Duration}
          label="Duration"
          type="number"
          value={this.props.phase.duration}
          onChange={this.setDuration}
        />
      </div>
    )
  }
}

export default withStyles(styles)(HoldEdit)
