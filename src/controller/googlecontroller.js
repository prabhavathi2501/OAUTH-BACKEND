// import axios from 'axios';
 import jwt from 'jsonwebtoken';
// import { oauth2Client } from "../utiles/googleconfig.js";
 import  User from '../model/user.js';

import { oauth2Client } from "../utiles/googleconfig.js";
import axios from "axios"


// export const googleAuth = async (req, res, next) => {
//     const code = req.query.code;
//     try {
//         const googleRes = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(googleRes.tokens);
//         const userRes = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//         );
//         const { email, name, picture } = userRes.data;
//         // console.log(userRes);
//         let user = await User.findOne({ email });

//         if (!user) {
//             user = await User.create({
//                 name,
//                 email,
//                 image: picture,
//             });
//         }
//         const { _id } = user;
//         const token = jwt.sign({ _id, email },
//             process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_TIMEOUT,
//         });
//         res.status(200).json({
//             message: 'success',
//             token,
//             user,
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: "Internal Server Error"
//         })
//     }
// };


const googleLogin =async(req,res)=>{
    try {
        const {code}=req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        

        const userRes = await axios.get(
                        `https://www.googleapis.com/oauth2/v1/certs/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
                    );
                    const { email, name, picture } = userRes.data;
                            // console.log(userRes);
                            let user = await User.findOne({ email });
                    
                            if (!user) {
                                user = await User.create({
                                    name,
                                    email,
                                    image: picture,
                                });
                            }
                            const { _id } = user;
                            const token = jwt.sign({ _id, email },
                                process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_TIMEOUT,
                            });
                            res.status(200).json({
                                message: 'success',
                                token,
                                user,
                            });
    } catch (error) {
        res.status(500).json({
                        message: "Internal Server Error"
                    })
    }
}


export default googleLogin