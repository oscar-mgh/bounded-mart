export class Page<T> {
    constructor(
        public readonly data: T[],
        public readonly page: number,
        public readonly totalPages: number,
        public readonly totalElements: number,
    ) { }
}