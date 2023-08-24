// src/lib/api.js
export let isAddPopupOpen = false;
export let newCandidate = {
    firstName: "",
    surname: "",
    mobile: "",
    email: "",
  };
  export let selectedCandidate = null;
  export let isPopupOpen = false;
  export let candidates = [];
  export let isLoading = true;
  export let candidateToDelete = null;
  export let isDeleteConfirmPopupOpen = false;

const API_KEY = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
const BASE_URL = "https://api.recruitly.io/api/";

export async function fetchCandidates() {
  const apiKey = API_KEY;
  const apiUrl = `${BASE_URL}candidate?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Invalid API response:", data);
      return [];
    }
} catch (error) {
    console.error("Error fetching candidates:", error);
  } finally {
    isLoading = false; // Set isLoading to false when done loading
  }
}

export function openAddPopup() {
    newCandidate = {
      firstName: "",
      surname: "",
      mobile: "",
      email: ""
      // Reset other properties
    };
    isAddPopupOpen = true;
  }
    

  export async function addCandidate(newCandidate) {
    // Make an API call to add the new candidate
    const response = await fetch(`https://api.recruitly.io/api/candidate?apiKey=TEST1236C4CF23E6921C41429A6E1D546AC9535E`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCandidate)
      // Add any necessary authentication headers or tokens
    });
  
    if (response.ok) {
      // Candidate added successfully on the server
      console.log("Candidate added successfully!");
      console.log(newCandidate);
      
      // Add the new candidate to the local candidates array
      candidates.push(newCandidate);
      isAddPopupOpen = false; // Close the popup after adding
    } else {
      // Handle error if adding candidate on server failed
      console.error('Failed to add candidate on the server');
    }
  }
  


export function openEditPopup(candidate) {
    selectedCandidate = candidate;
    isPopupOpen = true;
  }
  export async function editCandidate(updatedCandidate) {
    const index = candidates.findIndex(candidate => candidate.id === updatedCandidate.id);
  
    if (index !== -1) {
      // Update the local candidates array first
      candidates[index] = updatedCandidate;
  
      // Make the API call
      const response = await fetch(`https://api.recruitly.io/api/candidate?apiKey=TEST1236C4CF23E6921C41429A6E1D546AC9535E`, {
        method: 'PUT', // Use PUT method for updates
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCandidate)
      });
  
      if (response.ok) {
        // Candidate updated successfully on the server
        console.log("Candidate updated successfully!");
        console.log(updatedCandidate);
      } else {
        // Handle error if update on server failed
        console.error('Failed to update candidate on the server');
      }
  
      // Close the popup after the API call and update
      isPopupOpen = false;
    }
  }
  

export function confirmDelete(candidate) {
    candidateToDelete = candidate;
    isDeleteConfirmPopupOpen = true;
  }
    

export async function deleteCandidate(candidate) {
    const apiKey = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
    const deleteUrl = `https://api.recruitly.io/api/candidate/${candidate.id}?apiKey=${apiKey}`;
  
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Candidate deleted successfully on the server
        console.log("Candidate deleted successfully!");
  
        // Remove the deleted candidate from the candidates array
        candidates = candidates.filter(c => c.id !== candidate.id);
        isDeleteConfirmPopupOpen = false; // Close the delete popup
      } else {
        // Handle error if deletion on server failed
        console.error('Failed to delete candidate on the server');
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  }