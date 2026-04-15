import { expect } from './base-fixtures';
import { InventoryPage } from '../pages/inventory.page';

export type SortOption = 'lohi' | 'hilo' | 'az' | 'za';

export interface SortingTestData {
    sortOption: SortOption;
    description: string;
    collectValues: (page: InventoryPage) => Promise<(number | string)[]>;
    assertOrder: (a: number | string, b: number | string) => void;
}

export const sortingTestData: SortingTestData[] = [
    {
        sortOption: 'hilo',
        description: 'price descending',
        collectValues: (page) => page.collectPrices(),
        assertOrder: (a, b) => expect(a, 'Expected prices in descending order').toBeGreaterThanOrEqual(b as number),
    },
    {
        sortOption: 'lohi',
        description: 'price ascending',
        collectValues: (page) => page.collectPrices(),
        assertOrder: (a, b) => expect(a, 'Expected prices in ascending order').toBeLessThanOrEqual(b as number),
    },
    {
        sortOption: 'az',
        description: 'name A-Z',
        collectValues: (page) => page.collectProductNames(),
        assertOrder: (a, b) => expect((a as string).localeCompare(b as string), 'Expected names sorted A to Z').toBeLessThanOrEqual(0),
    },
    {
        sortOption: 'za',
        description: 'name Z-A',
        collectValues: (page) => page.collectProductNames(),
        assertOrder: (a, b) => expect((a as string).localeCompare(b as string), 'Expected names sorted Z to A').toBeGreaterThanOrEqual(0),
    },
];
