import CardLoading from "@/components/loading/CardLoading";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <section className="sm:w-1/2 w-full flex flex-col justify-center items-center">
        {children}
      </section>
      <section className="w-1/2 sm:block hidden">
        <Image
          src="https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          width={1200}
          height={1200}
          priority
          alt="palm trees"
          className="object-cover h-full w-full"
        />
      </section>
    </main>
  );
}
