// src/lib/api.js
const API_KEY = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
const BASE_URL = "https://api.recruitly.io/api/";

export async function fetchCandidates() {
  const url = `${BASE_URL}candidate?apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

export async function addCandidate(candidateData) {
  const url = `${BASE_URL}candidate?apiKey=${API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidateData),
  });
  return response.ok;
}

export async function editCandidate(updatedCandidate) {
  const url = `${BASE_URL}candidate/${updatedCandidate.id}?apiKey=${API_KEY}`;
  const response = await fetch(url, {
    method: "POST", // Use PUT method to update existing data
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCandidate),
  });
  return response.ok;
}

export async function deleteCandidate(candidateId) {
  const url = `${BASE_URL}candidate/${candidateId}?apiKey=${API_KEY}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.ok;
}
