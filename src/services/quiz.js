import Api from '@/utils/api.js'

class QuizServices {
    async getQuiz(query) {
        return await Api.doGet(`quiz/index?${new URLSearchParams(query || "").toString()}`)
            .then((res) => res)
            .catch((err) => err)
    }

    async createQuiz({
        payload
    }) {
        const convertedPayload = {
            module_name: payload.moduleName,
            per_page: payload.per_page,
            start_date: payload.start_date,
            end_date: payload.end_date,
            published_at: payload.published_at,
            questions: payload.questions.map((question) => ({
                title: question.title,
                choices: question.choices.map((choice) => ({
                    text: choice.text,
                    value: choice.value,
                    isCorrect: choice.is_correct
                }))
            }))
        };
        const res = await Api.doPost(`quiz/create`, convertedPayload)
        return res
    }

    async detailQuiz({
        id
    }) {
        const res = await Api.doGet(`quiz/detail/${id}`)
        return res
    }

    async answerQuiz({
        id,
        payload
    }) {

        console.log(payload)
        const convertedPayload = {
            answer: payload.question.map((answer) => ({
                title: answer.title,
                answer_choice: answer.choice.map((answer_choice) => ({
                    choice_text: answer_choice.choice_text,
                    is_selected: answer_choice.is_selected,
                    is_correct: answer_choice.is_correct
                }))
            }))
        };
        console.log(convertedPayload, "masuk")
        const res = await Api.doPost(`quiz/answer/${id}`, convertedPayload)
        return res
    }
}

export default new QuizServices()