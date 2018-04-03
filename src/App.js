import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

import Channel from './Channel'
import { withStyles } from 'material-ui/styles'

const styles = {
  App: {
    margin: '15px',
  },
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelCount: 4,
    }
  }

  render() {
    return (
      <div className={this.props.classes.App}>
        <Grid container spacing={24}>
          {[...Array(this.state.channelCount)].map((e, i) => {
            return (
              <Grid item xs={6}>
                <Channel />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(App)
