const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos(){
    try{
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

            videos.forEach((video)=> {
                if(video.categoria == ""){
                    throw new Error('Vídeo não tem categoria');
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p> 
                    </div>
                </li>
                `;/*a class categoria esta hiddem porque não preciso que ela apareca, apenas que ela esteja aqui para eu poder usar */
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}


buscarEMostrarVideos();

//vinculando evento de pesquias a barra de pesquisa
const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);//adicionando um EventListener para que todsa vez que for digitado algo na barra de pesquisa chame a função filtrar pesquisa

function filtrarPesquisa(){//nessa functios os videos que estão no código HTML serão capturados e passar por eles vendo se o que foi digitado na pesquisa corresponde a algum titulo de video
    const videos = document.querySelectorAll(".videos__item");//essa classe que a que foi definida no JS na linha 14

    if(barraDePesquisa.value != ""){
        for(let video of videos){//aqui é para passar por cada video, poderia ser usapo um ForEach
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){//se o titulo do video não incle o valor pesquisado então ele não vai aparecer na tela 
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }

        }
    } else {
        video.style.display = "block";
    }
}

//Adicionando filtro de categorias
const botaoCategoria = document.querySelectorAll(".superior__item");//capturando os botões pelas classes

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));//com o adventerListener quando o botão for clicado será chamada a função filtrarPorCategoria
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        //aqui vai ser comparado o name do botão clicado com a categoria do video, a categoria já está no arquivo .json, trazemos essa categoria para cá na linha 20
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}