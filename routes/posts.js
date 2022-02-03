const router = require('express').Router()
const Post = require('../models/Post');
const User = require('../models/User');
const verifyToken = require('./verifyToken')
//create-post
router.post('/', verifyToken, async (req, res) => {
    try {
        // console.log(req.user);
        const newPost = new Post({
            desc: req.body.desc,
            image: req.body.image,
            userId: req.user.userId,
        })
        const post = await newPost.save();
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})

//delete post
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(500).json("post deleted sucessfully")
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})

//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//get my post
router.get("/my-posts", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})

// get friend's profile
router.get("/profile/:user_id", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.user_id })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})
//timeline post - of yours+followings - shared post of your friend
router.get("/timeline/posts", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        const myposts = await Post.find({ userId: req.user.userId })
        const friendsPosts = await Promise.all(
            user.followings.map((friend) => {
                return Post.find({ userId: friend })
            })
        )
        const friendsShared = await Promise.all(
            user.followings.map(async (friend) => {
                const following = await User.findById(friend)
                return following.sharedPosts
            })
        )
        let friendSharedPosts = [];
        for (let i = 0; i < friendsShared.length; i++) {
            friendSharedPosts = friendSharedPosts.concat(friendsShared[i])
        }
        // let sharedPostsByFriend = [];
        const sharedPostsByFriend = await Promise.all(friendSharedPosts.map(async (post) => {
            const postdet = await Post.findById(post)
            // sharedPostsByFriend.push(postdet)
            return postdet
        })
        )
        console.log(sharedPostsByFriend);
        let posts = myposts.concat(...friendsPosts)
        res.status(200).json(posts.concat(sharedPostsByFriend))
        // res.status(200).json("done")
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})
// //timeline post - of yours+followings
// router.get("/timeline/posts", verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId)
//         const myposts = await Post.find({ userId: req.user.userId })
//         const friendsPosts = await Promise.all(
//             user.followings.map((friend) => {
//                 return Post.find({ userId: friend })
//             })
//         )
//         res.status(200).json(myposts.concat(...friendsPosts))
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("server error")
//     }
// })
//like-dislike
router.put("/like/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.userId)) {
            await post.updateOne({
                $push: { likes: req.user.userId }
            })
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({
                $pull: { likes: req.user.userId }
            })
            res.status(200).json("The post has been disliked");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})
//comment
router.post("/comment/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.updateOne({ $push: { comments: { userId: req.user.userId, text: req.body.text } } })
        res.status(200).json("commented.")
    } catch (error) {
        res.status(500).json("server error")
    }
})
//share posts
router.put("/sharepost/:postid", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid)
        const user = await User.findById(req.user.userId)
        if (!post.sharedBy.includes(user._id)) {
            await post.updateOne({ $push: { sharedBy: user._id } })
            await user.updateOne({ $push: { sharedPosts: post._id } })
            res.status(200).json("post shared.")
        } else {
            await post.updateOne({ $pull: { sharedBy: user._id } })
            await user.updateOne({ $pull: { sharedPosts: post._id } })
            res.status(200).json("remove share.")
        }
    } catch (error) {
        res.status(500).json("server error")
    }
})
module.exports = router