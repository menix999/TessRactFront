import React from 'react';

const Regulamin = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-8'>Regulamin Sklepu Internetowego</h1>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-2'>§1. Postanowienia ogólne</h2>
        <p>
          1. Sklep internetowy, działający pod adresem [adres], prowadzony jest przez [nazwa firmy],
          z siedzibą w [adres siedziby], NIP: [numer NIP], REGON: [numer REGON].
        </p>
        <p>
          2. Niniejszy regulamin określa zasady dokonywania zakupów oraz korzystania ze świadczonych
          przez sklep usług.
        </p>
        <p>3. Definicje:</p>
        <ul className='list-disc ml-6'>
          <li>
            Klient – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca
            osobowości prawnej, dokonująca zakupów w sklepie internetowym.
          </li>
          <li>Sklep – sklep internetowy prowadzony przez [nazwa firmy].</li>
          <li>Towar – produkty dostępne w ofercie sklepu internetowego.</li>
        </ul>
        <p>
          4. Warunkiem korzystania z usług świadczonych przez sklep jest akceptacja niniejszego
          regulaminu.
        </p>
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-2'>§2. Składanie zamówień</h2>
        <p>1. Zamówienia można składać przez stronę internetową sklepu.</p>
        <p>2. Proces składania zamówienia obejmuje następujące kroki:</p>
        <ol className='list-decimal ml-6'>
          <li>Wybór produktów i dodanie ich do koszyka.</li>
          <li>Wybór formy płatności i dostawy.</li>
          <li>Potwierdzenie zamówienia.</li>
        </ol>
        <p>
          3. Po złożeniu zamówienia Klient otrzymuje potwierdzenie złożenia zamówienia na podany
          adres e-mail.
        </p>
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-2'>§3. Płatności</h2>
        <p>1. Sklep umożliwia płatności za zamówienia za pomocą następujących metod płatności:</p>
        <ul className='list-disc ml-6'>
          <li>Przelew bankowy.</li>
          <li>Płatność kartą kredytową.</li>
          <li>Płatność przy odbiorze.</li>
        </ul>
        <p>
          2. Warunki płatności oraz terminy realizacji zamówienia określane są w momencie składania
          zamówienia.
        </p>
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-2'>§4. Dostawa</h2>
        <p>1. Sklep realizuje dostawy na terenie [kraju].</p>
        <p>2. Koszty dostawy oraz terminy dostawy określone są w momencie składania zamówienia.</p>
      </div>
      <div>
        <h2 className='text-2xl font-semibold mb-2'>§5. Reklamacje i zwroty</h2>
        <p>
          1. Klient ma prawo do reklamacji w przypadku otrzymania wadliwego towaru lub towaru
          niezgodnego z zamówieniem.
        </p>
        <p>
          2. Warunki reklamacji oraz procedura postępowania w przypadku reklamacji są określone w{' '}
          <a href='/polityka-reklamacji'>Polityce Reklamacji</a>.
        </p>
      </div>
    </div>
  );
};

export default Regulamin;
