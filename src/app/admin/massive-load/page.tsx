'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, Upload, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseCSV, validateCSVRows, downloadCSVTemplate, REQUIRED_HEADERS } from '@/lib/utils/csv';
import { processMassiveLoad, type ParsedRow } from '@/lib/services/massiveLoadService';
import { checkinService } from '@/lib/services/checkinService';

interface PreviewRow {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
}

interface RowError {
  row: number;
  dni: string;
  error: string;
}

export default function MassiveLoadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<PreviewRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<{ success: number; errors: RowError[] } | null>(null);
  const [noActiveEvent, setNoActiveEvent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResults(null);
    setValidationErrors([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const { headers: h, rows } = parseCSV(content);
      setHeaders(h);

      const errors = validateCSVRows(rows, REQUIRED_HEADERS);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setParsedData([]);
        return;
      }

      const preview = rows.slice(0, 5).map(row => ({
        nombre: row.nombre || '',
        apellido: row.apellido || '',
        dni: row.dni || '',
        email: row.email || '',
        telefono: row.telefono || '',
      }));
      setParsedData(preview);
    };
    reader.readAsText(selectedFile);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv' || droppedFile?.name.endsWith('.csv')) {
      if (fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(droppedFile);
        fileInputRef.current.files = dt.files;
        fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleImport = async () => {
    if (!file) return;

    setShowConfirmModal(false);
    setIsProcessing(true);
    setResults(null);
    setNoActiveEvent(false);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const { rows } = parseCSV(content);
      const rowsTyped = rows as ParsedRow[];

      setProgress({ current: 0, total: rowsTyped.length });

      const eventId = await checkinService.getActiveEventId();
      if (!eventId) {
        setNoActiveEvent(true);
        setIsProcessing(false);
        return;
      }

      const result = await processMassiveLoad(rowsTyped, eventId, (current, total) => {
        setProgress({ current, total });
      });

      setResults(result);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const resetForm = () => {
    setFile(null);
    setParsedData([]);
    setHeaders([]);
    setValidationErrors([]);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Carga Masiva</h1>
        <p className="text-muted-foreground">Importá inscriptos desde un archivo CSV</p>
      </div>

      {!results && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Plantilla CSV
            </CardTitle>
            <CardDescription>
              Descargá la plantilla, completá los datos y subí el archivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" onClick={downloadCSVTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Descargar Plantilla
            </Button>
          </CardContent>
        </Card>
      )}

      {!results && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Subir Archivo CSV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-1">Arrastrá el archivo CSV acá</p>
                  <p className="text-sm text-muted-foreground">o hacé clic para seleccionar</p>
                </>
              )}
            </div>

            {validationErrors.length > 0 && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 text-destructive font-medium mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Errores de validación
                </div>
                <ul className="text-sm text-destructive/80 space-y-1">
                  {validationErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {parsedData.length > 0 && !results && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preview de Datos</CardTitle>
            <CardDescription>
              Primeros {parsedData.length} registros del archivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">Nombre</th>
                    <th className="text-left py-2 px-3 font-medium">Apellido</th>
                    <th className="text-left py-2 px-3 font-medium">DNI</th>
                    <th className="text-left py-2 px-3 font-medium">Email</th>
                    <th className="text-left py-2 px-3 font-medium">Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-3">{row.nombre}</td>
                      <td className="py-2 px-3">{row.apellido}</td>
                      <td className="py-2 px-3">{row.dni}</td>
                      <td className="py-2 px-3">{row.email}</td>
                      <td className="py-2 px-3">{row.telefono || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => setShowConfirmModal(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Importar {file?.name}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Procesando...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{progress.current} de {progress.total}</span>
                <span>{Math.round((progress.current / progress.total) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {noActiveEvent && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>No hay evento activo. No se puede realizar la importación.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados de la Importación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-800">{results.success}</p>
                  <p className="text-sm text-green-700">Registrados exitosamente</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-800">{results.errors.length}</p>
                  <p className="text-sm text-red-700">Errores</p>
                </div>
              </div>
            </div>

            {results.errors.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Detalle de Errores</h4>
                <div className="max-h-64 overflow-y-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-muted">
                      <tr>
                        <th className="text-left py-2 px-3 font-medium">Fila</th>
                        <th className="text-left py-2 px-3 font-medium">DNI</th>
                        <th className="text-left py-2 px-3 font-medium">Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.errors.map((err, i) => (
                        <tr key={i} className="border-t">
                          <td className="py-2 px-3">{err.row}</td>
                          <td className="py-2 px-3">{err.dni}</td>
                          <td className="py-2 px-3 text-red-600">{err.error}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button onClick={resetForm}>
                <Upload className="h-4 w-4 mr-2" />
                Importar Otro Archivo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle>Confirmar Importación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Estás por importar <strong>{file?.name}</strong>. Los datos se registrarán en el evento activo.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleImport}>
                  Confirmar Importación
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
