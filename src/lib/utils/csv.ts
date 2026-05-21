interface ParsedCSV {
  headers: string[];
  rows: Record<string, string>[];
}

export function parseCSV(content: string): ParsedCSV {
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = parseRow(lines[0]).map(h => h.trim().toLowerCase());
  const rows = lines.slice(1).map(line => {
    const values = parseRow(line).map(v => v.trim());
    return headers.reduce((obj, h, i) => ({ ...obj, [h]: values[i] || '' }), {} as Record<string, string>);
  });
  return { headers, rows };
}

function parseRow(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export function validateCSVRows(rows: Record<string, string>[], requiredHeaders: string[]): string[] {
  const errors: string[] = [];
  if (rows.length === 0) {
    errors.push('El CSV no contiene datos');
    return errors;
  }
  const headers = Object.keys(rows[0]);
  for (const h of requiredHeaders) {
    if (!headers.includes(h)) errors.push(`Falta columna: ${h}`);
  }
  return errors;
}

export const CSV_TEMPLATE = 'nombre,apellido,dni,email,telefono';
export const REQUIRED_HEADERS = ['nombre', 'apellido', 'dni', 'email'];

export function downloadCSVTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'plantilla_inscriptos.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
