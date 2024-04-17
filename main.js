const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')



//sira
let index

//döngü
let loop = true

// şarkı listesi
const songsList = [
    {
        name: 'Düldül',
        link: "assets/düldül.mp3",
        artist: "Bariş Manço - Cem Karaca",
        image: 'assets/cem-karaca.jpeg'
    },
    {
        name: 'Bir Beyaz Orkide',
        link: "assets/orkide.mp3",
        artist: "Cihan Mürtezaoglu",
        image: 'assets/cihan-mürteza.jpeg'
    },
    {
        name: 'Ne Farkeder',
        link: "assets/ne-farkeder.mp3",
        artist: "Gökhan Özen",
        image: 'assets/Gokhan_ozen.jpeg'
    },
    {
        name: 'Bu Saatten Sonra',
        link: "assets/bssonra.mp3",
        artist: "İkilem",
        image: 'assets/ikilem.jpeg'
    },
    {
        name: 'Kapalı Kapılar',
        link: "assets/kapali-kapilar.mp3",
        artist: "Sefo",
        image: 'assets/sefo.jpeg'
    },
   {
        name:'Sen Affetsen',
        link:"assets/affetmem.mp3",
        artist:"Bergen",
        image:'assets/bergen.jpeg'
    },
    {
        name:'Avutsun Bahaneler',
        link:"assets/avutsunbahaneler.mp3",
        artist:"Sagopa Kajmer",
        image:'assets/sago.jpeg'
    },
    {
        name:'Belki de',
        link:"assets/belkide.mp3",
        artist:"Dedublüman",
        image:'assets/dedüblüman.jpeg'
    },
    {
        name:'Eyvah Neye Yarar',
        link:"assets/eyvahneyeyarar.mp3",
        artist:"İbrahim Tatlıses",
        image:'assets/ibrahim.jpeg'
    },
    {
        name:'Bu Kez Anladım',
        link:"assets/bukezanladım.mp3",
        artist:"Emre Aydın",
        image:'assets/emreaydın.jpeg'
    },
    {
        name:'Derdin Ne?',
        link:"assets/derdinne.mp3",
        artist:"İsmail Altunsaray",
        image:'assets/ismailaltunsaray.jpeg'
    },
    {
        name:'Bahça Duvarından Aştım',
        link:"assets/bahçaduvarı.mp3",
        artist:"Neşet Ertaş",
        image:'assets/neşetertaş.jpeg'
    }

]

//sarkı atama listesi
const setSong = (arrayIndex) =>{

    let{name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src= image

    audio.onloadeddata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)//240 
    }
    playAudio()

    playListContainer.classList.add('hide')
}

//oynatma listesini göster
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

//oynatma listesini kapat
closeButton.addEventListener('click', ()=>{
    playListContainer.classList.add('hide')
})

//tekrar tıklanıldığında
repeatButton.addEventListener('click',()=>{
    if(repeatButton.classList.contains('active')){
       repeatButton.classList.remove('active')
       audio.loop = false
       console.llog('tekrar kapatıldı')
    }else{
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acildi')
    }
})

//kariştitici tiklanildiğinda
shuffleButton.addEventListener('click', ()=>{
    if(shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = false
        console.log('karistirma kapali')
    } else{
        shuffleButton.classList.add('active')
        loop = true
        console.log('kariştirma açik')

    }
})

//ilerleme cubuğuna tiklanildiğinda
progressBar.addEventListener('click', (event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    console.log(progressBar.offsetWidth)
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    playAudio()
})

//zaman tutucu
setInterval(() =>{
   currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
},1000);

//sarkıyı oynat
const playAudio = () =>{
    audio.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}

//sarkıyı durdur
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//sonraki sarkı
const nextSong = () =>{
    if(loop) {
        //dongu acıksa
        if(index == (songsList.length - 1)){
            index = 0
        }else{
            index = index + 1
        }
        setSong(index)
    }else{
        //karıştırıcı acıksa
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

//önceki sarkı
const previousSong = () =>{
  if(index > 0 ){
    pauseAudio()
    index = index - 1
  }else{
    index = songsList.length - 1
  }

  setSong(index)
} 

//sarkı bittiğinde
audio.onended = () => {
    nextSong()
}

//zaman düzenlemesi
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? '0' + second  : second
    return `${minute}:${second}`
}

//sarkı suresi değiştikce
audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//sarkı listesini olustur
   const initPlayList = () =>{
    for (const i in songsList){
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songsList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songsList[i].artist} 
        </span>
        </div>
        </li>`
    }
    }
   

//oynata tıklanıldığında
playButton.addEventListener('click',playAudio)

//dura tıklanıdığında
pauseButton.addEventListener('click',pauseAudio)

//sonrakine gec tıklanıldığında
nextButton.addEventListener('click',nextSong)

//önceye git tıklanılırsa
prevButton.addEventListener('click',previousSong)


window.onload = ()=>{
    index = 0
    setSong(index)
    pauseAudio()
    initPlayList()
}
