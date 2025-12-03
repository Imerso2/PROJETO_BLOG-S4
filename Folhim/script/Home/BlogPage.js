const API_URL = "http://localhost:3000/userPost";
const URl = new URL(window.location.href)
const postId = URl.searchParams.get('id')

const postExentended = document.getElementById("postExentended");
const postExentendedBox = document.getElementById("postExentendedBox");
let artigo= {};

async function load() {
    try {
        const res = await fetch(`${API_URL}/${postId}`);
        artigo = await res.json();
        inprimir(artigo)
    }
    catch (err) {
        console.log(err)
    }

}

function inprimir(artigo) {
    console.log(artigo)
    postExentended.innerHTML = `
            <div class="image-area">
                    <img src=${artigo.UrlImagem} alt="${artigo.tituloPost}">
            </div>
            
            <div class="post-card">
                <span class="categoria">${artigo.categoria}</span>
                <h1 class="text">"${artigo.tituloPost}"</h1>
                
                <div class="infor">
                    <div class="meta">
                        <img src="../../assets/calendário1.png" alt="calendario" class="calendarioIcon">
                        <span>${artigo.dataPost}</span>
                        <span>•</span>
                        <img src="../../assets/cronômetro.png" alt="cronômetro" class="cronometroIcon">
                        <span>${tempoDesde(artigo.Date)}</span>
                    </div>
                </div>
            </div>
    `
postExentendedBox.appendChild(postExentended)
}


function tempoDesde(times) {

  const agora = Date.now();

  const diferenca = agora - Number(times);

  if (diferenca < 0) return "editado agora";

  const segundos = Math.floor(diferenca / 1000);
  if (segundos < 60) return `editado há ${segundos} segundos`;

  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `editado há ${minutos} minutos`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `editado há ${horas} horas`;

  const dias = Math.floor(horas / 24);
  return `editado há ${dias} dias`;
}
console.log(artigo)
load()
