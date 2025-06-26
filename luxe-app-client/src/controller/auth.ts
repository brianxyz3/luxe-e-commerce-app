import axios from "axios";

interface UserObj {
    email: string;
    token: string;
    id: string;
}

interface RegisterDataObj {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface loginDataObj {
    email: string;
    password: string;
}

function setCookie(name: string , value: string, days: number) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 100).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Lax;`
  }

const initializeUser = (user: UserObj) => {
    Object.entries(user).forEach(([Key, value]) => {
        setCookie(Key, value, 1)
    })
}

const signUpWithEmailAndPassword = async (formData: RegisterDataObj) => {
    const { data } = await axios.post("http://localhost:3000/auth/register", formData);
    console.log(data);
    if (data.token) {
        initializeUser(data);
        console.log("Authentication successful");
    }
    return data;
  };

const logInWithEmailAndPassword = async (formData: loginDataObj) => {
    const { data } = await axios.post("http://localhost:3000/auth/login", formData);
    if (data.token) {
        initializeUser(data);
        console.log("Authentication successful");
    }
    return data;
  };



  export {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword
  }