import { honk } from '@/styles/fonts';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { useState } from 'react';

export default function Presentation() {
  const { ref } = useIntersectionObserver(0.5);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section className="flex h-screen items-center justify-end px-4" id="contact" ref={ref}>
      <div className="w-full md:w-1/2">
        <article>
          <h1 className={`text-center text-5xl md:text-7xl ${honk.className}`}>Contactez-moi !</h1>
          <form
            action="https://getform.io/f/allyqgya"
            method="POST"
            className="mt-4 flex flex-col gap-4 rounded-lg border-2 border-black bg-white p-4 text-black"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                name="name"
                placeholder="Garen de Demacia"
                className="rounded-md border-2 border-black p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="garen@demacia.com"
                className="rounded-md border-2 border-black p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                placeholder="Je souhaite réparer mon PC"
                className="rounded-md border-2 border-black p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <input type="hidden" name="_gotcha" style={{ display: 'none' }} />
            <button
              type="submit"
              className="w-fit self-end rounded-md border-2 border-black px-6 py-2"
            >
              Envoyer
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
