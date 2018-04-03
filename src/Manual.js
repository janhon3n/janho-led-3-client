import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import ColorPicker from './ColorPicker'

const styles = theme => ({
  Manual: {
    padding: '15px',
  },
})

class Manual extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Paper className={this.props.classes.Manual}>
        Manual mode
        <ColorPicker />
      </Paper>
    )
  }
}

export default withStyles(styles)(Manual)
