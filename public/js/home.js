

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const upload_btn = $('.upload-btn')
const options_search = $('.search_options')
const search_btn = $('.search-btn')
const upload_record_btn = $('.upload_record-btn')
const upload_file = $('.upload_record-input')
const mic_btn = $('.mic-btn')
const list_songs_search = $('.list_songs-search')
const audioRecorder = $('.auidorecord')
const form = $('.form')
const form_submit = $('.form-submit')


const headername = $('.dashbaoard_header-name')
const cdthumer = $('.dashbaoard_cd-thumer')
const audio = $('#audio')
const dashbaoard_cd = $('.dashbaoard_cd')
const playbtn = $('.btn-play')
const player = $('.player')
const dashbaoard_range = $('#dashbaoard_range')
const nextbtn = $('.btn-next')
const prebtn = $('.btn-back')
const randumbtn = $('.btn-randum')
const repebtn = $('.btn-repeat')
const playlist = $('.playlist')
const PLAYER_STORAGE_KEY = 'APP'
const deletebtn = $('.delete_icon')
const deleteicon = $('.delete_icon')
const volume_audio = $('#volume_audio')
const volume = $('.volume')
const volumeUp = $('.volume_up')
const volume_off = $('.volume_off')

const isconect = true
const app = {
    currentindex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [],
    songs_dict: {},
    getsongs: async function () {
        const songElements = document.querySelectorAll('.song')
        songElements.forEach(function (songElement) {
            var id = songElement.getAttribute('data2');
            var idx = songElement.getAttribute('data');
            var imgElement = songElement.getElementsByClassName('playlist__song-img')[0]
            const backgroundImage = getComputedStyle(imgElement).getPropertyValue('background-image');
            var img = backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1');
            var name = songElement.querySelector('.playlist__song-title').textContent;
            var singer = songElement.querySelector('.playlist__song-author').textContent;
            const song = { 'id': parseInt(id), 'idx': parseInt(idx), 'name': name, 'singer': singer, 'img': img }
            app.songs.push(song)
            app.songs_dict[parseInt(id)] = song
        })

        app.loadconfig()
        app.handleevens()
        app.loadcurrentsong()
        app.loadsongactivi()
        app.loadvolume()


    },
    handleDeletesong: function (id) {
        var option = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 'id': id })
        }
        fetch('/', option)
            .then(res => res.json())
            .then(res => {
                if (res.mss = 'ok') {
                    alert("Xóa thành công")
                    window.location.replace('/')
                }
                else
                    alert("Xóa xảy ra lỗi")

            })
    },
    handCreatesong: function (data) {
        console.log(data);
        var option = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('/create', option)
            .then(res => res.json())
            .then(res => {
                if (res.mss == 'ok') {
                    alert("Thêm nhạc thành công")
                    app.getsongs()
                    location.reload();
                    form.classList.remove('activi')
                }
                else {
                    alert("Thêm nhạc Thất bại")
                }
            })

    },
    setconfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    handleevens: function () {

        clientWidth = dashbaoard_cd.clientWidth
        clientHeight = dashbaoard_cd.clientHeight
        //xử lý phóng to thu nhỏ
        document.onscroll = function () {
            const scrolltop = window.scrollY || document.documentElement.scrollTop
            const newwidth = clientWidth - scrolltop
            const newhight = clientHeight - scrolltop
            dashbaoard_cd.style.width = (newwidth > 0) ? newwidth + 'px' : 0
            dashbaoard_cd.style.height = (newwidth > 0) ? newhight + 'px' : 0
            dashbaoard_cd.style.opacity = newwidth / clientWidth
        }
        //xử lý cd khi quay
        const cdanimate = cdthumer.animate([
            { transform: 'rotate(360deg' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdanimate.pause()
        //xử lý khi play
        playbtn.onclick = function () {
            audio.play()
            cdanimate.play()
            player.classList.toggle('playing')
            if (!player.classList[1]) {
                audio.pause()
                cdanimate.pause()
            }

        }

        //khi tiến độ bài hát thay đổi
        function ontimeupdate() {
            if (audio.duration) {
                const rangeprecen = Math.floor(audio.currentTime / audio.duration * 100)
                dashbaoard_range.value = rangeprecen
            }
        }
        audio.addEventListener('timeupdate', ontimeupdate)
        //xử lý khi tua
        dashbaoard_range.onmousedown = function () {
            audio.removeEventListener('timeupdate', ontimeupdate)
        }
        dashbaoard_range.onchange = function (e) {

            if (!audio.ended) {
                player.classList.add('playing')
                audio.play()
                const timerange = audio.duration * e.target.value / 100
                audio.currentTime = timerange
            }
            else {

                const timerange = audio.duration * e.target.value / 100
                audio.currentTime = timerange
            }
            audio.addEventListener('timeupdate', ontimeupdate)

        }
        //xu ly khi next song
        nextbtn.onclick = function () {
            if (randumbtn.classList[2]) {
                app.randumsong()
            } else {
                app.nextsong()
            }

            player.classList.add('playing')
        }
        //xu ly khi pre song
        prebtn.onclick = function () {
            if (randumbtn.classList[2]) {
                app.randumsong()
            }
            else {
                app.presong()
            }

            player.classList.add('playing')
        }
        //xử lý khi video kết thúc
        audio.onended = function () {
            if (repebtn.classList[2]) {
                audio.play()
            } else {
                nextbtn.click()
            }
        }
        // xu ly ramdum song
        randumbtn.onclick = function () {
            if (randumbtn.classList[2]) {
                app.setconfig('isramdum', false)
            }
            else {
                app.setconfig('isramdum', true)
            }
            randumbtn.classList.toggle('activi')
        }
        // xu ly repe song
        repebtn.onclick = function () {
            if (repebtn.classList[2]) {
                app.setconfig('isrepe', false)
            }
            else {
                app.setconfig('isrepe', true)
            }
            repebtn.classList.toggle('activi')

        }
        //xử lý khi volumo thay đổi
        audio.volumechange = function (e) {
            const rangeprecenvolume = e.volume
            dashbaoard_range.value = rangeprecenvolume
        }
        //xu ly bat to nho volum song
        volume_audio.onchange = function (e) {
            audio.volume = e.target.value
            if (audio.volume == 0) {
                volume.classList.add('activi')

            }
            else {
                volume.classList.remove('activi')
            }
            app.setconfig('volume', audio.volume)

        }
        // xu ly khi nhap vo volum_up
        volumeUp.onclick = function () {
            volume.classList.add('activi')
            volume_audio.value = 0
            audio.volume = 0
            app.setconfig('volume', audio.volume)
        }
        //xu ly khi nhap vo volum_off
        volume_off.onclick = function () {
            volume.classList.add('activi')
            volume_audio.value = 0.7
            audio.volume = 0.7
            volume.classList.remove('activi')
            app.setconfig('volume', audio.volume)
        }
        //xu ly nhan vo song
        playlist.onclick = async function (e) {
            const songnode = e.target.closest('.song:not(.activi)')
            const meununode = e.target.closest('.playlist__song-option')
            if (songnode || meununode) {
                if (songnode && !meununode) {
                    app.currentindex = parseInt(songnode.getAttribute('data'))
                    app.loadcurrentsong().then(() => {
                        audio.play()
                        player.classList.add('playing')
                    })
                }
                if (meununode && songnode) {
                    const sidetop = meununode.offsetTop + 430
                    const sideleft = playlist.offsetLeft + 380

                    const data = JSON.parse(meununode.parentElement.getAttribute('data'))
                    const data2 = JSON.parse(meununode.parentElement.getAttribute('data2'))

                    if (data === app.config.data) {
                        deletebtn.style.top = sidetop + 'px'
                        deletebtn.style.left = sideleft + 'px'
                        deleteicon.classList.remove('activi')
                    }
                    else if (data != app.config.data) {
                        deletebtn.style.top = sidetop + 'px'
                        deletebtn.style.left = sideleft + 'px'
                        deleteicon.classList.add('activi')
                    }
                    app.setconfig('data', data)
                    //xử lý nhấn delete
                    deletebtn.onclick = function (e) {

                        const choice = confirm('Có muốn xóa không?');
                        if (choice) {
                            app.handleDeletesong(parseInt(data2))

                            if (app.currentindex > 0) {
                                app.currentindex--
                            }
                            app.getsongs()
                            if (!player.classList[1]) {
                                audio.pause()
                                cdanimate.pause()
                            }
                            else {
                                audio.play()
                                cdanimate.play()
                            }
                            deleteicon.classList.remove('activi')
                            // alert('Bạn đã chọn OK.');
                        }


                    }
                }
            }

        }
        // xử lý khi nhấn ra ngoài nut deletebtn
        document.addEventListener('mousedown', function (e) {
            if (e.target !== deletebtn)
                deleteicon.classList.remove('activi')
        })
        // xử lý khi nhấn nút search 
        search_btn.addEventListener('click', function (e) {
            options_search.classList.toggle('activi')

        })
        // xử lý khi nhấn record start
        let gumStream;
        let rec;
        let input;
        mic_btn.addEventListener('click', function (e) {
            // var AudioContext = AudioContext 
            let audioContext //audio context to help us record
            if (mic_btn.classList.contains('recording') == false) {
                navigator.mediaDevices.getUserMedia({ audio: true, video: false }, { mimeType: 'audio/webm' })
                    .then(stream => {
                        audioContext = new AudioContext()
                        console.log("Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz");
                        gumStream = stream;
                        input = audioContext.createMediaStreamSource(stream);
                        rec = new Recorder(input, { numChannels: 1 })
                        rec.record()
                        console.log("Recording started");

                    })
                    .catch(error => {
                        console.error('Error accessing microphone:', error);
                    });
            } else {
                console.log("stopButton clicked");
                rec.stop()
                gumStream.getAudioTracks()[0].stop();
                rec.exportWAV(createDownloadLink);
                function createDownloadLink(blob) {
                    var url = URL.createObjectURL(blob);
                    audioRecorder.controls = true;
                    audioRecorder.src = url;
                    dataform = new FormData()
                    dataform.append('audio', blob, 'recording.wav');
                    app.recognizeMusic(dataform)

                }
            }
            mic_btn.classList.toggle('recording')


        })
        // xử lý khi up file recorder
        upload_file.addEventListener('change', (e) => {
            var dataform = new FormData();
            var file = upload_file.files[0];
            if (file) {
                dataform = new FormData()
                dataform.append('audio', file, 'recording.wav');
                var url = URL.createObjectURL(file);
                audioRecorder.controls = true;
                audioRecorder.src = url;
                app.recognizeMusic(dataform)
            }
            else alert('Vui lòng chọn file âm thanh')
        })
        // xử lý khi ấn vô upload file recording
        upload_record_btn.onclick = function (e) {
            upload_file.click()
        }
        //xử lý khi nhấn vô upload
        upload_btn.onclick = function () {
            form.classList.toggle('activi')
        }


    },
    recognizeMusic: function (dataform) {
        var option = {
            method: 'POST',
            body: dataform
        }
        fetch('/recordfile', option)
            .then(res => res.json())
            .then(res => {
                // console.log(res.message.replace(/'/g, '"'));
                s_song = JSON.parse(res.message.replace(/'/g, '"'))
                results = s_song.results
                results.sort(function (a, b) {
                    return b.input_confidence - a.input_confidence;
                });
                results = results.filter(result => result.input_confidence > 0.1)
                if (results.length == 0) {
                    var songsearchHTML = `
                    <svg class="list_songs-note" viewBox="0 0 500 500">
                        <path id="curve" fill="transparent"
                            d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                        <text width="500px">
                            <textPath href="#curve">Không tìm thấy bài hát</textPath>
                        </text>
                    </svg>
                    <img src="igm\\istockphoto-1038232966-1024x1024.png" alt="" class="non-search-img">`
                    list_songs_search.innerHTML = songsearchHTML
                }
                else {
                    var songsearchHTML = results.map((result, index) => {
                        song = this.songs_dict[result.song_id]
                        return `${index == 0 ? '<p class="playlist__song_search-rel" >Bài hát đề xuất</p>' : ''}
                                ${index == 1 ? '<p class="playlist__song_search-rel" >Bài hát liên quan</p>' : ''}
                                <div class="song_search" data=${song.idx} data2=${song.id} second=${result.offset_seconds}>
                                    <div class="playlist__song_search">
                                        <div class="playlist__song_search-img" style="background-image:url(${song.img})">
                                        </div>
                                    </div>
                                    <div class="playlist__song_search-decri">
                                        <h3 class="playlist__song_search-title">${song.name}</h3>
                                        <p class="playlist__song_search-author">${song.singer}</p>
                                    </div>
                                </div> 
                                `
                    })
                    list_songs_search.innerHTML = songsearchHTML.join('');
                }
            })
            .then(() => {
                list_songs_search.onclick = async function (e) {
                    const song_search = e.target.closest('.song_search:not(.activi)')
                    if (song_search) {
                        app.currentindex = parseInt(song_search.getAttribute('data'))
                        app.setconfig("idx_search", parseInt(song_search.getAttribute('data2')))
                        app.loadcurrentsong().then(() => {
                            second_song = song_search.getAttribute('second')
                            if (second_song < 0)
                                second_song = 0
                            audio.currentTime = second_song
                            audio.play()
                            player.classList.add('playing')
                            song_search.classList.add('activi')
                        })
                    }
                }


            })
            .catch(err => console.log(err))
    },
    getcurrentsong: function () {
        return this.songs[this.currentindex]
    },
    loadconfig: function () {
        if (this.config.isramdum) {
            randumbtn.classList.toggle('activi')
        }
        if (this.config.isrepe) {
            repebtn.classList.toggle('activi')
        }
        if (this.config.volume == undefined) {
            volume_audio.value = 1
            audio.volume = 1
        }
        else {
            volume_audio.value = this.config.volume
            audio.volume = this.config.volume
        }

    },
    loadcurrentsong: async function () {

        if (app.songs.length > 0) {
            const currensong = this.getcurrentsong()
            await fetch("/",
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 'id': currensong.id })
                })
                .then(res => res.json())
                .then(jsondata => {
                    headername.textContent = currensong.name
                    cdthumer.style.backgroundImage = `url('${currensong.img}')`
                    audio.src = jsondata.path
                    app.loadsongactivi()
                }
                ).catch((err) => console.log(err));
        }
    },
    loadvolume: function () {
        if (audio.volume == 0) {
            volume.classList.add('activi')
        }
    },
    nextsong: function () {
        this.currentindex++
        if (this.currentindex >= this.songs.length) {
            app.currentindex = 0
        }
        this.loadcurrentsong().then(() => {
            audio.play()
        })
    },
    presong: function () {
        this.currentindex--
        if (this.currentindex < 0) {
            app.currentindex = app.songs.length - 1
        }
        this.loadcurrentsong().then(() => {
            audio.play()
        })
    },
    randumsong: function () {
        let newindex
        do {
            newindex = Math.floor(Math.random() * app.songs.length)
        }
        while (this.currentindex == newindex)
        app.currentindex = newindex
        this.loadcurrentsong().then(() => {
            audio.play()
        })
    },
    loadsongactivi: function () {
        const songss = $$('.song')
        let song_action
        songss.forEach(function (song, index) {
            if (index === app.currentindex) {
                song.classList.add('activi')
                app.scrollsongactivi()
                song_action = song
            }
            else {
                song.classList.remove('activi')
            }
        })
        const song_searchs = $$('.song_search')
        song_searchs.forEach(function (song_search, index) {
            // let song_search_action
            if (app.config.idx_search === parseInt(song_search.getAttribute('data2'))) {
                song_search.classList.add('activi')
                song_search_action = song_search
            }
            else {
                song_search.classList.remove('activi')
            }
            if (app.config.idx_search === parseInt(song_search.getAttribute('data2')) && parseInt(song_search.getAttribute('data2')) != parseInt(song_action.getAttribute('data2'))) {
                song_search.classList.remove('activi')
            }
        })

    },
    scrollsongactivi: function () {
        setTimeout(() => {
            if (app.currentindex > 1) {
                $('.song.activi').scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                })
            }
            else {
                $('.song.activi').scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "center"
                })
            }

        }, 300)
    },
    start: function () {
        app.getsongs()

    }
}
app.start()
document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#namesong', 'Vui lòng nhập tên bài hát'),
            Validator.isRequired('#namesinger', 'Vui lòng nhập tên ca sĩ và ban nhạc'),
            Validator.isRequired('#imgsong', 'Vui lòng nhập đường dẫn'),
            Validator.isRequired('#coursessong', 'Vui lòng nhập đường dẫn'),
        ],
        onSubmit: function (data) {
            app.handCreatesong(data)
            // window.location.href = "/"

        }
    })

});