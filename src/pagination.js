import axios from "axios";
import "./style.css"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"


export function initPagination() {
    //Sayfalandırma değişkenleri
    let currentPage = 1;
    const limit = 15;

    document.getElementById("prev-btn").addEventListener("click",()=> {
        if(currentPage >1){
            currentPage = currentPage - 1
        }
        fetchPosts()
    })
    document.getElementById("next-btn").addEventListener("click",()=> {
        currentPage ++;
        fetchPosts()
    })

    async function fetchPosts() {
        try {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _page: currentPage,
                    _limit: limit
                }
            })
            console.log(data);
            // sayfalandırma özellikleri ekle
            document.getElementById("prev-btn").disabled = currentPage === 1
            document.getElementById("next-btn").disabled = data.length < limit
            document.getElementById("page-info").textContent = `Sayfa: ${currentPage}`

            //Verileri görüntüle

            document.getElementById("posts-container").innerHTML = data?.map(post => `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </div> 
                `).join("");
            //son sayfayı kontrol et
            if (data.length < limit) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sayfa Bitmiştir',
                    position:"topRight"
                });
            }
        } catch (error) {
            console.log(error);
        }

    }
    fetchPosts()
}
