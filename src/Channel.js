import React, { Component } from 'react'
import * as Color from 'color'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Manual from './Manual'
import Program from './Program'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import io from 'socket.io-client'

const styles = theme => ({
  Container: {
    display: 'flex',
    margin: '30px',
    maxWidth: '1200px',
  },
  Title: {
    boxShadow: '-5px -5px 5px black',
    display: 'flex',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
    padding: '15px 5px 15px 5px',
    margin: '5px',
    marginRight: '0px',
    zIndex: -1,
  },
  Channel: {
    boxShadow: '5px 5px 5px black',
    overflow: 'hidden',
    borderRadius: '5px',
    flexGrow: 1,
  },
  ToolBar: {
    margin: '0px',
    padding: '0px',
  },
  Tabs: {
    backgroundColor: theme.palette.primary.main,
  },
})

class Channel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Channel ' + props.channelNumber,
      mode: 1,
      activePhase: {
        type: 'hold',
        color: { r: 255, g: 0, b: 0 },
      },
      programPhaseIndex: 0,
      program: [
        {
          type: 'hold',
          color: { r: 255, g: 0, b: 0 },
          duration: 2,
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

  setTitle = e => {
    this.setState({ title: e.target.value })
  }
  render() {
    let c = Color(this.state.activePhase.color)
    let color = c.hex()
    return (
      <div className={this.props.classes.Container}>
        <Typography
          variant="title"
          style={{
            backgroundColor: color,
            color: c.isDark() ? 'white' : 'black',
          }}
          className={this.props.classes.Title}
        >
          {this.state.title}
        </Typography>
        <Paper className={this.props.classes.Channel}>
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
            <Program
              program={this.state.program}
              phaseIndex={this.state.programPhaseIndex}
              onEdit={this.editProgram}
            />
          )}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Channel)
