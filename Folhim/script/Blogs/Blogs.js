const URl = new URL(window.location.href)
const userId = URl.searchParams.get('id')
console.log(userId);
const API_URL = "http://localhost:3000/userPost";
const API_URL_U = "http://localhost:3000/user";

let userName = "";
async function getNome(userId) {
  const res = await fetch(`${API_URL_U}/${userId}`);
  const user = await res.json();
  return user.nome;
}

document.addEventListener('DOMContentLoaded', async () => {
  userName = await getNome(userId);
  titleUser.textContent = userName;
});

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
const titleUser = document.getElementById("teste")
const container = document.getElementById("postsContainer");

let posts = [];
let IDpost = 0;
let editId = null;
let user= [];

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
    nomePost: userName,
    tituloPost: title.value,
    categoria: categoria.value.trim(),
    assuntoPost: assunto.value,
    UrlImagem: url.value.trim(),
    dataPost: `${dia} ${monthString} ${ano}`,
    Date: agora,
    idUser: userId
    
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


async function listarArtigos(userId) {
  try {
    const res = await fetch(API_URL);
    posts = await res.json();
    container.innerHTML = "";
    
    const filtrados = posts.filter(u =>
      String(u.idUser) === String(userId)
    );
    
    if (filtrados.length === 0) {
      const nada = document.createElement("div");
      nada.classList.add("nada");
      nada.innerHTML = `<h3>Nenhum post encontrado</h3>`;
      container.appendChild(nada);
      return;
    }

    
    filtrados.forEach((u) => {
      const card = document.createElement("div");
      card.classList.add("postCard");

      card.innerHTML = `
        <div class="imgBox">
        <img src="${u.UrlImagem}" class="postImage">
        </div>
        <div class="postTexts">
        <p class="postTitle">${u.tituloPost}</p>
        <p class="postdescription">${u.assuntoPost}</p>
        </div>
        <div class="postInfo">
          <img src="../../assets/calendário1.png" class="postDateIcon">
          <p class="postDateText">${u.dataPost}</p>
          <img src="../../assets/contato1.png" class="postAutorIcon">
          <p class="postAuthorText">${u.nomePost}</p>
          </div>
        <div class="postButtons">   
        <button class="postBtnEditar">Editar</button>
          <button class="postBtnExcluir">Excluir</button> 
        </div>
      `;

      container.appendChild(card);
      
      
      card.querySelector(".postBtnExcluir").onclick = async () => {
        Excluir.classList.add("active");
        
        cancelarApagar.onclick = () => {
          Excluir.classList.remove("active");
        };
        
        apagar.onclick = async () => {
          await fetch(`${API_URL}/${u.id}`, { method: "DELETE" });
          Excluir.classList.remove("active");
          listarArtigos(userId);
        };
      };


      card.querySelector(".postBtnEditar").onclick = () => {
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

listarArtigos(userId);
getNome(userId);