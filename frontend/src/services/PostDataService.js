import http from "../http-common";

class PostDataService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get(`/posts/${id}`);
  }

  create(data) {
    return http.post("/posts", data);
  }

  updateAPost(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  deleteUser(id) {
    return http.delete(`/user/${id}`);
  }  

  getAnUser(id) {
    return http.get(`/user/${id}`);
  }

  getAllUsers(){ 
  return http.get("/user/");
  }

  updateUser(id, data){ 
    return http.put(`/user/${id}`, data);
  }

  findByTitle(description) {
    return http.get(`/posts?description=${description}`);
  }
}

export default new PostDataService();


