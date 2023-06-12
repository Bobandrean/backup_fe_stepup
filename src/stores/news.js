import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/services/news.js"
import Swal from 'sweetalert2'

export const useNewsStore = defineStore('news', () => {
    const news = ref([]);
    const detailNews = ref({});

    const getNews = () => {
        return news.value;
      };

    const getDetailNews = computed(() => detailNews.value)

    const setNews = (value) => {
        news.value = value
    }

    const setDetailNews = (data) => {
        detailNews.value = data
    }

    const fetchNews = async (payload)  => {
        const query = {
            orderBy: payload.orderBy ? payload.orderBy : "",
          searchTitle:  payload.searchTitle ? payload.searchTitle : "",
        };
        try {

            const res = await SERVICE.getNews(query);

            setNews(res.data)

        } catch (error) {
            console.error(error)
        }
    };

    async function fetchDetailNews(id) {
        try {

            const res = await SERVICE.detailNews({
                id
            });
            setDetailNews(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function createNews(payload) {
        try {

            const res = await SERVICE.createNews({
                payload
            })
            Swal.fire({
                icon: "success",
                title: "Berhasil Membuat News",
                text: "^_^",
            });
            return res

        } catch (error) {
            console.error(error)
        }
    }

    async function updateNews(id, payload) {
        try {

            const res = await SERVICE.updateNews({
                id,
                payload
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    async function showNews(id) {
        try {

            const res = await SERVICE.hideNews({
                id
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    async function hideNews(id) {
        try {

            const res = await SERVICE.showNews({
                id
            })

            return res

        } catch (error) {
            console.error(error)
        }
    }

    return {
        news,
        getNews,
        getDetailNews,
        fetchDetailNews,
        fetchNews,
        createNews,
        updateNews,
        showNews,
        hideNews
    }
})