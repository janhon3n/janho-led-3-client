import React, { Component } from 'react'
import * as Color from 'color'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Manual from './Manual'
import Program from './Program'
import { withStyles } from 'material-ui/styles'
import io from 'socket.io-client'

const styles = theme => ({
  Channel: {
    overflow: 'hidden',
    margin: '20px',
  },
  Tabs: {
    backgroundColor: theme.palette.primary.main,
  },
})

class Channel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 1,
      activePhase: {
        type: 'hold',
        color: { r: 255, g: 0, b: 0 },
      },
      program: [
        {
          type: 'hold',
          color: { r: 255, g: 0, b: 0 },
          duration: 2,
        },
        {
          type: 'hold',
          color: { r: 255, g: 0, b: 0 },
          duration: 1,
        },
      ],
    }
  }

  changeMode = (event, value) => {
    this.setState({ mode: value })
  }

  holdColor = color => {
    this.setState({
      activePhase: {
        type: 'hold',
        color: color,
      },
    })
  }

  editProgram = newList => {
    this.setState({ program: newList })
  }

  render() {
    let colorRgb = Color(this.state.activePhase.color).hex()
    return (
      <Paper
        className={this.props.classes.Channel}
        style={{ borderLeft: '10px solid ' + colorRgb }}
      >
        <Tabs
          className={this.props.classes.Tabs}
          value={this.state.mode}
          onChange={this.changeMode}
        >
          <Tab label="Manual color" />
          <Tab label="Program" />
          <Tab label="Off" />
        </Tabs>
        {this.state.mode === 0 && (
          <Manual
            color={this.state.activePhase.color}
            setColor={this.holdColor}
          />
        )}
        {this.state.mode === 1 && (
          <Program program={this.state.program} onEdit={this.editProgram} />
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(Channel)
