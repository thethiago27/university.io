import { Document } from "mongodb";

// Make param country to capitalized

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create pagination function

export function paginate(items: Document[], pageNumber: number, pageSize: number) {

    const startIndex = (pageNumber - 1) * pageSize;	
    return items.slice(startIndex, startIndex + pageSize);
}
