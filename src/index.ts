/**
 * WELCOME DEVELOPER,
 * Please visit the following guide
 * https://medium.com/@guychabra/how-to-create-redux-store-only-with-vanillajs-and-rxjs-843051ed24ce
 * WE <3 RxJS
 */
import { fromEvent, merge } from "rxjs";
import { mapTo, map, filter } from "rxjs/operators";
import { ApplicationState } from "./store/store.types";
import { getPostsRequest, deletePostRequest } from "./store/store.actions";
import createStore from "./store/store.init";
import combineEpics from "./store/store.epics";
import reducer from "./store/store.reducer";
import "./styles.scss";

/**
 * Create Observables from click events
 * getPosts$ - will fire when the user click on "get posts" button.
 * deletePosts$ - will fire when ever we click "delete" button (in each post),
 *                fired value will be the post id.
 */
const getPosts$ = fromEvent(document.getElementById("getPosts"), "click");
const deletePosts$ = fromEvent(document, "click").pipe(
  filter(e => e.target.classList.contains("deletePost")),
  map(e => e.target.dataset.id),
  filter(id => id !== undefined)
);

/**
 * Create the store
 */
const store = createStore(reducer, combineEpics);
/**
 * Map click events Observables to action creators
 * Each created action will be dispatched to store
 */
merge(
  getPosts$.pipe(mapTo(getPostsRequest())),
  deletePosts$.pipe(map((postId: string) => deletePostRequest(postId)))
).subscribe(store.dispatch);

/**
 * Subscribe to changes in store and call render funtion
 */
store.subscribe({
  next(state: ApplicationState) {
    console.log("state", state);
    render(state);
  },
  error(err: any) {
    console.error("error:", err);
  },
  complete() {
    console.log("complete");
  }
});

/**
 * Render function of posts
 */
function render({ posts, deletingPosts }: ApplicationState) {
  document.getElementById("postsDisplay").innerHTML =
    // @ts-ignore
    Object.values(posts).reduce((render: string, post: any) => {
      const postId = post.id.toString();
      const actions =
        postId in deletingPosts && deletingPosts[postId]
          ? `<img class="loader" 
                 src="https://3.bp.blogspot.com/-R-jTudwY4jU/Vq3juReCqJI/AAAAAAAAAaA/4LWlAIwqvCs/s1600/loading1-1.gif"/>`
          : `<button class="deletePost" data-id="${post.id}">DELETE</button>`;

      render += `<div class="post">
        <div class="title">${post.title}</div>
        <div class="description">${post.body}</div>
        <div class="actions">${actions}</div>
      </div>`;

      return render;
    }, "");
}
