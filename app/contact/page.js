export default function ContactPage() {
  return (
    <main className="fade-in min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center text-sm tracking-widest space-y-6 max-w-xl">
        <p>
          DET ER IKKE MULIGT AT KONTAKTE FORFATTEREN AF DENNE SIDE.
          <br />
          <em className="italic">
            IT IS NOT POSSIBLE TO CONTACT THE AUTHOR OF THIS SITE.
          </em>
        </p>

        <div className="text-xs leading-relaxed tracking-normal text-left md:text-center">
          <p className="mb-2">
            HVIS DU VIL SE &quot;TEGNINGERNE&quot; BAG SIDEN, LIGGER KILDEKODEN
            OFFENTLIGT TILGÆNGELIG HER.
            <br />
            <em className="italic">
              IF YOU WANT TO SEE THE "DRAWINGS" OF THE SITE, THE SOURCE CODE IS
              PUBLICLY AVAILABLE HERE.
            </em>
          </p>
          <p>
            <a
              href="https://github.com/Luchassmed/saelan"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              GITHUB.COM/LUCHASSMED/SAELAN
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
