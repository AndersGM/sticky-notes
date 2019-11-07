import * as React from "react";
import { Note } from "../models/Note";
import '../StickyNote.css';

export default class StickyNote extends React.Component<{ note: Note, save: Function }, { isEditing: boolean, contents: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isEditing: false,
            contents: this.props.note.contents
        };
    }

    togglEditing = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.name === "contents") {
            this.setState({ contents: event.currentTarget.value })
        }
    }

    save = () => {
        const note = this.props.note
        note.contents = this.state.contents
        this.props.save(note)
        this.togglEditing()
    }

    cancel = () => {
        this.setState({ contents: this.props.note.contents })
        this.togglEditing()
    }

    startDragging = (event: React.MouseEvent) => {
        event.preventDefault();
    }

    stopDragging = (event: React.MouseEvent) => {
        event.preventDefault();
    }

    edit = (event: React.MouseEvent) => {
        this.setState({ isEditing: true })
        event.stopPropagation()
        event.preventDefault()
    }

    render() {
        return <div
            onDoubleClick={this.edit}
            style={{
                backgroundColor: 'yellow',
                height: 200,
                width: 200,
                top: this.props.note.top,
                left: this.props.note.left,
                position: "absolute"
            }}
        >
            {this.state.isEditing ? <div>
                <textarea
                    name="contents"
                    value={this.state.contents}
                    onChange={this.handleChange}
                    className="sticky-note"
                />
                <p>
                    <button type="button" onClick={this.save}>Save</button>
                    <button type="button" onClick={this.cancel}>Cancel</button>
                </p>
            </div> : <div className="sticky-note">{this.props.note.contents}</div>}
        </div>
    }
}