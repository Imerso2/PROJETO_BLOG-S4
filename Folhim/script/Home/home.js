
const API_URL = "http://localhost:3000/userPost";

//dataaaaaaaaa
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth();
const ano = date.getFullYear();
const hora = date.getHours();
const minuto = date.getMinutes();


const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[mes];
//dataaaaaaaaa

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
const nada = document.getElementById("nada");

const container = document.getElementById("posts");

let usuarios = [];
let IDpost = 0;
let editId = null;




async function listarUsuarios(filter = "") {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

    
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
     
listarUsuarios();