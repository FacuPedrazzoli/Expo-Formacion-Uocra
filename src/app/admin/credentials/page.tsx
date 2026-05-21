'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Download, Search, User, Users } from 'lucide-react';
import { generateQRDataURL } from '@/lib/qr';
import { getActiveEventId } from '@/app/actions/checkin';
import { userRepo } from '@/lib/repositories/userRepo';
import type { User as UserType } from '@/types/user';
import eventData from '@/data/event-data.json';

export default function CredentialsPage() {
  const [dniSearch, setDniSearch] = useState('');
  const [searchResult, setSearchResult] = useState<UserType | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    loadAllUsers(currentPage);
  }, [currentPage]);

  async function loadAllUsers(page: number) {
    const eventId = await getActiveEventId();
    if (!eventId) return;
    const users = await userRepo.getUsersByEvent(eventId, page, pageSize);
    const count = await userRepo.getUsersCount(eventId);
    setAllUsers(users);
    setTotalUsers(count);
  }

  async function handleSearch() {
    if (!dniSearch.trim()) return;
    
    setLoading(true);
    try {
      const eventId = await getActiveEventId();
      if (!eventId) {
        alert('No hay evento activo');
        return;
      }
      
      const user = await userRepo.getUserByDNI(dniSearch.trim(), eventId);
      if (user) {
        setSearchResult(user);
        const qr = await generateQRDataURL(user.dni);
        setQrDataUrl(qr);
      } else {
        setSearchResult(null);
        setQrDataUrl(null);
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      alert('Error al buscar usuario');
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadQR() {
    if (!qrDataUrl || !searchResult) return;
    
    const link = document.createElement('a');
    link.download = `QR-${searchResult.dni}.png`;
    link.href = qrDataUrl;
    link.click();
  }

  async function handleDownloadIndividualQR(dni: string, name: string, lastname: string) {
    const qr = await generateQRDataURL(dni);
    const link = document.createElement('a');
    link.download = `QR-${dni}-${name}-${lastname}.png`;
    link.href = qr;
    link.click();
  }

  async function handleExportAllPDF() {
    setExporting(true);
    try {
      const users = allUsers;
      if (users.length === 0) {
        alert('No hay usuarios para exportar');
        return;
      }

      const qrs = await Promise.all(
        users.map(async (user) => ({
          dni: user.dni,
          name: user.name,
          lastname: user.lastname,
          qr: await generateQRDataURL(user.dni),
        }))
      );

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Por favor permite las ventanas emergentes para imprimir');
        return;
      }

      const rowsPerPage = 6;
      const pages: typeof qrs[] = [];
      for (let i = 0; i < qrs.length; i += rowsPerPage) {
        pages.push(qrs.slice(i, i + rowsPerPage));
      }

      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Credenciales Expo Formación UOCRA 2026</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { font-size: 24px; margin-bottom: 5px; }
            .header p { color: #666; font-size: 14px; }
            .page { page-break-after: always; min-height: 100vh; display: flex; flex-direction: column; }
            .page:last-child { page-break-after: auto; }
            .credentials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; flex: 1; }
            .credential { border: 1px solid #ccc; border-radius: 8px; padding: 15px; text-align: center; }
            .credential h3 { font-size: 14px; margin-bottom: 5px; }
            .credential p { font-size: 12px; color: #666; margin-bottom: 10px; }
            .credential img { width: 150px; height: 150px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            @media print {
              .page { page-break-after: always; min-height: 100vh; }
              .page:last-child { page-break-after: auto; }
            }
          </style>
        </head>
        <body>
      `;

      pages.forEach((pageQrs, pageIndex) => {
        html += `
          <div class="page">
            <div class="header">
              <h1>Expo Formación UOCRA 2026</h1>
              <p>${eventData.eventInfo.date} - ${eventData.eventInfo.location}</p>
              <p>Página ${pageIndex + 1} de ${pages.length}</p>
            </div>
            <div class="credentials-grid">
        `;
        
        pageQrs.forEach((item) => {
          html += `
            <div class="credential">
              <h3>${item.name} ${item.lastname}</h3>
              <p>DNI: ${item.dni}</p>
              <img src="${item.qr}" alt="QR Code" />
            </div>
          `;
        });
        
        html += `
            </div>
            <div class="footer">
              Expo Formación UOCRA 2026 - ${eventData.eventInfo.address}
            </div>
          </div>
        `;
      });

      html += `
        </body>
        </html>
      `;

      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar credenciales');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#124565]">Credenciales y QR</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-[#e8e6e1] shadow-sm border-t-4 border-t-[#124565]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#124565]">
              <Search className="h-5 w-5" />
              Buscar por DNI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ingresá el DNI"
                value={dniSearch}
                onChange={(e) => setDniSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="focus:border-[#124565] focus:ring-[#124565]"
              />
              <Button onClick={handleSearch} disabled={loading} className="bg-gradient-to-r from-[#124565] to-[#25848d] text-white hover:opacity-90">
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

            {searchResult && (
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {searchResult.name} {searchResult.lastname}
                  </span>
                  <span className="text-muted-foreground">- DNI: {searchResult.dni}</span>
                </div>
                
                {qrDataUrl && (
                  <div className="flex flex-col items-center gap-4">
                    <Image 
                      src={qrDataUrl} 
                      alt="QR Code" 
                      width={192}
                      height={192}
                      className="border rounded-lg"
                    />
                    <Button onClick={handleDownloadQR} className="flex items-center gap-2 bg-gradient-to-r from-[#124565] to-[#25848d] text-white hover:opacity-90">
                      <Download className="h-4 w-4" />
                      Descargar QR
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e1] shadow-sm border-t-4 border-t-[#25848d]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#25848d]">
              <Users className="h-5 w-5" />
              Exportar Credenciales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Exportá todos los códigos QR de los inscriptos. Se generará un documento 
              imprimible con todas las credenciales para su distribución.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{totalUsers} inscriptos</p>
              <p className="text-sm text-muted-foreground">
                Página {currentPage} de {Math.ceil(totalUsers / pageSize)}
              </p>
            </div>
            <Button 
              onClick={handleExportAllPDF} 
              disabled={exporting || allUsers.length === 0}
              className="w-full flex items-center gap-2 bg-gradient-to-r from-[#124565] to-[#25848d] text-white hover:opacity-90"
            >
              <QrCode className="h-4 w-4" />
              {exporting ? 'Generando...' : 'Exportar PDF con todos los QR'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e8e6e1] shadow-sm border-t-4 border-t-[#124565]">
        <CardHeader>
          <CardTitle className="text-[#124565]">Lista de Inscriptos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">DNI</th>
                  <th className="text-left py-3 px-4 font-medium">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium">Apellido</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.dni}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.lastname}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadIndividualQR(user.dni, user.name, user.lastname)}
                        className="flex items-center gap-1 bg-gradient-to-r from-[#124565] to-[#25848d] text-white hover:opacity-90 border-0"
                      >
                        <Download className="h-3 w-3" />
                        QR
                      </Button>
                    </td>
                  </tr>
                ))}
                {allUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No hay inscriptos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {allUsers.length} de {totalUsers} inscriptos
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center px-3 text-sm">
                Página {currentPage} de {Math.max(1, Math.ceil(totalUsers / pageSize))}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= Math.ceil(totalUsers / pageSize)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
