declare namespace glFunctions {
  interface global {
    main(): void;
    doGet(e): void;
    saveUserList(): void;
  }
}

declare var global: glFunctions.global;
