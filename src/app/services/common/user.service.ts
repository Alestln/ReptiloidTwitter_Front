import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usernameKey: string = 'username';

  constructor() { }

  // Метод для сохранения имени пользователя в локальном хранилище
  saveUsername(username: string): void {
    localStorage.setItem(this._usernameKey, username);
  }

  // Метод для получения имени пользователя из локального хранилища
  getUsername(): string | null {
    return localStorage.getItem(this._usernameKey);
  }

  // Метод для удаления имени пользователя из локального хранилища
  clearUsername(): void {
    localStorage.removeItem(this._usernameKey);
  }
}
