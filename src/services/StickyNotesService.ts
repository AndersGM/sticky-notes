import { Note } from "../models/Note";

class StickyNotesService {
    getStickyNotes(): Note[] {
        const storage = localStorage.getItem("stickyNotes");
        return storage ? JSON.parse(storage) : [];
    }

    save(note: Note) {
        if (note.id === 0) {
            note.id = Math.max(...this.getStickyNotes().map(mappedNote => mappedNote.id)) + 1
        }

        const notes = [
            ...this.getStickyNotes().filter(filteredNote => filteredNote.id !== note.id),
            note
        ]
        localStorage.setItem("stickyNotes", JSON.stringify(notes))
    }
}

export default new StickyNotesService()