import http from "../http-common";

class UploadFilesService {

upload(formData) {
  return http.post("posts", formData);
}
update(id, formData) {
  return http.put(`posts/${id}`, formData);
}
 }

export default new UploadFilesService()