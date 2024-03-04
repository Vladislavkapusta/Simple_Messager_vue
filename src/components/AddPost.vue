<!-- AddPost.vue -->
<template>
    <div class="add-post">
      <textarea v-model="newPostText" class="textarea"></textarea>
      <button @click="addPost" class="AddButton">Добавить</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useDiaryStore } from '../stores/store';

      const store = useDiaryStore();
      const newPostText = ref('');
  
      const addPost = () => {
        if (newPostText.value.trim() !== '') {
          store.addPost({ id: Date.now(), title: newPostText.value, comments: [] });
          newPostText.value = '';
        }
      };
  </script>

<style>
.add-post {
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  gap: 20px;
  border: 2px #0094FF solid;
  border-radius: 20px;
}
.textarea{
    min-height: 25px;
    font-size: 24px;
    text-align: start;
}
.AddButton{
    border-radius: 20px;
  background-color: #216CFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
  height: 50px;
  align-self: center;
  font-family: Montserrat;
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;

}
</style>