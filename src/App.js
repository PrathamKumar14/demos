import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [imageLink, setImageLink] = useState("");
  const [emotions, setEmotions] = useState([]);

  function fetchData() {
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
          source: imageLink,
          sourceType: "url",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEmotions(data.emotions[0]);
        console.log(emotions);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
          setImageLink("");
        }}
        action=""
      >
        <label for="url">Image Link</label>
        <input
          onChange={(event) => setImageLink(event.target.value)}
          type="url"
          name="url"
          id="url"
          value={imageLink}
        />
        <input type="submit" value="Send Request" />
      </form>
    </div>
  );
}

export default App;
