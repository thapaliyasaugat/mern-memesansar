const User = require('../models/User')
const verifyToken = require('./verifyToken')
const router = require('express').Router()
//update user
router.put("/", verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
        }
        await User.findByIdAndUpdate(req.user.userId, {
            $set: req.body
        })
        res.status(200).json('user updated sucessfully')
    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})
//delete user
router.delete("/", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.userId)
        res.status(200).json('user deleted sucessfully')
    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})
// user by id
router.get("/finduser/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // console.log(user);
        const { password, ...details } = user._doc;
        res.status(200).json({ ...details })
    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})
//self info
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const { password, ...details } = user._doc;
        res.status(200).json({ ...details })
    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})
//follow user
// router.put("/follow/:id", verifyToken, async (req, res) => {
//     const currentUser = await User.findById(req.user.userId);
//     const user = await User.findById(req.params.id) // user to be followed
//     if (!currentUser.followings.includes(user._id)) {
//         await currentUser.updateOne({ $push: { followings: user._id } })
//         await user.updateOne({ $push: { followers: currentUser._id } })
//         res.status(200).json("user has been followed.")
//     }
//     res.status(403).json("you already followed this user")
// })
// //unfollow user
// router.put("/unfollow/:id", verifyToken, async (req, res) => {
//     const currentUser = await User.findById(req.user.userId);
//     const user = await User.findById(req.params.id) // user to be unfollowed
//     if (currentUser.followings.includes(user._id)) {
//         await currentUser.updateOne({ $pull: { followings: user._id } })
//         await user.updateOne({ $pull: { followers: currentUser._id } })
//         res.status(200).json("user has been unfollowed.")
//     }
//     res.status(403).json("you haven't followed this user")
// })

//follow-unfollow
router.put("/follow/:id", verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.userId);
        const user = await User.findById(req.params.id)
        if (!currentUser.followings.includes(user._id)) {
            await currentUser.updateOne({ $push: { followings: user._id } })
            await user.updateOne({ $push: { followers: currentUser._id } })
            res.status(200).json("user has been followed.")
        } else {
            await currentUser.updateOne({ $pull: { followings: user._id } })
            await user.updateOne({ $pull: { followers: currentUser._id } })
            res.status(200).json("user has been unfollowed.")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
})



//suggestionuser
router.get("/suggestion", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        // console.log(user);
        const friends = []
        for (let id of user.followings) {
            friends.push(id.toString());
        }
        // const friends = [...user.followings]
        friends.push(user._id.toString())
        // console.log(friends);
        const allUser = await User.find();
        // console.log(allUser);

        const suggestion = []
        allUser.forEach((user) => {
            // if (!friends.includes(user._id)) {
            if (!friends.includes(user._id.toString())) {
                // console.log(user._id);
                suggestion.push(user._id)
            }
        })
        res.status(200).json(suggestion)

    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})
// follow/followings lists
router.get('find/followers', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        const followers = user.followers
        res.status(200).json({ followers })
    } catch (error) {
        console.log(error)
        res.status(500).json('server error')
    }
})
router.get('find/followings', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        const followings = user.followings
        res.status(200).json({ followings })
    } catch (error) {
        console.log(error)
        res.status(500).json('server error')
    }
})
module.exports = router