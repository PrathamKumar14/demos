import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(
    fetch(
      "https://facial-emotion-recognition.p.rapidapi.com/cloudVision/facialEmotionRecognition?source=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1418652395119153153%2FdvMUbHmM_400x400.jpg&sourceType=url",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "facial-emotion-recognition.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({
          source:
            "https://pbs.twimg.com/profile_images/1418652395119153153/dvMUbHmM_400x400.jpg",
          sourceType: "url",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      }),
    []
  );

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(event.target.url.value);
    setImageLink(event.target.url.value);
    console.log(imageLink);
  }

  return (
    <div>
      <h1>Start</h1>
      <form onSubmit={handleFormSubmit} action="">
        {/* <label for="url">Image Link</label> */}
        <input type="url" name="url" id="url" />
        <input type="submit" value="Send Request" />
      </form>
    </div>
  );
}

export default App;
