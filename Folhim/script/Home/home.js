
const API_URL_U = "http://localhost:3000/user";
const API_URL = "http://localhost:3000/userPost";

const date = new Date();
let usuarios = [];
let users = [];
let times;


const container = document.getElementById("posts");
const containerTop = document.getElementById("destaqueContainer");
const containerPopulares = document.getElementById("populares");
const searchInput = document.getElementById("searchInput");

// coletar o filter
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const filter = e.target.value.trim().toLowerCase();
    container.innerHTML = "";
    listarArtigos(filter);
  });
}

// chamar tudooo e pegar os fetch da API
async function faztudo() {
  try {
    const res = await fetch(API_URL);
    usuarios = await res.json()

    listarPopulares(usuarios.slice(1, 4));

    listarArtigos();
    listarPopular(usuarios[0]);


  }
  catch (err) {
    console.log(err)
  }

}
// listar os artigos
async function listarArtigos(filter = "") {
  try {
    const res = await fetch(API_URL, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    });
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
      <button type="button" class="irArtigo">
      <div class="imgBox">
        <img  src="${u.UrlImagem}"
        class="postImageHome">
      </div>
                <div class="postTexts">
                    <p class="postTitle">${u.tituloPost}</p>
                    <p class="postdescription">${u.assuntoPost}</p>
                    </div>
                    <div class="postInfo" id="descer">
                    <img src="../../assets/calendário1.png" alt="" class="postDateIcon">
                    <p class="postDateText">${u.dataPost}</p>
                    <img src="../../assets/cronômetro.png" alt="" class="postAutorIcon">
                    <p class="postAuthorText" id="editadoAh">${tempoDesde(u.Date)}</p>
                    </div>
                    </button>
        `
      container.appendChild(card);


      card.querySelector(".irArtigo").onclick = () => {

        postExtendido(u.id)
      };


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
          <h3>Nenhum post encontrado </h3>
          
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
      <button type="button" class="irPopular" >
                    <img src="${p.UrlImagem}" alt="" class="destaqueImg">
                    
                    <div class="info">
                        <span class="tag">${p.categoria.toUpperCase()}</span>
                        <div class="meta">
                        <img src="../../assets/calendário1.png" alt="" class="calendarioIcon">
                          <span class="postDateText">${p.dataPost}</span>
                            <img src="../../assets/cronômetro.png" alt="" class="cronometroIcon">
                            <span class="postAuthorText">${tempoDesde(p.Date)}</span>
                        </div>
                        <div class="DestaqueTitle">
                            <h2>${p.tituloPost}</h2>
                        </div>
                            </div>
                            </button>
      `

    containerTop.appendChild(cardDestaque);
    cardDestaque.querySelector(".irPopular").onclick = () => {

      postExtendido(p.id)
    };
  } catch (err) {
    console.log(err);
  }
}
// lista os outros populares
async function listarPopulares(p) {

  const nada = document.createElement("div");
  nada.classList.add("nada");

  if (usuarios.length <= 1) {
    nada.innerHTML =
      `
        
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
      <button type="button" class="irPopulares">
      <img src="${u.UrlImagem}" alt="imagem" class="imgPopulares">
                    <div class="metaPopulares">
                        <p class="tag">${u.categoria.toUpperCase()}</p>
                        <h4 class="tituloLateral">${u.tituloPost}</h4>
                        <div class="editadoPopulares">
                        <img src="../../assets/cronômetro.png" alt="" class="cronometroIcon">
                        <span class="meta" id="editadoAh">${tempoDesde(u.Date)}</span>
                        </div>
                        </div>
                        </button>
      `

    containerPopulares.appendChild(cardPopulares);
    cardPopulares.querySelector(".irPopulares").onclick = () => {

      postExtendido(u.id)
    };
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


const btnPopulares = document.getElementById("btnPopulares");
const btnExplorar = document.getElementById("btnExplorar");
const btnSubir = document.getElementById("btnSubir");
const header = document.getElementById("header");


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


if (btnSubir) {
  btnSubir.addEventListener('click', (e) => {
    e.preventDefault();
    const target3 = header || document.getElementById("pHeader");
    if (!target3) return;
    // ajuste offset se tiver header fixo (valor em px)

    const y = target3.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}
// chamada de função
faztudo();


function postExtendido(id) {
  window.location.href = `BlogPage.html?id=${id}`
}

const cadastro = document.getElementById("cadastro");
const cadastroBox = document.getElementById("cadastroBox");
const btnCancelar = document.getElementById("btnCancelar")

cadastro.addEventListener('click', () => {
  cadastroBox.classList.add("ativo");
});
btnCancelar.addEventListener('click', () => {
  cadastroBox.classList.remove("ativo");

});

const Nome = document.getElementById("Nome")
const Email = document.getElementById("Email")
const Senha = document.getElementById("Senha")
const cadastroForm = document.getElementById("cadastroForm")
const error = document.getElementById("error")


cadastroForm.onsubmit = async function (e) {
  e.preventDefault();
  try {
    const res = await fetch(API_URL_U);
    users = await res.json();

    let user = {
      nome: Nome.value.trim(),
      email: Email.value.trim(),
      senha: Senha.value
    };
    // verifica se existe usuário com mesmo email ou nome
    let existe = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === user.email && users[i].nome === user.nome) {
        existe = true;
        break;
      }
    }

    if (existe) {
      // mostra erro e não cadastra
      error.classList.add("ativo")
      cadastroBox.classList.remove("ativo");
      return;
    }

    // cadastra novo usuário
    await fetch(API_URL_U, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // limpa e fecha o formulário
    cadastroBox.classList.remove("ativo");
    cadastroForm.reset();


  } catch (err) {
    console.log(err);

  }
};
const btnVoltar = document.getElementById("bntVoltar");

btnVoltar.addEventListener('click', () => {
  cadastroBox.classList.add("ativo");
  error.classList.remove("ativo");
});

const login = document.getElementById("login");
const btnCancelarLogin = document.getElementById("btnCancelarLogin");
const btnEntrar = document.getElementById("btnLogin");
const btnEntrar2 = document.getElementById("entrarLogin")
const LoginForm = document.getElementById("LoginForm");
const NomeLogin = document.getElementById("NomeLogin");
const EmailLogin = document.getElementById("EmailLogin");
const SenhaLogin = document.getElementById("SenhaLogin")


btnEntrar.addEventListener('click', () => {
  login.classList.add("ativo");
});

btnEntrar2.addEventListener('click', () => {
  login.classList.add("ativo");
});

btnCancelarLogin.addEventListener('click', () => {
  login.classList.remove("ativo")
});

LoginForm.onsubmit = async function (e) {
  e.preventDefault();
  try {
    const res = await fetch(API_URL_U);
    users = await res.json();
    
    const nome = NomeLogin.value.trim();
    const email = EmailLogin.value.trim();
    const senha = SenhaLogin.value;
    
    const userEncontrado = users.find(user =>
      user.nome === nome &&
      user.email === email &&
      user.senha === senha
    );

    let userValido;
    let id;

    if (userEncontrado !== undefined) {
      userValido = true;
      id = userEncontrado.id;
    }
    if (!userValido) {
      alert("Nome, email ou senha incorretos");
      return;
    }
   
    login.classList.remove("ativo");
    LoginForm.reset();
   
    window.location.href = `../../Pages/Blogs/Blogs.html?id=${id}`

  } catch (err) {
    console.error(err);
  }
};
