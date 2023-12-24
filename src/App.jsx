import { Component } from "react";
import Card from "./components/Card";
import Form from "./components/Form";

class NoteApp extends Component {
	state = {
		notes: [
			{
				id: 1,
				title: "Babel",
				body: "Babel is an open-source tool used to transform ECMAScript 2015+ syntax into a compatible version for older JavaScript engines. It is often used with the latest syntax, including JSX.",
				archived: false,
				createdAt: "2022-04-14T04:27:34.572Z",
			},
		],
		newNote: {
			title: "",
			body: "",
		},
		titleCount: 0,
	};

	// Handle form submission to add a new note
	handleAddNote = (e) => {
		e.preventDefault();
		const { notes, newNote } = this.state;
		// add validation
		if (!newNote.title || !newNote.body) {
			alert("Please fill the title and body fields");
			return;
		}
		// Ensure uniqueness for the note IDs, possibly using timestamps
		const newNoteWithId = {
			...newNote,
			id: +new Date(),
			createdAt: new Date().toISOString(),
			archived: false,
		};

		// Update the state with the new note
		this.setState({
			notes: [...notes, newNoteWithId],
			newNote: { title: "", body: "" },
		});
	};

	// Handle input changes for the new note form
	handleInputChange = (e) => {
		const { name, value } = e.target;
		// update title count
		if (name === "title") {
			let titleCount = value.length;
			this.setState({ titleCount });
		}
		if (this.state.titleCount > 32) {
			alert("Title should not be more than 32 characters");
			return;
		}
		this.setState((prevState) => ({
			newNote: {
				...prevState.newNote,
				[name]: value,
			},
		}));
	};

	// Handle note deletion
	handleDeleteNote = (id) => {
		const { notes } = this.state;
		const updatedNotes = notes.filter((note) => note.id !== id);
		this.setState({ notes: updatedNotes });
	};

	//  handle archive note
	handleArchiveNote = (id) => {
		const { notes } = this.state;
		const updatedNotes = notes.map((note) => {
			if (note.id === id) {
				return {
					...note,
					archived: !note.archived,
				};
			}
			return note;
		});
		this.setState({ notes: updatedNotes });
	};

	// Render method to display the UI
	render() {
		const { notes, newNote, titleCount } = this.state;

		return (
			<div className="min-h-screen pt-36 mx-auto">
				{/* Form to add a new note */}
				<Form
					newNote={newNote}
					handleAddNote={this.handleAddNote}
					handleInputChange={this.handleInputChange}
					titleCount={titleCount}
				/>
				{/* Display the list of notes */}
				{notes.length > 0 ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto px-8">
							{notes.map(
								(note) =>
									// check if not archived
									!note.archived && (
										<Card
											key={note.id}
											note={note}
											deleteNote={() =>
												this.handleDeleteNote(note.id)
											}
											archiveNote={() =>
												this.handleArchiveNote(note.id)
											}
										/>
									)
							)}
						</div>
						<div className="text-center mt-10 ">
							<h1 className="text-2xl">Archived Notes</h1>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto px-8 mb-10">
							{notes.map(
								(note) =>
									note.archived && (
										<Card
											key={note.id}
											note={note}
											deleteNote={() =>
												this.handleDeleteNote(note.id)
											}
											archiveNote={() =>
												this.handleArchiveNote(note.id)
											}
										/>
									)
							)}
						</div>
					</>
				) : (
					<p>No notes available.</p>
				)}
			</div>
		);
	}
}

// Export the NoteApp component
export default NoteApp;
