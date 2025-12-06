
const API_URL = "http://localhost:3000/userPost";
const API_URL_U = "http://localhost:3000/user";
//dataaaaaaaaa
const date = new Date();
const agora = Date.now()
const dia = date.getDate();
const mes = date.getMonth();
const ano = date.getFullYear();

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[mes];
//dataaaaaaaaa

const cancelarApagar = document.getElementById("btnExcluir");
const apagar = document.getElementById("btnCancelarExcluir");
const btnAdicionar = document.getElementById("btnAdd");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria")
const url = document.getElementById("URL");
const assunto = document.getElementById("assunto");
const form = document.getElementById("formUsuario");
const title = document.getElementById("titulo");
const titulo = document.getElementById("criarTitle");
const excluirTitulo = document.getElementById("ExcluirTitle");
const criar = document.getElementById("criarTrasparente");
const Excluir = document.getElementById("excluirTrasparente");
const description = document.getElementById("description");
const excluirDescription = document.getElementById("descriptionExcluir");
const card = document.createElement("div");

const container = document.getElementById("postsContainer");

let posts = [];
let IDpost = 0;
let editId = null;


btnAdicionar.addEventListener('click', () => {

  titulo.textContent = "Criar postagem";
  description.textContent = "Preencha os dados no formulario para criar uma postagem"
  criar.classList.add("active");
  editId = null;

});

const btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener('click', () => {
  form.reset();
  criar.classList.remove("active");

});

form.onsubmit = async function (e) {
  e.preventDefault();
  let posts = {
    nomePost: nome.value,
    tituloPost: title.value,
    categoria: categoria.value.trim(),
    assuntoPost: assunto.value,
    UrlImagem: url.value.trim(),
    dataPost: `${dia} ${monthString} ${ano}`,
    Date: agora

  };
  try {
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
    }

    criar.classList.remove("active");
    listarArtigos();
    form.reset();

  } catch (err) {
    console.error(err);
  }
};


async function listarArtigos() {
  try {
    const res = await fetch(API_URL);
    posts = await res.json();

    const nada = document.createElement("div");
    nada.classList.add("nada");
    
    if (posts.length === 0) {
      nada.innerHTML = `
        <h3>Nenhum post encontrado <p class="nadaP">Comece sua história publicando um post</p></h3>
        
      `;
      container.appendChild(nada);
      return;
    }
    nada.innerHTML = "";

    container.innerHTML = "";

    posts.forEach((u) => {

      const card = document.createElement("div");
      card.classList.add("postCard");

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
                    
                    <img src="../../assets/contato1.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText">${u.nomePost}</p>
                </div>
                <div class="postButtons">   
                    <button class="postBtnEditar"> <img src="../../assets/lápis.png" alt="" class="imagEditar"> Editar</button>
                 
                    <button class="postBtnExcluir"> <img src="../../assets/lápis.png" alt="" class="imagExcluir"> Excluir</button> 
                </div>`
      container.appendChild(card);
      console.log("teste");

      card.querySelector(".postBtnExcluir").onclick = async () => {
        excluirTitulo.textContent = "Excluir postagem";
        excluirDescription.textContent = "Essa ação não pode ser desfeita";
        Excluir.classList.add("active");

        cancelarApagar.onclick = () => {
          Excluir.classList.remove("active");
        };

        apagar.addEventListener('click', async () => {
          await fetch(`${API_URL}/${u.id}`, { method: "DELETE" });
          listarArtigos();
          console.log("deletado");
          Excluir.classList.remove("active");
        });
      };

      card.querySelector(".postBtnEditar").onclick = () => {
        titulo.textContent = "Editar postagem";
        description.textContent = "Altere os dados no formulario para editar a postagem"
        criar.classList.add("active");
        editId = u.id;
        nome.value = u.nomePost;
        title.value = u.tituloPost;
        categoria.value = u.categoria;
        url.value = u.UrlImagem;
        assunto.value = u.assuntoPost;

      };

    });
  } catch (err) {
    console.error(err);
  }
}
listarArtigos();