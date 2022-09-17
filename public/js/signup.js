
const signupFormHandler = async function (event) {
  // when a form submits we must prevent the default action which is a page refresh or redirect
  event.preventDefault();
// get the input form text inputs 
  const usernameEl = document.querySelector("#username-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");
  // post input data to this route
  fetch("/api/user", {
    method: "post",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    }),
    // send the input data as JSON data
    //this is also refered to as a mime type, which is defining the data type in the header of the document before any  application reads or uses the incoming data
    headers: { "Content-Type": "application/json" }
  })
    .then(function() {
      document.location.replace("/dashboard");
    })
    .catch(err => console.log(err));
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
