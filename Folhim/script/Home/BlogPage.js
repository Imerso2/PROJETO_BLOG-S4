const API_URL = "http://localhost:3000/userPost";
const URl = new URL(window.location.href)
const postId = URl.searchParams.get('id')

const postExentended = document.getElementById("postExentended");
const postExentendedBox = document.getElementById("postExentendedBox");
let artigo = {};
let posts = [];


async function load() {
  try {
    const res = await fetch(`${API_URL}/${postId}`);
    artigo = await res.json();
    inprimir(artigo)
    listarArtigos(artigo.categoria);
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
                    <div class="assunto">
                    <h1>${artigo.tituloPost}</h1>
                    <p>${artigo.assuntoPost}</p>
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

load()

const container = document.getElementById("posts");

async function listarArtigos(filter = "") {
  try {
    const res = await fetch(API_URL, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    });
    posts = await res.json();

    const filtroLower = (filter).toLowerCase();

    let filtrados = posts.filter(u =>
      (u.categoria).toLowerCase().includes(filtroLower) && // tem horas que eu me sinto lesado
      String(u.id) !== String(postId) // como eu não pensei nisso
    );

    const nada = document.createElement("div");
    nada.classList.add("nada");

    if (filtrados.length === 0) {
      nada.innerHTML = `<h3>Nenhum post semelhante encontrado</h3>`;
      container.appendChild(nada);
      return;
    }

    container.innerHTML = "";

    filtrados.forEach((u) => {
      const card = document.createElement("div");
      card.classList.add("postCard");

      // criando o card
      card.innerHTML =
        `
      <button type="button" class="irArtigo">
      <div class="imgBox">
        <img  src="${u.UrlImagem}"
        class="postImageHome">
      </div>
                <div class="postTexts">
                    <p class="postTitle">${u.tituloPost}</p>
                    <p class="postdescription">${u.assuntoPost}</p>
                    </div>
                    <div class="postInfo" id="descer">
                    <img src="../../assets/calendário1.png" alt="" class="postDateIcon">
                    <p class="postDateText">${u.dataPost}</p>
                    <img src="../../assets/cronômetro.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText" id="editadoAh">${tempoDesde(u.Date)}</p>
                    </div>
                    </button>
        `;
      container.appendChild(card);

      card.querySelector(".irArtigo").onclick = () => {
        postExtendido(u.id)
      };
    });

  } catch (err) {
    console.error(err);
  }
}
function postExtendido(id) {
  window.location.href = `BlogPage.html?id=${id}`
}
