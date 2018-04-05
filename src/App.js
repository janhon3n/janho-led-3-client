import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import primaryColor from 'material-ui/colors/grey'
import secondaryColor from 'material-ui/colors/deepPurple'
import Channel from './Channel'
import { withStyles } from 'material-ui/styles'
import TempoControl from './TempoControl'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primaryColor[300],
      main: primaryColor[400],
      dark: primaryColor[700],
    },
    secondary: {
      light: secondaryColor[200],
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  MainTitle: {
    textShadow: '1px 1px 2px ' + theme.palette.secondary.dark,
  },
}

class App extends Component {
  channelRefs = []
  tickerInterval = null

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.state = {
      running: false,
      tempo: 100,
      ticker: 0,
      openChannels: [0],
    }
  }

  componentDidMount() {
    this.tick() // Start to tick
  }

  tick = () => {
    if (this.state.running) {
      this.state.openChannels.forEach(c => {
        try {
          this.channelRefs[c].tick()
        } catch (err) {
          console.log('Channel ' + c + ' ticking failed')
          console.log(err)
        }
      })
      this.setState(prevState => {
        let newValue = (prevState.ticker + 1) % 4
        return { ticker: newValue }
      })
    }
    setTimeout(this.tick, 1 / this.state.tempo * 60 * 1000)
  }

  addRef = (comp, channelNumber) => {
    this.channelRefs[channelNumber] = comp
  }
  setTempo = tempo => {
    this.setState({ tempo: tempo })
  }

  toggleRunning = () => {
    this.setState(prevState => {
      return { running: !prevState.running }
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.App}>
          <AppBar position="static">
            <Toolbar className={this.props.classes.ToolBar}>
              <Typography
                className={this.props.classes.MainTitle}
                variant="display1"
                color="inherit"
              >
                Janho LED Controller
              </Typography>
              <Button
                variant={this.state.running ? 'flat' : 'raised'}
                color="secondary"
                size="large"
                onClick={this.toggleRunning}
              >
                {this.state.running ? 'Stop' : 'Start'}
              </Button>
              <TempoControl
                ticker={this.state.ticker}
                tempo={this.state.tempo}
                onChange={this.setTempo}
              />
            </Toolbar>
          </AppBar>
          <Grid container justify="center">
            {this.state.openChannels.map((channelNumber, i) => {
              return (
                <Grid item xs={12} lg={10} xl={6}>
                  <Channel
                    innerRef={comp => {
                      this.addRef(comp, channelNumber)
                    }}
                    channelNumber={channelNumber}
                    tempo={this.state.tempo}
                  />
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
