
const API_URL = "http://localhost:3000/userPost";


const date = new Date();
const hora = date.getHours();
const minuto = date.getMinutes();
let usuarios = [];

const card = document.createElement("div");
const nada = document.getElementById("nada");
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

      if (filtrados.length === 0) {
          nada.style.display = "flex";
          return;
    }
    nada.style.display = "none";
    container.innerHTML = "";
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

