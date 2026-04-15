export type ProtectedPageId = 'inventory' | 'cart';

export type ProtectedPageUnauthorizedDefinition = {
    id: ProtectedPageId;
    expectedErrorMessage: string;
};

/** Session-only routes: unauthenticated `goto` redirects to `/` with the matching Epic sadface copy. */
export const protectedPageUnauthorizedDefinitions: readonly ProtectedPageUnauthorizedDefinition[] = [
    {
        id: 'inventory',
        expectedErrorMessage:
            "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    },
    {
        id: 'cart',
        expectedErrorMessage: "Epic sadface: You can only access '/cart.html' when you are logged in.",
    },
];
