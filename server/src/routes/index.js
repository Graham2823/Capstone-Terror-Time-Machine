import { Router } from "express";
import { createUser } from "../controllers/createUser";
import { searchedMovies } from "../controllers/searchedMovies";
import { oneMovie } from "../controllers/oneMovie";
import { findUser } from "../controllers/getUser";
import { createReview } from "../controllers/createReview";
import { getUserReviews } from "../controllers/getUserReviews";
import { getMovieReviews } from "../controllers/getMovieReviews";
import { createReply } from "../controllers/createReply";
import { moviesByPage } from "../controllers/getMoviesByPage";
import { getReview } from "../controllers/getReview";
import { deleteReview } from "../controllers/deleteReview";
import { deleteReply } from "../controllers/deleteReply";
import { createPost } from "../controllers/createPost";
import { getPosts } from "../controllers/getPosts";
import { deletePost } from "../controllers/deletePost";
import { getUserPosts } from "../controllers/getUserPosts";
import { sortedMovies } from "../controllers/sortedMovies";
import { createForumPostReply } from "../controllers/createForumPostReply";
import { getOnePost } from "../controllers/getOnePost";
import { deletePostReply } from "../controllers/deletePostReply";
import { createReviewReaction } from "../controllers/createReviewReaction";

const router = Router();

//Movies
router.route("/movies/:movieTitle").get(searchedMovies)
router.route('/movieByID/:id').get(oneMovie)
router.route('/moviesByPage/:page').get(moviesByPage)
router.route('/sortedMovies/:sort').get(sortedMovies)

//User
router.route("/").post(createUser);
router.route('/user/:uid').get(findUser)

//Reviews
router.route('/review').post(createReview)
router.route('/review/:reviewID').get(getReview)
router.route('/getReviews/:uid').get(getUserReviews)
router.route('/movieReviews/:movieID').get(getMovieReviews)
router.route('/deleteReview/:uid/:reviewID').delete(deleteReview)

//Replies
router.route('/reply').post(createReply)
router.route('/deleteReply/:reviewID/:replyID').delete(deleteReply)
router.route('/forumReply').post(createForumPostReply)

//Posts
router.route('/createPost').post(createPost)
router.route('/getPosts').get(getPosts)
router.route('/getUserPosts/:uid').get(getUserPosts)
router.route('/deletePost/:uid/:postID').delete(deletePost)
router.route('/getOnePost/:postID').get(getOnePost)
router.route('/deletePostReply/:postID/:postReplyID').delete(deletePostReply)

//reactions
router.route('/reviewReaction').post(createReviewReaction)


export default router;















