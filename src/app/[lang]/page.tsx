import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FocusGrid } from "@/components/FocusGrid";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <AmbientBackground />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {dict.ui.a11y.skipToContent}
      </a>
      <Navbar dict={dict.ui} lang={lang} />
      <main className="flex-1">
        <Hero hero={dict.hero} story={dict.story} ui={dict.ui} />
        <FocusGrid dict={dict.focus} />
        <Timeline dict={dict.experience} />
        <Contact dict={dict.contact} ui={dict.ui} />
      </main>
      <Footer dict={dict.footer} />
    </div>
  );
}
