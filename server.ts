import cors from 'cors';
import type { CorsOptions } from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';

interface FormSubmission {
  email: string;
  imeIPrezime: string;
  tvrtka: string;
  webStranicaIliDomena: string;
  ciljevi: string[];
  poslovanjeDjelatnost: string;
  logoVisualniIdentitet: string;
  zaInteresirani: string;
  webShop: string;
  placanje: string;
  vrstaProizvoda: string;
  erpSustav: string;
  podaciZaSinkronizaciju: string;
  kolikoCesto: string;
  erpSaWebom: string;
  webSaErpom: string;
  dodatneZahtjeve: string;
  marketingUsluge: string[];
  ciljanoTrziste: string;
  drustveneMreze: string[];
  budzetMarketing: string;
  webLanding: string;
  sitemapPostoji: string;
  referentniPrimjeri: string;
  customIliTemplate: string;
  newsletterForm: string;
  jezici: string[];
  tkoUnosiPrijevode: string;
  preferiraniPrijevod: string;
  tkoUnosiSadrzaj: string;
  sadrzajPripremljen: string;
  tipDizajna: string;
  budzetWeb: string;
  brojKategorija: string;
  brojProizvoda: string;
  filterOpcije: string;
  dodatneFunkcionalnosti: string;
  brojValuta: string;
  nacinDostave: string;
  rezervacijskiSustav: string;
  rezervacijskiDodatci: string;
}

type FormField = keyof FormSubmission;
type ArrayField = 'ciljevi' | 'marketingUsluge' | 'drustveneMreze' | 'jezici';

const app: Express = express();
const port = process.env.PORT || 3001;
const maxTextLength = 2000;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const formFields = [
  'email',
  'imeIPrezime',
  'tvrtka',
  'webStranicaIliDomena',
  'ciljevi',
  'poslovanjeDjelatnost',
  'logoVisualniIdentitet',
  'zaInteresirani',
  'webShop',
  'placanje',
  'vrstaProizvoda',
  'erpSustav',
  'podaciZaSinkronizaciju',
  'kolikoCesto',
  'erpSaWebom',
  'webSaErpom',
  'dodatneZahtjeve',
  'marketingUsluge',
  'ciljanoTrziste',
  'drustveneMreze',
  'budzetMarketing',
  'webLanding',
  'sitemapPostoji',
  'referentniPrimjeri',
  'customIliTemplate',
  'newsletterForm',
  'jezici',
  'tkoUnosiPrijevode',
  'preferiraniPrijevod',
  'tkoUnosiSadrzaj',
  'sadrzajPripremljen',
  'tipDizajna',
  'budzetWeb',
  'brojKategorija',
  'brojProizvoda',
  'filterOpcije',
  'dodatneFunkcionalnosti',
  'brojValuta',
  'nacinDostave',
  'rezervacijskiSustav',
  'rezervacijskiDodatci',
] as const satisfies readonly FormField[];

const arrayFields = new Set<FormField>([
  'ciljevi',
  'marketingUsluge',
  'drustveneMreze',
  'jezici',
]);

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, number[]>();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin is not allowed by CORS'));
  },
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));

const transporter = nodemailer.createTransport(
  process.env.EMAIL_HOST
    ? {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      }
    : {
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      }
);

transporter.verify((error: Error | null) => {
  if (error) {
    console.error('Email transporter error:', error.message);
    return;
  }

  console.log('Email transporter is ready');
});

app.post(
  '/api/send-form',
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (isRateLimited(req.ip)) {
        res.status(429).json({ error: 'Too many requests. Please try later.' });
        return;
      }

      const parsedSubmission = parseFormSubmission(req.body);

      if (!parsedSubmission.success) {
        res.status(400).json({ error: parsedSubmission.error });
        return;
      }

      const senderEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
      const recipientEmail = process.env.EMAIL_TO;

      if (!senderEmail || !recipientEmail) {
        console.error('Email configuration error: missing sender or recipient');
        res.status(500).json({ error: 'Email service is not configured' });
        return;
      }

      const formData = parsedSubmission.data;
      const emailContent = formatFormData(formData);

      await transporter.sendMail({
        from: senderEmail,
        to: recipientEmail,
        subject: `New Form Submission from ${formData.imeIPrezime || formData.email}`,
        html: emailContent,
        replyTo: formData.email,
      });

      res
        .status(200)
        .json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown email error';

      console.error('Error sending email:', message);
      res.status(500).json({ error: 'Failed to send form' });
    }
  }
);

app.get('/api/health', (_req: Request, res: Response): void => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function parseFormSubmission(
  body: unknown
): { success: true; data: FormSubmission } | { success: false; error: string } {
  if (!isRecord(body)) {
    return { success: false, error: 'Invalid form payload' };
  }

  const submission = getEmptySubmission();

  for (const field of formFields) {
    const rawValue = body[field];

    if (isArrayField(field)) {
      const normalizedArray = normalizeStringArray(rawValue);

      if (!normalizedArray.success) {
        return { success: false, error: `Invalid value for ${field}` };
      }

      submission[field] = normalizedArray.value;
      continue;
    }

    const normalizedString = normalizeString(rawValue);

    if (!normalizedString.success) {
      return { success: false, error: `Invalid value for ${field}` };
    }

    submission[field] = normalizedString.value;
  }

  if (!emailRegex.test(submission.email)) {
    return { success: false, error: 'A valid email is required' };
  }

  return { success: true, data: submission };
}

function getEmptySubmission(): FormSubmission {
  return {
    email: '',
    imeIPrezime: '',
    tvrtka: '',
    webStranicaIliDomena: '',
    ciljevi: [],
    poslovanjeDjelatnost: '',
    logoVisualniIdentitet: '',
    zaInteresirani: '',
    webShop: '',
    placanje: '',
    vrstaProizvoda: '',
    erpSustav: '',
    podaciZaSinkronizaciju: '',
    kolikoCesto: '',
    erpSaWebom: '',
    webSaErpom: '',
    dodatneZahtjeve: '',
    marketingUsluge: [],
    ciljanoTrziste: '',
    drustveneMreze: [],
    budzetMarketing: '',
    webLanding: '',
    sitemapPostoji: '',
    referentniPrimjeri: '',
    customIliTemplate: '',
    newsletterForm: '',
    jezici: [],
    tkoUnosiPrijevode: '',
    preferiraniPrijevod: '',
    tkoUnosiSadrzaj: '',
    sadrzajPripremljen: '',
    tipDizajna: '',
    budzetWeb: '',
    brojKategorija: '',
    brojProizvoda: '',
    filterOpcije: '',
    dodatneFunkcionalnosti: '',
    brojValuta: '',
    nacinDostave: '',
    rezervacijskiSustav: '',
    rezervacijskiDodatci: '',
  };
}

function isArrayField(field: FormField): field is ArrayField {
  return arrayFields.has(field);
}

function normalizeString(
  value: unknown
): { success: true; value: string } | { success: false } {
  if (value === undefined || value === null) {
    return { success: true, value: '' };
  }

  if (typeof value !== 'string' || value.length > maxTextLength) {
    return { success: false };
  }

  return { success: true, value: value.trim() };
}

function normalizeStringArray(
  value: unknown
): { success: true; value: string[] } | { success: false } {
  if (value === undefined || value === null) {
    return { success: true, value: [] };
  }

  if (!Array.isArray(value) || value.length > 50) {
    return { success: false };
  }

  const normalizedValues: string[] = [];

  for (const item of value) {
    if (typeof item !== 'string' || item.length > maxTextLength) {
      return { success: false };
    }

    normalizedValues.push(item.trim());
  }

  return { success: true, value: normalizedValues };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isRateLimited(ipAddress: string | undefined): boolean {
  const key = ipAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - rateLimitWindowMs;
  const recentRequests = (requestLog.get(key) || []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (recentRequests.length >= maxRequestsPerWindow) {
    requestLog.set(key, recentRequests);
    return true;
  }

  requestLog.set(key, [...recentRequests, now]);
  return false;
}

function formatFormData(data: FormSubmission): string {
  let html = '<html><body><h2>New Form Submission</h2>';
  html += '<table style="border-collapse: collapse; width: 100%;">';

  for (const field of formFields) {
    const value = data[field];

    // Skip empty strings and empty arrays so email only contains answered questions
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
    } else {
      if (String(value).trim() === '') continue;
    }

    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    html += `
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f2f2f2;">${sanitizeHtml(formatKey(field))}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeHtml(displayValue)}</td>
      </tr>
    `;
  }

  html += '</table></body></html>';
  return html;
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
