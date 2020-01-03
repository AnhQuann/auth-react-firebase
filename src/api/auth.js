import app from '../config/firebase';

export const updateAuthState = () => {
    return new Promise((resolve, reject) => {
      app.auth().onAuthStateChanged(user => {
        let newAuthState = {};
        if (user) {
          newAuthState = {
            authenticated: true,
            currentUser: user,
            appLoading: false
          }
        } else {
          newAuthState = {
            authenticated: false,
            currentUser: null,
            appLoading: false
          };
        }
        resolve(newAuthState);
      });
    })
  };