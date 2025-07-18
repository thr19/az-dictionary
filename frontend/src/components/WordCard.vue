<template>
    <div class="card mt-4">
        <h2 class="title">{{ word.word }}</h2>
        <p class="text-sm text-gray-400 mb-2">{{ word.part_of_speech }}</p>

        <p class="mb-4">
            <span class="font-bold text-primary">Tərif:</span>
            {{ word.definition }}
        </p>

        <div v-if="word.synonyms.length" class="mb-2">
            <span class="font-bold text-accent">Sinonimlər:</span>
            <span class="ml-2">{{ word.synonyms.join(', ') }}</span>
        </div>

        <div v-if="word.antonyms.length" class="mb-2">
            <span class="font-bold text-accent">Antonimlər:</span>
            <span class="ml-2">{{ word.antonyms.join(', ') }}</span>
        </div>

        <div v-if="word.suffixes.length">
            <span class="font-bold text-accent">Suffikslər:</span>
            <span class="ml-2">{{ word.suffixes.join(', ') }}</span>
        </div>
    </div>
    <div class="card mt-4">
        <!-- existing content... -->
        <SuffixViewer :suffixes="word.suffixes" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    word: {
        word: string;
        definition: string;
        part_of_speech: string;
        synonyms: string[];
        antonyms: string[];
        suffixes: string[];
    };
}>();
import SuffixViewer from './SuffixViewer.vue';
defineProps<{ word: any }>();
</script>
