const allImages: Record<string, string> = import.meta.glob(
  '../assets/images/trucks/**/*.jpg',
  { eager: true, import: 'default' }
);

function getImages(folder: string): string[] {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
}


const truckImages = {
  vwDeliveryExpress: getImages('vwDeliveryExpress'),
  volvoVM260_2010: getImages('volvoVM260_2010'),
  vw9150: getImages('vw9.150'),
  mercedesMB1635: getImages('mercedesMB-1635'),
  volvoVM260_2011: getImages('volvoVM260_2011'),
  mercedes1718: getImages('mercedes1718'),
  fordCargo2429: getImages('fordCargo2429'),
  vw30280: getImages('vw30-280Prime'),
  vw24280: getImages('vw24280'),
  mercedesMB815: getImages('mercedesMB815'),
  ivecoTector240E22: getImages('ivecoTector240E22'),
  vw15190: getImages('vw15-190'),
};

export interface Truck {
  id: number;
  name: string;
  year: string;
  km: string;
  fuel: string;
  price: string;
  image: string;
  images: string[];
  brand: string;
  description: string;
  specs: {
    motor: string;
    potencia: string;
    torque: string;
    cambio: string;
    eixos: string;
    pbt: string;
    entreEixos: string;
    cabine: string;
    cor: string;
  };
}

export const allTrucks: Truck[] = [
  {
    id: 1,
    name: 'Volkswagen 11-180',
    year: '2020',
    km: '12.000',
    fuel: 'Diesel',
    price: 'R$ 580.000',
    image: truckImages.vwDeliveryExpress[0],
    images: truckImages.vwDeliveryExpress,
    brand: 'Volkswagen',
    description:
      'O caminhão na imagem é um Volkswagen Delivery Express, modelo 2020, um utilitário projetado especificamente para entregas urbanas que oferece a facilidade de ser conduzido por motoristas com habilitação categoria B.',
    specs: {
      motor: 'Turbo diesel de 2.8 litros',
      potencia: '150 cv',
      torque: '36,7 kgfm',
      cambio: 'Manual 6 marchas',
      eixos: '4x2',
      pbt: '11.000 kg',
      entreEixos: '3.500 mm',
      cabine: 'Leito',
      cor: 'Branco',
    }
  },
  {
    id: 2,
    name: 'Volvo VM 260',
    year: '2010',
    km: '725.000',
    fuel: 'Diesel',
    price: 'R$ 230.000',
    image: truckImages.volvoVM260_2010[0],
    images: truckImages.volvoVM260_2010,
    brand: 'Volvo',
    description:
      'Volvo FH 540 Globetrotter XL com pacote completo de conforto e segurança. Motor D13K com a potência necessária para operações pesadas. Pneus em ótimo estado e toda a manutenção feita na rede autorizada Volvo.',
    specs: {
      motor: 'MWM Acteon 6.12 TCE (ou MWM 7A260)',
      potencia: '260 cv',
      torque: '97 kgfm',
      cambio: 'I-Shift 12 marchas',
      eixos: '6x4',
      pbt: '57.000 kg',
      entreEixos: '3.600 mm',
      cabine: 'Globetrotter XL',
      cor: 'Branco',
    }
  },
  {
    id: 3,
    name: 'Volkswagen 9-150',
    year: '2011',
    km: '8.000',
    fuel: 'Diesel',
    price: 'R$ 190.000',
    image: truckImages.vw9150[0],
    images: truckImages.vw9150,
    brand: 'Volkswagen',
    description:
      'Mercedes-Benz Actros 2651 praticamente zero! Modelo top de linha com a revolucionária cabine Megaspace. Tecnologia MirrorCam substituindo os retrovisores tradicionais por câmeras digitais. Máximo em segurança e economia.',
    specs: {
      motor: 'Cummins Interact 4.0 (ISBe4 150)',
      potencia: '150 cv',
      torque: '56 kgfm',
      cambio: 'Eaton FS 4205-A',
      eixos: '4x2',
      pbt: '9.000 kg',
      entreEixos: '3.520 mm',
      cabine: 'Standard',
      cor: 'Branco',
    }
  },
  {
    id: 4,
    name: 'Mercedes 1635',
    year: '2018',
    km: '499.000',
    fuel: 'Diesel',
    price: 'R$ 290.000',
    image: truckImages.mercedesMB1635[0],
    images: truckImages.mercedesMB1635,
    brand: 'Mercedes',
    description:
      'DAF XF 530 FTS com cabine Super Space Cab, a mais espaçosa da categoria. Caminhão internacional com tecnologia de ponta e excelente custo-benefício. Manutenção em dia e pneus novos. Oportunidade única!',
    specs: {
      motor: 'PMercedes-Benz OM 457 LA (BlueTec 5)',
      potencia: '345 cv',
      torque: '147,8 kgfm',
      cambio: 'Câmbio manual ZF 16S 1650, com 16 marchas à frente (sincronizadas) e 2 à ré',
      eixos: '4x2',
      pbt: '16.000 kg',
      entreEixos: '5.050 mm',
      cabine: 'LS',
      cor: 'Branco',
    }
  },
  {
    id: 5,
    name: 'Volvo VM 260',
    year: '2011',
    km: '78.000',
    fuel: 'Diesel',
    price: 'R$ 240.000',
    image: truckImages.volvoVM260_2011[0],
    images: truckImages.volvoVM260_2011,
    brand: 'Volvo',
    description:
      'Scania S500 da nova geração com cabine de piso plano. Ideal para motoristas que buscam o máximo de conforto em viagens longas. Motor potente e econômico, com histórico completo de manutenção na rede Scania.',
    specs: {
      motor: 'MWM Acteon 6.12 TCE (Euro 3)',
      potencia: '260 cv',
      torque: '97 kgfm',
      cambio: 'Transmissão manual de 9 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.700 mm',
      cabine: 'Leito',
      cor: 'Prata',
    }
  },
  {
    id: 6,
    name: 'Mercedes 1718',
    year: '2012',
    km: '419.000',
    fuel: 'Diesel',
    price: 'R$ 255.000',
    image: truckImages.mercedes1718[0],
    images: truckImages.mercedes1718,
    brand: 'Mercedes',
    description:
      'Mercedes 1718 2012. Caminhão em perfeito estado de conservação, com apenas 419.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'Mercedes-Benz OM 904 LA (com gerenciamento eletrônico)',
      potencia: '177 cv',
      torque: '69 kgfm',
      cambio: 'Mercedes-Benz G 85-6, manual, com 6 marchas à frente (completamente sincronizadas) e 1 à ré.',
      eixos: '4x2',
      pbt: '16.000 kg',
      entreEixos: '3.550 mm',
      cabine: 'Curta',
      cor: 'Branco',
    }
  },
  {
    id: 7,
    name: 'Ford Cargo 2429',
    year: '2015',
    km: '657.000',
    fuel: 'Diesel',
    price: 'R$ 330.000',
    image: truckImages.fordCargo2429[0],
    images: truckImages.fordCargo2429,
    brand: 'Ford',
    description:
      'Ford Cargo 2429 2015. Caminhão em ótimo estado de conservação, com apenas 657.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'Cummins ISB 6.7 litros',
      potencia: '290 cv',
      torque: '97 kgfm',
      cambio: 'Eaton ES-11109, manual com 9 marchas à frente (sincronizadas) e 1 à ré.',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.300 mm',
      cabine: 'Clássica (Curta)',
      cor: 'Prata',
    }
  },
  {
    id: 8,
    name: 'Volkswagen 30.280 Prime',
    year: '2021',
    km: '60.000',
    fuel: 'Diesel',
    price: 'R$ 485.000',
    image: truckImages.vw30280[0],
    images: truckImages.vw30280,
    brand: 'Volkswagen',
    description:
      'Volkswagen 30.280 Prime 2021. Caminhão em ótimo estado de conservação, com apenas 60.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'MAN D08 36 280',
      potencia: '277 cv',
      torque: '107 kgfm',
      cambio: 'ZF 9S 1110 TD de 9 marchas',
      eixos: '6x2',
      pbt: '29.000 kg',
      entreEixos: '4.600 mm',
      cabine: 'Leito',
      cor: 'Branco',
    }
  },
  {
    id: 9,
    name: 'Volkswagen Constellation 24.280',
    year: '2017',
    km: '624.000',
    fuel: 'Diesel',
    price: 'R$ 325.000',
    image: truckImages.vw24280[0],
    images: truckImages.vw24280,
    brand: 'Volkswagen',
    description:
      'Volkswagen Constellation 24.280 2017. Caminhão em ótimo estado de conservação, com apenas 624.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'MAN D08 36 280',
      potencia: '277 cv',
      torque: '107 kgfm',
      cambio: 'ZF 9S 1110 TD de 9 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '4.600 mm',
      cabine: 'Leito',
      cor: 'Branco',
    }
  },
  {
    id: 10,
    name: 'Mercedes-Benz 815',
    year: '2012',
    km: '456.000',
    fuel: 'Diesel',
    price: 'R$ 220.000',
    image: truckImages.mercedesMB815[0],
    images: truckImages.mercedesMB815,
    brand: 'Mercedes',
    description:
      'Mercedes-Benz MB815 2012. Caminhão em ótimo estado de conservação, com apenas 456.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'Mercedes-Benz OM 924 LA (BlueTec 5)',
      potencia: '156 cv',
      torque: '59 kgfm',
      cambio: 'Eaton FSO 4505A, manual, com 5 marchas à frente (sincronizadas) e 1 à ré',
      eixos: '4x2',
      pbt: '8.300 kg',
      entreEixos: '3.050 mm',
      cabine: 'Curta',
      cor: 'Branco',
    }
  },
  {
    id: 11,
    name: 'Iveco Tector 240E22',
    year: '2013',
    km: '419.000',
    fuel: 'Diesel',
    price: 'R$ 285.000',
    image: truckImages.ivecoTector240E22[0],
    images: truckImages.ivecoTector240E22,
    brand: 'Iveco',
    description:
      'Iveco Tector 240E22 2013. Caminhão em ótimo estado de conservação, com apenas 419.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'FPT NEF 6 (F4A)',
      potencia: '218 cv',
      torque: '69,3 kgfm',
      cambio: 'Eaton FS 5306 A. É uma caixa manual muito resistente, com 6 marchas à frente (completamente sincronizadas) e 1 à ré.',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '4.000 mm',
      cabine: 'Curta',
      cor: 'Branco',
    }
  },
  {
    id: 12,
    name: 'Volkswagen 15-190',
    year: '2020',
    km: '90.000',
    fuel: 'Diesel',
    price: 'R$ 420.000',
    image: truckImages.vw15190[0],
    images: truckImages.vw15190,
    brand: 'Volkswagen',
    description:
      'Volkswagen 15-190 2020. Caminhão em ótimo estado de conservação, com apenas 90.000 km rodados. Ideal para quem busca um caminhão confiável e econômico. Pneus em ótimo estado de conservação, revisões em dia.',
    specs: {
      motor: 'MAN D08 34 190',
      potencia: '186 cv',
      torque: '71,3 kgfm',
      cambio: 'Eaton FS 5406-A, manual de 6 marchas à frente (totalmente sincronizadas) e 1 à ré.',
      eixos: '4x2',
      pbt: '15.100 kg',
      entreEixos: '4.500 mm',
      cabine: 'Leito',
      cor: 'Branco',
    }
  },
];

export function getTruckById(id: number): Truck | undefined {
  return allTrucks.find((truck) => truck.id === id);
}

export function getRelatedTrucks(id: number, limit = 4): Truck[] {
  const truck = getTruckById(id);
  if (!truck) return allTrucks.slice(0, limit);

  return allTrucks
    .filter((t) => t.id !== id)
    .sort((a, b) => {
      // Prioriza mesma marca
      const aScore = a.brand === truck.brand ? 1 : 0;
      const bScore = b.brand === truck.brand ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
