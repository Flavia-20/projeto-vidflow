const containerVideos = document.querySelector(".videos__container");//Isso servirá para capturar a ul que acabamos de criar em nosso código HTML.

const api = fetch("http://localhost:3000/videos")
.then(res => res.json())//Então, quando recebermos a resposta da nossa busca transformada em JSON...
.then((videos) => // ... executaremos o que está dentro deste .then: uma arrow function chamando videos.
    videos.forEach((video)=> {
        /*Nosso objetivo é buscar o container que pegamos do HTML. Então, copiaremos containerVideos, 
        colaremos no .forEach e adicionaremos .innerHTML. Com isso, estamos pedindo que o .innerHTML 
        coloque os vídeos dentro do HTML.
        Em seguida, vamos inserir +=, para que cada vídeo seja acrescentado no innerHTML */
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>
        `;
    })
)
.catch((error) => { //essa função é usada para capturar os erros que acontecerem 
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
})