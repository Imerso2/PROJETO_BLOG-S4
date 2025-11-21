const API_URL = "http://localhost:3000";

//const POSTS_URL = `${API_URL}/userPosts`;

//dataaaaaaaaa
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth();
const ano = date.getFullYear();
const hora = date.getHours();
const minutos = date.getMinutes();
//dataaaaaaaaa

const btnAdicionar = document.getElementById("btnAdd");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria")
const url = document.getElementById("URL");
const assunto = document.getElementById("assunto");
const form = document.getElementById("formUsuario");
const title = document.getElementById("criarTitle");
const criar = document.getElementById("criarTrasparente");
const description = document.getElementById("description");

btnAdicionar.addEventListener('click', () =>{
   
    title.textContent = "Criar postagem";
    description.textContent = "Preencha os dados no formulario para criar uma postagem"
    criar.classList.add("active");
    
});

const btnCancelar = document.getElementById("btnCancelar");

btnCancelar.addEventListener('click', ()=>{
    form.reset();
    criar.classList.remove("active");

});
formUsuario.onsubmit = async (e) => {
  e.preventDefault();
  const usuario = {
    nomePost: nome.value.trim(),
    tituloPost: title.value.trim(),
    categoria: categoria.value.trim(),
    assuntoPost: assunto.value.trim(),
    UrlImagem: url.value.trim()
  };
  const data = {
    
  }
 await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
 });
};
console.log(ano,mes,dia,hora,minutos);


