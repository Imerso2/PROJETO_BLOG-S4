
const API_URL = "http://localhost:3000/userPost";


const date = new Date();
const hora = date.getHours();
const minuto = date.getMinutes();
let usuarios = [];

const card = document.createElement("div");
const container = document.getElementById("posts");
const containerTop = document.getElementById("destaqueContainer");
const searchInput = document.getElementById("searchInput");

// coletar o filter
searchInput.addEventListener("input", (e) => {
  const filter = e.target.value.trim().toLowerCase();
  container.innerHTML = "";
  listarArtigos(filter);
});

// listar os artigos
async function listarArtigos(filter = "") {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

    // filtro :)
    const filtrados = usuarios.filter(
      (u) =>
        u.categoria.toLowerCase().includes(filter) ||
        u.tituloPost.toLowerCase().includes(filter)
    );
    
    const nada = document.createElement("div");
    nada.classList.add("nada");

      if (filtrados.length === 0) {
          nada.innerHTML = 
          `
          <i class="nada text"></i>
          <h3>Nenhum post encontrado</h3>
          <p>Clique em "Novo Usuário" para começar.</p>
          `;
          container.appendChild(nada);
          return;
    }
    nada.innerHTML = "";
    container.innerHTML = "";
    usuarios.forEach((u) => {
      const card = document.createElement("div");
      card.classList.add("postCard");
    
      // criando o card
      card.innerHTML = 
      `
      <div class="imgBox">
        <img  src="${u.UrlImagem}"
        class="postImage">
      </div>
                <div class="postTexts">
                    <p class="postTitle">${u.tituloPost}</p>
                    <p class="postdescription">${u.assuntoPost}</p>
                </div>
                <div class="postInfo">
                    <img src="../../assets/calendário1.png" alt="" class="postDateIcon">
                    <p class="postDateText">${u.dataPost}</p>
                    <p> • </p>
                    <img src="../../assets/cronômetro.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText" id="editadoAh"></p>
                </div>
        `
                container.appendChild(card);
                console.log("teste");
                tempoDesde(u.Date);

            });
            
  } catch (err) {
    console.error(err);
  }
}

async function listarPopular() {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

    const nada = document.createElement("div");
    nada.classList.add("nada");

    if (usuarios.length === 0) {
          nada.innerHTML = 
          `
          <i class="nada text"></i>
          <h3>Nenhum post encontrado</h3>
          <p>Clique em "Novo Usuário" para começar.</p>
          `;
          containerTop.appendChild(nada);
          return;
    }
    nada.innerHTML = "";
    
    usuarios.forEach((u) => {
      const cardDestaque = document.createElement("div");
      cardDestaque.classList.add("card-destaque");
    
      // criando o card
      cardDestaque.innerHTML = 
      `
                    <img src="${u.UrlImagem}" alt="" class="destaqueImg">
                    
                    <div class="info">
                        <span class="tag">${u.categoria}</span>
                        <div class="meta">
                          <span>${u.dataPost}</span>
                            <img src="../../assets/calendário1.png" alt="" class="calendarioIcon">
                            <span>•</span>
                            <img src="../../assets/cronômetro.png" alt="" class="cronometroIcon">
                            <span id="editadoAh"> Editado há 12 minutos</span>
                        </div>
                        <button  type="button" class="irArtigo"  onclick="location.href='BlogPage.html'">
                            <h2 >O poder da inteligência artificial na análise de dados em grandes bases.</h2>
                        </button>
                    </div>
      `

                container.appendChild(card);
                console.log("teste");
                tempoDesde(u.Date);

            });
            
  } catch (err) {
    console.error(err);
  }
}

let time = "";
function tempoDesde(times) {

    const agora = Date.now();
    const diferenca = agora - Number(time);

    if (diferenca < 0) time = "editado agora";

    const segundos = Math.floor(diferenca / 1000); // isso flaz sentido? dividido por mil... 
    if (segundos < 60) time = `editado há ${segundos} segundos`;

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) time = `editado há ${minutos} minutos`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) time = `editado há ${horas} horas`;

    const dias = Math.floor(horas / 24);
    time = `editado há ${dias} dias`;
}


// chamada de função
listarArtigos();


