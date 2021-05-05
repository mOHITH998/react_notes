import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritems/SideBarItems";

export class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      addNotes: false,
      title: null,
    };
  }
  render() {
    const { notes, classes, selectedItemIndex } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button className={classes.newNoteBtn} onClick={this.newNoteBtn}>
            {this.state.addNotes ? "Cancel" : "New Note"}
          </Button>
          {this.state.addNotes ? (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter the title"
                onKeyUp={(e) => this.updateTitle(e.target.value)}
              ></input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}
              >
                Submit Note
              </Button>
            </div>
          ) : null}

          <List>
            {notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedItemIndex={selectedItemIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  ></SidebarItemComponent>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  newNoteBtn = () => {
    //flips to either true or false
    this.setState({ title: null, addNotes: !this.state.addNotes });
  };
  updateTitle = (txt) => {
    this.setState({ title: txt });
  };
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (n) => this.props.deleteNote(n);

  newNote = () => {
    this.props.newNote(this.state.title);
    //after adding new note reset state
    this.setState({ title: null, addNotes: false });
  };
}

export default withStyles(styles)(SideBar);
