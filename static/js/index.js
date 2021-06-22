import { dataHandler } from './data_handler.js';

function displayShows(data) {  
    let indexWrapper = document.querySelector('.index-wrapper');
      let contentHeader = `<h1 class="title text-center">Welcome page</h1>
      <div class="card">
      <h2>Welcome TV show lovers!</h2></div>`;
      indexWrapper.innerHTML = contentHeader;
      let content = document.querySelector('.card');
      data.forEach((element) => {
        let showTitle = `<p>${element.title}</p>`;
        content.insertAdjacentHTML('beforeend', showTitle);
      });
    
}

dataHandler.apiGet('/get-shows', (data) => {
    displayShows(data);
  });
