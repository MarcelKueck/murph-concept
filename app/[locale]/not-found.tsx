// app/not-found.tsx
import { redirect } from 'next/navigation';

export default function NotFound() {
  // Redirect root URLs to the default locale
  redirect('/de');
}