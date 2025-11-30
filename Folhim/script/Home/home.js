
const API_URL = "http://localhost:3000/userPost";


const date = new Date();
const hora = date.getHours();
const minuto = date.getMinutes();
let usuarios = [];

const card = document.createElement("div");
const container = document.getElementById("posts");

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
                    <img src="../../assets/contato1.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText">${u.nomePost}</p>
                </div>
        `
                container.appendChild(card);
                console.log("teste");
              

            });
            
  } catch (err) {
    console.error(err);
  }
}

async function listarPopular() {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

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
    
    usuarios.forEach((u) => {
      const card = document.createElement("div");
      card.classList.add("postCard");
    
      // criando o card
      card.innerHTML = `
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
                    <img src="../../assets/contato1.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText">${u.nomePost}</p>
                </div>
               `
                container.appendChild(card);
                console.log("teste");
              

            });
            
  } catch (err) {
    console.error(err);
  }
}


// chamada de função
listarArtigos();

