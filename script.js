'use strict';
readData();
//localStorage.clear();

// let fName = document.getElementById('txtFirstName');
// let lName = document.getElementById('txtLastName');
// let address = document.getElementById('txtAddress');
const frmOsoba = document.getElementById('frmOsoba');
const tableBody = document.getElementById('tBody');

const osobe = [];

function sacuvaj() {
  let fName = document.getElementById('txtFirstName').value;
  let lName = document.getElementById('txtLastName').value;
  let address = document.getElementById('txtAddress').value;

  let osoba = {
    ime: fName,
    prezime: lName,
    adresa: address,
  };

  if (localStorage.getItem('Crud') === null) {
    let osobe = [];
    osobe.push(osoba);
    localStorage.setItem('Crud', JSON.stringify(osobe));
  } else {
    let osobe = JSON.parse(localStorage.getItem('Crud'));
    osobe.push(osoba);
    localStorage.setItem('Crud', JSON.stringify(osobe));
  }
  readData();
  frmOsoba.reset();
}

frmOsoba.addEventListener('submit', function (e) {
  e.preventDefault();
  sacuvaj();
  readData();
});

const clear = () => (fName.value = lName.value = address.value = '');

function readData() {
  const tBody = document.getElementById('tBody');
  let osobe = JSON.parse(localStorage.getItem('Crud'));
  tBody.innerHTML = '';
  for (let i = 0; i < osobe.length; i++) {
    let ime = osobe[i].ime;
    let prezime = osobe[i].prezime;
    let adresa = osobe[i].adresa;
    tBody.innerHTML += `
    <tr>
        <td>${ime}</td>
        <td>${prezime}</td>
        <td>${adresa}</td>
        <td>
            <button class="btn btn-warning edit">Edit</button>
            <button class="btn btn-danger delete">Delete</button>
        </td>
        </tr>
    `;
  }
}
