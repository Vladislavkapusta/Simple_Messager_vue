<!-- PostList.vue -->
<template>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <h2 class="post-title">{{ post.title }}</h2>


        <div class="no-comment-menu">
        <button @click="toggleComments(post.id)" class="rounded-button modal-button" v-if="!showComments[post.id]">
          Коментарии
        </button>
            <span class="comment-count" v-if="!showComments[post.id]">
        Количество комментариев - {{ post.comments.length }}
        </span>
        <button @click="editPost(post)" class="rounded-button modal-button" v-if="!showComments[post.id]">Изменить</button >
        <button @click="deletePost(post.id)" class="delete-button close-button" v-if="!showComments[post.id]">Удалить</button>
        </div>
        


        <div v-if="showComments[post.id]" class="comments">

            <div class="new-coment">
              <textarea v-model="newCommentText[post.id]" class="textarea comment-text"></textarea>
          <button @click="addComment(post.id)" class="rounded-button modal-button">Добавить</button>
        </div>

          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <p class="comment-text">{{ comment.text }}</p>
            <button @click="deleteComment(post.id, comment.id)" class="delete-button close-button">Удалить</button>
          </div>


          <button @click="toggleComments(post.id)" class="rounded-button modal-button">
          Спрятать
        </button>
        </div>



      </div>

      <div v-if="showEditModal" class="overlay">
        <div class="edit-modal">
          <textarea v-model="editedPostText" class="textarea"></textarea>
          <div class="button-area"> 
            <button @click="saveEditedPost" class="modal-button">Подтвердить</button>
          <button @click="closeEditModal" class="close-button">Закрыть</button>
        </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useDiaryStore } from '../stores/store';
  

      const store = useDiaryStore();
  
      const showComments = ref({});
      const newCommentText = ref({});
      const showEditModal = ref(false);
      const editedPostText = ref('');
      let currentPostId = null;
      let currentPostComments = [];
  
      const posts = computed(() => store.posts);
  
      const toggleComments = postId => {
        showComments.value = { ...showComments.value, [postId]: !showComments.value[postId] };
      };
  
      const deletePost = postId => {
        store.deletePost(postId);
      };
  
      const editPost = post => {
        editedPostText.value = post.title;
        currentPostId = post.id;
        currentPostComments = post.comments;
        showEditModal.value = true;
      };
  
      const saveEditedPost = () => {
        store.updatePost({ id: currentPostId, title: editedPostText.value, comments: currentPostComments});
        closeEditModal();
        console.log("EDITED!")
      };
  
      const closeEditModal = () => {
        showEditModal.value = false;
        editedPostText.value = '';
        currentPostId = null;
      };
  
      const deleteComment = (postId, commentId) => {
        store.deleteComment({ postId, commentId });
      };
  
      const addComment = postId => {
        const comment = { id: Date.now(), text: newCommentText.value[postId] };
        console.log(comment)
        if (comment.text.trim() !== '') {
          store.addComment({ postId, comment });
          newCommentText.value[postId] = '';
        }
      };
  
  </script>

<style>
.button-area{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.new-coment{
    margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap:20px;
  font-size: 16px;
}

.post-title{
    border-bottom: 2px solid #ccc;
    padding-bottom: 20px;
}

.post-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.post {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 0px 30px 30px 30px;
  border-radius: 20px;
  border: 2px #0094FF solid;
  width: 100%;
}

.comments {
  margin-top: 10px;
}

.comment {
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.comment-text{
    border: 2px solid #0094FF;
  border-radius: 20px;
  width: 80%;
  padding: 15px;
  font-size: 16px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-comment-menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:20px;
    justify-content: space-between;
}

.edit-modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 80%;
  /* max-width: ; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
}

.textarea {
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.modal-button {
  border-radius: 20px;
  background-color: #216CFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
  height: 50px;
  align-self: center;
  font-size: 16px;
}

.close-button {
  border-radius: 20px;
  background-color: #FF218B;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  height: 50px;
  align-self: center;
  font-size: 16px;
}
</style>