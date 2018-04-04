import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import ColorPicker from './ColorPicker'
import * as Color from 'color'

const styles = theme => ({
  HoldItem: {
    margin: '5px',
    padding: '5px',
    boxShadow: '1px 1px 5px #AAA',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
})

class HoldItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editableProgramIndex: 0,
    }
  }

  render() {
    let color = Color(this.props.program.color).hex()
    let style = {
      borderLeft: '10px solid ' + color,
    }
    if (this.props.inEdit) {
      style.boxShadow = '1px 1px 5px black'
    }
    return (
      <div
        className={this.props.classes.HoldItem}
        style={style}
        onClick={() => {
          this.props.selectItem()
        }}
      >
        {this.props.program.type.toUpperCase() +
          ' for ' +
          this.props.program.duration +
          ' cycles'}
      </div>
    )
  }
}

export default withStyles(styles)(HoldItem)
