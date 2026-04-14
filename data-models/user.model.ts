/** Demo app password; override per user when testing invalid credentials. */
export const DEFAULT_USER_PASSWORD = 'secret_sauce';

export default class UserModel {
    readonly username: string;
    readonly password: string;

    constructor(username: string, password: string = DEFAULT_USER_PASSWORD) {
        this.username = username;
        this.password = password;
    }
}
