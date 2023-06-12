import Api from '@/utils/api.js'

class NewsServices {
    async getNews(query) {
        return await Api.doGet(`news/index?${new URLSearchParams(query || "").toString()}`)
        .then((res) => res)
        .catch((err) => err)
    }

    async createNews({
        payload
    }) {
        const formData = new FormData()
        formData.append('title', payload.title) 
        formData.append('slug', payload.slug)
        formData.append('content', payload.content)
        formData.append('short_content', payload.short_content)
        formData.append('image', payload.image[0])
        const res = await Api.doPost(`news/create`, formData)
        return res
    }

    async detailNews({
        id
    }) {
        const res = await Api.doGet(`news/detail/${id}`)
        return res
    }

    async showNews({
        id
    }) {
        const res = await Api.doPost(`news/show/${id}`)
        return res
    }

    async hideNews({
        id
    }) {
        const res = await Api.doPost(`news/hide/${id}`)
        return res
    }

    async updateNews({
        id,
        payload
    }) {

        const formData = new FormData()
        formData.append('title', payload.title) 
        formData.append('slug', payload.slug)
        formData.append('content', payload.content)
        formData.append('short_content', payload.short_content)
        formData.append('image', payload.image[0])
        const res = await Api.doPost(`news/update/${id}`, payload)
        return res
    }


}

export default new NewsServices()