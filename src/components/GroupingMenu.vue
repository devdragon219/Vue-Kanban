<template>
  <div class="grouping-menu">
    <div class="dropdown-container">
      <button class="dropdown-button">
        <img :src="displayIcon" alt="Display Icon" class="icon display-icon" />
        Display
        <img :src="downIcon" alt="Down Arrow" class="icon down-arrow" />
      </button>
      <div class="dropdown-content">
        <div class="input-group">
          <label for="grouping">Grouping:</label>
          <select v-model="selectedGrouping" @change="changeGrouping">
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div class="input-group">
          <label for="sorting">Ordering:</label>
          <select v-model="selectedSorting" @change="changeSorting">
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import displayIcon from '../assets/Display.svg';
import downIcon from '../assets/down.svg';

export default {
  data() {
    return {
      selectedGrouping: this.getSavedGrouping() || 'status',
      selectedSorting: this.getSavedSorting() || 'priority', 
      displayIcon,
      downIcon
    };
  },
  methods: {
    changeGrouping() {
      this.saveGrouping(this.selectedGrouping); 
      this.$emit('groupingChanged', this.selectedGrouping);
    },
    changeSorting() {
      this.saveSorting(this.selectedSorting); 
      this.$emit('sortingChanged', this.selectedSorting);
    },
    saveGrouping(grouping) {
      localStorage.setItem('kanban-grouping', grouping);
    },
    saveSorting(sorting) {
      localStorage.setItem('kanban-sorting', sorting);
    },
    getSavedGrouping() {
      return localStorage.getItem('kanban-grouping');
    },
    getSavedSorting() {
      return localStorage.getItem('kanban-sorting');
    }
  }
};
</script>

<style scoped>
.grouping-menu {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #ffffff;
  border: 1px solid #e1e3e6;
  padding: 6px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.dropdown-button:hover {
  background-color: #f9fafb;
  border-color: #cdd1d5;
}

.icon {
  width: 16px;
  height: 16px;
}

.display-icon {
  margin-right: 8px;
}

.down-arrow {
  margin-left: auto;
  margin-right: 4px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 250px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 6px;
  border: 1px solid #e1e3e6;
}

.dropdown-container:hover .dropdown-content {
  display: block;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.input-group label {
  font-size: 14px;
  margin-right: 10px;
  flex-shrink: 0;
}

.input-group select {
  width: 130px;
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
