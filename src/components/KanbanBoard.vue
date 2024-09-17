<template>
  <div class="kanban-board">
    <GroupingMenu @groupingChanged="updateGrouping" @sortingChanged="updateSorting" />
    <div class="columns">
      <KanbanColumn
        v-for="(group, key) in groupedTickets"
        :key="key"
        :title="getTitleForStatus(key)"
        :tickets="group"
        :users="users"
        :statusIcon="getStatusIcon(key)"
        :priorityIcon="getPriorityIcon(key)"
        :isPriorityGrouping="currentGrouping === 'priority'"
        :isUserGrouping="currentGrouping === 'user'"
        :isStatusGrouping="currentGrouping === 'status'"
      />
    </div>
  </div>
</template>

<script>
import { getTicketsAndUsers } from '../services/api';
import KanbanColumn from './KanbanColumn.vue';
import GroupingMenu from './GroupingMenu.vue';
import todoIcon from '../assets/To-do.svg';
import backlogIcon from '../assets/Backlog.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import canceledIcon from '../assets/Cancelled.svg';
import urgentColourIcon from '../assets/SVG - Urgent Priority colour.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';

export default {
  components: { KanbanColumn, GroupingMenu },
  data() {
    return {
      tickets: [],
      users: [],
      groupedTickets: {},
      currentGrouping: this.getSavedGrouping() || 'status', 
      currentSorting: this.getSavedSorting() || 'priority'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const data = await getTicketsAndUsers();
      this.tickets = data.tickets;
      this.users = data.users;
      this.groupTickets();
    },
    groupTickets() {
      let groups = {};

      if (this.currentGrouping === 'status') {
        groups = this.groupBy(this.tickets, 'status');

        groups = {
          'Backlog': groups['Backlog'] || [],
          'Todo': groups['Todo'] || [],
          'In Progress': groups['In progress'] || [],
          'Done': groups['Done'] || [],
          'Canceled': groups['Canceled'] || []
        };
      } else if (this.currentGrouping === 'user') {
        groups = this.groupBy(this.tickets, 'userId');
      } else if (this.currentGrouping === 'priority') {
        groups = this.groupBy(this.tickets, 'priority');
      }

      this.groupedTickets = this.sortGroups(groups);
    },
    groupBy(tickets, key) {
      return tickets.reduce((result, ticket) => {
        (result[ticket[key]] = result[ticket[key]] || []).push(ticket);
        return result;
      }, {});
    },
    sortGroups(groups) {
      for (const group in groups) {
        groups[group].sort((a, b) => {
          if (this.currentSorting === 'priority') {
            return b.priority - a.priority;
          }
          if (this.currentSorting === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }
      return groups;
    },
    updateGrouping(grouping) {
      this.currentGrouping = grouping;
      this.groupTickets();
      this.saveGrouping(grouping); 
    },
    updateSorting(sorting) {
      this.currentSorting = sorting;
      this.groupTickets();
      this.saveSorting(sorting); 
    },
    getTitleForStatus(status) {
      if (this.currentGrouping === 'priority') {
        const priorityMap = {
          4: 'Urgent',
          3: 'High',
          2: 'Medium',
          1: 'Low',
          0: 'No priority'
        };
        return priorityMap[status] || status;
      }

      const titles = {
        'Todo': 'To Do',
        'In Progress': 'In Progress',
        'Backlog': 'Backlog',
        'Done': 'Done',
        'Canceled': 'Canceled'
      };
      return titles[status] || status;
    },
    getStatusIcon(status) {
      const statusMap = {
        'Backlog': backlogIcon,
        'Todo': todoIcon,
        'In Progress': inProgressIcon,
        'Done': doneIcon,
        'Canceled': canceledIcon
      };
      return statusMap[status] || todoIcon;
    },
    getPriorityIcon(priority) {
      const priorityMap = {
        4: urgentColourIcon,
        3: highPriorityIcon,
        2: mediumPriorityIcon,
        1: lowPriorityIcon,
        0: noPriorityIcon
      };
      return priorityMap[priority] || noPriorityIcon;
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
.kanban-board {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.columns {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 768px) {
  .columns {
    flex-direction: column;
  }
}
</style>
