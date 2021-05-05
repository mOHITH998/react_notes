import React, { Component } from "react";
import Editor from "./editor/Editor";
import Sidebar from "./sidebar/SideBar";
import "./App.css";

import firebase from "firebase";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedItemIndex: null,
      selectedNote: null,
      notes: null,
    };
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar
          selectedItemIndex={this.state.selectedItemIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          noteUpdate={this.noteUpdate}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <Editor
            selectedNote={this.state.selectedNote}
            selectedItemIndex={this.state.selectedItemIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  };

  selectNote = (note, index) =>
    this.setState({ selectedItemIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
    const newNoteFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const newID = newNoteFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedItemIndex: newNoteIndex,
    });
  };
  deleteNote = (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    if (this.state.selectedItemIndex === noteIndex) {
      this.setState({ selectedItemIndex: null, selectedNote: null });
    }
    this.state.notes.length > 1
      ? this.selectNote(
          this.state.notes[this.state.selectedItemIndex - 1],
          this.state.selectedNote - 1
        )
      : this.setState({
          selectedItemIndex: null,
          selectedNote: null,
        });

    firebase.firestore().collection("notes").doc(note.id).delete();
  };
}

export default App;
