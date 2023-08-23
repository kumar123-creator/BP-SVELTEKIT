<!-- src/components/Popup.svelte -->
<script>
    export let isOpen = false;
  </script>
  
  {#if isOpen}
  <div class="popup-background">
    <div class="popup-content">
      <slot />
    </div>
  </div>
  {/if}
  
  <style>
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
      background-color: lavender;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 400px;
      text-align: center;
    }
  </style>
  