import { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormSections } from './FormSections';
import './App.css';

export interface FormData {
  email: string;
  imeIPrezime: string;
  tvrtka?: string;
  webStranicaIliDomena?: string;
  ciljevi: string[];
  poslovanjeDjelatnost: string;
  logoVisualniIdentitet: string;
  zaInteresirani?: string;
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

type SectionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SectionFieldsType = (keyof FormData)[];

const sectionFields: Record<SectionId, SectionFieldsType> = {
  1: ['email', 'imeIPrezime'],
  2: ['ciljevi', 'poslovanjeDjelatnost', 'logoVisualniIdentitet'],
  3: ['zaInteresirani'],
  4: [
    'marketingUsluge',
    'ciljanoTrziste',
    'drustveneMreze',
    'budzetMarketing',
    'webLanding',
  ],
  5: [
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
    'webShop',
    'budzetWeb',
  ],
  6: [
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
    'webShop',
    'budzetWeb',
  ],
  7: [
    'brojKategorija',
    'brojProizvoda',
    'filterOpcije',
    'dodatneFunkcionalnosti',
    'brojValuta',
    'nacinDostave',
    'placanje',
    'vrstaProizvoda',
    'erpSustav',
  ],
  8: [
    'erpSustav',
    'podaciZaSinkronizaciju',
    'kolikoCesto',
    'erpSaWebom',
    'webSaErpom',
  ],
  9: ['rezervacijskiSustav', 'dodatneZahtjeve', 'rezervacijskiDodatci'],
};

const sectionTitles: Record<SectionId, string> = {
  1: 'Upitnik za nove klijente',
  2: 'Osnovne informacije 📝',
  3: 'Odaberite pogon Virtualne Tvornice',
  4: 'Marketinške usluge',
  5: 'Web + Marketing',
  6: 'Informacije o web projektu',
  7: 'Informacije o web shopu 🛍️',
  8: 'ERP integracija',
  9: 'Turistički web ☀️',
};

const displaySectionNumbers: Record<SectionId, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 5,
};

const getNextSection = (
  currentSection: SectionId,
  values: FormData
): SectionId | null => {
  switch (currentSection) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      if (values.zaInteresirani === 'Marketing') return 4;
      if (values.zaInteresirani === 'Web + marketing') return 5;
      if (values.zaInteresirani === 'Izrada web stranice') return 6;
      return 4;
    case 4:
      // If the user previously selected only 'Marketing', do not route to 'Izrada web stranice'
      if (values.zaInteresirani === 'Marketing') return null;
      return values.webLanding === 'DA' ? 6 : null;
    case 5:
    case 6:
      if (values.webShop === 'Da, radi se o web shopu') return 7;
      if (values.webShop === 'Da, radi se o turističkoj web stranici') return 9;
      return null;
    case 7:
      return values.erpSustav === 'DA' ? 8 : null;
    case 8:
    case 9:
      return null;
  }
};

function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>(1);
  const [sectionHistory, setSectionHistory] = useState<SectionId[]>([]);
  const formTopRef = useRef<HTMLDivElement | null>(null);
  const methods = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
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
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    getFieldState,
    formState: { errors },
  } = methods;

  useWatch<FormData, readonly (keyof FormData)[]>({
    control: methods.control,
    name: sectionFields[currentSection],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/send-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send form');
      }

      console.log('Form submitted successfully');
      // You can add a success message or redirect here
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add an error message here
    }
  };

  const scrollToFirstInvalidField = (fields: SectionFieldsType) => {
    const firstInvalidField = fields.find(
      (field) => getFieldState(field).invalid
    );

    if (!firstInvalidField) return;

    window.requestAnimationFrame(() => {
      const fieldElement = document.querySelector<HTMLElement>(
        `[name="${firstInvalidField}"]`
      );
      const questionElement =
        fieldElement?.closest<HTMLElement>(
          '.question-box, div[style*="margin-bottom: 15px"]'
        ) ?? fieldElement;

      questionElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  };

  const handleNext = async () => {
    const fieldsToValidate = sectionFields[currentSection];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      scrollToFirstInvalidField(fieldsToValidate);
      return;
    }

    const nextSection = getNextSection(currentSection, getValues());

    if (nextSection) {
      setSectionHistory((history) => [...history, currentSection]);
      setCurrentSection(nextSection);
    }
  };

  const handleBack = () => {
    const previousSection = sectionHistory[sectionHistory.length - 1];
    if (!previousSection) return;

    setSectionHistory((history) => history.slice(0, -1));
    setCurrentSection(previousSection);
  };

  useEffect(() => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSection]);

  // Note: removed debug watches that displayed form state below the form

  const requiredFieldsPerSection: Record<SectionId, (keyof FormData)[]> = {
    1: ['email'],
    2: ['ciljevi', 'poslovanjeDjelatnost', 'logoVisualniIdentitet'],
    3: ['zaInteresirani'],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  const isSectionComplete = (section: SectionId): boolean => {
    const required = requiredFieldsPerSection[section] || [];
    if (required.length === 0) return true;
    const values = getValues();
    return required.every((field) => {
      const val = values[field];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'string') return val.trim().length > 0;
      return !!val;
    });
  };

  const nextSection = getNextSection(currentSection, getValues());

  return (
    <div className="form-container" ref={formTopRef}>
      <div className="card">
        <h1 className="section-title">{sectionTitles[currentSection]}</h1>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSections
              currentSection={currentSection}
              register={register}
              errors={errors}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '30px',
                gap: '10px',
              }}
            >
              {sectionHistory.length > 0 ? (
                <button type="button" onClick={handleBack} className="btn-back">
                  Back
                </button>
              ) : (
                <div style={{ width: '50px' }} />
              )}

              <div style={{ color: '#000000', fontSize: '14px' }}>
                Section {displaySectionNumbers[currentSection]}
              </div>

              {(() => {
                const sectionComplete = isSectionComplete(currentSection);
                if (nextSection) {
                  return (
                    <button
                      type="button"
                      onClick={handleNext}
                      className={
                        sectionComplete ? 'btn-primary' : 'btn-disabled'
                      }
                    >
                      Next
                    </button>
                  );
                }

                return (
                  <button
                    type="submit"
                    className={sectionComplete ? 'btn-accent' : 'btn-disabled'}
                  >
                    Submit
                  </button>
                );
              })()}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
