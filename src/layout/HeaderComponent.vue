<template>
    <header>
      <nav>
        <!-- Navigation links go here -->
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent'
  }
  </script>
  
  <style>
  /* CSS for styling the header */
  header {
    background-color: #f8f9fa;
    padding: 10px 20px;
  }
  nav a {
    margin-right: 10px;
  }
  </style>
  