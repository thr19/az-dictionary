<template>
    <div class="flex items-center gap-2 mt-4">
        <input v-model="term" @keyup.enter="search" type="text" placeholder="Axtarılacaq söz..."
            class="px-4 py-2 rounded bg-white text-black w-full shadow-md" />
        <button @click="search" class="btn">Axtar</button>
    </div>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const term = ref('');
const error = ref('');

const emit = defineEmits<{
    (e: 'result', word: any): void;
}>();

async function search() {
    error.value = '';
    if (!term.value.trim()) return;

    try {
        const res = await fetch(`http://localhost:3000/api/word/${term.value}`);
        if (!res.ok) throw new Error('Söz tapılmadı');
        const data = await res.json();
        emit('result', data);
    } catch (err: any) {
        error.value = err.message;
        emit('result', null);
    }
}
</script>
