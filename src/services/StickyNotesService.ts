import { Note } from "../models/Note";

class StickyNotesService {
    async getStickyNotes(): Promise<Note[]> {
        const storage = localStorage.getItem("stickyNotes");
        return storage ? JSON.parse(storage) : [];
    }

    async save(note: Note) {
        const existingNotes = await this.getStickyNotes()
        if (note.id === 0) {
            note.id = Math.max(...existingNotes.map(mappedNote => mappedNote.id)) + 1
        }

        const notes = [
            ...existingNotes.filter(filteredNote => filteredNote.id !== note.id),
            note
        ]
        localStorage.setItem("stickyNotes", JSON.stringify(notes))

        return note
    }

    async remove(note: Note) {
        localStorage.setItem("stickyNotes", JSON.stringify((await this.getStickyNotes()).filter(filteredNote => filteredNote.id !== note.id)))
    }
}

export default new StickyNotesService()