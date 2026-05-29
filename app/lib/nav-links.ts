export type DialogId = "galeria" | "na-midia";

export const NAV_LINKS = [
  { label: "Sobre", href: "/#sobre", id: "sobre" },
  { label: "Espaço", href: "/#espaco", id: "espaco" },
  { label: "Serviços", href: "/#servicos", id: "servicos" },
  { label: "Selo", href: "/#selo", id: "selo" },
  { label: "Eventos", href: "/#eventos", id: "eventos" },
  {
    label: "Música Aos Montes TV",
    href: "https://www.youtube.com/@musicaaosmontes",
    external: true,
  },
  {
    label: "Cursos",
    href: "https://www.hotmart.com/",
    external: true,
  },
  { label: "Na mídia", dialog: "na-midia" as DialogId },
  { label: "Galeria", dialog: "galeria" as DialogId },
  { label: "Contato", href: "/#contato", id: "contato" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
