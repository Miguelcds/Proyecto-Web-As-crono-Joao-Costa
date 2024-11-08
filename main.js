import "./style.css";

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";

const header = document.querySelector("header");
header.innerHTML = Header();
const main = document.querySelector("main");
main.innerHTML = Main();
const footer = document.querySelector("footer");
footer.innerHTML = Footer();

const buildPage = async (busqueda) => {
  try{
  const data = await fetch(
    `https://api.unsplash.com/search/photos?query=${busqueda}&per_page=21&orientation=squarish&client_id=9ZTYaTHYYbWrLsJ1o6MagjlViJ1RfNNUKbVxJasOx7I`
  );
  const res = await data.json();
  const photos = res.results;
  printPhotos(photos);
}  catch(error){
  document.body.innerHTML = `
  <h2 class= "error"> Page under maintenance, sorry for the inconvenience!</h2>
  `
}

} 




const printPhotos = (photos) => {
  const ul = document.querySelector("#result");
  const h2 = document.querySelector("#resultMessage");
  // const section = document.querySelector("section")

  ul.innerHTML = "";
  h2.innerHTML = "";

  if (photos == 0 || photos == null) {
    h2.innerHTML = `
    No se ha localizado ninguna Imagen, por favor haga otra busqueda 🥲 
    `;
  } else {
    for (const item of photos) {
      ul.innerHTML += `
         <li> <img src="${item.urls.regular}" alt="${item.alt_description}"></li>
         `;
    }
  }
};

buildPage("space");

document.querySelector("#searchBtn").addEventListener("click", () => {
  const button = document.querySelector("button");
  button.classList.toggle("rotar");
  const value = document.querySelector("#searchInput").value;
  buildPage(value);
});
