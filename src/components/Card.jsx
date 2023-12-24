// create card component contain note object
import { Component } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

// use class
class Card extends Component {
  
	// handle archive button click
	handleArchiveClick = () => {
		this.props.archiveNote();
  }
	// handle delete button click
	handleDeleteClick = () => {
		// call the deleteNote function from props
		this.props.deleteNote();
	};

	render() {
		// get the note object from props
		const { note } = this.props;

		return (
			<div className={`border-2 border-gray-200 rounded-md shadow-md border-opacity-50 p-5 ${note.archived ? 'opacity-40' : ''}`}>
				<div className="flex flex-col items-start justify-start">
					<h2 className="text-2xl">{note.title}</h2>
					<div className="text-xs text-gray-400">
						<p>
							Created on{" "}
							{format(new Date(note.createdAt), "MMM dd, yyyy")}
						</p>
						<p>at {format(new Date(note.createdAt), "hh:mm a")}</p>
					</div>
				</div>
				<div className="my-3 text-justify">
					<p className="card-text">{note.body}</p>
				</div>
				<div className="card-footer">
					<button
						className="border-2 border-yellow-200 rounded-md border-opacity-50 px-3 py-1 mr-2 text-yellow-200"
						onClick={this.handleArchiveClick}>
						{note.archived ? "Unarchive" : "Archive"}
					</button>
					<button
						className="border-2 border-red-400 rounded-md border-opacity-50 px-3 py-1 mr-2 text-red-400"
						onClick={this.handleDeleteClick}>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

// define prop types
Card.propTypes = {
	note: PropTypes.object.isRequired,
	deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
};

// export Card component
export default Card;
