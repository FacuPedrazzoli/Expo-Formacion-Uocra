import Link from 'next/link';
import { Container } from './Container';

interface FooterProps {
  year?: number;
  eventTitle?: string;
}

export function Footer({ year = 2026, eventTitle = 'Expo Formación UOCRA' }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50">
      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{eventTitle}</h3>
            <p className="text-sm text-muted-foreground">
              El evento anual de formación profesional para el sector de la construcción.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
<Link href="#registro" className="text-sm text-muted-foreground hover:text-primary">
                   Registrarse
                 </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contacto</h4>
            <p className="text-sm text-muted-foreground">
              Consulta información sobre el evento.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Dirección:</span> Humberto Primo 2260 - CABA
            </p>
            <a
              href="https://wa.me/5491156044650"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.92 11.92 0 0012 0C5.37 0 .1 5.27.1 11.9c0 2.1.55 4.16 1.6 5.95L0 24l6.35-1.65A11.9 11.9 0 0012 23.8c6.63 0 11.9-5.27 11.9-11.9 0-3.18-1.24-6.17-3.38-8.42zM12 21.9a9.92 9.92 0 01-5.18-1.44l-.37-.22-3.76.98.99-3.66-.24-.38A9.92 9.92 0 012.1 11.9 9.9 9.9 0 0112 2a9.92 9.92 0 017.02 2.94A9.9 9.9 0 0122 11.9a9.92 9.92 0 01-10 10z" />
                <path d="M17.39 14.61c-.33-.16-1.96-.97-2.26-1.08-.3-.11-.52-.16-.74.16-.22.33-.85 1.08-1.04 1.3-.19.22-.39.25-.72.08-.33-.16-1.39-.51-2.64-1.62-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.14-.69.14-.14.33-.39.5-.59.17-.2.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.64-.55-.56-.74-.56-.19 0-.41 0-.63 0-.22 0-.57.08-.87.41-.3.33-1.16 1.13-1.16 2.75s1.19 3.19 1.36 3.41c.17.22 2.34 3.58 5.68 5.02.79.34 1.41.54 1.89.69.8.25 1.53.21 2.1.13.64-.09 1.96-.8 2.24-1.57.28-.78.28-1.45.19-1.58-.09-.13-.33-.2-.7-.35z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {year} {eventTitle}. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}