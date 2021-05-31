'use strict';

const errorContainer = document.querySelector('.main');

const baseURL = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';

// Error message for fetch function
const renderError = function (msg) {
  errorContainer.insertAdjacentHTML('beforebegin', msg);
};

const fetchData = () => {
  fetch(baseURL)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something went wrong: (${response.status})`);
      return response.json();
    })
    .then((data) => {
      let figure = removeFalsyValues(data);
      const html = figure
        .map((user) => {
          return `
          <div class= 'rewards'>
          <p>List ID: ${user.listId}</p>
          <p>Name: ${user.name}</p>
          </div>`;
        })
        .join('');
      document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
    })
    .catch((error) => {
      renderError(`${error.message}. Try again.`);
    });
};

fetchData();

const removeFalsyValues = (data) => {
  let filtered = data.filter((values) => {
    return !!values.name;
  });

  let sortedData = filtered.sort((a, b) => {
    return a.listId - b.listId || a.id - b.id;
  });

  return sortedData;
};
