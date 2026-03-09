import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (price: number, currency: string = "USD") => {
  if (price === undefined || price === null) return "—";

  const numero = new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Normalizar el símbolo: Si viene 'USD' mostrar 'U$S' (estilo común en Argentina)
  // O si el usuario específicamente quiere 'USD', lo dejamos como 'USD'.
  // Dado que pidió "diga usd o ars", usaré esos exactamente.
  const symbol = currency === 'USD' ? 'U$S' : 'ARS';

  return `${symbol} ${numero}`;
};