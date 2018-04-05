import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import ColorPicker from './ColorPicker'

const styles = theme => ({
  PhaseEdit: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  ColorPicker: {
    margin: '10px',
  },
  Duration: {
    margin: '10px',
    width: '100px',
  },
})

class PhaseEdit extends Component {
  editProperty = (propertyName, value) => {
    let newPhase = Object.assign({}, this.props.phase)
    newPhase[propertyName] = value
    console.log(newPhase)
    this.props.onEdit(newPhase)
  }

  render() {
    return (
      <div className={this.props.classes.PhaseEdit}>
        <ColorPicker
          className={this.props.classes.ColorPicker}
          width={320}
          color={this.props.phase.color}
          onChange={color => {
            this.editProperty('color', color)
          }}
        />
        {this.props.phase.type === 'fade' && (
          <ColorPicker
            className={this.props.classes.ColorPicker}
            width={320}
            color={this.props.phase.endColor}
            onChange={color => {
              this.editProperty('endColor', color)
            }}
          />
        )}
        <TextField
          className={this.props.classes.Duration}
          label="Duration"
          type="number"
          value={this.props.phase.duration}
          onChange={e => {
            this.editProperty('duration', e.target.value)
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PhaseEdit)
