import * as keysJSON from './keys.json' assert { type: 'json' };
import { OAuth2Client } from "google-auth-library";
import { User } from './models/models.js';

const keys = keysJSON.default;

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const auth = async (req, res, next) => {
    let googleCred;
    if (req.body.googleCredential) {
        googleCred = req.body.googleCredential;
    } else if (req.headers.authorization){
        googleCred = req.headers.authorization;
    } else {
        res.redirect('/login');
        return;
    }
    try {
        const client = await new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: googleCred,
            audience: '1039961356162-uo2erc3olri68i05t2mj7rj2vmajen8n.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();

        req.googleAccInfo = {
            name: payload.name,
            email: payload.email
        }

        // Check DB for User with given email
        // if user doesn't exist, make one
        // add user.id attribute to req

        let user = await User.findOne({ where: { email: payload.email } });

        if (user == null) {
            user = await User.create({ name: payload.name, email: payload.email });
            console.log(`Creating new user with email ${payload.email}, and id ${user.getDataValue('id')}`)
        }

        req.user = user;

    } catch (err) {
        console.log(err);
        res.redirect('/login');
        return;
    }
    next();
};

export default auth;