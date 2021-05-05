import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import "react-quill/dist/quill.snow.css";

export class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      id: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.selectedNote.title,
      text: this.props.selectedNote.body,
      id: this.props.selectedNote.id,
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        text: this.props.selectedNote.body,
        id: this.props.selectedNote.id,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note Title..."
          value={this.state.title ? this.state.title : ""}
          onChange={(e) => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    );
  }
  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
  };

  updateBody = async (val) => {
    await this.setState({ text: val });
    // after waiting for updating state; return update fn
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 1500);
}
export default withStyles(styles)(Editor);
