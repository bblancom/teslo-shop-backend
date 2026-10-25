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
        format: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty({
        example: 'Teslo T-shirt',
        description: 'Product title',
        minLength: 1,
        uniqueItems: true,
    })
    @Column('text', {
        unique: true
    })
    title!: string;

    @ApiProperty({
        example: 29.99,
        description: 'Product price',
        type: Number,
        minimum: 0,
    })
    @Column('float', {
        default: 0
    })
    price!: number;

    @ApiProperty({
        example: 'This is a product description',
        description: 'Product description',
        default: null,
        nullable: true,
    })
    @Column('text', {
        nullable: true
    })
    description!: string;

    @ApiProperty({
        example: 'teslo-tshirt',
        description: 'Product slug - for SEO',
        minLength: 1,
        uniqueItems: true,
    })
    @Column('text', {
        unique: true
    })
    slug!: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0,
        type: Number,
        minimum: 0,
    })
    @Column('int', {
        default: 0
    })
    stock!: number;

    @ApiProperty({
        example: ['M', 'L', 'XL'],
        description: 'Available product sizes',
        type: [String],
        isArray: true,
    })
    @Column('text', {
        array: true,
    })
    sizes!: string[];

    @ApiProperty({
        example: 'men',
        description: 'Product gender',
        enum: ['men', 'women', 'kid', 'unisex'],
    })
    @Column('text')
    gender!: string;

    @ApiProperty({
        example: ['tshirt'],
        description: 'Product tags',
        default: [],
        type: [String],
        isArray: true,
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags!: string[];

    @ApiProperty({
        example: [{
            id: 'd7d2a1d0-7f70-4d92-b1cb-8d9bd2d3c2f0',
            url: 'teslo-tshirt-1.jpg'
        }],
        description: 'Product images',
        type: () => [Object],
        isArray: true,
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
