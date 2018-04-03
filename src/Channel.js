import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Tabs, { Tab } from 'material-ui/Tabs'
import Manual from './Manual'
import Program from './Program'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  Tabs: {
    backgroundColor: theme.palette.primary.light,
  },
})

class Channel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 0,
    }
  }

  changeMode = (event, value) => {
    this.setState({ mode: value })
  }

  render() {
    return (
      <Paper>
        <Tabs
          className={this.props.classes.Tabs}
          value={this.state.mode}
          onChange={this.changeMode}
        >
          <Tab label="Manual color" />
          <Tab label="Program" />
        </Tabs>
        {this.state.mode === 0 && <Manual />}
        {this.state.mode === 0 && <Program />}
      </Paper>
    )
  }
}

export default withStyles(styles)(Channel)
