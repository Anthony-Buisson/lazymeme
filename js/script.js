function Xhr(){                // création d'un requete HTTP en fonction du navigateur
    let obj = null;
    try { obj = new ActiveXObject("Microsoft.XMLHTTP");}
    catch(Error) { try { obj = new ActiveXObject("MSXML2.XMLHTTP");}
    catch(Error) { try { obj = new XMLHttpRequest();}
    catch(Error) { alert(' Impossible de créer l\'objet XMLHttpRequest')}
    }
    }
    return obj;
}

function ajax(nb = 100) {
    let req = Xhr();
    req.open("GET", "https://meme-api.herokuapp.com/gimme/"+nb, true);
    req.send(null);
    req.onload = function () {
        if(this.status === 200) {
            let data = JSON.parse(req.responseText);
            update(data.memes);
        }
    };
}

function update(memes){
    memes.forEach((meme)=>{
        // console.log(meme.url);
        let img_container = document.createElement('div');
        let image = document.createElement('img');
        image.src = meme.url;
        image.className = 'lazy-image';
        image.style.width = '100%';
        // image.loading = "lazy";                                      //Désormais natif sur Chrome et Firefox
        img_container.style.width = random(200,500)+"px";
        img_container.className='image';
        img_container.style.height = meme.height;
        img_container.appendChild(image);
        container.appendChild(img_container);
    });

    let lazyImages = [...document.querySelectorAll('.lazy-image')];
    let inAdvance = 300;
    console.log(lazyImages);
    lazyLoad(lazyImages);

    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
}

function random(min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}
function lazyLoad(lazyImages) {
    lazyImages.forEach(image => {
        if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) {
            image.src = image.dataset.src;
            image.onload = () => image.classList.add('loaded');
        }
    });

    // if all loaded removeEventListener
}
let container = document.createElement('div');
container.className = 'gallery';
container.setAttribute('class', 'container');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
// container.style.flexDirection = 'column';
container.style.overflow = 'auto';
document.body.appendChild(container);
ajax();
// console.log(data);

function throttle(callback, delay) {
    let last;
    let timer;
    return function () {
        let context = this;
        let now = +new Date();
        let args = arguments;
        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(context, args);
            }, delay);
        } else {
            last = now;
            callback.apply(context, args);
        }
    };
}
