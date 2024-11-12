import crypto from 'crypto';

const SECRETE = 'SOME-RANDOM-SHIT-TO-CRYPT'

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password:string) => {
    const key = [salt, password].join('/');
    const encryptVal = crypto.createHmac('sha256', key).update(SECRETE).digest('hex');
    return encryptVal;
}