<!-- src/App.svelte -->
<script>
    // @ts-ignore
    import { Router, Route } from "@sveltejs/kit";
    import Header from "./components/AddCandidatePopup.svelte";
  </script>
  
  <Header />
  
  <Router>
    <Route path="/" let:page>
      <svelte:component this={page.component} {...page.props} />
    </Route>
  </Router>
  