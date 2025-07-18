<template>
    <div class="card mt-8">
        <h2 class="title mb-4">Admin Panel</h2>
        <WordEditor @saved="onSaved" />
    </div>
</template>

<script setup lang="ts">
import WordEditor from './WordEditor.vue';

function onSaved(word: any) {
    console.log('✅ Word saved:', word);
}
</script>
