// blog_app/routes/ArticleRouter.js
import express from "express";
import UserModel from "../models/user.js";
import { faker } from '@faker-js/faker';

const router = express.Router();
 
router.get('/test', async(request,response) => {
    response.send('okk');
});

router.get('/userInfo', async(request,response) => {
    try {
        const user_data = await UserModel.find({});
        return response.json(user_data);    
    } catch (error) {
        console.log(err);
    }
});

router.post('/userInfo', async(request, response) => {
// 1 million =  10,00,000
    try{
        const fakeUserRecords = Array.from({length:100000}, () => ({            
                userId: faker.string.uuid(),    
                username: faker.internet.userName(),
                email: faker.internet.email(),
                avatar: faker.image.avatar(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
                registeredAt: faker.date.past(),
            }) 
        );

        await UserModel.insertMany(fakeUserRecords);
        console.log('data inserted..');
    }catch(err){
        console.log(err);
    }
});

export default router;