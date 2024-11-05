const { ERR, ok } = require("../utils/Respone")
const { User } = require("../models/index.model")
const argon2 = require("argon2")


const getFavotireMovies = async (req, res) => {
    return ok(res, 200, req.user, "get favorite movies Succes")
}

const AddFavoriteMovies = async (req, res) => {
    try {
        // tangkap data dari klien
        const { data } = req.body

        // ambil model dari moongose
        const user = await User.findById(req.user._id)

        // menentukan key apa yang akan di update
        user.favoriteMovies.push(data)

        // action update atau insert data
        await user.save()
        return ok(res, 201, user.favoriteMovies, "Add favorite movie succes")
    } catch (error) {
        return ERR(res, 500, "Error Add Favorite Movies")
    }
}

const RemoveFavoriteMovies = async (req, res) => {
    try {
        const { movieID } = req.body

        const user = await User.findById(req.user._id)

        // mengecek apakah id movie database sama dengan id movie dari user
        const existingMovie = user.favoriteMovies.some(movie => movie.id === movieID)

        if (!existingMovie) return ERR(res, 404, "Movie ID not found")

        // menghapus favorite movies
        user.favoriteMovies = user.favoriteMovies.filter(movie => movie.id !== movieID)



        await user.save()

        return ok(res, 204, null, "Remove favorite movie succes")
    } catch (error) {
        return ERR(res, 500, "Error Remove Favorite Movies")
    }
}

const CheckFavoriteMovies = async (req, res) => {
    const { movieID } = req.body
    try{
        const user = await User.findById(req.user._id)

        const isFavorite = await user.favoriteMovies.some(movie => movie.id === movieID)

        return ok(res, 200, { isFavorite }, "Check favorite movies succes")

    }catch(error){
        return ERR(res, 500, "Erro checking favorite movies")
    }
   
}

const SignInToken = async (req, res) => {
    try {
        const { email, password, token } = req.body

        let user = await User.findOne({ email })

        if (!user) return ERR(res, 400, "user not found!")

        const isPasswordOK = await argon2.verify(user.password, password)

        if (!isPasswordOK) return ERR(res, 400, "password wrong!")

        user.token = token
        await user.save()
        return ok(res, 200, null, "sign token saved")
    } catch (error) {
        return ERR(res, 500, "Error sign in token ")
    }
}

const signOutToken = async (req, res) => {

    const user = await User.findById(req.user._id)

    user.token = null

    await user.save()
    return ok(res, 204, null, "sign out token succes")

}

const signUpUser = async (req, res) => {
    const { email, password } = req.body
    const hashPass = await argon2.hash(password)
    try {

        const user = await User.findOne({ email })

        if (user) return ERR(res, 400, "email not avalilabe")

        const addNewUser = new User({ email, password: hashPass })
        await addNewUser.save()

        return ok(res, 201, addNewUser._id, "sign Up user berhasil")

    } catch (error) {
        console.log("error", error)
        return ERR(res, 500, "sing up error")
    }
}




module.exports = {
    SignInToken,
    getFavotireMovies,
    AddFavoriteMovies,
    RemoveFavoriteMovies,
    signOutToken,
    signUpUser,
    CheckFavoriteMovies
}