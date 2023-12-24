// Form.jsx
import { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
	render() {
		const { newNote, handleAddNote, handleInputChange, titleCount } =
			this.props;

		return (
			<div className="max-w-3xl border-white flex flex-col items-center mx-auto p-10">
				<h1 className="text-5xl">Personal Note-taking App</h1>
				<form onSubmit={handleAddNote} className="flex flex-col w-full">
					<div className="mt-10 mb-3 w-full">
						<p className="text-xs text-gray-400">{titleCount}/50</p>
						<input
							type="text"
							name="title"
							placeholder="Title"
							className="border-2 border-white rounded-md border-opacity-50 w-full px-3 py-1"
							value={newNote.title}
							onChange={handleInputChange}
						/>
					</div>
					<div className="mb-3 w-full">
						<textarea
							name="body"
							className="border-2 border-white rounded-md border-opacity-50 w-full px-3 py-1"
							placeholder="Input your note here..."
							rows="7"
							value={newNote.body}
							onChange={handleInputChange}
						/>
					</div>
					<button
						type="submit"
						className="border-2 border-white rounded-md border-opacity-50 w-full px-3 py-1">
						Add Note
					</button>
				</form>
			</div>
		);
	}
}

Form.propTypes = {
  newNote: PropTypes.object.isRequired,
  handleAddNote: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  titleCount: PropTypes.number.isRequired,
};
export default Form;
