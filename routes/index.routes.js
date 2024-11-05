const router = require("express").Router()
const UseController = require("../controllers/index.controller")
const { chekToken } = require("../utils/auth")

router.get("/my-movies/:email/:token", chekToken, UseController.getFavotireMovies)
router.post("/my-movies", chekToken, UseController.AddFavoriteMovies)
router.delete("/my-movies", chekToken, UseController.RemoveFavoriteMovies)
router.post("/my-movies/check", chekToken, UseController.CheckFavoriteMovies)

// user sign in token
router.post("/my-token", UseController.SignInToken)

// user singOutToken 
router.delete("/my-token", chekToken, UseController.signOutToken)
// singup 

router.post("/sign-up", UseController.signUpUser)

module.exports = router