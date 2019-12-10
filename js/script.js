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
        image.style.width = '100%';
        img_container.loading = "lazy";
        img_container.style.width = random(200,500)+"px";
        img_container.style.height = meme.height;
        img_container.appendChild(image);
        container.appendChild(img_container);
    })
}

function random(min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}

let container = document.createElement('div');
container.setAttribute('class', 'container');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
// container.style.flexDirection = 'column';
container.style.overflow = 'auto';
document.body.appendChild(container);
ajax();
// console.log(data);