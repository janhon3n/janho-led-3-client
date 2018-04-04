import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import ColorPicker from './ColorPicker'
import ColorPreview from './ColorPreview'

const styles = theme => ({
  Manual: {
    padding: '15px',
    display: 'flex',
  },
  Preview: {
    flexGrow: 1,
    maxWidth: '100px',
  },
})

class Manual extends Component {
  setColor = color => {
    this.props.setColor(color)
  }

  render() {
    return (
      <Paper className={this.props.classes.Manual}>
        <ColorPreview
          className={this.props.classes.Preview}
          color={this.props.color}
        />
        <ColorPicker color={this.props.color} onChange={this.setColor} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Manual)
