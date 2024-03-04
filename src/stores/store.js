// store.js
import { defineStore } from 'pinia';

export const useDiaryStore = defineStore({
  id: 'diary',
  state: () => ({
    posts: [
      {
        id: 1,
        title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
        comments: [
          { id: 1, text: "Самый яркий комментарий в этом посте" },
          { id: 2, text: "Один из бессмысленный комментарий в этом посте" }
        ]
      },
      {
        id: 2,
        title: "Краткосрочное вымышленное преломление может выполнять особую роль в   пространстве главной роли игрока ",
        comments: [
          { id: 1, text: "Очень научно и непонятно" },
        ]
      }
    ]
  }),
  actions: {
    addPost(newPost) {
      this.posts.push(newPost);
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
    updatePost(updatedPost) {
      const index = this.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    },
    addComment({ postId, comment }) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        console.log("pushing "+comment+" to post "+postId)
        post.comments.push(comment);
      }
    },
    deleteComment({ postId, commentId }) {
      const post = this.posts.find(post => post.id === postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId);
      }
    }
  }
});