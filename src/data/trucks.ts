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
  features: string[];
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
    },
    features: [
      'Ar-condicionado',
      'Freio motor',
      'Painel multimídia com Bluetooth',
      'Câmera de ré',
      'Faróis full LED',
      'Volante multifuncional',
      'Banco do motorista pneumático',
      'Tomada de força',
    ],
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
    },
    features: [
      'I-Shift automatizado',
      'Ar-condicionado automático',
      'Volvo Dynamic Steering',
      'Painel digital 12"',
      'Adaptive Cruise Control',
      'Sistema de frenagem EBS',
      'Suspensão pneumática integral',
      'Câmera 360°',
      'Geladeira de cabine',
      'Cama auxiliar',
    ],
  },
  {
    id: 3,
    name: 'Volkswagen 9.150',
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
    },
    features: [
      'Eaton FS 4205-A manual',
      'Freio motor',
      'Faróis LED',
      'Suspensão pneumática ECS',
      'Sistema Fleetboard',
      'Assistente de faixa',
    ],
  },
  {
    id: 4,
    name: 'Mercedes MB 1635',
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
    },
    features: [
      'Cabine Super Space Cab',
      'Painel digital customizável',
      'DAF Connect (telemetria)',
      'Eco Roll (marcha livre)',
      'Freio motor MX Engine Brake',
      'Ar-condicionado climatronic',
      'Câmera de ré',
      'Suspensão pneumática ECAS',
      'Bloqueio de diferencial',
      'Cama extra-larga',
    ],
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
    },
    features: [
      'Cabine de piso plano',
      'Scania Driver Support',
      'Retarder integrado',
      'Cruise Control preditivo',
      'Ar-condicionado bi-zone',
      'Infotainment com Apple CarPlay',
      'Iluminação ambiente LED',
      'Cama de 80cm',
      'Porta-copos refrigerado',
      'Trava de baú automática',
    ],
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
    },
    features: [
      'I-Shift automatizado',
      'Volvo Connect (telemetria)',
      'EBS com ABS',
      'Painel digital 7"',
      'Ar-condicionado',
      'Cama leito',
      'Faróis de neblina LED',
      'Para-choque integrado',
      'Volante com regulagem',
      'Vidros elétricos',
    ],
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
    },
    features: [
      'Tração 6x4 integral',
      'Bloqueio de diferencial',
      'Chassi reforçado off-road',
      'Protetor de cárter',
      'Turbo Retarder Clutch',
      'Ar-condicionado',
      'Active Brake Assist',
      'Tomada de força traseira',
      'Suspensão mista (molas/pneum.)',
      'Preparação para caçamba/betoneira',
    ],
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
    },
    features: [
      'Cabine Space Cab',
      'DAF Connect',
      'Freio motor integrado',
      'Eco Performance Mode',
      'Ar-condicionado',
      'Cama de descanso',
      'Painel multimídia',
      'Vidros elétricos',
      'Travas elétricas',
      'Direção hidráulica',
    ],
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
