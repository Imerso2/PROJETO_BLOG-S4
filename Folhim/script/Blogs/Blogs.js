const API_URL = "http://localhost:3000/userPost";

//dataaaaaaaaa
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth();
const ano = date.getFullYear();
const hora = date.getHours();


const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const monthString = months[mes];
//dataaaaaaaaa

const btnAdicionar = document.getElementById("btnAdd");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria")
const url = document.getElementById("URL");
const assunto = document.getElementById("assunto");
const form = document.getElementById("formUsuario");
const title = document.getElementById("titulo");
const titulo = document.getElementById("criarTitle");
const criar = document.getElementById("criarTrasparente");
const description = document.getElementById("description");
const card = document.createElement("div");

const container = document.getElementById("postsContainer");

let IDpost = 0;
let editId = null;

btnAdicionar.addEventListener('click', () =>{
    
    titulo.textContent = "Criar postagem";
    description.textContent = "Preencha os dados no formulario para criar uma postagem"
    criar.classList.add("active");
    editId = null;
    
});

const btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener('click', ()=>{
    form.reset();
    criar.classList.remove("active");

});

form.onsubmit = async function (e) {
  e.preventDefault();

  let usuario = {
    nomePost: nome.value,
    tituloPost: title.value,
    categoria: categoria.value.trim(),
    assuntoPost: assunto.value,
    UrlImagem: url.value.trim(),
    dataPost: `${dia} ${monthString} ${ano}`
  };
   try {
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
    }

    criar.classList.remove("active");
    listarUsuarios();
    form.reset();
    
  } catch (err) {
    console.error(err);
  }
};

// problema é aqui

async function listarUsuarios() {
  try {
    const res = await fetch(API_URL); 
    usuarios = await res.json();

    container.innerHTML = "";

    usuarios.forEach((u) => {
      const card = document.createElement("div");
      card.className = "postCard";
      card.innerHTML = `<img class="postImage" src="${u.UrlImagem}" alt="">
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
                <div class="postButtons">   
                    <button class="postBtnEditar"> <img src="../../assets/lápis.png" alt="" class="imagEditar"> Editar</button>
                 
                    <button class="postBtnExcluir"> <img src="../../assets/lápis.png" alt="" class="imagExcluir"> Excluir</button> 
                </div>`
    });
      container.appendChild(card);
  }
  catch (error) {
    console.error(error);
  }
}


listarUsuarios();