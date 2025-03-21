'use client';

import React, { Suspense } from 'react';
import Header from '@/components/Header';
import PC from '@/components/PC';
import Prestations from '@/components/Prestations';
import Presentation from '@/components/Presentation';
import ScrollTop from '@/components/lib/ScrollTop';
import { Loader } from '@/components/Loader';
import Nav from '@/components/lib/Nav';
import ContactForm from '@/components/ContactForm';
export default function Home() {
  return (
    <>
      <Loader />
      <Suspense fallback={null}>
        <PC />
        <Header />
        <Prestations />
        <Presentation />
        <ContactForm />
        <ScrollTop />
        <Nav />
      </Suspense>
    </>
  );
}
