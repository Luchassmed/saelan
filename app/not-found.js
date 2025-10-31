import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          PROJEKT IKKE FUNDET.PROJECT NOT FOUND
        </h1>
        <Link href="/" className="hover:underline">
          ← Back
        </Link>
      </div>
    </main>
  );
}
