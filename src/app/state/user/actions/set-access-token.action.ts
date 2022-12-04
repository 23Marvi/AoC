export class SetAccessTokenAction {
    static readonly type = "[User] SetAccessTokenAction";

    constructor(public accessToken: string) {}
}
