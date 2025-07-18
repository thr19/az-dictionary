<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    query: string;
}>();

// Define the shape of a word result
interface WordResult {
    id: string;
    word: string;
    definition: string;
    part_of_speech: string;
}

const results = ref<WordResult[]>([]);

watch(() => props.query, async (newQuery) => {
    if (!newQuery) return;
    const res = await fetch(`http://localhost:3000/api/search?q=${newQuery}`);
    results.value = await res.json();
});
</script>
