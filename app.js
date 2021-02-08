

let searchClick = async() => {
    const searchValue = document.getElementById("search-box").value;
    const url = `https://api.lyrics.ovh/suggest/${searchValue}`;

    // load data:
    fetch(url)
        .then(response => response.json())
        .then(data => {
            songDisplay(data.data);
        })
        .catch(error => displayError("Something is wrong"))
    // let response = await fetch(url);
    // let data = await response.json();
    // songDisplay(data.data);
}
 
let songDisplay = (song) => {
    const songsDiv = document.getElementById("songs-div");
    document.getElementById("songs-div").innerHTML = '';
    song.forEach(songShow => {
        // console.log( songShow);
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songShow.title}</h3>
                        <p class="author lead">Album by <span> ${songShow.artist.name}</span></p>
                        <audio controls>
                             
                            <source src="${songShow.preview}" type="audio/mpeg">
                           
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${songShow.artist.name}','${songShow.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;

        songsDiv.appendChild(songDiv);
    });

}


let getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(url);
    // fetch(url)
    //     .then((response) => response.json())
    //     .then(data => {
    //         showLyric(data.lyrics);
    // })
   try {
           let response = await fetch(url);
		let data = await response.json();
		showLyric(data.lyrics);
   } catch (error) {
       displayError('Wrong')
   }



}

let showLyric = data => {
    const lyricsDiv = document.getElementById("lyric-show");
    lyricsDiv.innerText = data;

    // console.log(data);
}



let displayError = (msg) => {
    document.getElementById('error').innerText = msg;
}