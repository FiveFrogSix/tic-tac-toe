<script lang="ts" setup>
const props = defineProps({
  username: {
    default: "",
    type: String,
  },
});
let firstLetter = ref("A");
onMounted(() => {
  firstLetter.value = props.username.substr(0, 1);
});
</script>

<template>
  <div class="card-profile mx-auto">
    <div class="row g-3 align-items-center">
      <div class="col">
        <div class="profile-circle">{{ firstLetter }}</div>
      </div>
      <div class="col">
        {{ username }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-profile {
  border-radius: 10px;
  color: var(--bs-gray-900);
  background-color: var(--bs-white);
  padding: 10px;
}
.profile-circle {
  width: 32px; // Set width for the profile circle
  height: 32px; // Set height (should be the same as width for a perfect circle)
  border-radius: 50%; // Make it a circle
  background-color: #ddd; // Default background color (gray)
  display: flex; // Use flexbox to center the content
  align-items: center; // Vertically center
  justify-content: center; // Horizontally center
  font-size: 25px; // Font size for placeholder text or initials
  color: #666; // Text color
  text-transform: uppercase; // Uppercase any text (e.g., initials)
}
</style>
