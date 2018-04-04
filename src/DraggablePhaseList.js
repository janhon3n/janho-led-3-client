import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'
import HoldItem from './HoldItem'

const styles = theme => ({})

const SortableItem = SortableElement(
  ({ value, isEditable, selectForEdit, remove }) => {
    switch (value.type) {
      case 'hold':
        return (
          <HoldItem
            phase={value}
            isEditable={isEditable}
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
  ({ items, selectForEdit, remove, editableIndex }) => {
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

  shouldCancelStart = e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN')
      return true
  }

  render() {
    return (
      <SortableList
        shouldCancelStart={this.shouldCancelStart}
        items={this.props.phases}
        onSortStart={this.onSortStart}
        onSortEnd={this.onSortEnd}
        selectForEdit={this.selectForEdit}
        remove={this.remove}
        editableIndex={this.props.editableIndex}
      />
    )
  }
}

export default withStyles(styles)(DraggablePhaseList)
