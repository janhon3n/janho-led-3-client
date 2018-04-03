import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  base: {
    position: 'relative',
    width: '415px',
    margin: '5px',
    boxShadow: '0px 0px 5px #CCC',
  },
  tracker: {
    height: '30px',
    width: '15px',
    backgroundColor: '#444',
    borderRadius: '12px',
    cursor: 'pointer',
  },
})

class Slider extends Component {
  constructor(props) {
    super(props)
    this.baseRef = React.createRef()
  }

  render() {
    let trackerPosition = this.props.value * 400
    return (
      <div className={this.props.classes.base} ref={this.baseRef}>
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: trackerPosition, y: 0 }}
        >
          <div className={this.props.classes.tracker} />
        </Draggable>
      </div>
    )
  }
}

export default withStyles(styles)(Slider)
