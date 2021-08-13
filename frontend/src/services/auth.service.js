// import axios from 'axios';
import axios from '../http-common';

// const API_URL = 'http://localhost:8080/api/auth/';
// const API_URL = process.env.NODE_ENV === 'production' ? '/api/auth/' : 'http://localhost:3000/api/auth/';

class AuthService {
  login(user) {
    return axios
      // .post(API_URL + 'signin', {
      //   username: user.username,
      //   password: user.password
      // })
      .post('auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    // return axios.post(API_URL + 'signup', {
    //   username: user.username,
    //   email: user.email,
    //   password: user.password
    // });
    return axios.post('auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();