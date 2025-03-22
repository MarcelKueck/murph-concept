'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '../../../../i18n/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { AuthLayout } from '../../../../components/ui/layout/AuthLayout';
import { Input } from '../../../../components/ui/forms/Input';
import { FormGroup } from '../../../../components/ui/forms/FormGroup';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const n = useTranslations('navigation');
  const c = useTranslations('common.actions');
  const v = useTranslations('common.validation');
  
  const router = useRouter();
  const { login, loading } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError(v('required'));
      return;
    }
    
    if (!password) {
      setError(v('required'));
      return;
    }
    
    setError(null);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Redirect based on user role (using email domain as a simple heuristic)
        if (email.includes('med-uni')) {
          router.push('/medical-student/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <AuthLayout
      title={t('title')}
      logo={
        <div className="text-4xl font-bold text-primary-600">Murph</div>
      }
    >
      {error && (
        <Alert
          variant="error"
          message={error}
          className="mb-4"
          dismissible
          onDismiss={() => setError(null)}
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            id="email"
            label={t('email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          
          <Input
            id="password"
            label={t('password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          
          <div className="flex justify-end">
            <span className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer">
              {t('forgotPassword')}
            </span>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : t('loginButton')}
          </Button>
        </FormGroup>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          {t('noAccount')}{' '}
          <Link
            href="/auth/register"
            className="text-primary-600 hover:text-primary-700"
          >
            {t('createAccount')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}