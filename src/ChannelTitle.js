import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import * as Color from 'color'

export default class ChannelTitle extends Component {
  style = {
    boxShadow: '-5px -5px 5px black',
    display: 'flex',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
    padding: '15px 5px 15px 5px',
    margin: '5px',
    marginRight: '0px',
    zIndex: -1,
  }

  render() {
    let color = Color(this.props.color)
    let style = Object.assign({}, this.style, {
      backgroundColor: color.hex(),
    })
    color.isDark() ? (style.color = 'white') : (style.color = 'black')
    return (
      <Typography
        ref={comp => {
          this.ref = comp
        }}
        variant="title"
        style={style}
      >
        {this.props.title}
      </Typography>
    )
  }
}
