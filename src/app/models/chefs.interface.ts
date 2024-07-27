export interface Chef {
    id: number;
    name: string;
    avatar: string;
    reviews?: Review[];
}
export interface Review {
    author: string;
    content: string;
    date: string;
}