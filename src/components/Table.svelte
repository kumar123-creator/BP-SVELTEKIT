<!-- src/components/Table.svelte -->
<script>
    import { onMount } from "svelte";
    import { addCandidate, deleteCandidate, editCandidate, fetchCandidates } from "../lib/api";
    import { Input, Label } from "flowbite-svelte";
  
    let candidates = [];
    let isLoading = true;
    let isAddPopupOpen = false;
	let newCandidate = {
	  firstName: "",
	  surname: "",
	  mobile: "",
	  email: "",
	};
  
    let selectedCandidate = null;
	let isPopupOpen = false;
    /**
   * @type {{ firstName: any; surname: any; email: any; } | null}
   */
    let candidateToDelete = null;
    let isDeleteConfirmPopupOpen = false;
  
  
    onMount(async () => {
      candidates = await fetchCandidates();
      isLoading = false;
    });

    async function addNewCandidate() {
	  const success = await addCandidate(newCandidate);
	  if (success) {
		candidates = await fetchCandidates();
		isAddPopupOpen = false;
	  }
	}
     
    function openEditPopup(candidate) {
    selectedCandidate = candidate;
    isPopupOpen = true;
  }

  function confirmDelete(candidate) {
  candidateToDelete = candidate;
  isDeleteConfirmPopupOpen = true;
}
  </script>
  
  {#if isLoading}
    <p>Loading candidates...</p>
  {:else}
    <table class="styled-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Surname</th>
          <th>Job Title</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>ID</th>
          <th>Location</th>
          <th>Add</th>
          <th>Edit</th>
          <th>Delete</th>
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
            <td><button on:click={() => isAddPopupOpen = true}>Add</button></td>
            <td><button on:click={() => openEditPopup(candidate)}>Edit</button></td>
            <td><button on:click={() => confirmDelete(candidate)}>Delete</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  {#if isAddPopupOpen}
<div class="popup-background" style="display: {isAddPopupOpen ? 'block' : 'none'}">
  <div class="popup-content">
	<form>
	  <div class="grid gap-6 mb-6 md:grid-cols-1">
		<div>
		  <label for="first_name" class="mb-2">First name</label>
		  <input type="text" id="first_name" bind:value={newCandidate.firstName} />
		</div>
		
		<div>
		  <label for="last_name" class="mb-2">Surname</label>
		  <input type="text" id="last_name" bind:value={newCandidate.surname} />
		</div>
  
		<div>
		  <label for="phone" class="mb-2">Mobile</label>
		  <input type="tel" id="phone" bind:value={newCandidate.mobile} />
		</div>
  
		<div>
		  <label for="email" class="mb-2">Email</label>
		  <input type="email" id="email" bind:value={newCandidate.email} />
		</div>
	  </div>
	</form>
	 <div class="popup-buttons">
      <button on:click={() => addCandidate()}>Add</button>
      <button on:click={() => isAddPopupOpen = false} class="alternative">Cancel</button>
    </div>
</div>
</div>
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

{#if isDeleteConfirmPopupOpen}
<div class="popup-background">
	<div class="popup-content delete-popup-content">
    <p>Are you sure you want to delete the following candidate?</p>
    <p>Name: {candidateToDelete.firstName} {candidateToDelete.surname}</p>
    <p>Email: {candidateToDelete.email}</p>
    <div class="popup-buttons">
      <button on:click={() => deleteCandidate(candidateToDelete)}>Yes</button>
      <button on:click={() => isDeleteConfirmPopupOpen = false} class="alternative">Cancel</button>
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
background-color:lavender;
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
  