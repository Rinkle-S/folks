'use client';
// Lets deep practice-screen templates know the chosen language without passing it through every prop.
import { createContext, useContext } from 'react';
import { st } from '@/lib/screenText';

export const LangCtx = createContext('en');
// Returns a function that localises screen text (see lib/screenText.js).
export const useScreenText = () => {
  const lang = useContext(LangCtx);
  return (text) => st(text, lang);
};
