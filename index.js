'use strict';
let fName = document.getElementById('fName');
let lName = document.getElementById('lName');
let strAddr = document.getElementById('strAddr');
let arrOsoba = [];
let mode = 'create';
let selectedRow = null;
let tmpId;
const btnSubmit = document.getElementById('btnSubmit');
const tBody = document.getElementById('tBody');
const frmOsoba = document.getElementById('frmOsoba');
if (localStorage.getItem('osobe') == null) {
  arrOsoba = [];
} else {
  arrOsoba = JSON.parse(localStorage.getItem('osobe'));
  displayTable();
}
frmOsoba.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validate() == true) {
    if (mode == 'create') {
      const osobaObj = {
        fName: fName.value,
        lName: lName.value,
        strAddr: strAddr.value,
      };
      arrOsoba.push(osobaObj);
      localStorage.setItem('osobe', JSON.stringify(arrOsoba));
      displayTable();
      fName.value = lName.value = strAddr.value = '';
    } else {
      btnSubmit.innerHTML = 'Edit Entered Data';
      updateOsoba(tmpId);
      displayTable();
      btnSubmit.innerHTML = 'Submit Entered Data';
      // reuse();
      mode = 'create';
    }
    fName.value = lName.value = strAddr.value = '';
    fName.focus();
  } else {
    return false;
  }
});
function displayTable() {
  let tbl = '';
  for (let i = 0; i < arrOsoba.length; i++) {
    tbl += `
    <tr>
            <td>${i + 1}</td>
            <td>${arrOsoba[i].fName}</td>
            <td>${arrOsoba[i].lName}</td>
            <td>${arrOsoba[i].strAddr}</td>
            <td>
              
                <button class="btn btn-warning edit" onclick="updateOsoba(${i})">Edit</button>
                <button class="btn btn-danger" onclick="deleteOsoba(${i})"> Delete</button>
              
            </td>
            </tr>
  `;
  }
  tBody.innerHTML = tbl;
}
function deleteOsoba(id) {
  arrOsoba.splice(id, 1);
  localStorage.setItem('osobe', JSON.stringify(arrOsoba));
  displayTable();
}
function updateOsoba(id) {
  tmpId = id;
  mode = 'update';
  btnSubmit.innerHTML = 'Update Entered Data';
  const osobaObj = {
    fName: fName.value,
    lName: lName.value,
    strAddr: strAddr.value,
  };
  fName.value = arrOsoba[id].fName;
  lName.value = arrOsoba[id].lName;
  strAddr.value = arrOsoba[id].strAddr;
  arrOsoba[tmpId] = osobaObj;
  localStorage.setItem('osobe', JSON.stringify(arrOsoba));
}

tBody.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('edit')) {
    selectedRow = e.target.parentElement.parentElement;

    fName.value = selectedRow.children[1].textContent;
    lName.value = selectedRow.children[2].textContent;
    strAddr.value = selectedRow.children[3].textContent;

    btnSubmit.innerHTML = 'Update Entered Data';
    console.log(selectedRow);
  }
});

function validate() {
  if (fName.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Niste upisali sve podatke',
      text: 'Upišite ime',
    });
    fName.focus();
    return false;
  } else if (lName.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Niste upisali sve podatke',
      text: 'Upišite prezime',
    });
    lName.focus();
    return false;
  } else if (strAddr.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Niste upisali sve podatke',
      text: 'Upišite adresu',
    });
    strAddr.focus();
    return false;
  }
  return true;
}
