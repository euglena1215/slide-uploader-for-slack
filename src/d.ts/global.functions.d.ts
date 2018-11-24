declare namespace glFunctions {
  interface global {
    main(): void;
    doGet(e): void;
  }
}

declare var global: glFunctions.global;
