import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Paper from 'material-ui/Paper'
import Input from 'material-ui/Input'
import { withStyles } from 'material-ui/styles'

import Slider from './Slider'

const styles = theme => ({
  ColorPicker: {},
  colorSlider: {
    padding: '15px',
    '::-webkit-slider-thumb': {
      background:
        'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
    },
  },
})

class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={this.props.classes.ColorPicker}>
        <React.Fragment>
          <Slider value={1} />
          <Slider value={0.5} />
          <Slider value={0.2} />
        </React.Fragment>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPicker)
