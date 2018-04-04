import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import HoldEdit from './HoldEdit'
import DraggablePhaseList from './DraggablePhaseList'

const styles = theme => ({
  Program: {
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
})

class Program extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editablePhaseIndex: null,
    }
  }

  editPhase = editedPhase => {
    let program = this.props.program.slice()
    program[this.state.editablePhaseIndex] = editedPhase
    this.props.onEdit(program)
  }

  selectEditable = index => {
    this.setState({ editablePhaseIndex: index })
  }

  removePhase = index => {
    let newProgram = this.props.program.slice()
    newProgram = newProgram.splice(index, 1)
    this.selectEditable(null)
    this.props.onEdit(newProgram)
  }

  changePhaseOrder = newOrder => {
    this.props.onEdit(newOrder)
  }
  render() {
    let editablePhase =
      this.state.editablePhaseIndex !== null
        ? this.props.program[this.state.editablePhaseIndex]
        : null
    return (
      <Paper className={this.props.classes.Program}>
        <DraggablePhaseList
          phases={this.props.program}
          onOrderChange={this.changePhaseOrder}
          onSelect={this.selectEditable}
          onRemove={this.removePhase}
          editableIndex={this.state.editablePhaseIndex}
        />
        {editablePhase !== null &&
          editablePhase.type === 'hold' && (
            <HoldEdit phase={editablePhase} onEdit={this.editPhase} />
          )}
      </Paper>
    )
  }
}

export default withStyles(styles)(Program)
