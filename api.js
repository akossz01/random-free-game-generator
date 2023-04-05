getRandomGame();

var showContainer = false;
const gameContainer = document.querySelector('.generate-container');

const randomBtn = document.querySelector('.random-btn');
randomBtn.addEventListener('click', getRandomGame);

function getRandomGame() {
    /* Generating random game ID */
    const min = 1;
    const max = 500;
    let randomId = Math.floor(Math.random() * (max - min + 1) + min);

    /* Fetch game data */
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d21578513mshf09665a2f912f7ap191c48jsnefc61b238796',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${randomId}`, options)
        .then(response => response.json())
        .then(response => {
            /* If undefined regenerate */
            if (response.title === undefined) {
                console.log('Undefined. Regenerating...');
                getRandomGame();
            }

            /* Updating shown info */
            const gameTitle = document.querySelector('.game-title');
            gameTitle.innerText = response.title;

            const gameImg = document.getElementById('thumbnail');
            gameImg.src =  response.thumbnail;

            const desc = document.querySelector('.description');
            desc.innerText = response.short_description;

            const getBtn = document.querySelector('.play-game');
            const imgHover = document.getElementById('img-thumbnail');
            /* getBtn.setAttribute('onclick', `window.location.href='${response.game_url}'`); */
            getBtn.setAttribute('onclick', `window.open('${response.game_url}')`);
            imgHover.setAttribute('onclick', `window.open('${response.game_url}')`);

            const platform = document.querySelector('.platforms i');
            if (response.platform !== 'Windows') {
                platform.classList.remove("fa-brands");
                platform.classList.remove("fa-windows");

                platform.classList.add("fa-solid");
                platform.classList.add("fa-globe");
            } else {
                platform.classList.remove("fa-solid");
                platform.classList.remove("fa-globe");

                platform.classList.add("fa-brands");
                platform.classList.add("fa-windows");
            }

            const cpuReq = document.querySelector('.cpu');
            cpuReq.innerText = response.minimum_system_requirements.processor;

            const gpuReq = document.querySelector('.gpu');
            gpuReq.innerText = response.minimum_system_requirements.graphics;
            
            const ramReq = document.querySelector('.ram');
            ramReq.innerText = response.minimum_system_requirements.memory;

            const storageReq = document.querySelector('.hdd');
            storageReq.innerText = response.minimum_system_requirements.storage;

            console.log(response.platform);
            /* Platforms: Windows, Web Browser */
        })
        .catch(err => console.error(err));
}

function wait(seconds) {
    return new Promise(resolve => {
       setTimeout(resolve, seconds * 1000);
    });
 } 