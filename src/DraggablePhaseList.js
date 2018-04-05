import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'
import HoldItem from './HoldItem'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  List: { margin: '5px' },
  Scrollable: {
    maxHeight: '700px',
    overflowY: 'auto',
  },
})

const SortableItem = SortableElement(
  ({ value, isEditable, isActive, selectForEdit, remove }) => {
    switch (value.type) {
      case 'hold':
        return (
          <HoldItem
            phase={value}
            isEditable={isEditable}
            isActive={isActive}
            selectForEdit={selectForEdit}
            remove={remove}
          />
        )
      default:
        return null
    }
  }
)

const SortableList = SortableContainer(
  ({ items, selectForEdit, remove, editableIndex, phaseIndex }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            remove={() => remove(index)}
            selectForEdit={() => selectForEdit(index)}
            isEditable={editableIndex === index}
            isActive={phaseIndex === index}
          />
        ))}
      </div>
    )
  }
)
class DraggablePhaseList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  onSortStart = ({ node, index }) => {
    this.props.onSelect(null)
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    let list = this.props.phases.slice()
    list = arrayMove(list, oldIndex, newIndex)
    this.props.onOrderChange(list)
  }

  selectForEdit = index => {
    this.props.onSelect(index)
  }

  remove = index => {
    this.props.onRemove(index)
  }

  createPhase = type => {
    return {
      type: type,
      color: { r: 255, g: 0, b: 0 },
      duration: 1,
    }
  }

  shouldCancelStart = e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN')
      return true
  }

  render() {
    return (
      <div className={this.props.classes.List}>
        <div className={this.props.classes.Scrollable}>
          <SortableList
            shouldCancelStart={this.shouldCancelStart}
            items={this.props.phases}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
            selectForEdit={this.selectForEdit}
            remove={this.remove}
            editableIndex={this.props.editableIndex}
            phaseIndex={this.props.phaseIndex}
          />
        </div>
        <Toolbar>
          <Typography style={{ marginRight: '10px' }} variant="body2">
            Add phase
          </Typography>
          <Button
            onClick={() =>
              this.props.onAdd({
                type: 'hold',
                color: { r: 255, g: 0, b: 0 },
                duration: 1,
              })
            }
          >
            Hold
          </Button>
          <Button
            onClick={() =>
              this.props.onAdd({
                type: 'blink',
                color: { r: 255, g: 0, b: 0 },
                duration: 1,
              })
            }
          >
            Blink
          </Button>
          <Button
            onClick={() =>
              this.props.onAdd({
                type: 'fade',
                color: { r: 255, g: 0, b: 0 },
                duration: 1,
              })
            }
          >
            Fade
          </Button>
        </Toolbar>
      </div>
    )
  }
}

export default withStyles(styles)(DraggablePhaseList)
