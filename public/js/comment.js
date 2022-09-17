// similar to the new.js blog post code
// basically the same logic, except a different route to post comments
const commentFormHandler = async function (event) {
	event.preventDefault();

	const postId = document.querySelector('input[name="post-id"]').value;
	const body = document.querySelector('textarea[name="comment-body"]').value;

	if (body) {
		await fetch("/api/comment", {
			method: "POST",
			body: JSON.stringify({
				postId,
				body,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// reload the same page with new comment added
		document.location.reload();
	}
};

document.querySelector("#new-comment-form").addEventListener("submit", commentFormHandler);
