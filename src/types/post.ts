import { Category } from "./category";

export interface PostCreateDTO {
    title: string;
    description: string;
}

export interface Post {
    id: number
    title: string;
    description: string;
    category: Category
}