
export interface table {
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    data: ICategory[];
}

export interface ICategory {

    id: number,
    name: string,
    creationDate: string,
    modificationDate: string

}
