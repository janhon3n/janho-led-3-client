import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import { withStyles } from 'material-ui/styles'
import * as Color from 'color'

import Slider from './Slider'
import HuePicker from './HuePicker'

const styles = theme => ({
  ColorPicker: {},
  Tabs: {
    backgroundColor: theme.palette.primary.light,
  },
})

class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 1,
    }
  }

  changeMode = (event, value) => {
    this.setState({ mode: value })
  }

  setRed = value => {
    console.log(value)
    let color = Object.assign({}, this.props.color, { r: value })
    this.props.onChange(color)
  }
  setBlue = value => {
    let color = Object.assign({}, this.props.color, { b: value })
    this.props.onChange(color)
  }
  setGreen = value => {
    let color = Object.assign({}, this.props.color, { g: value })
    this.props.onChange(color)
  }

  setHueAndAlpha = (hue, alpha) => {
    let color = Color.hsl(hue, alpha, alpha / 2)
    this.props.onChange(color.rgb().object())
  }

  render() {
    console.log(this.props.color)
    let color = Color(this.props.color)
    console.log(color.hsl())
    let hue = color.hsl().hue()
    let alpha = color.hsl().saturationl()
    return (
      <Paper className={this.props.classes.ColorPicker}>
        <Tabs
          className={this.props.classes.Tabs}
          value={this.state.mode}
          onChange={this.changeMode}
        >
          <Tab label="RGB" />
          <Tab label="Hue" />
        </Tabs>
        {this.state.mode === 0 && (
          <React.Fragment>
            <Slider
              value={this.props.color.r}
              max={255}
              width={this.props.width}
              onChange={this.setRed}
              background={'linear-gradient(to right, #000 0%, #f00 100%)'}
            />
            <Slider
              value={this.props.color.g}
              max={255}
              width={this.props.width}
              onChange={this.setGreen}
              background={'linear-gradient(to right, #000 0%, #0f0 100%)'}
            />
            <Slider
              value={this.props.color.b}
              max={255}
              width={this.props.width}
              onChange={this.setBlue}
              background={'linear-gradient(to right, #000 0%, #00f 100%)'}
            />
          </React.Fragment>
        )}
        {this.state.mode === 1 && (
          <HuePicker
            width={this.props.width}
            height={this.props.height}
            hue={hue}
            alpha={alpha}
            onChange={this.setHueAndAlpha}
          />
        )}
      </Paper>
    )
  }
}

ColorPicker.defaultProps = {
  width: 435,
  height: 130,
}

export default withStyles(styles)(ColorPicker)
