<template>
    <div class="table-card">
      <!-- Header Section -->
      <div class="card-header">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-category">{{ subTitle }}</p>
      </div>
  
      <!-- Body Section -->
      <div class="card-body">
        <slot></slot>
      </div>
  
      <!-- Footer Section -->
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TableCard",
    props: {
      title: {
        type: String,
        required: true, // Title is mandatory
      },
      subTitle: {
        type: String,
        default: "", // Subtitle is optional
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .card-header {
    margin-bottom: 15px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  
  .card-category {
    font-size: 14px;
    color: #999;
    margin: 5px 0 0;
  }
  
  .card-body {
    padding: 10px 0;
  }
  
  .card-footer {
    border-top: 1px solid #e3e3e3;
    padding: 10px 0 0;
    font-size: 14px;
    color: #666;
  }
  </style>
  