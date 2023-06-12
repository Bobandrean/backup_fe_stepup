import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/services/quiz.js"
import Swal from 'sweetalert2'

export const useQuizStore = defineStore('quiz', () => {
    const quiz = ref([]);
    const detailQuiz = ref({});
    const answerQuiz = ref({});

    const getQuiz = () => {
        return quiz.value;
    };

    const getDetailQuiz = computed(() => detailQuiz.value)
    const getAnswerQuiz = computed(() => answerQuiz.value)

    const setQuiz = (value) => {
        quiz.value = value
    }

    const setDetailQuiz = (data) => {
        detailQuiz.value = data
    }

    const setAnswerQuiz = (data) => {
        answerQuiz.value = data
    }

    const fetchQuiz = async () => {
        try {

            const res = await SERVICE.getQuiz();

            setQuiz(res.data)

        } catch (error) {
            console.error(error)
        }
    };

    async function fetchDetailQuiz(id) {
        try {

            const res = await SERVICE.detailQuiz({
                id
            });
            setDetailQuiz(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createAnswerQuiz(id, payload) {
        try {
            
            const res = await SERVICE.answerQuiz({
                id,
                payload
            })
            Swal.fire({
                icon: "success",
                title: "Berhasil Submit Jawaban Quiz",
                text: "Silahkan cek berkala untuk mengetahui hasilnya",
            });
            console.log(res, "sotre")
            console.log(payload,"masuk store")
            return res
        } catch (error) {
            console.error(error);
        }
    }

    async function createQuiz(payload) {
        try {

            const res = await SERVICE.createQuiz({
                payload
            })
            Swal.fire({
                icon: "success",
                title: "Berhasil Membuat Quiz",
                text: "^_^",
            });
            return res

        } catch (error) {
            console.error(error)
        }
    }

    return {
        quiz,
        getQuiz,
        getAnswerQuiz,
        getDetailQuiz,
        fetchDetailQuiz,
        fetchQuiz,
        createAnswerQuiz,
        createQuiz
    }
})