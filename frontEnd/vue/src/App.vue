<script setup lang="ts">
  import { ref } from "vue";

  const form = ref({
    name: "",
    email: "",
    document: "",
    password: "",
    accountId: "",
    message: "",
  });

  async function signUp() {
    const input = form.value;
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const output = await response.json();

    if (output.accountId) {
      form.value.accountId = output.accountId;
      form.value.message = "success";
    } else {
      form.value.message = output.message;
    }
  }
</script>
<template>
  <div>
    <div><input class="input-name" v-model="form.name" placeholder="name" /></div>
    <div><input class="input-email" v-model="form.email" placeholder="email" /></div>
    <div><input class="input-document" v-model="form.document" placeholder="document" /></div>
    <div><input class="input-password" v-model="form.password" placeholder="password" /></div>
    <button class="button-signup" @click="signUp">Sign Up</button>
    <span class="span-accountId">{{ form.accountId }}</span>
    <span class="span-message">{{ form.message }}</span>
  </div>
</template>

<style scoped></style>
