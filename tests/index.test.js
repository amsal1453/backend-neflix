require("dotenv").config()
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL)
})

afterEach(async () => {
    await mongoose.connection.close()
})


// describe('Resoure /my-movies', () => {
    // it('should return a succes message', async () => {
    //     const respone = await request(app).get(
    //         "/my-movies/amsal1@gmail.com/token123"
    //     );
    //     expect(respone.statusCode).toBe(200)
    //     expect(respone.body.message).toBe("get favorite movies Succes")
    // });

    // it('should return a succes message', async () => {
    //     const respone = await request(app).get(
    //         "/my-movies/amsal@gmail.com/token12345678"
    //     );
    //     expect(respone.statusCode).toBe(401)
    //     expect(respone.body.message).toBe("Error, Unauthorized")
    // });

    // it('should return succes adding favorite movies', async () => {
    //     const respone = await request(app)
    //         .post("/my-movies")
    //         .set("Content-Type", "application/json")
    //         .send({
    //             email: "amsal1@gmail.com",
    //             token: "token123",
    //             data: {
    //                 id: 2,
    //                 title: "test2",
    //                 description: "test2"
    //             }
    //         })
    //     expect(respone.statusCode).toBe(201)
    //     expect(respone.body.message).toBe("Add favorite movie succes")
    // })

    // it('should return failed to save favorite movies', async () => {
    //     const respone = await request(app)
    //         .post("/my-movies")
    //         .set("Content-Type", "application/json")
    //         .send({
    //             email: "amsal@gmail.com",
    //             token: "token12345678",
    //             data: {
    //                 id: 1,
    //                 title: "test",
    //                 description: "test"
    //             }
    //         })
    //     expect(respone.statusCode).toBe(401)
    //     expect(respone.body.message).toBe("Error, Unauthorized")
    // })

    // it('should return remove favorite movies', async () => {
    //     const respone = await request(app)
    //         .delete("/my-movies")
    //         .set("Content-Type", "application/json")
    //         .send({
    //             email: "amsal1@gmail.com",
    //             token: "token123",
    //             movieID : 1
    //         })
    //     expect(respone.statusCode).toBe(204)
    //     expect(respone.body.message).toBe("Remove favorite movie succes")
    // })

    // it('should return succes sign in token', async () => {
    //     const respone = await request(app)
    //         .post("/my-token")
    //         .set("Content-Type", "application/json")
    //         .send({
    //             email: "amsal123@gmail.com",
    //             password: "amsalbade"
    //         })
    //     expect(respone.statusCode).toBe(200)
    //     expect(respone.body.message).toBe("sign token saved")
    // })

// });
/*
describe('Resoure my-token', () => {
    it('should return succes sign in token', async () => {
        const respone = await request(app).post("/my-token")
        .set("Content-Type", "application/json")
        .send({
            email: "amsal1@gmail.com",
            password : "123",
            token:   "token123"
        })
        expect(respone.statusCode).toBe(200)
        expect(respone.body.message).toBe("sign token saved")
    });

    it('should return password wrong', async () => {
        const respone = await request(app).post("/my-token")
        .set("Content-Type", "application/json")
        .send({
            email: "amsal1@gmail.com",
            password : "12345",
            token:   "token123"
        })
        expect(respone.statusCode).toBe(400)
        expect(respone.body.message).toBe("password wrong!")
    });

    it('should return token null succes', async () => {
        const respone = await request(app).delete("/my-token")
        .set("Content-Type", "application/json")
        .send({
            email: "amsal1@gmail.com",
            token:   "token123"
        })
        expect(respone.statusCode).toBe(204)
        expect(respone.body.message).toBe("sign out token berhasil")
    });


    
    
});
*/

describe('resouce sign-up', () => {
    it('should return  sign up succes', async () => {
        const respone = await request(app).post("/sign-up")
        .set("Content-Type", "application/json")
        .send({
            email: "amsalbade@gmail.com",
            password: "amsalbade"
        })
        expect(respone.statusCode).toBe(201)
        expect(respone.body.message).toBe("sign Up user berhasil")
    });
    
});






