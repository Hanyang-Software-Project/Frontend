<template>
    <div>
      <header-component></header-component>
      <alarm-tab></alarm-tab> <!-- Your Alarm Tab component -->
      <main>
        <slot></slot> <!-- Content injected here from pages -->
      </main>
      <footer-component></footer-component>
    </div>
  </template>
  
  <script>
  import HeaderComponent from './HeaderComponent.vue';
  import FooterComponent from './FooterComponent.vue';
  import AlarmTab from './AlarmTab.vue'; // Ensure you import the AlarmTab component
  
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
      AlarmTab
    }
  }
  </script>
  