'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '../../../../i18n/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { AuthLayout } from '../../../../components/ui/layout/AuthLayout';
import { Input } from '../../../../components/ui/forms/Input';
import { FormGroup } from '../../../../components/ui/forms/FormGroup';
import { RadioGroup } from '../../../../components/ui/forms/RadioGroup';
import { Select } from '../../../../components/ui/forms/Select';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const n = useTranslations('navigation');
  const c = useTranslations('common.actions');
  const v = useTranslations('common.validation');
  
  const router = useRouter();
  const { register, loading } = useAuthContext();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'PATIENT' | 'MEDICAL_STUDENT'>('PATIENT');
  const [university, setUniversity] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      setError(v('required'));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(v('passwordMismatch'));
      return;
    }
    
    // Additional validation for medical students
    if (role === 'MEDICAL_STUDENT' && (!university || !studyYear || !specialization)) {
      setError(v('required'));
      return;
    }
    
    setError(null);
    
    try {
      const success = await register(name, email, password, role);
      
      if (success) {
        // Redirect based on user role
        if (role === 'MEDICAL_STUDENT') {
          router.push('/medical-student/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  // Study year options
  const studyYearOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ];
  
  // Specialization options
  const specializationOptions = [
    { value: 'general', label: 'General Medicine' },
    { value: 'internal', label: 'Internal Medicine' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'oncology', label: 'Oncology' },
  ];
  
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
            id="name"
            label={t('name')}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          
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
          
          <Input
            id="confirmPassword"
            label={t('confirmPassword')}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />
          
          <RadioGroup
            label={t('role')}
            name="role"
            options={[
              { value: 'PATIENT', label: t('patient') },
              { value: 'MEDICAL_STUDENT', label: t('medicalStudent') },
            ]}
            value={role}
            onChange={(value) => setRole(value as 'PATIENT' | 'MEDICAL_STUDENT')}
          />
          
          {role === 'MEDICAL_STUDENT' && (
            <div className="border p-4 rounded-lg bg-neutral-50 space-y-4">
              <h3 className="font-medium text-lg mb-1">{t('universityDetails')}</h3>
              
              <Input
                id="university"
                label="University"
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                fullWidth
                required={role === 'MEDICAL_STUDENT'}
              />
              
              <Select
                id="studyYear"
                label={t('studyYear')}
                options={studyYearOptions}
                value={studyYear}
                onChange={(e) => setStudyYear(e.target.value)}
                required={role === 'MEDICAL_STUDENT'}
              />
              
              <Select
                id="specialization"
                label={t('specialization')}
                options={specializationOptions}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required={role === 'MEDICAL_STUDENT'}
              />
            </div>
          )}
          
          <div className="mt-4 text-sm text-neutral-600">
            {t('termsAgreement')}
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : t('registerButton')}
          </Button>
        </FormGroup>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          {t('alreadyHaveAccount')}{' '}
          <Link
            href="/auth/login"
            className="text-primary-600 hover:text-primary-700"
          >
            {t('logIn')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}