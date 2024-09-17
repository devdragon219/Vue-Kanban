<template>
    <div class="kanban-column">
      <div class="kanban-column-header">
        <div class="status-info">
          <!-- Conditionally display the icons based on grouping -->
          <img v-if="isStatusGrouping" :src="statusIcon" alt="Status Icon" class="status-icon" />
          <img v-if="isPriorityGrouping" :src="priorityIcon" alt="Priority Icon" class="priority-icon" />
          <span v-if="isUserGrouping" class="user-avatar">
            <img :src="userAvatar" alt="User Avatar" v-if="userAvatar" />
            <span v-else>{{ userInitials }}</span>
          </span>
          <span class="title">{{ title }}</span>
          <span class="task-count">{{ tickets.length }}</span>
        </div>
        <div class="column-actions">
          <img :src="addIcon" alt="Add Icon" class="add-task" />
          <img :src="noPrioIcon" alt="More Options Icon" class="more-options" />
        </div>
      </div>
  
      <div v-for="ticket in tickets" :key="ticket.id">
        <KanbanCard :ticket="ticket" :user="getUserById(ticket.userId)" />
      </div>
    </div>
  </template>
  
  <script>
  import KanbanCard from './KanbanCard.vue';
  import addIcon from '../assets/add.svg'; // Add icon
  import noPrioIcon from '../assets/No-priority.svg'; // No Priority icon
  
  export default {
    components: { KanbanCard },
    props: {
      title: String,
      tickets: Array,
      users: Array,
      isPriorityGrouping: Boolean,
      isUserGrouping: Boolean,
      isStatusGrouping: Boolean,
      statusIcon: String,
      priorityIcon: String
    },
    data() {
      return {
        addIcon,
        noPrioIcon
      };
    },
    computed: {
      userAvatar() {
        if (this.isUserGrouping && this.users.length > 0) {
          const user = this.getUserById(this.title);
          return user && user.avatar ? user.avatar : null;
        }
        return null;
      },
      userInitials() {
        if (this.isUserGrouping && this.users.length > 0) {
          const user = this.getUserById(this.title);
          return user && user.name
            ? user.name.split(' ').map(n => n[0]).join('')
            : 'U';
        }
        return 'U';
      }
    },
    methods: {
      getUserById(userId) {
        return this.users.find(user => user.id === userId) || {};
      }
    }
  };
  </script>
  
  <style scoped>
  .kanban-column {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    border-radius: 8px;
  }
  
  .kanban-column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .status-info {
    display: flex;
    align-items: center;
  }
  
  .status-icon,
  .priority-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
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
    margin-right: 8px;
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .title {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .task-count {
    color: #666;
  }
  
  .column-actions {
    display: flex;
    align-items: center;
  }
  
  .add-task {
    font-size: 20px;
    margin-right: 8px;
    cursor: pointer;
  }
  
  .more-options {
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  