'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Link } from '../../i18n/navigation';
import { LanguageSwitcher } from '../../components/ui/navigation/LanguageSwitcher';
import Button from '../../components/ui/buttons/Button';
import { Card } from '../../components/ui/cards/Card';
import { Stat, StatsGroup } from '../../components/ui/elements/Stat';
import { useFormatters } from '../../lib/utils/i18n-formatters';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations('landing');
  const n = useTranslations('navigation');
  const c = useTranslations('common.actions');
  const formatters = useFormatters();

  // State for header shadow on scroll
  const [headerShadow, setHeaderShadow] = useState(false);
  // State for testimonials
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Refs for animation targets
  const heroRef = useRef(null);
  const valuePropsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const communicationRef = useRef(null);
  const ctaRef = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      quote: t('testimonials.patientTestimonial1.quote'),
      author: t('testimonials.patientTestimonial1.author')
    },
    {
      quote: t('testimonials.patientTestimonial2.quote'),
      author: t('testimonials.patientTestimonial2.author')
    },
    {
      quote: t('testimonials.studentTestimonial.quote'),
      author: t('testimonials.studentTestimonial.author')
    }
  ];

  // Statistics data
  const stats = [
    {
      label: t('stats.consultations'),
      value: '5,200+',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      label: t('stats.satisfaction'),
      value: '97%',
      change: 3.2,
      increaseIsGood: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: t('stats.responseTime'),
      value: '<2h',
      change: -15.5,
      increaseIsGood: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: t('stats.students'),
      value: '120+',
      change: 8.7,
      increaseIsGood: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  // Value props data
  const valueProps = [
    {
      title: t('valueProps.understand.title'),
      description: t('valueProps.understand.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: t('valueProps.guidance.title'),
      description: t('valueProps.guidance.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: t('valueProps.whenToAct.title'),
      description: t('valueProps.whenToAct.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t('valueProps.flexible.title'),
      description: t('valueProps.flexible.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // How it works data
  const howItWorksSteps = [
    {
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  // Communication options data
  const communicationOptions = [
    {
      title: t('communication.video.title'),
      description: t('communication.video.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('communication.audio.title'),
      description: t('communication.audio.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: t('communication.text.title'),
      description: t('communication.text.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: t('communication.async.title'),
      description: t('communication.async.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Check for scroll position to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHeaderShadow(true);
      } else {
        setHeaderShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Set up animations
  useEffect(() => {
    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If reduced motion is preferred, skip animations
      return;
    }

    // Hero section animations
    const heroItems = heroRef.current.querySelectorAll('.animate-item');
    gsap.fromTo(
      heroItems,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.7, 
        ease: 'power2.out' 
      }
    );

    // Value props animations
    const valueCards = valuePropsRef.current.querySelectorAll('.value-card');
    gsap.set(valueCards, { y: 30, opacity: 0 });
    ScrollTrigger.create({
      trigger: valuePropsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(valueCards, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // How it works animations
    const steps = howItWorksRef.current.querySelectorAll('.step-item');
    const lines = howItWorksRef.current.querySelectorAll('.connecting-line');
    
    gsap.set(steps, { y: 20, opacity: 0 });
    gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' });
    
    ScrollTrigger.create({
      trigger: howItWorksRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(steps, {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        gsap.to(lines, {
          scaleX: 1,
          stagger: 0.2,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.inOut'
        });
      }
    });

    // Statistics animations
    const statsItems = statsRef.current.querySelectorAll('.stat-item');
    gsap.set(statsItems, { y: 20, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(statsItems, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Create number counting animations
        statsItems.forEach((item) => {
          const valueElement = item.querySelector('.stat-value');
          const countTo = parseInt(valueElement.getAttribute('data-value'), 10);
          
          gsap.fromTo(
            valueElement,
            { innerText: 0 },
            {
              innerText: countTo,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              delay: 0.3
            }
          );
        });
      }
    });

    // Communication options animations
    const commOptions = communicationRef.current.querySelectorAll('.comm-option');
    gsap.set(commOptions, { y: 20, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: communicationRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(commOptions, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // CTA animation
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: ctaRef.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header section */}
      <header 
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 py-4 transition-shadow duration-300 ${
          headerShadow ? 'shadow-md' : ''
        }`}
      >
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
              className="text-primary-600 hover:text-primary-700 transition hidden sm:inline-block"
            >
              {n('logIn')}
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            >
              {n('signUp')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section 
        ref={heroRef}
        className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-item font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
            {t('hero.headline')}
          </h1>
          <p className="animate-item text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 text-gray-700 max-w-3xl mx-auto">
            {t('hero.subheadline')}
          </p>
          <div className="animate-item flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-600 transition shadow-sm transform hover:translate-y-[-2px] hover:shadow-md"
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

      {/* Value Propositions */}
      <section 
        ref={valuePropsRef}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
            {t('valueProps.understand.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                className="value-card bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition hover:translate-y-[-4px]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="mb-4"
                  >
                    {prop.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{prop.title}</h3>
                  <p className="text-gray-600 text-center">{prop.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howItWorksRef}
        className="py-16 bg-neutral-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
            {t('howItWorks.title')}
          </h2>
          <div className="max-w-5xl mx-auto">
            {/* Desktop view: horizontal steps */}
            <div className="hidden md:block relative">
              <div className="grid grid-cols-4 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="step-item relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center mb-4 text-primary-500 relative z-20">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                      <p className="text-sm text-gray-600 text-center">{step.description}</p>
                    </div>
                    
                    {/* Extend line from center of current icon to center of next icon */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="connecting-line absolute top-6 left-1/2 h-0.5 bg-primary-200 z-10" 
                          style={{ 
                            width: 'calc(100% + 6px)', 
                            transform: 'translateX(0)' 
                          }}>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile view: vertical steps */}
            <div className="md:hidden">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="step-item flex mb-8 last:mb-0 relative">
                  <div className="mr-4 relative">
                    <div className="h-12 w-12 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center text-primary-500 z-10 relative">
                      {step.icon}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200 -z-10"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
            {t('testimonials.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-xl p-8 shadow-sm">
              <div className="text-primary-200 text-6xl leading-none absolute top-6 left-6 opacity-50">
                &quot;
              </div>
              
              <div className="min-h-[12rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <p className="text-lg text-gray-700 italic mb-6">
                      &quot;{testimonials[activeTestimonial].quote}&quot;
                    </p>
                    <p className="font-semibold text-right">
                      {testimonials[activeTestimonial].author}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Testimonial navigation dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition ${
                    activeTestimonial === index ? 'bg-primary-500' : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section
        ref={statsRef}
        className="py-16 bg-neutral-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <Card className="text-center p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-neutral-400 mb-4">
                      {stat.icon}
                    </div>
                    <div 
                      className="stat-value text-3xl font-bold text-primary-500 mb-2"
                      data-value={index + 1} // Just for animation demo
                    >
                      {stat.value}
                    </div>
                    <div className="text-neutral-600">
                      {stat.label}
                    </div>
                    {stat.change && (
                      <div 
                        className={`mt-2 text-sm flex items-center ${
                          (stat.change > 0 && stat.increaseIsGood) || (stat.change < 0 && !stat.increaseIsGood)
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change > 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {Math.abs(stat.change).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Options */}
      <section
        ref={communicationRef}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-900">
            {t('communication.title')}
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choose the communication option that works best for you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communicationOptions.map((option, index) => (
              <motion.div
                key={index}
                className="comm-option bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    {option.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-center mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-center">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-16 bg-gradient-to-br from-primary-100 to-primary-50"
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('cta.title')}
          </h2>
          <Link 
            href="/auth/register" 
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-md text-lg font-medium transition transform hover:scale-105 hover:shadow-lg"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
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