import { basePath, apiVersion } from "./config";


export function getPets() {
  const url = `${basePath}/${apiVersion}/getpets`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function deletePet(petId) {
  const url = `${basePath}/${apiVersion}/deletepet/${petId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function addPetDB(data) {
  const url = `${basePath}/${apiVersion}/addpet`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

export function editPetDB( pet, petId) {
  const url = `${basePath}/${apiVersion}/updatepet/${petId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify(pet)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

