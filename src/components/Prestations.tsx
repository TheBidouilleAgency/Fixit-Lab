import { honk } from '@/styles/fonts';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function Prestations() {
  const { ref } = useIntersectionObserver(0.5);

  const [displayed, setDisplayed] = useState<string>('');

  interface DataTypes {
    name: string;
    categories: { name: string; price: number | string; detail?: string }[];
    infos?: string[];
  }

  const data: DataTypes[] = [
    {
      name: 'Montage',
      categories: [
        {
          name: 'Montage simple sans OS',
          price: 55,
        },
        {
          name: 'Montage simple avec OS',
          price: 65,
        },
        {
          name: 'Changement de boîtier',
          price: 'Sur devis',
        },
        {
          name: 'Conseil de configuration',
          price: 'Gratuit',
        },
      ],
    },
    {
      name: 'Remplacement de pièces et optimisation',
      categories: [
        {
          name: 'Mise à jour de carte mère (BIOS)',
          price: 20,
        },
        {
          name: 'Remplacement ou ajout de composants*',
          price: 'Sur devis',
        },
        {
          name: 'Remplacement de carte mère',
          price: 80,
        },
        {
          name: 'Remplacement de processeur',
          price: 60,
        },
      ],
      infos: ['Hors carte mère et processeur'],
    },
    {
      name: 'Nettoyage',
      categories: [
        {
          name: 'Formule premium',
          price: 100,
          detail:
            'Nettoyage interne avec démontage et remontage complet, changement de pâte thermique, nettoyage système',
        },
        {
          name: 'Formule intermédiaire',
          price: 80,
          detail: 'Nettoyage interne et système',
        },
        {
          name: 'Formule standard',
          price: 60,
          detail: 'Nettoyage interne',
        },
        {
          name: 'Formule de base',
          price: 30,
          detail: 'Nettoyage système',
        },
      ],
    },
    {
      name: 'Diagnostic',
      categories: [
        {
          name: 'Formule complète',
          price: 20,
          detail: 'Diagnostic système et composants',
        },
        {
          name: 'Formule standard',
          price: 10,
          detail: 'Diagnostic système',
        },
      ],
    },
  ];

  const handleDisplay = (name: string) => {
    if (displayed === name) {
      setDisplayed('');
    } else {
      setDisplayed(name);
    }
  };

  return (
    <section className="flex h-screen items-center justify-end px-4" id="prestations" ref={ref}>
      <div className="w-full md:w-1/2">
        <h1 className={`text-center text-6xl md:text-7xl ${honk.className}`}>Prestations</h1>
        <div className="mt-4 flex flex-col gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col justify-center rounded-lg text-black">
              <div className="rounded-lg border-2 border-black">
                <div
                  className={`flex cursor-pointer items-center justify-between bg-white p-4 transition-all ${displayed === item.name ? 'rounded-t-lg' : 'rounded-lg'}`}
                  onClick={() => handleDisplay(item.name)}
                >
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <ArrowRightIcon
                    className={`h-6 w-6 transition-all ${displayed === item.name ? 'rotate-90' : ''}`}
                  />
                </div>
                <ul
                  className={`flex flex-col gap-2 overflow-hidden rounded-b-lg bg-white transition-all duration-300 ease-out ${
                    displayed === item.name
                      ? 'max-h-[500px] px-4 pb-4 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.categories.map((category, index) => (
                    <li key={index}>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg">{category.name}</h3>
                        <p>
                          {category.price}&nbsp;{!isNaN(Number(category.price)) ? '€' : ''}
                        </p>
                      </div>
                      <p>{category.detail && <span className="text-xs">{category.detail}</span>}</p>
                    </li>
                  ))}
                  {item.infos && (
                    <li className="mt-2">
                      <ul className="flex flex-col gap-1">
                        {item.infos.map((info, index) => (
                          <li key={index} className="text-xs">
                            {'*'.repeat(index + 1)} {info}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
