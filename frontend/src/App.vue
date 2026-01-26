<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Vsacía - Send Message into the Void</h1>
      </div>
    </header>
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <button 
              @click="sendMessage"
              :disabled="loading"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              :class="{ 'opacity-50 cursor-not-allowed': loading }"
            >
              {{ loading ? 'Sending...' : 'Send message into the void' }}
            </button>
            
            <div class="mt-8">
              <div class="bg-gray-50 p-4 rounded-lg border">
                <h2 class="text-lg font-medium text-gray-900 mb-2">Current Stats</h2>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Count:</span>
                    <span class="font-medium" data-testid="count-value">{{ voidData.count }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Last Update:</span>
                    <span class="font-medium">{{ formatDate(voidData.timestamp) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      voidData: {
        message: '',
        count: 0,
        timestamp: null
      },
      loading: false
    };
  },
  async mounted() {
    await this.fetchVoidData();
  },
  methods: {
    async sendMessage() {
      this.loading = true;
      try {
        const response = await axios.post('/api/void');
        this.voidData = response.data;
      } catch (error) {
        // Error handling would normally be implemented here
      } finally {
        this.loading = false;
      }
    },
    async fetchVoidData() {
      try {
        const response = await axios.get('/api/void');
        this.voidData = response.data;
      } catch (error) {
        // Error handling would normally be implemented here
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>