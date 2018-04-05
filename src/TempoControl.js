import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Slider from './Slider'
import moment from 'moment'

const styles = theme => ({
  Container: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: '15px',
  },
  Ticker: {
    marginRight: '15px',
  },
  TempoControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextField: {
    marginLeft: '15px',
    marginRight: '15px',
  },
})

class TempoControl extends Component {
  maxTapTime = 2000
  maxTempo = 400
  minTempo = 1

  constructor(props) {
    super(props)

    this.lastClick = moment().subtract(1, 'days')
  }

  tapClick = () => {
    let timeNow = moment()
    if (
      timeNow.isBefore(
        moment(this.lastClick).add(this.maxTapTime, 'milliseconds')
      )
    ) {
      let timeSpan = timeNow.diff(this.lastClick)
      this.setTempo(60000 * 1 / timeSpan)
    }
    this.lastClick = timeNow
  }

  setTempo = tempo => {
    if (tempo >= this.minTempo && tempo <= this.maxTempo)
      this.props.onChange(tempo)
  }

  render() {
    return (
      <div className={this.props.classes.TempoControl}>
        <Typography className={this.props.classes.Ticker} variant="display1">
          {this.props.ticker + 1}
        </Typography>
        <TextField
          label="Main tempo (bpm)"
          className={this.props.classes.TextField}
          value={Math.round(this.props.tempo)}
          onChange={e => this.setTempo(e.target.value)}
        />
        <Slider
          width={200}
          value={this.props.tempo}
          max={400}
          onChange={this.setTempo}
          background="rgba(0,0,0,0.1)"
        />
        <Button
          style={{
            margin: '10px',
          }}
          variant="raised"
          color="secondary"
          onClick={this.tapClick}
        >
          Tap
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(TempoControl)
