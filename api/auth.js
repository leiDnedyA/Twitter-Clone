import * as keysJSON from './keys.json' assert { type: 'json' };
import { OAuth2Client } from "google-auth-library";

const keys = keysJSON.default;

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const auth = async (req, res, next) => {
    if (req.body.googleCredential){
        try {
            const client = await new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleCredential,
                audience: '1039961356162-uo2erc3olri68i05t2mj7rj2vmajen8n.apps.googleusercontent.com'
            })
            const payload = ticket.getPayload();
    
            req.googleAccInfo = {
                name: payload.name,
                email: payload.email
            }
        } catch (err) {
            console.log(err);
            res.redirect('/login');
        }
        next();
    } else {
        res.redirect('/login')
    }
};

export default auth;