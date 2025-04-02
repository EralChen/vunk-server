<script setup>
import { ref } from 'vue'
import { calculateFileHashSample } from '../../client'

const testHash = '62033a06de32715a1340a5ad43d7dfc0'
async function handleChange (event) {
  const file = event.target.files[0]
  if (file) {
    const hash = await calculateFileHashSample(file)
    console.log(hash)
    console.log(hash === testHash)
  }
}
</script>

<template>
  <input
    data-testid="file_input"
    type="file"
    @change="handleChange"
  />
</template>
