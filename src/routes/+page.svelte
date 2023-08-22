<script>
	import { onMount } from "svelte";
	import { Table } from "flowbite-svelte"; // Import Flowbite Table component
  
	let candidates = [];
	let isLoading = true;
  
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
  </script>
  
  {#if isLoading}
	<p>Loading candidates...</p>
  {:else}
	<Table class="styled-table">
	  <thead>
		<tr>
		  <th>Name</th>
		  <th>Job Title</th>
		  <th>Email</th>
		  <th>Mobile</th>
		  <th>ID</th>
		  <th>Location</th>
		</tr>
	  </thead>
	  <tbody>
		{#each candidates as candidate}
		  <tr>
			<td>{candidate.fullName}</td>
			<td>{candidate.jobTitle}</td>
			<td>{candidate.email}</td>
			<td>{candidate.mobile}</td>
			<td>{candidate.id}</td>
			<td>{candidate.address.cityName}, {candidate.address.countryName}</td>
		  </tr>
		{/each}
	  </tbody>
	</Table>
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
  </style>
  