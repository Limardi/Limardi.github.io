'use client';

import React from 'react';

const contactMethods = [
  {
    title: 'Email',
    value: 'vincentlimardi234@gmail.com',
    href: 'mailto:vincentlimardi234@gmail.com',
  },
  {
    title: 'Phone',
    value: '+886 976 972 122',
    href: 'tel:+886976972122',
  },
  {
    title: 'LinkedIn',
    value: 'vincent-limardi',
    href: 'https://www.linkedin.com/in/vincent-limardi',
  },
  {
    title: 'Instagram',
    value: '@v.limardi',
    href: 'https://www.instagram.com/v.limardi',
  },
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-2xl font-serif text-white">Get in touch</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors rounded-xl"
            >
              <p className="text-sm text-zinc-500 mb-1">{method.title}</p>
              <p className="text-white">{method.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;