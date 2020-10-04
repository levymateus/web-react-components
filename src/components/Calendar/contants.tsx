export type DayOfWeek = "iiiiii" | "iiiii" | "ii" | "io" | "i";
export type DateTime = { date: "LLLL" | "LLL"; time: "yyyy" | "yyy" | "y" | "yo" };

export interface Action<T = string, P = unknown> {
  type?: T
  payload?: P
}

export type StateInitializer<T = unknown> = (initializerArg: T) => T
export type StateReducer<S, T> = (state: S, action: Action<T, unknown>) => S
