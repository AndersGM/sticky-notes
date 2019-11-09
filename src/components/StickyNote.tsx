import * as React from "react";
import { Note } from "../models/Note";
import './StickyNote.css';

export default class StickyNote extends React.Component<{ note: Note, save: Function }, { isEditing: boolean, contents: string, left: number, top: number }> {
    constructor(props: any) {
        super(props)
        this.state = {
            isEditing: false,
            contents: this.props.note.contents,
            top: this.props.note.top,
            left: this.props.note.left
        }
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
        note.top = this.state.top
        note.left = this.state.left
        this.props.save(note)
        this.setState({ isEditing: false })
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
        this.setState({ isEditing: true })
        event.stopPropagation()
        event.preventDefault()
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
            <div onMouseDown={this.mouseDown} className="sticky-note-header">Note</div>

            {this.state.isEditing ? <div className="sticky-note-editarea">
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