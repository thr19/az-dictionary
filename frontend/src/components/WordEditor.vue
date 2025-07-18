<template>
    <form @submit.prevent="save" class="grid gap-4">
        <input v-model="word.word" placeholder="Söz" class="input" />
        <textarea v-model="word.definition" placeholder="Tərif" class="input" />
        <input v-model="word.part_of_speech" placeholder="Nitq hissəsi" class="input" />
        <input v-model="word.synonyms" placeholder="Sinonimlər (vergüllə)" class="input" />
        <input v-model="word.antonyms" placeholder="Antonimlər (vergüllə)" class="input" />
        <input v-model="word.suffixes" placeholder="Suffikslər (vergüllə)" class="input" />

        <button class="btn" type="submit">Yadda saxla</button>
        <p v-if="message" class="text-green-500 mt-2">{{ message }}</p>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const word = ref({
    word: '',
    definition: '',
    part_of_speech: '',
    synonyms: '',
    antonyms: '',
    suffixes: ''
});

const message = ref('');
const emit = defineEmits(['saved']);

async function save() {
    const res = await fetch('http://localhost:3000/api/admin/word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word.value)
    });

    if (res.ok) {
        message.value = '✅ Uğurla yadda saxlanıldı';
        emit('saved', word.value);
    } else {
        message.value = '❌ Xəta baş verdi';
    }
}
</script>

<input class="px-4 py-2 rounded bg-white text-black shadow" />
