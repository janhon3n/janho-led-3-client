import React, { Component } from 'react'
import * as Color from 'color'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Manual from './Manual'
import ChannelTitle from './ChannelTitle'
import Program from './Program'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import * as moment from 'moment'
import io from 'socket.io-client'

const styles = theme => ({
  Container: {
    display: 'flex',
    margin: '30px',
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
  phaseTicks = 0
  fadePhaseActivationMoment = null
  constructor(props) {
    super(props)

    this.fadeAnimationTick = this.fadeAnimationTick.bind(this)
    this.state = {
      title: 'Channel ' + props.channelNumber,
      mode: 1,
      activePhase: {
        type: 'hold',
        color: { r: 255, g: 0, b: 0 },
        duration: 4,
      },
      programPhaseIndex: 0,
      program: [
        {
          type: 'hold',
          color: { r: 255, g: 0, b: 0 },
          duration: 4,
        },
        {
          type: 'hold',
          color: { r: 0, g: 255, b: 0 },
          duration: 4,
        },
      ],
      displayColor: 'black',
    }
  }
  componentDidMount() {
    this.fadeAnimationTick()
  }
  tick = () => {
    if (
      this.state.mode === 1 &&
      (this.state.program[this.state.programPhaseIndex] === undefined ||
        ++this.phaseTicks >=
          this.state.program[this.state.programPhaseIndex].duration)
    ) {
      this.changeProgramPhase()
      this.phaseTicks = 0
    }
  }

  changeProgramPhase = () => {
    this.setState(prevState => {
      let newIndex =
        prevState.programPhaseIndex + 1 < this.state.program.length
          ? prevState.programPhaseIndex + 1
          : 0
      let newPhase = this.state.program[newIndex]
      if (newPhase.type === 'fade') this.fadePhaseActivationMoment = moment()
      return {
        displayColor: newPhase.color,
        programPhaseIndex: newIndex,
        activePhase: newPhase,
      }
    })
  }

  fadeAnimationTick() {
    if (this.state.activePhase.type === 'fade') {
      let percentageComplete =
        moment().diff(this.fadePhaseActivationMoment) /
        (this.state.activePhase.duration * (1 / this.props.tempo) * 60 * 1000)
      let newDisplayColor = Color(this.state.activePhase.color).mix(
        Color(this.state.activePhase.endColor),
        percentageComplete
      )
      this.setState({ displayColor: newDisplayColor })
    }

    setTimeout(this.fadeAnimationTick, 50)
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

  editProgram = newProgram => {
    this.setState({ program: newProgram })
  }

  setTitle = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    return (
      <div className={this.props.classes.Container}>
        <ChannelTitle
          color={this.state.displayColor}
          title={this.state.title}
        />
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
          {this.state.mode === 2 && (
            <Typography
              style={{
                margin: '15px',
              }}
              variant="display2"
            >
              OFF
            </Typography>
          )}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Channel)
