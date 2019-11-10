import * as React from "react";
import { Note } from "../models/Note";
import './StickyNote.css';

export default class StickyNote extends React.Component<{ note: Note, save: Function, currentNote: Note | null, editNote: Function, removeNote: Function }, { contents: string, left: number, top: number }> {
    constructor(props: any) {
        super(props)
        this.state = {
            contents: this.props.note.contents,
            top: this.props.note.top,
            left: this.props.note.left
        }
    }

    togglEditing = () => {
        this.props.currentNote && this.props.currentNote.id === this.props.note.id ? this.props.editNote(null) : this.props.editNote(this.props.note)
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.name === "contents") {
            this.setState({ contents: event.currentTarget.value })
        }
    }

    save = () => {
        const note = this.props.note
        note.contents = this.state.contents
        note.top = this.state.top
        note.left = this.state.left
        this.props.save(note)
        this.props.editNote(null)
    }

    cancel = () => {
        this.setState({ contents: this.props.note.contents })
        this.togglEditing()
    }

    startDragging = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    mouseDown = (event: React.MouseEvent) => {
        event.preventDefault()

        document.onmouseup = () => {
            document.onmouseup = null
            document.onmousemove = null
            this.save()
        }

        document.onmousemove = (event) => {
            event.preventDefault()

            this.setState({
                top: event.clientY,
                left: event.clientX
            })
        }
    }

    edit = (event: React.MouseEvent) => {
        this.props.editNote(this.props.note)
        event.stopPropagation()
        event.preventDefault()
    }

    remove = () => {
        if (window.confirm(`Remove note?`)) {
            this.props.removeNote(this.props.note)
        }
    }

    render() {
        return <div
            style={{
                top: this.state.top,
                left: this.state.left,
            }}
            className="sticky-note"
            id={`note-${this.props.note.id}`}
        >
            <div onMouseDown={this.mouseDown} className="sticky-note-header">
                Note
                (<a onClick={this.remove} style={{ color: "red", cursor:"pointer" }}>X</a>)
            </div>

            {this.props.currentNote === this.props.note ? <div className="sticky-note-editarea">
                <textarea
                    name="contents"
                    value={this.state.contents}
                    onChange={this.handleChange}
                />
                <div
                    className="sticky-note-actions"
                >
                    <button type="button" onClick={this.save}>Save</button>
                    <button type="button" onClick={this.cancel}>Cancel</button>
                </div>
            </div> : <div className="sticky-note-contents"
                onDoubleClick={this.edit}
            >{this.props.note.contents}</div>}
        </div>
    }
}