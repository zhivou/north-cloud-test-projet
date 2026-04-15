import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import UserModel from "../data-models/user.model";
import { LoginPage } from "../pages/login-page.page";

const AUTH_DIR = join(process.cwd(), '.auth');

function getStorageStatePathForUser(user: UserModel): string {
    return join(AUTH_DIR, `${user.username}.json`);
}

export async function createStorageStateUI(loginPage: LoginPage, user: UserModel): Promise<string> {
    mkdirSync(AUTH_DIR, { recursive: true });

    const sessionFilePath = getStorageStatePathForUser(user);
    await loginPage.page.goto('/');
    await loginPage.login(user);
    await loginPage.assertLoginSuccess();
    await loginPage.page.context().storageState({ path: sessionFilePath });

    return sessionFilePath;
}
