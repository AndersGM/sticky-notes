import * as React from "react"
import { Note } from "../models/Note";
import StickyNote from "./StickyNote";

export class Dashboard extends React.Component<{}, { notes: Note[] }>{
    state = {
        notes: [
            { id: 1, contents: "Test note", left: 100, top: 100 },
            { id: 2, contents: "Test note", left: 300, top: 300 }
        ]
    }

    save = (id: number) => (note: Note) => this.setState({
        notes: [...this.state.notes.filter(note => note.id !== id), note]
    })

    newStickyNote = (event: React.MouseEvent) => {
        this.setState({
            notes: [...this.state.notes, {
                id: this.state.notes.length + 1,
                contents: "",
                top: event.clientY,
                left: event.clientX
            }]
        });

        event.preventDefault();
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
                save={() => this.save(note.id)} />)}
        </div>
    }
}