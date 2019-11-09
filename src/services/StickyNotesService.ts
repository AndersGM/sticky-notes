import { Note } from "../models/Note";

class StickyNotesService {
    getStickyNotes(): Note[] {
        const storage = localStorage.getItem("stickyNotes");
        return storage ? JSON.parse(storage) : [];
    }

    save(note: Note) {
        const notes = [...this.getStickyNotes().filter(filteredNote => filteredNote.id !== note.id), note]
        localStorage.setItem("stickyNotes", JSON.stringify(notes))
    }
}

export default new StickyNotesService()