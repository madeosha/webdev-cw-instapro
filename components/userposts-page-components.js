import { renderHeaderComponent } from "./header-component.js";
import { posts, getToken } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderUserPostsPageComponent({ appEl }) {
    
    const appHtml = posts.map((post, index) => {

        const createdTimeToNow = formatDistanceToNow(new Date(post.createdAt), {locale: ru});

        return `
            <ul class="posts">     
                <li class="post">
                    <div class="post-image-container">
                        <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                        <button data-post-id="${index}" class="like-button">
                            <img style="${post.isLiked === false ? "display: block" : "display: none"}" src="./assets/images/like-not-active.svg">
                            <img style="${post.isLiked === true ? "display: block" : "display: none"}" src="./assets/images/like-active.svg">
                        </button>
                        <p class="post-likes-text"></p>
                    </div>
                    <p class="post-text">
                        <span class="user-name">${post.user.name}</span>
                        ${post.description}
                    </p>
                    <p class="post-date">${createdTimeToNow}</p>
                </li>
                <br>
            </ul>`;
    })

    appEl.innerHTML = `
        <div class="page-container">
            <div class="header-container"></div>
            <div class="posts-user-header">
                <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
                <p class="posts-user-header__user-name">${posts[0].user.name}</p>
            </div>
            ${appHtml}
        </div>`;


    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    const likeButtons = document.querySelectorAll(".like-button");

    for (let likeButton of likeButtons) {

        likeButton.addEventListener("click", () => {

            if (getToken() === undefined) {
                return likeButton.disabled = true;
            } else {
                likeButton.disabled = false;
            }
            const index = likeButton.dataset.postId;   

            if (posts[index].isLiked === false) {
                posts[index].likes.length += 1;
                posts[index].isLiked = !posts[index].isLiked;
                like({ posts, getToken, index }).then(() => {
                return renderUserPostsPageComponent({ appEl });
                })

            } else {
                posts[index].likes.length += -1;
                posts[index].isLiked = !posts[index].isLiked;
                disLike({ posts, getToken, index }).then(() => {
                return renderUserPostsPageComponent({ appEl });
                })
            }
        
        });
    }
}