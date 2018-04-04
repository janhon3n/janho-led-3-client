import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  ColorPreview: {
    margin: '20px',
  },
})

class ColorPreview extends Component {
  render() {
    let color = this.props.color
    let backgroundColor =
      'rgb(' +
      Math.round(color.r) +
      ', ' +
      Math.round(color.g) +
      ', ' +
      Math.round(color.b) +
      ')'
    return (
      <Paper
        style={{ backgroundColor: backgroundColor }}
        className={this.props.classes.ColorPreview + ' ' + this.props.className}
      />
    )
  }
}

export default withStyles(styles)(ColorPreview)
