<script>
	import { onMount } from "svelte";
	import { fetchCandidates, addCandidate } from "../lib/api";
	import Table from "../components/Table.svelte";
	
  
	let candidates = [];
	let isLoading = true;
	
  
	onMount(async () => {
	  candidates = await fetchCandidates();
	  isLoading = false;
	});
  </script>
  
  <Table candidates={candidates} />
  
  