<script>
	import { onMount } from "svelte";
	import { fetchCandidates } from "../lib/api";
	import Table from "../components/Table.svelte";
	
  
	let candidates = [];
	let isLoading = true;
	
  
	onMount(async () => {
	  candidates = await fetchCandidates();
	  isLoading = false;
	});
  </script>
  
  <Table candidates={candidates} />
  
  
  
