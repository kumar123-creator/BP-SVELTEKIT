<script>
	import { onMount } from "svelte";
	import { Table } from "flowbite-svelte"; // Import Flowbite Table component
	import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { Button, Modal } from 'flowbite-svelte';
    import { Input, Label} from 'flowbite-svelte';
  
	let candidates = [];
	let isLoading = true;
	let selectedCandidate = null;
	let isPopupOpen = false;
  
	async function fetchCandidates() {
	  const apiKey = "TEST1236C4CF23E6921C41429A6E1D546AC9535E";
	  const apiUrl = `https://api.recruitly.io/api/candidate?apiKey=${apiKey}`;
  
	  try {
		const response = await fetch(apiUrl);
		const data = await response.json();
  
		if (data && data.data && Array.isArray(data.data)) {
		  candidates = data.data;
		} else {
		  console.error("Invalid API response:", data);
		}
	  } catch (error) {
		console.error("Error fetching candidates:", error);
	  } finally {
		isLoading = false; // Set isLoading to false when done loading
	  }
	}
      onMount(fetchCandidates);

	  function openEditPopup(candidate) {
    selectedCandidate = candidate;
    isPopupOpen = true;
  }

  async function editCandidate(updatedCandidate) {
    // Find the index of the selectedCandidate in the candidates array
    const index = candidates.findIndex(candidate => candidate.id === updatedCandidate.id);

    if (index !== -1) {
      candidates[index] = updatedCandidate;

      // Make an API call to update the server
      const response = await fetch(`https://api.recruitly.io/api/candidate?apiKey=TEST1236C4CF23E6921C41429A6E1D546AC9535E`, {
        method: 'POST', // Use PUT method to update existing data
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCandidate) // Send the updated candidate data
        // Add any necessary authentication headers or tokens
      });

      if (response.ok) {
        // Candidate updated successfully on the server
        console.log("Candidate updated successfully!");
      } else {
        // Handle error if update on server failed
        console.error('Failed to update candidate on the server');
      }
    }

    isPopupOpen = false; // Close the popup after editing
  }
  </script>
  
  {#if isLoading}
	<p>Loading candidates...</p>
  {:else}
	<Table class="styled-table">
	  <thead>
		<tr>
		  <th>First Name</th>
		  <th>SurName</th>
		  <th>Job Title</th>
		  <th>Email</th>
		  <th>Mobile</th>
		  <th>ID</th>
		  <th>Location</th>
		  <th>Actions</th>
		</tr>
	  </thead>
	  <tbody>
		{#each candidates as candidate}
		  <tr>
			<td>{candidate.firstName}</td>
			<td>{candidate.surname}</td>
			<td>{candidate.jobTitle}</td>
			<td>{candidate.email}</td>
			<td>{candidate.mobile}</td>
			<td>{candidate.id}</td>
			<td>{candidate.address.cityName}, {candidate.address.countryName}</td>
			<td><button on:click={() => openEditPopup(candidate)}>Edit</button></td>
		  </tr>
		{/each}
	  </tbody>
	</Table>
  {/if}

  {#if selectedCandidate}
  <div class="popup-background" style="display: {isPopupOpen ? 'block' : 'none'}">
    <div class="popup-content">
      <form>
		<div class="grid gap-6 mb-6 md:grid-cols-1">
			<div>
			  <Label for="first_name" class="mb-2">First name</Label>
			  <Input type="text" id="first_name" bind:value={selectedCandidate.firstName}/>
			</div>	  
			
			<div>	  
			  <Label for="last_name" class="mb-2">Surname</Label>	  
			  <Input type="text" id="last_name"  bind:value={selectedCandidate.surname}/>	  
			</div>
	  
			<div>
	  		  <Label for="phone" class="mb-2">Mobile</Label>  
			  <Input type="tel" id="phone" bind:value={selectedCandidate.mobile} />	  
			</div>
	  
			<div>	  
			  <Label for="email" class="mb-2">Email</Label>
			  <Input type="email" id="email" bind:value={selectedCandidate.email}/>
			</div>
      </form>
      <div class="popup-buttons">
        <button on:click={() => editCandidate(selectedCandidate)}>Save</button>
        <button on:click={() => isPopupOpen = false} class="alternative">Cancel</button>
      </div>
    </div>
  </div>
{/if}
  
  <style>
	:global(.styled-table) {
	  width: 100%;
	  border-collapse: collapse;
	  border: 1px solid #ccc;
	  font-size: 14px;
	}
  
	:global(.styled-table th, .styled-table td) {
	  border: 1px solid #ccc;
	  padding: 8px;
	  text-align: left;
	}
  
	:global(.styled-table th) {
	  background-color: #f2f2f2;
	  font-weight: bold;
	}
  
	:global(.styled-table tbody tr:hover) {
	  background-color: #f5f5f5;
	}

.popup-background {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.3);
display: flex;
justify-content: center;
align-items: center;
}

.popup-content {
background-color: lemonchiffon;
padding: 20px;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
width: 400px;
height: 500px;
text-align: center; /* Center the content horizontally */
margin-left:550px;
margin-top: 100px;
}

.popup-buttons {
display: flex;
justify-content: space-between;
margin-top: 10px; 
color: brown;
}
</style>


