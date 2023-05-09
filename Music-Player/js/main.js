const music = new Audio('./mp3/1.mp3');


const songs = [
    {
        id: '1',
        songName: `Tanto la queria<br>
        <div class="subtitle">Andy y Lucas</div>`,
        poster: "img/1.jpg",
    },
    {
        id: '2',
        songName: `Any song<br>
        <div class="subtitle">Zero</div>`,
        poster: "img/2.jpg",
    },
    {
        id: '3',
        songName: `Butterfly<br>
        <div class="subtitle">Digimon</div>`,
        poster: "img/3.jpg",
    },
]

/*
Array.from(document.getElementsByClassName('songItem')).forEach((e,i) => {
    e.getElementsByTagName('img')[0].src = songs[0].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})
*/


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');


masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active');
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
    }
})







let playListPlay = document.getElementsByClassName('playListPlay');
let posterMasterPlayer = document.getElementById('posterMasterPlayer');
let title = document.getElementById('title');


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill')
    })
}

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105,105,105,.0)';
    })
}

let index = 0;
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        let index = el.target.id;
        music.src = `./mp3/${index}.mp3`
        posterMasterPlayer.src = `./img/${index}.jpg`
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        music.play();

        let songTitle = songs.filter((els) => {
            return els.id == index
        })

        songTitle.forEach((elss) => {
            let { songName } = elss;
            title.innerHTML = songName;
            //posterMasterPlayer.src = poster;
            //console.log(songName)
        })

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105,105,105,.2)';

        makeAllPlays();
        el.target.classList.remove('bi-play-circle-fill')
        el.target.classList.add('bi-pause-circle-fill')
        wave.classList.add('active');
    })
})


let currentStart = document.getElementById('currentStart')
let currentEnd = document.getElementById('currentEnd')

let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];



music.addEventListener('timeupdate', () => {
    let musicCurr = music.currentTime;
    let musicDur = music.duration;
    let min1 = Math.floor(musicDur / 60)
    let sec1 = Math.floor(musicDur % 60)


    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }
    currentEnd.innerText = `${min1}:${sec1}`

    let min2 = Math.floor(musicCurr / 60)
    let sec2 = Math.floor(musicCurr % 60)
    if (sec2 < 10) {
        sec2 = `0${sec2}`
    }
    currentStart.innerText = `${min2}:${sec2}`
    //console.log(musicDur)

    let progressBar = parseInt((musicCurr / musicDur) * 100);
    seek.value = progressBar;

    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    //bar2.style.background='#36e2ec'
    dot.style.left = `${seekBar}%`;

})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100
})

let volIcon = document.getElementById('volIcon');
let vol = document.getElementById('vol');
let volBar = document.getElementsByClassName('volBar')[0];
let volDot = document.getElementById('volDot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        volIcon.classList.remove('bi-volume-up-fill');
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.add('bi-volume-off-fill')
    }
    if (vol.value > 0) {
        volIcon.classList.remove('bi-volume-up-fill');
        volIcon.classList.add('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-off-fill')
    }
    if (vol.value > 50) {
        volIcon.classList.add('bi-volume-up-fill');
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-off-fill')
    }

    let vola = vol.value;
    volBar.style.width = `${vola}%`;
    volDot.style.left = `${vola}%`;
    music.volume = vola / 100

})

let back = document.getElementById('back');
let next = document.getElementById('next');

index = Array.from(document.getElementsByClassName('songItem')).length
console.log(index)

back.addEventListener('click', () => {
    index -= 1
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length
    }
    music.src = `./mp3/${index}.mp3`
    posterMasterPlayer.src = `./img/${index}.jpg`
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');


    let songTitle = songs.filter((els) => {
        return els.id == index
    })

    songTitle.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
        //posterMasterPlayer.src = poster;
        //console.log(songName)
    })

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105,105,105,.2)';

    makeAllPlays();
    //el.target.classList.remove('bi-play-circle-fill')
    //el.target.classList.add('bi-pause-circle-fill')
    //wave.classList.add('active');
})


next.addEventListener('click', () => {
    index++
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1
    }
    music.src = `./mp3/${index}.mp3`
    posterMasterPlayer.src = `./img/${index}.jpg`
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');


    let songTitle = songs.filter((els) => {
        return els.id == index
    })

    songTitle.forEach((elss) => {
        let { songName } = elss;
        title.innerHTML = songName;
        //posterMasterPlayer.src = poster;
        //console.log(songName)
    })

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105,105,105,.2)';

    makeAllPlays();
    //el.target.classList.remove('bi-play-circle-fill')
    //el.target.classList.add('bi-pause-circle-fill')
    //wave.classList.add('active');
})




let popSongLeft = document.getElementById("popSongLeft");
let popSongRight = document.getElementById("popSongRight");
let popSong = document.getElementsByClassName("popSong")[0];

let popArtLeft = document.getElementById("popArtLeft");
let popArtRight = document.getElementById("popArtRight");
let popArt = document.getElementsByClassName("popArt")[0];



popSongLeft.addEventListener('click', () => {
    popSong.scrollLeft -= 150;
})


popSongRight.addEventListener('click', () => {
    popSong.scrollLeft += 150;
})


popArtLeft.addEventListener('click', () => {
    popArt.scrollLeft -= 150;
})

popArtRight.addEventListener('click', () => {
    popArt.scrollLeft += 150;
})


