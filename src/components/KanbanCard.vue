<template>
    <div class="kanban-card">
      <div class="card-header">
        <span class="card-id">{{ ticket.id }}</span>
        <span class="user-avatar">
          <img :src="user.avatar" alt="User Avatar" v-if="user.avatar" />
          <span v-else>{{ userInitials }}</span>
        </span>
      </div>
      <div class="card-title" :title="ticket.title">
        {{ ticket.title }}
      </div>
      <div class="card-footer">
        <div class="feature-icon">
          <img :src="urgentGreyIcon" alt="Urgent Icon" class="feature-icon-symbol" />
        </div>
        <span class="ticket-type">Feature Request</span>
      </div>
    </div>
  </template>
  
  <script>
  import urgentGreyIcon from '../assets/SVG - Urgent Priority grey.svg';
  
  export default {
    props: {
      ticket: Object,
      user: Object
    },
    data() {
      return {
        urgentGreyIcon
      };
    },
    computed: {
      userInitials() {
        if (this.user && this.user.name) {
          return this.user.name.split(' ').map(n => n[0]).join('');
        }
        return 'Unassigned';
      }
    }
  };
  </script>
  
  <style scoped>
  .kanban-card {
    width: auto;
    border: 1px solid #e0e0e0;
    padding: 0.85rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s ease-in-out;
  }
  
  .kanban-card:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-id {
    font-size: 0.85rem;
    color: #8a8a8a;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d1d1d1;
    color: white;
    font-size: 0.85rem;
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-footer {
    display: flex;
    align-items: center;
  }
  
  .feature-icon {
    width: 24px;
    height: 24px;
    border: 2px solid #f5f5f5;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }
  
  .feature-icon-symbol {
    font-size: 16px;
    color: #6d6d6d;
  }
  
  .ticket-type {
    font-size: 0.85rem;
    color: #6d6d6d;
    background-color: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
  }
  </style>
  