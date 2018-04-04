import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import HoldEdit from './HoldEdit'
import HoldItem from './HoldItem'

const styles = theme => ({
  Program: {
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  List: {
    width: '200px',
    margin: '5px',
  },
})

class Program extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editableProgramIndex: 0,
    }
  }

  editProgram = newProgram => {
    let programs = this.props.programList.slice()
    programs[this.state.editableProgramIndex] = newProgram
    this.props.onEdit(programs)
  }

  selectEditable = index => {
    this.setState({ editableProgramIndex: index })
  }

  render() {
    let editableProgram = this.props.programList[
      this.state.editableProgramIndex
    ]
    return (
      <Paper className={this.props.classes.Program}>
        <div className={this.props.classes.List}>
          {this.props.programList.map((program, index) => {
            switch (program.type) {
              case 'hold':
                return (
                  <HoldItem
                    selectItem={() => {
                      this.selectEditable(index)
                    }}
                    inEdit={this.state.editableProgramIndex === index}
                    program={program}
                  />
                )
              default:
                return null
            }
          })}
        </div>
        {editableProgram.type === 'hold' && (
          <HoldEdit program={editableProgram} onEdit={this.editProgram} />
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(Program)
