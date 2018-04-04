import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Slider from './Slider'

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
    flexDirection: 'column',
  },
  ValueControl: {
    display: 'flex',
  },
  TextField: {
    marginLeft: '15px',
    marginRight: '15px',
  },
})

class TempoControl extends Component {
  render() {
    return (
      <div className={this.props.classes.Container}>
        <Typography className={this.props.classes.Ticker} variant="display1">
          {this.props.ticker + 1}
        </Typography>
        <div className={this.props.classes.TempoControl}>
          <Typography>Main tempo</Typography>
          <div className={this.props.classes.ValueControl}>
            <Slider
              width={200}
              value={this.props.tempo}
              max={400}
              onChange={this.props.onChange}
              background="rgba(0,0,0,0.1)"
            />
            <TextField
              className={this.props.classes.TextField}
              value={this.props.tempo}
              onChange={e => this.props.onChange(e.target.value)}
            />
            <Button variant="raised" color="secondary">
              Tap
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TempoControl)
