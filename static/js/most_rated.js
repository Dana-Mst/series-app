import { dataHandler } from './data_handler.js';

let page_number = 1;
let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let showCurrentPage = document.querySelector('.current-page'); 
let sortingBtn = document.querySelector('.sorting-btn');
let sortingColumn = 'rating';
let sortingDirection = 'desc';


function displayMostRatedShows(data) {
    let mostRatedWrapper = document.querySelector('.most-rated-wrapper');
    mostRatedWrapper.innerHTML = "";
    if (mostRatedWrapper) {
      let tableWrapper = document.createElement('div');
      tableWrapper.classList.add('card');
      let table = document.createElement('table');
      let tableHeader = document.createElement('thead');
      let tableHeaderRow = document.createElement('tr');
      let title = document.createElement('th');
      let year = document.createElement('th');
      let runtime = document.createElement('th');
      let rating = document.createElement('th');
      let genres = document.createElement('th');
      let trailer = document.createElement('th');
      let homepage = document.createElement('th');
      title.innerText = 'Title';
      year.innerText = 'Year'
      runtime.innerText = 'Runtime';
      rating.innerText = 'Rating';
      genres.innerText = 'Genres';
      trailer.innerText = 'Trailer';
      homepage.innerText = 'Homepage';
      tableHeaderRow.appendChild(title);
      tableHeaderRow.appendChild(year);
      tableHeaderRow.appendChild(runtime);
      tableHeaderRow.appendChild(rating);
      tableHeaderRow.appendChild(genres);
      tableHeaderRow.appendChild(trailer);
      tableHeaderRow.appendChild(homepage);
      tableHeader.appendChild(tableHeaderRow);
      table.appendChild(tableHeader);
      let tableBody = document.createElement('tbody');
      let realtrailer;
      let realhomepage;
      let realgenres;
      data.forEach((element) => {
        if(element.trailer){
      
          realtrailer = element.trailer;
     
        }else{
          realtrailer = `NO URL`;
         
        };
        if(element.homepage){
         realhomepage = element.homepage;
        
        }else{
         realhomepage = `NO URL`;
        };
  
        if(element.genres[0]){
          realgenres = element.genres
        }else{
          realgenres = 'NO GENRE!';
        };
          let tableBodyRow = `
          <tr>
          <td><a href="/show/${element.id}">${element.title}</a></td>
          <td>${element.year}</td>
          <td>${element.runtime}</td>
          <td>${element.rating}</td>
          <td>${realgenres}</td>
          <td><a href="${realtrailer}">${realtrailer}</a></td>
          <td><a href="${realhomepage}">${realhomepage}</a></td>
          <td class="action-column">
          <button type="button" class="icon-button"><i class="fa fa-edit fa-fw"></i></button>
          <button type="button" class="icon-button"><i class="fa fa-trash fa-fw"></i></button>
          </td>
          </tr>`;
        tableBody.insertAdjacentHTML('beforeend', tableBodyRow);
      });
      table.appendChild(tableBody);
      tableWrapper.appendChild(table);
      mostRatedWrapper.appendChild(tableWrapper);
  
    }
  }
  function sorting(){
    let columnValue = document.querySelector('#column');
    let directionValue = document.querySelector('#direction');
    sortingColumn = columnValue.value;
    sortingDirection = directionValue.value;
    dataHandler.apiGet(`/get-15-most-rated/${page_number}/${sortingColumn}/${sortingDirection}`, (data) => {
      displayMostRatedShows(data);
      });
  }
  
  function buttonVis(){
    if(page_number == 1){
      previous.style.visibility = 'hidden' 
    }else{
      previous.style.visibility = 'visible'
    }
  
    if(page_number == 68){
      next.style.visibility = 'hidden'
    }else{
      next.style.visibility = 'visible'
    }
  
    showCurrentPage.innerText = page_number;
  }
  
  sortingBtn.addEventListener('click', sorting);
  
  previous.addEventListener('click', ()=>{
    if(page_number > 1){
      page_number = page_number-1;
      dataHandler.apiGet(`/get-15-most-rated/${page_number}/${sortingColumn}/${sortingDirection}`, (data) => {
      displayMostRatedShows(data);
      });
  
    }
    buttonVis()
  })
  
  
  next.addEventListener('click', ()=>{
    if(page_number < 68){
      page_number = page_number+1;
     
      dataHandler.apiGet(`/get-15-most-rated/${page_number}/${sortingColumn}/${sortingDirection}`, (data) => {
      displayMostRatedShows(data);
      });
  
    }
    buttonVis()
  })


dataHandler.apiGet('/get-15-most-rated/1/rating/desc', (data) => {
displayMostRatedShows(data);
buttonVis()
});