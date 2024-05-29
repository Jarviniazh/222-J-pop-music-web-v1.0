

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

//Create an event handler to run when the page is loaded.  Make sure you don’t do anything to the DOM until it’s fully loaded.
window.addEventListener("DOMContentLoaded", function () {
  console.log("The page is fully loaded! Begin to modify the DOM");

  let menu = document.querySelector("#menu");
  let selectedArtistTitle = document.querySelector("#selected-artist");
  let tbody = document.querySelector("#songs");

  //When the button is clicked, show that Artist’s Name, Links, and Songs.
  //Write a function that will show a list of songs in the <tbody>…</tbody> based on the chosen Artist
  function displaySongs(artistId) {
    //Update the text of the Selected Artist above your table with the Artist’s Name and create anchor elements for all of the Artists Links (i.e., you should be able to open these links to see more info about the artist)
    let artist = artists.find((a) => a.artistId === artistId);
    selectedArtistTitle.innerHTML = `${artist.name} (`;
    let artistUrl = artist.urls
      .map((url) => {
        return `<a href="${url.url}" style="text-decoration: underline;">${url.name}</a>`;
      })
      .join(", ");
    selectedArtistTitle.innerHTML += `${artistUrl} )`;

    //Clear the current <tr>…</tr> rows from the <tbody>…</tbody>.
    tbody.innerHTML = "";

    /* Filter your Songs Array (i.e., use Array.prototype.filter()) to get:
            i.	All Songs for the chosen Artist. 
            ii.	All Songs that are NOT flagged
        */
    let artistSongs = songs.filter((song) => song.artistId === artistId && !song.explicit);

    // Sort the songs by title in ascending order
    artistSongs.sort((a, b) => a.title.localeCompare(b.title));

    //Loop (use Array.prototype.forEach()) over your filtered song list and add them to the table’s body using DOM methods
    artistSongs.forEach((song) => {
      //Create a <tr> element
      let row = document.createElement("tr");

      //Add a click handler to your <tr> that will console.log() the song whenever the user clicks it
      row.addEventListener("click", function () {
        console.log(`Clicked the song: ${song.title}`);
      });

      //Create <td> elements for the song’s name, year, and duration.
      let title = document.createElement("td");
      let year = document.createElement("td");
      let songDuration = document.createElement("td");

      //Make the song’s title a link to the URL for the song, which opens in a new tab or window
      title.innerHTML = `<a href="${song.url}" target="_blank" style="text-decoration: underline;">${song.title}</a>`;
      year.innerText = song.year;

      let duration = song.duration;
      //Convert the duration in seconds to a value in mintues:seconds
      songDuration.innerText =
        Math.floor(duration / 60) + ":" + (duration % 60 < 10 ? "0" : "") + (duration % 60);

      //Append these <td> elements to the <tr>
      row.appendChild(title);
      row.appendChild(year);
      row.appendChild(songDuration);

      //Append this <tr> to the <tbody>
      tbody.appendChild(row);
    });
  }

  //Create all of the buttons for your app’s Artists
  //Loop through all of your Artist objects and create a <button> element for each, adding it to the <nav id=”menu”>…</nav>
  artists.forEach((artist) => {
    let button = document.createElement("button");
    //Use each Artist’s name for the button’s text
    button.textContent = artist.name;
    button.addEventListener("click", function () {
      displaySongs(artist.artistId);
      console.log(`Clicked the artist: ${artist.name}`);
    });
    menu.appendChild(button);
  });

  //By default, if no artist is selected display the first artist infoBy default, you should use your first Artist on load
  if (artists.length > 0) {
    displaySongs(artists[0].artistId);
    console.log("Default display: " + artists[0].name);
  }
});
