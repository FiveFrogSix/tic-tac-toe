<template>
  <div class="container">
    <div class="row g-3 vh100 align-items-center">
      <div class="col">
        <Logo></Logo>
      </div>
      <div class="col">
        <div class="d-flex flex-column gap-3">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
