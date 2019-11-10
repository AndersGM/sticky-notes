import * as React from "react"
import { Note } from "../models/Note";
import StickyNote from "./StickyNote";
import stickyNotesService from "../services/StickyNotesService";

export class Dashboard extends React.Component<{}, { notes: Note[], currentNote: Note | null }>{
    state = {
        notes: [] as Note[],
        currentNote: null
    }

    save = (note: Note) => {
        this.setState({
            notes: [...this.state.notes.filter(filteredNote => filteredNote.id !== note.id), note]
        })

        return stickyNotesService.save(note)
    }

    componentDidMount() {
        stickyNotesService.getStickyNotes().then(notes => this.setState({
            notes: notes
        }))
    }

    newStickyNote = (event: React.MouseEvent) => {
        const id = this.state.notes.length + 1

        this.save({
            id: 0,
            contents: "",
            top: event.clientY,
            left: event.clientX
        }).then(note => this.editNote(note))

        event.preventDefault()
    }

    editNote = (note: Note) => this.setState({ currentNote: note })

    removeNote = (note: Note) => {
        stickyNotesService.remove(note).then(() => this.setState({
            notes: this.state.notes.filter(filteredNote => filteredNote.id !== note.id)
        }))
    }

    render() {
        return <div
            onDoubleClick={this.newStickyNote}
            style={
                {
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                }
            }
        >
            {this.state.notes.map(note => <StickyNote
                key={note.id}
                note={note}
                currentNote={this.state.currentNote}
                editNote={this.editNote}
                removeNote={this.removeNote}
                save={this.save} />)}
        </div>
    }
}