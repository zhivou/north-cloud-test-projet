import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import UserModel from "../data-models/user.model";
import { LoginPage } from "../pages/login.page";

const AUTH_DIR = join(process.cwd(), '.auth');

function getStorageStatePathForUser(user: UserModel): string {
    return join(AUTH_DIR, `${user.username}.json`);
}

// saucedemo has a very short timeout for the login page so we need to clear the auth files before each test
function clearAuthFiles(): void {
    if (!existsSync(AUTH_DIR)) return;

    for (const file of readdirSync(AUTH_DIR)) {
        rmSync(join(AUTH_DIR, file), { force: true });
    }
}

export async function createStorageStateUI(loginPage: LoginPage, user: UserModel): Promise<string> {
    clearAuthFiles();
    mkdirSync(AUTH_DIR, { recursive: true });

    const sessionFilePath = getStorageStatePathForUser(user);
    await loginPage.page.goto('/');
    await loginPage.login(user);
    await loginPage.assertLoginSuccess();
    await loginPage.page.context().storageState({ path: sessionFilePath });

    return sessionFilePath;
}
