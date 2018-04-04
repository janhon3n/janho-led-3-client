import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  base: {
    position: 'relative',
    margin: '0px',
  },
  tracker: {
    height: '30px',
    width: '10px',
    backgroundColor: '#EEE',
    borderRadius: '2px',
    cursor: 'pointer',
  },
})

class Slider extends Component {
  constructor(props) {
    super(props)
    this.baseRef = React.createRef()
  }

  handleDrag = (event, tracker) => {
    let value = tracker.x / (this.props.width - 10) * this.props.max
    this.props.onChange(value)
  }

  render() {
    let trackerPosition =
      this.props.value / this.props.max * (this.props.width - 10)
    return (
      <div
        className={this.props.classes.base}
        ref={this.baseRef}
        style={{
          backgroundColor: this.props.backgroundColor,
          background: this.props.background,
          width: this.props.width,
        }}
      >
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: trackerPosition, y: 0 }}
          onDrag={this.handleDrag}
        >
          <div className={this.props.classes.tracker} />
        </Draggable>
      </div>
    )
  }
}

Slider.defaultProps = {
  width: 435,
  height: 130,
}

export default withStyles(styles)(Slider)
