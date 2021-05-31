'use strict';

// Display all the items grouped by "listId"
// Sort the results first by "listId" then by "name" when displaying.
// Filter out any items where "name" is blank or null.

const errorContainer = document.querySelector('.main');

const baseURL = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';

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
      console.log(data);
      const html = data
        .map((user) => {
          return `
          <div class= 'user'>
          <p>List ID: ${user.listId}</p>
          <p>Name: ${user.name}</p>
          </div>`;
        })
        .join('');
      console.log(html);
      document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
    })
    .catch((error) => {
      console.log(error);
      renderError(`${error.message}. Try again`);
    });
};

fetchData();
