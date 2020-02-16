export interface AuthServiceModel {
    logged(): void;
    logIn(formData: { username, password }): void;
    logOut(): void;
}

export interface AuthDataModel {
    username: string;
    password: string;
}
