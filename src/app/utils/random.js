const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&_-';

export default function random(length) {
    let result = '';
    const charactersLength = alphanumeric.length;
    for (let i = 0; i < length; i++) {
        result += alphanumeric.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}