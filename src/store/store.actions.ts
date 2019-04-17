import { ActionCreator } from "./store.types";
import { action } from "./store.utils";

/**
 * Here we declare the application action names
 */
export enum ActionType {
  GET_POSTS_REQUEST = "@@actions/GET_POSTS_REQUEST",
  GET_POSTS_SUCCESS = "@@actions/GET_POSTS_SUCCESS",
  DELETE_POST_REQUEST = "@@actions/DELETE_POST_REQUEST",
  DELETE_POST_SUCCESS = "@@actions/DELETE_POST_SUCCESS"
}

/**
 * Action creators
 */
export const getPostsRequest: ActionCreator<void> = () =>
  action<void>(ActionType.GET_POSTS_REQUEST);

export const getPostsSuccess: ActionCreator<any[]> = (posts: any[]) =>
  action<any[]>(ActionType.GET_POSTS_SUCCESS, posts);

export const deletePostRequest: ActionCreator<string> = (postId: string) =>
  action<string>(ActionType.DELETE_POST_REQUEST, postId);

export const deletePostSuccess: ActionCreator<string> = (postId: string) =>
  action<string>(ActionType.DELETE_POST_SUCCESS, postId);
