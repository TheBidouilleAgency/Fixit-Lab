import { honk } from '@/styles/fonts';
import useIntersectionObserver from './hooks/useIntersectionObserver';

export default function Presentation() {
  const { ref } = useIntersectionObserver(0.5);

  return (
    <section className="flex h-screen items-center px-4" id="presentation" ref={ref}>
      <article className="w-full md:w-1/2">
        <h1 className={`text-center text-6xl md:text-7xl ${honk.className}`}>Qui suis-je ?</h1>
        <div className="mt-4 flex flex-col gap-4 rounded-lg border-2 border-black bg-white p-4 text-black">
          <p>
            Hello ! Je suis Victoria, j&apos;ai 25 ans et je suis le docteur des ordinateurs en
            détresse ! Ton PC rame plus qu&apos;un canoë sans pagaie ? Contacte moi pour régler ça !
            Mon entreprise est là pour redonner vie à ton PC capricieux. Et oui, ça arrive même au
            meilleur matos !
          </p>
          <p>
            Si ton ordinateur fixe ou portable fait des bruits bizarres comme si un gremlin y
            vivait, qu&apos;il ne s&apos;allume plus et que tu as envie de le jeter par la fenêtre
            ou qu&apos;il ventile comme un Phosphore Blanc, ne t&apos;inquiète pas, je suis là pour
            ça !
          </p>
          <p>
            Que ce soit pour nettoyer la poussière (oui, il y en a beauuuuucoup) ou remplacer des
            pièces, je fais tout pour que ton PC arrête de te donner envie de te transformer en
            crimier (t&apos;as la réf ?)
          </p>
        </div>
      </article>
      {/* <div className="relative h-full w-full">
        <div className="absolute right-6 top-40 flex flex-col items-center">
          <p className={`${caveat.className} text-5xl text-black`}>C&apos;est moi !</p>
          <Image src="/arrow.png" alt="PC" width={60} height={60} className="-scale-x-100" />
        </div>
        <Human />
      </div> */}
    </section>
  );
}
