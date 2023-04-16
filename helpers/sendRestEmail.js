import { google } from "googleapis"
import nodemailer from 'nodemailer'

const CLIENT_ID = '944996627636-m4fud1m1kh5l8an51p735s9275d9eblq.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04zPGuIf2d0E9CgYIARAAGAQSNwF-L9IrvYzzPN4xZQR0ahQ8nCD5IZuCgnmrqx2db1SMtjnfVyAtdBWEMIY8SsVZM3Z0HXqm3oc'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({'refresh_token': REFRESH_TOKEN})

export const sendRestEmail = async (to,link) => {
    try {
        //accessing the token 
        const accessToken = await oAuth2Client.getAccessToken()
        
        //email 
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type:'oAuth2' ,
                user: 'mor34757@gmail.com',
                clientId: CLIENT_ID ,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }

        })
        

        const mailOptions = {
            from: 'FMC 👋 <mor34757@gmail.com>',
            to: to,
            subject: 'Hello from Find My Coach',
            text: 'Reset Password!!!',
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>Hello! please use the link and set up the new password</h1>
                        <br>
                        <a href=${link}>click here</a>
                    </body>
                    </html>`
        }
        

        const result = await transport.sendMail(mailOptions)
        return result 
    } catch (error) {
        console.log('error',error)
    }
}

