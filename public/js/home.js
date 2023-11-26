

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
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
const volume_up = $('.volume_up')
const volume_off = $('.volume_off')
var coursesApi = 'http://localhost:3004/songs'
const isconect = true
const app = {
    currentindex: 0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
    ],
    getsongs: async function () {
        const songElements = document.querySelectorAll('.song')
        songElements.forEach(function (songElement) {
            var id = songElement.getAttribute('data2');
            var imgElement = songElement.getElementsByClassName('playlist__song-img')[0]
            const backgroundImage = getComputedStyle(imgElement).getPropertyValue('background-image');
            var img = backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1');
            var name = songElement.querySelector('.playlist__song-title').textContent;
            var singer = songElement.querySelector('.playlist__song-author').textContent;
            const song = { 'id': parseInt(id), 'name': name, 'singer': singer, 'img': img }
            app.songs.push(song)
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
        var option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(coursesApi, option)
            .then(res => res.json())
            .then()
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
                const timerange = audio.duration * e.target.value / 100
                audio.currentTime = timerange
            }
            else {
                player.classList.add('playing')
                audio.play()
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
        volume_up.onclick = function () {
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
                        songnode.classList.add('activi')
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
        //xử lý khi nhấn vô upload
        const uploat_btn = $('.uploat_btn')
        const form = $('.form')
        uploat_btn.onclick = function () {
            form.classList.toggle('activi')
        }

        //xử lý khi nhân vô tải lên
        const form_submit = $('.form-submit')
        form_submit.onclick = function () {
            app.getsongs()
            form.classList.remove('activi')
        }

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
        songss.forEach(function (song, index) {
            if (index === app.currentindex) {
                song.classList.add('activi')
                app.scrollsongactivi()
            }
            else {
                song.classList.remove('activi')
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