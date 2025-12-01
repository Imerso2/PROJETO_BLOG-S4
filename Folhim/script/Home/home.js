
const API_URL = "http://localhost:3000/userPost";


const date = new Date();
let usuarios = [];
let times;

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

// chamar tudooo e pegar os fetch da API
async function faztudo() {
   try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();
    let a;
    usuarios.for(a = 0; index < array.length; index++){)
      const populares = array[index];
      listarPopulares();
    }
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
                    <p class="postAuthorText" id="editadoAh">${tempoDesde(u.Date)}</p>
                </div>
        `
                container.appendChild(card);
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
                        <img src="../../assets/calendário1.png" alt="" class="calendarioIcon">
                          <span>${u.dataPost}</span>
                            <span>•</span>
                            <img src="../../assets/cronômetro.png" alt="" class="cronometroIcon">
                            <span id="editadoAh"> Editado há tem que fazer a funcção</span>
                        </div>
                        <button  type="button" class="irArtigo"  onclick="location.href='BlogPage.html'">
                            <h2 >O poder da inteligência artificial na análise de dados em grandes bases.</h2>
                        </button>
                    </div>
      `

                container.appendChild(card);
                console.log("teste");
                

            });
            
  } catch (err) {
    console.error(err);
  }
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


// chamada de função
listarArtigos();



