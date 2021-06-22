import { dataHandler } from './data_handler.js';

let id = window.location.href.split('/')[4];

function displayShow(data) {
  let detailedShowWrapper = document.querySelector('.detailed-view');
  let showOverview;
  if (data.show[0].overview) {
    showOverview = data.show[0].overview;
  } else {
    showOverview = 'Overview unavailable';
  }
  detailedShowWrapper.innerHTML = `
  <div class="row">
  <div class="col col-twothird">
  <h2>${data.show[0].title}</h2>
  <iframe src="${data.show[0].trailer.replace(
    'watch?v=',
    'embed/',
  )}" allowfullscreen></iframe>
  <p class="small grayed">${
    data.show[0].runtime
  }<span class="separator">|</span> ${data.show[0].genres} <span
  class="separator">|</span> ${data.show[0].year}</p>
  <p>${showOverview}</p>
  </div>
  </div>
  <div>
  <p><b>Stars:</b>&nbsp;<a href="#">${data.actors[0]}</a>, <a href="#"> ${
    data.actors[1]
  }</a>, <a href="#"> ${data.actors[2]}</a></p>
  <div class="seasons-list">
  </div>
  </div>`;
  let seasonsWrapper = document.querySelector('.seasons-list');
  data.seasons.forEach((element) => {
    let seasonOverview;
    if (element.overview) {
      seasonOverview = element.overview;
    } else {
      seasonOverview = 'Unavailable overview';
    }
    seasonsWrapper.innerHTML += `
    <h2>${element.title} </h2>
    <span>${seasonOverview}</span>`;
  });
}

dataHandler.apiGet(`/single-show/${id}`, (data) => {
  displayShow(data);
});
