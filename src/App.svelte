<!-- src/App.svelte -->
<script>
    // @ts-ignore
    import { Router, Route } from "@sveltejs/kit";
    import Header from "./components/Header.svelte";
  </script>
  
  <Header />
  
  <Router>
    <Route path="/" let:page>
      <svelte:component this={page.component} {...page.props} />
    </Route>
  </Router>
  