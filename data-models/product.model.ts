export default class ProductModel {
    readonly name: string;
    readonly price: string;
    readonly description: string;
    readonly image: string;

    constructor(name: string, price: string, description: string, image: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    static generateDefaultProducts(): ProductModel[] {
        return [
            new ProductModel(
                "Sauce Labs Backpack",
                "$29.99",
                "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
                "/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg"
            ),
            new ProductModel(
                "Sauce Labs Bike Light",
                "$9.99",
                "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
                "/static/media/bike-light-1200x1500.3a92195d740e701f8b29.jpg"
            ),
            new ProductModel(
                "Sauce Labs Bolt T-Shirt",
                "$15.99",
                "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
                "/static/media/bolt-shirt-1200x1500.1222118e1574d309162d.jpg"
            ),
            new ProductModel(
                "Sauce Labs Fleece Jacket",
                "$49.99",
                "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
                "/static/media/fleece-jacket-1200x1500.a9c1f24d7da4f00ce3a7.jpg"
            )
        ];
    }
}
