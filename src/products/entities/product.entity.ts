import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '94381138-b73b-44b6-9666-92ac4c08caf7',
        description: 'Product id',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty({
        example: 'Teslo T-shirt',
        description: 'Product title',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true
    })
    title!: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float', {
        default: 0
    })
    price!: number;

    @ApiProperty({
        example: 'This is a product description',
        description: 'Product description',
        default: null
    })
    @Column('text', {
        nullable: true
    })
    description!: string;

    @ApiProperty({
        example: 'teslo-tshirt',
        description: 'Product slug - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug!: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock!: number;

    @ApiProperty({
        example: ['M', 'L', 'XL'],
        description: 'Product size',
    })
    @Column('text', {
        array: true,
    })
    sizes!: string[];

    @ApiProperty({
        example: 'Male',
        description: 'Product gender',
    })
    @Column('text')
    gender!: string;

    @ApiProperty({
        example: ['tshirt'],
        description: 'Product tags',
        default: []
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags!: string[];

    @ApiProperty({
        example: ["1549268-00-A_0_2000.jpg", "1549268-00-A_2.jpg"],
        description: 'Product images',
    })
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user!: User;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
}
