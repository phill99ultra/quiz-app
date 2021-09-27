import axios from "axios";

export default axios.create({
    baseURL: `https://react-quiz-app-9e5b5-default-rtdb.europe-west1.firebasedatabase.app`
})