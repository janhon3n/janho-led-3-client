import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import primaryColor from 'material-ui/colors/grey'
import secondaryColor from 'material-ui/colors/deepPurple'
import Channel from './Channel'
import { withStyles } from 'material-ui/styles'
import { TextField } from 'material-ui'
import { LinearProgress } from 'material-ui/Progress'
import TempoControl from './TempoControl'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primaryColor[300],
      main: primaryColor[400],
      dark: primaryColor[700],
    },
    secondary: {
      light: secondaryColor[300],
      main: secondaryColor[500],
      dark: secondaryColor[700],
    },
  },
})

const styles = {
  App: {
    margin: '0px',
  },
  AppBar: {},
  ToolBar: {
    backgroundColor: theme.palette.secondary.light,
    display: 'flex',
    justifyContent: 'space-between',
  },
  BeatProgress: {
    backgroundColor: theme.palette.primary.light,
    height: '2px',
  },
}

class App extends Component {
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.state = {
      tempo: 100,
      ticker: 0,
      channelCount: 4,
    }
  }

  componentDidMount() {
    this.tickerInterval = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.setState(prevState => {
      let newValue = (prevState.ticker + 1) % 4
      return { ticker: newValue }
    })
  }

  setTempo = tempo => {
    this.setState({ tempo: tempo })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.App}>
          <AppBar position="static">
            <Toolbar className={this.props.classes.ToolBar}>
              <Typography variant="display1" color="inherit">
                Janho LED Controller
              </Typography>
              <TempoControl
                ticker={this.state.ticker}
                tempo={this.state.tempo}
                onChange={this.setTempo}
              />
            </Toolbar>
          </AppBar>
          <Grid container>
            {[...Array(this.state.channelCount)].map((e, i) => {
              return (
                <Grid item xs={12} lg={6}>
                  <Channel />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
