import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/navigation/LanguageSwitcher';

// Make this a server component that accepts params
export default function HomePage() {
  const t = useTranslations('landing');
  const n = useTranslations('navigation');
  const c = useTranslations('common.actions');

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">Murph</div>
          <nav className="space-x-6 hidden md:flex">
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              {n('about')}
            </span>
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              {n('howItWorks')}
            </span>
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              {n('contact')}
            </span>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              href="/auth/login" 
              className="text-primary-600 hover:text-primary-700 transition"
            >
              {n('logIn')}
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            >
              {c('getStarted')}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
            {t('hero.headline')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-600 transition shadow-sm"
            >
              {t('hero.getStarted')}
            </Link>
            <span 
              className="border border-primary-500 text-primary-500 px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-50 transition cursor-pointer"
            >
              {t('hero.learnMore')}
            </span>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Murph</h3>
              <p className="text-gray-300">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    {n('about')}
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    {n('howItWorks')}
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    {n('contact')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.legal.title')}</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    {t('footer.legal.privacy')}
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    {t('footer.legal.terms')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </main>
  );
}