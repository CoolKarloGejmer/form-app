import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormData } from './App';

interface FormSectionsProps {
  currentSection: number;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

function OtherField({
  fieldName,
  inputType,
}: {
  fieldName: keyof FormData;
  inputType: 'checkbox' | 'radio';
}) {
  const { getValues, setValue } = useFormContext<FormData>();
  const otherKey = `${String(fieldName)}Other` as keyof FormData;
  const initial = (getValues(otherKey) as unknown as string) ?? '';
  const [value, setLocalValue] = useState<string>(initial);

  useEffect(() => {
    // keep form state in sync with local input
    setValue(otherKey, value);
    if (value.trim().length > 0) {
      if (inputType === 'radio') {
        // ensure radio is set to 'Other'
        setValue(fieldName, 'Other' as unknown as FormData[keyof FormData]);
      } else {
        // checkbox array: ensure 'Other' is present
        const arr = (getValues(fieldName) as unknown as string[]) ?? [];
        if (!arr.includes('Other')) {
          setValue(fieldName, [
            ...arr,
            'Other',
          ] as unknown as FormData[keyof FormData]);
        }
      }
    }
    // only run when value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      placeholder="Other, please specify"
      value={value}
      onChange={(e) => setLocalValue(e.target.value)}
      style={{
        width: '100%',
        padding: '6px',
        boxSizing: 'border-box',
        marginTop: '6px',
      }}
    />
  );
}

export function FormSections({
  currentSection,
  register,
  errors,
}: FormSectionsProps) {
  switch (currentSection) {
    case 1:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Unesite vašu e-mail adresu"
              {...register('email', { required: 'Email je obavezan' })}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
            {errors.email && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="imeIPrezime"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Ime i prezime
            </label>
            <input
              id="imeIPrezime"
              type="text"
              placeholder="Unesite vaše ime i prezime"
              {...register('imeIPrezime')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="tvrtka"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Tvrtka
            </label>
            <input
              id="tvrtka"
              type="text"
              placeholder="Unesite naziv tvrtke"
              {...register('tvrtka')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="webStranicaIliDomena"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Vaša web stranica ili domena
            </label>
            <input
              id="webStranicaIliDomena"
              type="text"
              placeholder="https://primjer.com (ako postoji)"
              {...register('webStranicaIliDomena')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji su ciljevi suradnje? <span style={{ color: 'red' }}>*</span>
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Stvaranje suvremenog web rješenja"
                  {...register('ciljevi', {
                    validate: (value) =>
                      (Array.isArray(value) && value.length > 0) ||
                      'Molimo odaberite najmanje jedan cilj',
                  })}
                />
                Stvaranje suvremenog web rješenja
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Povećanje vidljivosti"
                  {...register('ciljevi')}
                />
                Povećanje vidljivosti
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Povećanje online prodaje"
                  {...register('ciljevi')}
                />
                Povećanje online prodaje
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Povećanje broja leadova / upita"
                  {...register('ciljevi')}
                />
                Povećanje broja leadova / upita
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Mjerljiva SEO poboljšanja"
                  {...register('ciljevi')}
                />
                Mjerljiva SEO poboljšanja
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Povećanje stope konverzije"
                  {...register('ciljevi')}
                />
                Povećanje stope konverzije
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Poboljšanje korisničkog iskustva"
                  {...register('ciljevi')}
                />
                Poboljšanje korisničkog iskustva
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Poboljšanje sigurnosti weba"
                  {...register('ciljevi')}
                />
                Poboljšanje sigurnosti weba
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="checkbox"
                  value="Još ne znamo"
                  {...register('ciljevi')}
                />
                Još ne znamo
              </label>
            </div>
            {errors.ciljevi && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                {errors.ciljevi.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="poslovanjeDjelatnost"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Opišite nam ukratko Vašu djelatnost i kupce, te eventualno neke
              posebnosti koje želite istaknuti o svom poslovanju.{' '}
              <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              id="poslovanjeDjelatnost"
              placeholder="Unesite opis vaše djelatnosti"
              {...register('poslovanjeDjelatnost', {
                required: 'Opis djelatnosti je obavezan',
                validate: (value) =>
                  value.trim().length > 0 || 'Opis djelatnosti je obavezan',
              })}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
            {errors.poslovanjeDjelatnost && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                {errors.poslovanjeDjelatnost.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="logoVisualniIdentitet"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Posjedujete li logotip i izgrađen vizualni identitet tvrtke/brenda
              za koji se radi web? Ako je potrebno (re)dizajnirati temeljni znak
              vizualnog identiteta, molimo napomenite.{' '}
              <span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              id="logoVisualniIdentitet"
              placeholder="Unesite odgovor..."
              {...register('logoVisualniIdentitet', {
                required: 'Odgovor je obavezan',
                validate: (value) =>
                  value.trim().length > 0 || 'Odgovor je obavezan',
              })}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
            {errors.logoVisualniIdentitet && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                {errors.logoVisualniIdentitet.message}
              </p>
            )}
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Za koju uslugu ste zainteresirani?
              <span className="required-asterisk"> *</span>
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="radio"
                  value="Marketing"
                  {...register('zaInteresirani', {
                    required: 'Odaberite ulogu',
                  })}
                />
                Marketing
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="radio"
                  value="Izrada web stranice"
                  {...register('zaInteresirani', {
                    required: 'Odaberite ulogu',
                  })}
                />
                Izrada web stranice
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'black',
                }}
              >
                <input
                  type="radio"
                  value="Web + marketing"
                  {...register('zaInteresirani', {
                    required: 'Odaberite ulogu',
                  })}
                />
                Web + marketing
              </label>
            </div>
            {errors.zaInteresirani && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                {errors.zaInteresirani.message}
              </p>
            )}
          </div>
        </>
      );

    case 4:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Marketinške usluge koje vas zanimaju
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Oglašavanje na društvenim mrežama',
                'Vođenje društvenih mreža',
                'Google oglašavanje',
                'SEO usluge (optimizacija za tražilice)',
                'Newsletter marketing',
                'Kreiranje novog sadržaja',
                'Obrada fotografija / izrada vizuala',
                'Foto ili video produkcija',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="checkbox"
                    value={option}
                    {...register('marketingUsluge')}
                  />
                  {option}
                </label>
              ))}
              <OtherField
                fieldName={'marketingUsluge'}
                inputType={'checkbox'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="ciljanoTrziste"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Koje je vaše ciljano tržište?
            </label>
            <textarea
              id="ciljanoTrziste"
              placeholder="Npr. Hrvatska, EU, regija..."
              {...register('ciljanoTrziste')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Za koje društvene mreže želite uslugu?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['LinkedIn', 'Facebook', 'Instagram', 'TikTok'].map(
                (platform) => (
                  <label
                    key={platform}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={platform}
                      {...register('drustveneMreze')}
                    />
                    {platform}
                  </label>
                )
              )}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji je vaš budžet za marketinške aktivnosti?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'manje od 1.000€ mjesečno',
                '1.000€ - 2.500€ mjesečno',
                '2.500€ - 5.000€ mjesečno',
                '5.000€+ mjesečno',
                'Za sada ne znamo',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('budzetMarketing')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Osim marketinških usluga, je li vam potrebna web stranica ili
              landing stranica?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['DA', 'NE'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('webLanding')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="sitemapPostoji"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Imate li već radnu verziju mape weba?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Da', 'Ne'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('sitemapPostoji')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="referentniPrimjeri"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Referentni primjeri dizajna
            </label>
            <textarea
              id="referentniPrimjeri"
              placeholder="Navedite primjere web stranica koje volite"
              {...register('referentniPrimjeri')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Custom ili template rješenje?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Template', 'Custom'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('customIliTemplate')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Treba li web povezati s newsletter formom?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['MailChimp', 'Sendinblue/Brevo', 'Mailerlite', 'Other'].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('newsletterForm')}
                    />
                    {option}
                  </label>
                )
              )}
              <OtherField fieldName={'newsletterForm'} inputType={'radio'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Na kojim jezicima će biti vaša web stranica?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Hrvatski', 'Engleski', 'Njemački', 'Talijanski', 'Other'].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      {...register('jezici')}
                    />
                    {option}
                  </label>
                )
              )}
              <OtherField fieldName={'jezici'} inputType={'checkbox'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Tko unosi ostale jezike?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Izvršitelj', 'Naručitelj'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tkoUnosiPrijevode')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Preferirani način prijevoda
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Automatski prijevod (AI alatima)',
                'Ručno prevođenje (profesionalni prevoditelj)',
                'Mi dostavljamo prijevod',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('preferiraniPrijevod')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Tko unosi ponavljajuće sadržaje?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Ručni unos/migracija - Izvršitelj',
                'Programski unos/migracija sadržaja - Izvršitelj',
                'Ručni unos/migracija - Naručitelj',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tkoUnosiSadrzaj')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Imate li već pripremljen sadržaj?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Potrebna nam je usluga profesionalnog kreiranja sadržaja.',
                'Dostavit ćemo svoje unaprijed pripremljene sadržaje.',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('sadrzajPripremljen')}
                  />
                  {option}
                </label>
              ))}
              <OtherField
                fieldName={'sadrzajPripremljen'}
                inputType={'radio'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji tip dizajna preferirate?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Responzivni dizajn', 'Mobilni dizajn'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tipDizajna')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Treba li vaša web stranica imati opcije web trgovine ili online
              rezervacije?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Da, radi se o web shopu',
                'Da, radi se o turističkoj web stranici',
                'Ne',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input type="radio" value={option} {...register('webShop')} />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji je vaš budžet za projekt izrade web stranice?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                '1.000€ - 2.000€ (mikro web)',
                '2.000€ - 5.000€',
                '5.000€ - 10.000€',
                '10.000€ +',
                'Za sada ne znamo',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('budzetWeb')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      );

    case 6:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="sitemapPostoji"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Imate li radnu verziju mape weba?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Da', 'Ne'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('sitemapPostoji')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="referentniPrimjeri"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Referentni primjeri dizajna
            </label>
            <textarea
              id="referentniPrimjeri"
              placeholder="Navedite nekoliko primjera dizajna koje volite"
              {...register('referentniPrimjeri')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Custom ili template rješenje?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Template', 'Custom'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('customIliTemplate')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Treba li web imati newsletter formu?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['MailChimp', 'Sendinblue/Brevo', 'Mailerlite', 'Other'].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('newsletterForm')}
                    />
                    {option}
                  </label>
                )
              )}
              <OtherField fieldName={'newsletterForm'} inputType={'radio'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Na kojim jezicima će biti web stranica?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Hrvatski', 'Engleski', 'Njemački', 'Talijanski', 'Other'].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      {...register('jezici')}
                    />
                    {option}
                  </label>
                )
              )}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Ako je višejezični web, tko unosi ostale jezike?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Izvršitelj', 'Naručitelj'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tkoUnosiPrijevode')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Preferirani način prijevoda
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Automatski prijevod (AI alatima)',
                'Ručno prevođenje (profesionalni prevoditelj)',
                'Mi dostavljamo prijevod',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('preferiraniPrijevod')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Tko unosi ponavljajuće sadržaje?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Ručni unos/migracija - Izvršitelj',
                'Programski unos/migracija sadržaja - Izvršitelj',
                'Ručni unos/migracija - Naručitelj',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tkoUnosiSadrzaj')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Imate li pripremljen sadržaj?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Potrebna nam je usluga profesionalnog kreiranja sadržaja.',
                'Dostavit ćemo svoje unaprijed pripremljene sadržaje.',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('sadrzajPripremljen')}
                  />
                  {option}
                </label>
              ))}
              <OtherField
                fieldName={'sadrzajPripremljen'}
                inputType={'radio'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji tip dizajna preferirate?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Responzivni dizajn', 'Mobilni dizajn'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('tipDizajna')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Treba li vaša web stranica imati opcije web trgovine ili online
              rezervacije?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Da, radi se o web shopu',
                'Da, radi se o turističkoj web stranici',
                'Ne',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input type="radio" value={option} {...register('webShop')} />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji je vaš budžet za projekt izrade web stranice?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                '1.000€ - 2.000€ (mikro web)',
                '2.000€ - 5.000€',
                '5.000€ - 10.000€',
                '10.000€ +',
                'Za sada ne znamo',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('budzetWeb')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      );

    case 7:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="brojKategorija"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Koliko kategorija proizvoda će biti u web trgovini?
            </label>
            <input
              id="brojKategorija"
              type="text"
              placeholder="Npr. 5-10"
              {...register('brojKategorija')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="brojProizvoda"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Koliko otprilike proizvoda će biti u web trgovini?
            </label>
            <input
              id="brojProizvoda"
              type="text"
              placeholder="Npr. 50-100"
              {...register('brojProizvoda')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="filterOpcije"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Jesu li potrebne opcije filtriranja proizvoda? Ako da, koje?
            </label>
            <textarea
              id="filterOpcije"
              placeholder="Npr. boja, veličina, cijena..."
              {...register('filterOpcije')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="dodatneFunkcionalnosti"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Jesu li potrebne neke dodatne funkcionalnosti?
            </label>
            <textarea
              id="dodatneFunkcionalnosti"
              placeholder="Npr. fiskalizacija, loyalty program, akcijske cijene..."
              {...register('dodatneFunkcionalnosti')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koliko valuta treba istaknuti na webu?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Jedna valuta', 'Više valuta'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('brojValuta')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koji će biti način dostave?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Standardna opcija',
                'Logika izračuna kurirske službe',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('nacinDostave')}
                  />
                  {option}
                </label>
              ))}
              <OtherField fieldName={'nacinDostave'} inputType={'radio'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koje opcije plaćanja želite podržati?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Plaćanje pouzećem',
                'Virmansko plaćanje',
                'Plaćanje kreditnim karticama',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('placanje')}
                  />
                  {option}
                </label>
              ))}
              <OtherField fieldName={'placanje'} inputType={'radio'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Vrsta proizvoda koja će se prodavati na shopu
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['Jednostavni proizvodi', 'Varijabilni proizvodi'].map(
                (option) => (
                  <label
                    key={option}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'black',
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('vrstaProizvoda')}
                    />
                    {option}
                  </label>
                )
              )}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Je li web potrebno povezati s ERP sustavom?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['DA', 'NE'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('erpSustav')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </>
      );

    case 8:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="erpSustav"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              S kojim ERP sustavom treba povezati web?
            </label>
            <input
              id="erpSustav"
              type="text"
              placeholder="Npr. SAP, Luceed, Pantheon"
              {...register('erpSustav')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="podaciZaSinkronizaciju"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Koje podatke treba sinkronizirati?
            </label>
            <textarea
              id="podaciZaSinkronizaciju"
              placeholder="Npr. narudžbe, proizvodi, zalihe..."
              {...register('podaciZaSinkronizaciju')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Koliko često treba sinkronizirati podatke?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Trenutno',
                'Jednom u satu',
                'Dnevno',
                'Tjedno',
                'Na zahtjev',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('kolikoCesto')}
                  />
                  {option}
                </label>
              ))}
              <OtherField fieldName={'kolikoCesto'} inputType={'radio'} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Što se povezuje, ERP sa webom ili web s ERP-om?
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['ERP sa webom', 'Web sa ERP-om'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('erpSaWebom')}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Web sa ERP-om
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {['ERP sa webom', 'Web sa ERP-om', 'Other'].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('webSaErpom')}
                  />
                  {option}
                </label>
              ))}
              <OtherField fieldName={'webSaErpom'} inputType={'radio'} />
            </div>
          </div>
        </>
      );

    case 9:
      return (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'black',
              }}
            >
              Rezervacijski sustav
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Jednostavan obrazac za slanje upita',
                'Obrazac za online rezervaciju bez plaćanja',
                'Obrazac za online rezervaciju s online plaćanjem',
                'Obrazac za online rezervaciju s integracijom treće strane',
                'Other',
              ].map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                  }}
                >
                  <input
                    type="radio"
                    value={option}
                    {...register('rezervacijskiSustav')}
                  />
                  {option}
                </label>
              ))}
              <OtherField
                fieldName={'rezervacijskiSustav'}
                inputType={'radio'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="dodatneZahtjeve"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Dodatni zahtjevi
            </label>
            <textarea
              id="dodatneZahtjeve"
              placeholder="Navedite dodatne zahtjeve ili funkcionalnosti"
              {...register('dodatneZahtjeve')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="rezervacijskiDodatci"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'black',
              }}
            >
              Dodatne napomene za turistički web
            </label>
            <textarea
              id="rezervacijskiDodatci"
              placeholder="Npr. vremenska prognoza, Booking.com integracija, review sustav..."
              {...register('rezervacijskiDodatci')}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                minHeight: '100px',
              }}
            />
          </div>
        </>
      );

    default:
      return null;
  }
}
