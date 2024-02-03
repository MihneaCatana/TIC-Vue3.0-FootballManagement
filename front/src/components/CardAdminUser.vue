<template>
  <div class="card_admin">
    <div style="display: flex">
    <v-icon size="80px" icon="mdi-account"/>
      </div>
    <p>Manage users</p>
  </div>
</template>

<style scoped>
  .card_admin{
    width: 300px;
    height: 300px;
    background-color: #f8f8f8;
    color: #282828;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 50%;
    margin: 2.5rem;
  }

  .card_admin:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.5s ;
  }
</style>
