const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos(){//função assincrona para substituir os callbacks feitos com .them
    try{// try...catch, usado pra tratmento de erros
        //o try vai tentar executar o código que esta dentro do bloco dela e se acontecer agum erro será executando o que estiver dentro do catch
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        //await significa aguardar, então a busca seja feita para depois responder com jsom

            videos.forEach((video)=> {
                if(video.categoria == ""){//como o catch só pega os erros reportados pelo navegador, usamos esse if.. throw new Error para reportar erros personalizados  dentro do catch
                    throw new Error('Vídeo não tem categoria');
                }
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
    } catch(error){//o catch pega os erros que o navegador reporta
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }/*finally{
        alert('Sempre executa esse código')
    } o bloco finally vem depois do catch mas ele sempre é executado, tanto quando acontece algum erro quanto quando não acontece*/
}


buscarEMostrarVideos(); //chamando a função

