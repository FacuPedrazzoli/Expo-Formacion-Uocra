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