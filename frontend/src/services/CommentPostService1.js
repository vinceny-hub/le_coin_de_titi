import http from "../http-common";

class CommentPostService {

  deletePostComment(id) {
    return http.delete(`/comments/${id}`);
  }
}

export default new CommentPostService();
