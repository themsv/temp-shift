import type { Dispatch, SetStateAction } from 'react';
/**
 * Generic type for React useState setters.
 *
 * @template T - The state type
 */
export type SetState<T> = Dispatch<SetStateAction<T>>;
