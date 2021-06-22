export let dataHandler = {
  apiGet: async function (url, callback) {
    let request = await fetch(url);
    let data = await request.json();
    callback(data);
  },
};
