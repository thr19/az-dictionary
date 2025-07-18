<template>
  <div class="p-8 max-w-2xl mx-auto">
    <SearchBar @result="word = $event" />
    <WordCard v-if="word" :word="word" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import WordCard from './components/WordCard.vue';

const word = ref(null);
</script>
