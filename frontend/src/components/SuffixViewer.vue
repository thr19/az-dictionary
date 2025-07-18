<template>
    <div v-if="suffixes.length" class="mt-6">
        <h3 class="text-xl font-bold text-accent mb-2">Suffikslər</h3>
        <ul class="grid grid-cols-2 gap-2">
            <li v-for="suffix in suffixes" :key="suffix" class="bg-white/5 backdrop-blur p-2 rounded shadow text-text">
                <span class="font-bold text-primary">{{ suffix }}</span>
                <span v-if="notes[suffix]" class="ml-2 text-sm text-gray-400">
                    — {{ notes[suffix] }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    suffixes: string[];
}>();

// Optional: grammatical notes or usage hints
const notes: Record<string, string> = {
    '-lıq': 'isim düzəldən suffiks (məs: dost → dostluq)',
    '-çı': 'peşə və ya funksiya bildirir (məs: kitab → kitabçı)',
    '-lik': 'keyfiyyət və ya məkan bildirir',
    '-cə': 'kiçiltmə və ya oxşarlıq bildirir',
    '-an': 'felin sifət forması (məs: qaçmaq → qaçan)',
    '-ış': 'felin nəticə və ya hal forması'
};
</script>
