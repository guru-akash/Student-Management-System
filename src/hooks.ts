/**
 * Custom Redux Hooks.
 * These typed versions of `useDispatch` and `useSelector` provide better 
 * intellisense and type-safety throughout the application by incorporating 
 * the `RootState` and `AppDispatch` types defined in the store.
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelector(selector, equalityFn);