import UserModel from '../data-models/user.model';

export const standardUser = new UserModel('standard_user');
export const lockedOutUser = new UserModel('locked_out_user');
export const problemUser = new UserModel('problem_user');
export const performanceGlitchUser = new UserModel('performance_glitch_user');
export const errorUser = new UserModel('error_user');
export const visualUser = new UserModel('visual_user');

export type WrongLoginUserScenario = {
    id: string;
    user: UserModel;
    expectedErrorMessage: string | RegExp;
};

export type IncompleteUserInformationScenario = {
    id: string;
    user: UserModel;
    expectedErrorMessage: string;
};

export const wrongLoginUserScenarios: readonly WrongLoginUserScenario[] = [
    {
        id: 'empty-credentials',
        user: new UserModel('', ''),
        expectedErrorMessage: 'Epic sadface: Username is required',
    },
    {
        id: 'non-existing-user',
        user: new UserModel('user_that_does_not_exist_9f3a2c1b'),
        expectedErrorMessage:
            'Epic sadface: Username and password do not match any user in this service',
    },
    {
        id: 'wrong-email-username',
        user: new UserModel('not-a-valid-login@example.com'),
        expectedErrorMessage:
            'Epic sadface: Username and password do not match any user in this service',
    },
    {
        id: 'short-password',
        user: new UserModel('standard_user', 'x'),
        expectedErrorMessage:
            'Epic sadface: Username and password do not match any user in this service',
    },
];

export const usersFixture = {
    standardUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(standardUser);
    },
    lockedOutUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(lockedOutUser);
    },
    problemUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(problemUser);
    },
    performanceGlitchUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(performanceGlitchUser);
    },
    errorUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(errorUser);
    },
    visualUser: async ({}, use: (value: UserModel) => Promise<void>) => {
        await use(visualUser);
    },
    wrongLoginUserScenarios: async (
        {},
        use: (value: readonly WrongLoginUserScenario[]) => Promise<void>
    ) => {
        await use(wrongLoginUserScenarios);
    },
    incompleteUserInformation: async (
        {},
        use: (value: readonly IncompleteUserInformationScenario[]) => Promise<void>
    ) => {
        await use(incompleteUserInformation);
    },
};

const baseUser = new UserModel('standard_user');
baseUser.generateRandomInformation();

export const incompleteUserInformation: readonly IncompleteUserInformationScenario[] = [
    {
        id: 'missing-first-name',
        user: baseUser.copyWith({ firstName: '' }),
        expectedErrorMessage: 'Error: First Name is required',
    },
    {
        id: 'missing-last-name',
        user: baseUser.copyWith({ lastName: '' }),
        expectedErrorMessage: 'Error: Last Name is required',
    },
    {
        id: 'missing-postal-code',
        user: baseUser.copyWith({ postalCode: '' }),
        expectedErrorMessage: 'Error: Postal Code is required',
    },
    {
        id: 'missing-first-and-last-name',
        user: baseUser.copyWith({ firstName: '', lastName: '' }),
        expectedErrorMessage: 'Error: First Name is required',
    },
    {
        id: 'missing-first-name-and-postal-code',
        user: baseUser.copyWith({ firstName: '', postalCode: '' }),
        expectedErrorMessage: 'Error: First Name is required',
    },
    {
        id: 'missing-last-name-and-postal-code',
        user: baseUser.copyWith({ lastName: '', postalCode: '' }),
        expectedErrorMessage: 'Error: Last Name is required',
    },
    {
        id: 'missing-all-fields',
        user: baseUser.copyWith({ firstName: '', lastName: '', postalCode: '' }),
        expectedErrorMessage: 'Error: First Name is required',
    },
];