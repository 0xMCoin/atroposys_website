import type { Metadata, Viewport } from "next";
import {
  Manrope,
  DM_Sans,
  Fira_Sans,
  Inter,
  Sora,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

/**
 * Fontes do projeto.
 * - `Manrope` e `DM_Sans` ficam preservados para compatibilidade com áreas
 *   legadas do app (admin/organizer/checkout) que possam depender deles.
 * - `Fira Sans`, `Inter` e `JetBrains Mono` são as fontes canônicas do Design
 *   System Atroposys (fonte: atroposys.vercel.app - Fira Sans display/heading,
 *   Inter como fallback de Neulis Sans, JetBrains Mono mono).
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaSans = Sora({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Script de pré-hidratação do tema. Idêntico em comportamento ao do DS
 *  oficial: tenta `localStorage.atroposys-theme`, cai pra `prefers-color-scheme`,
 *  default `light`. Roda antes do paint pra evitar flash. */
const themeBootstrap = `(function(){try{var t=localStorage.getItem('atroposys-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export const metadata: Metadata = {
  title: "Atroposys - Software house de engenharia e produto",
  description:
    "Atroposys constrói produtos digitais para times que precisam crescer sem quebrar o stack. Engenharia, design e IA aplicada, do discovery ao lançamento.",
  keywords: [
    "atroposys",
    "software house",
    "desenvolvimento de software",
    "engenharia de produto",
    "consultoria tecnológica",
    "next.js",
    "ia aplicada",
  ],
  authors: [{ name: "Atroposys" }],
  creator: "Atroposys",
  publisher: "Atroposys",
  robots: "index, follow",
  openGraph: {
    title: "Atroposys - Software house de engenharia e produto",
    description:
      "Engenharia, design e IA aplicada para times que precisam crescer sem quebrar o stack.",
    type: "website",
    locale: "pt-BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atroposys",
    description:
      "Engenharia, design e IA aplicada para times que precisam crescer sem quebrar o stack.",
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "64x64", type: "image/png" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/images/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCFD" },
    { media: "(prefers-color-scheme: dark)", color: "#111214" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${dmSans.variable} ${firaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/images/logo.png" />
        <script
          // Evita FOUC entre light/dark - precisa rodar antes do React montar.
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
      </head>

      <body suppressHydrationWarning className="scroll-smooth antialiased">
        {children}
      </body>
    </html>
  );
}
