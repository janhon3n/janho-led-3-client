import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import ColorPicker from './ColorPicker'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import * as Color from 'color'

const styles = theme => ({
  PhaseItem: {
    margin: '5px',
    padding: '5px',
    paddingLeft: '15px',
    borderRadius: '5px',
    boxShadow: '1px 1px 5px #AAA',
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

class PhaseItem extends Component {
  render() {
    let color = Color(this.props.phase.color)
    let style = {
      borderLeft: '10px solid ' + color.hex(),
    }
    if (this.props.phase.type === 'fade')
      style.borderRight = '10px solid ' + Color(this.props.phase.endColor).hex()
    if (this.props.isActive) style.backgroundColor = 'white'
    if (this.props.isActive) {
      style.boxShadow = '1px 1px 5px ' + color.hex()
    }
    return (
      <div className={this.props.classes.PhaseItem} style={style}>
        <Typography variant="body1" color="inherit">
          {this.props.phase.type.toUpperCase() +
            ' for ' +
            this.props.phase.duration +
            ' cycles'}
        </Typography>
        <Button
          variant={this.props.isEditable ? 'raised' : 'default'}
          color={this.props.isEditable ? 'secondary' : 'default'}
          onClick={this.props.selectForEdit}
        >
          Edit
        </Button>
        <Button onClick={this.props.remove}>Remove</Button>
      </div>
    )
  }
}

export default withStyles(styles)(PhaseItem)
