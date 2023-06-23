import Api from '@/utils/api.js'

class NewsServices {
  async getNews(query) {
    return await Api.doGet(`news/index?${new URLSearchParams(query || '').toString()}`)
      .then((res) => res)
      .catch((err) => err)
  }

  async createNews({
    payload
  }) {
    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('content', payload.content)
    payload.files.forEach((file, index) => {
      formData.append(`files[${index}][file]`, file)
    })
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
    formData.append('content', payload.content)
    payload.files.forEach((file, index) => {
      console.log(file);
      if (file instanceof File || file instanceof Blob) {
        formData.append(`files[${index}][file]`, file);
      } else {
        formData.append(`files[${index}][file]`, JSON.stringify(file));
      }
    });

    const res = await Api.doPost(`news/update/${id}`, formData)
    return res
  }
}

export default new NewsServices()