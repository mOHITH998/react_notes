import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SideBarItems extends Component {
  render() {
    const { _note, _index, classes, selectedItemIndex } = this.props;

    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedItemIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSelection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            />
          </div>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => {
              this.deletetNote(_note);
            }}
          />
        </ListItem>
      </div>
    );
  }
  selectNote = (note, index) => this.props.selectNote(note, index);

  deletetNote = (note) => {
    if (window.confirm(`Are you sure want to delete ${note.title}`)) {
      return this.props.deleteNote(note);
    }
  };
}

export default withStyles(styles)(SideBarItems);
