import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  base: {
    position: 'relative',
    margin: '0px',
    boxShadow: '0px 0px 5px #CCC',
    opacity: '100%',
    background:
      'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
  },
  base2: {
    position: 'relative',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
  },
  tracker: {
    height: '15px',
    width: '15px',
    backgroundColor: '#BBB',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 0 5px black',
  },
})

class HuePicker extends Component {
  handleDrag = (event, tracker) => {
    let hue = tracker.x / (this.props.width - 15) * 360
    let alpha = 100 - tracker.y / (this.props.height - 15) * 100
    this.props.onChange(hue, alpha)
  }

  render() {
    let trackerPosition = {
      x: this.props.hue / 360 * (this.props.width - 15),
      y: (100 - this.props.alpha) / 100 * (this.props.height - 15),
    }
    return (
      <div
        className={this.props.classes.base}
        style={{ width: this.props.width, height: this.props.height }}
      >
        <div
          className={this.props.classes.base2}
          style={{ width: this.props.width, height: this.props.height }}
        >
          <Draggable
            axis="both"
            bounds="parent"
            position={trackerPosition}
            onDrag={this.handleDrag}
          >
            <div className={this.props.classes.tracker} />
          </Draggable>
        </div>
      </div>
    )
  }
}

HuePicker.defaultProps = {
  width: 435,
  height: 130,
}

export default withStyles(styles)(HuePicker)
