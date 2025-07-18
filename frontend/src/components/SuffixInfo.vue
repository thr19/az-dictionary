<template>
    <div v-if="suffix" class="mt-4">
        <h3 class="text-lg font-bold text-accent">Suffiks Qaydası</h3>
        <div class="bg-white/5 backdrop-blur p-4 rounded shadow text-text mt-2">
            <span class="font-bold text-primary">{{ suffix }}</span>
            <span class="ml-2">{{ explanation }}</span>
        </div>
    </div>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    suffix: string;
}>();

const explanation = ref('');
const error = ref('');

watch(() => props.suffix, async (newSuffix) => {
    if (!newSuffix) return;
    error.value = '';
    explanation.value = '';

    try {
        const res = await fetch(`http://localhost:3000/api/suffix/${encodeURIComponent(newSuffix)}`);
        if (!res.ok) throw new Error('Qayda tapılmadı');
        const data = await res.json();
        explanation.value = data.explanation;
    } catch (err: any) {
        error.value = err.message;
    }
});
</script>
