// Используется в StatusContent передаваемая ошибка из useAllTests
export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}