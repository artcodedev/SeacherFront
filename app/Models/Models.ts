

export interface Profile {
    selected: number[];
    sorted: number | null;
    search: string;
}

export interface Data {
    id: number;
    name: string;
    age: number;
}

export interface Fetch_data {
    token: string
    profile: Profile
    data: Data[]
}

export interface Data_header_table {
    accessorKey: string
    header: string
}

export interface TokenData {
    token: string
}

export interface IMap<T> {
    [index: number]: T;
} 

export interface Selected {
    token: string
    selected: IMap<boolean>
}

export interface Sorted {
    token: string
    sorted: number
}

export interface Move {
    token: string
    draggingRow: number
    hoveredRow: number
}

export interface Search {
    token: string
    query: string
}

export interface OffsetData {
    token: string
    offset: number 
}