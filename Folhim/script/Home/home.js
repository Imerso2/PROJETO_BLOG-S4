
const API_URL = "http://localhost:3000/userPost";


const date = new Date();
let usuarios = [];
let times;


const container = document.getElementById("posts");
const containerTop = document.getElementById("destaqueContainer");
const containerPopulares = document.getElementById("populares");
const searchInput = document.getElementById("searchInput");
const postExentended = document.getElementById("postExentended");
const postExentendedBox = document.getElementById("postExentendedBox");
// coletar o filter
searchInput.addEventListener("input", (e) => {
  const filter = e.target.value.trim().toLowerCase();
  container.innerHTML = "";
  listarArtigos(filter);
});

// chamar tudooo e pegar os fetch da API
async function faztudo() {
   try {
    const res = await fetch(API_URL); 
    usuarios = await res.json()
   
    listarPopulares(usuarios.slice(1, 4));
    console.log(usuarios.slice(1,4))
    listarArtigos();
    listarPopular(usuarios[0]);
    

   }
   catch(err){
    console.log(err)
   }
  
}
// listar os artigos
async function listarArtigos(filter = "") {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

    // filtro :)
    const filtrados = usuarios.filter((u) =>
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
         
          `;
          container.appendChild(nada);
          return;
    }
    nada.innerHTML = "";
    container.innerHTML = "";
    filtrados.forEach((u) => {
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
                <button type="button" class="irArtigo"  onclick="location.href='BlogPage.html'">
                    <p class="postTitle">${u.tituloPost}</p>
                    </button>
                    <p class="postdescription">${u.assuntoPost}</p>
                </div>
                <div class="postInfo" id="descer">
                    <img src="../../assets/calendário1.png" alt="" class="postDateIcon">
                    <p class="postDateText">${u.dataPost}</p>
                    <p> • </p>
                    <img src="../../assets/cronômetro.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText" id="editadoAh">${tempoDesde(u.Date)}</p>
                </div>
        `
                container.appendChild(card);
            });
            
  } catch (err) {
    console.error(err);
  }
}
//lista o card maior o popular
async function listarPopular(p) {
  try {
    const nada = document.createElement("div");
    nada.classList.add("nada");

  if (usuarios.length === 0) {
          nada.innerHTML = 
          `
          <i class="nada text"></i>
          <h3>Nenhum post encontrado</h3>
          
          `;
          containerTop.appendChild(nada);
          return;
    }
    nada.innerHTML = "";
    
    
      const cardDestaque = document.createElement("div");
      cardDestaque.classList.add("card-destaque");
    
      // criando o card
      cardDestaque.innerHTML = 
      `
                    <img src="${p.UrlImagem}" alt="" class="destaqueImg">
                    
                    <div class="info">
                        <span class="tag">${p.categoria}</span>
                        <div class="meta">
                        <img src="../../assets/calendário1.png" alt="" class="calendarioIcon">
                          <span>${p.dataPost}</span>
                            <span>•</span>
                            <img src="../../assets/cronômetro.png" alt="" class="cronometroIcon">
                            <span id="editadoAh">${tempoDesde(p.Date)}</span>
                        </div>
                        <button type="button" class="irArtigo"  onclick="location.href='BlogPage.html'">
                            <h2>${p.tituloPost}</h2>
                        </button>
                    </div>
      `

                containerTop.appendChild(cardDestaque);
                   
  } catch (err) {
    console.log(err);
  }
}
// lista os outros populares
async function listarPopulares(p) {
 
    const nada = document.createElement("div");
    nada.classList.add("nada");

    if (usuarios.length <=  1) {
          nada.innerHTML = 
          `
          <i class="nada text"></i>
          <h3>Nenhum post encontrado</h3>
         
          `;
          containerPopulares.appendChild(nada);
          return;
    }
    containerPopulares.innerHTML = "";
      p.forEach((u) => {
      const cardPopulares = document.createElement("div");
      cardPopulares.classList.add("popular-item");
    
      // criando o card
      cardPopulares.innerHTML = 
      ` 
      <img src="${u.UrlImagem}" alt="imagem">
                    <div>
                        <p class="tag">${u.categoria}</p>
                    <button type="button"  class="irArtigo" onclick="location.href='BlogPage.html'">
                        <h4 class="tituloLateral">${u.tituloPost}</h4>
                    </button>
                    <span class="meta" id="editadoAh">${tempoDesde(u.Date)}</span>
                </div>
      `
      
      containerPopulares.appendChild(cardPopulares);
    });
 
}
// formatação do tempo
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

// chamada de função
faztudo();

const btnPopulares = document.getElementById("btnPopulares");
const btnExplorar = document.getElementById("btnExplorar");
const btnSubir = document.getElementById("btnSubir");
const header = document.getElementById("header");

// só adiciona o listener se o elemento existir
if (btnPopulares) {
  btnPopulares.addEventListener('click', (e) => {
    e.preventDefault();
    // tenta encontrar o alvo pelo id primeiro, depois pela variável já obtida
    const target = document.getElementById("populares") || containerPopulares;
    if (!target) return;
    // ajuste offset se tiver header fixo (valor em px)
    const yOffset = -80;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}

if (btnExplorar) {
  btnExplorar.addEventListener('click', (e) => {
    e.preventDefault();
    // preferir rolar para a seção principal de posts
    const target2 = container
    if (!target2) return;
    // ajuste offset se tiver header fixo (valor em px)
    const yOffset = -80;
    const y = target2.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}


  btnSubir.addEventListener('click', (e) => {
    e.preventDefault();
    const target3 = header || document.getElementById("pHeader");
    if (!target3) return;
    // ajuste offset se tiver header fixo (valor em px)
  
    const y = target3.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
