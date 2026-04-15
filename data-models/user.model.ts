import { faker } from '@faker-js/faker';
export const DEFAULT_USER_PASSWORD = 'secret_sauce';

export default class UserModel {
    readonly username: string;
    readonly password: string;
    firstName?: string;
    lastName?: string;
    postalCode?: string;

    constructor(username: string, password: string = DEFAULT_USER_PASSWORD) {
        this.username = username;
        this.password = password;
    }

    generateRandomInformation() {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.postalCode = faker.location.zipCode();
    }

    copyWith(overrides: Partial<Pick<UserModel, 'firstName' | 'lastName' | 'postalCode'>>) {
        const copy = new UserModel(this.username, this.password);
        copy.firstName = overrides.firstName ?? this.firstName;
        copy.lastName = overrides.lastName ?? this.lastName;
        copy.postalCode = overrides.postalCode ?? this.postalCode;
        return copy;
    }
}
