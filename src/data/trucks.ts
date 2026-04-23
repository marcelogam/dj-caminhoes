import truckWhite from '../assets/images/truck-white.png';
import truckBlue from '../assets/images/truck-blue.png';
import truckRed from '../assets/images/truck-red.png';
import truckSilver from '../assets/images/truck-silver.png';

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
  tag: string;
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
    placa: string;
  };
  features: string[];
}

export const allTrucks: Truck[] = [
  {
    id: 1,
    name: 'Scania R450',
    year: '2024',
    km: '12.000',
    fuel: 'Diesel',
    price: 'R$ 580.000',
    image: truckWhite,
    images: [truckWhite, truckWhite, truckWhite],
    brand: 'Scania',
    tag: 'Seminovo',
    description:
      'Scania R450 em excelente estado de conservação. Caminhão revisado com garantia de procedência. Ideal para operações de longa distância com máximo conforto e economia de combustível. Cabine leito com ar-condicionado digital e painel multimídia.',
    specs: {
      motor: 'Scania DC13 6 cilindros',
      potencia: '450 cv',
      torque: '2.350 Nm',
      cambio: 'Opticruise 12 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.700 mm',
      cabine: 'R Highline (Leito)',
      cor: 'Branco',
      placa: 'Final 5',
    },
    features: [
      'Ar-condicionado digital',
      'Piloto automático (Cruise Control)',
      'Freio retarder',
      'Suspensão pneumática',
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
    name: 'Volvo FH 540',
    year: '2023',
    km: '45.000',
    fuel: 'Diesel',
    price: 'R$ 620.000',
    image: truckBlue,
    images: [truckBlue, truckBlue, truckBlue],
    brand: 'Volvo',
    tag: 'Destaque',
    description:
      'Volvo FH 540 Globetrotter XL com pacote completo de conforto e segurança. Motor D13K com a potência necessária para operações pesadas. Pneus em ótimo estado e toda a manutenção feita na rede autorizada Volvo.',
    specs: {
      motor: 'Volvo D13K 6 cilindros',
      potencia: '540 cv',
      torque: '2.600 Nm',
      cambio: 'I-Shift 12 marchas',
      eixos: '6x4',
      pbt: '57.000 kg',
      entreEixos: '3.600 mm',
      cabine: 'Globetrotter XL',
      cor: 'Azul',
      placa: 'Final 2',
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
    name: 'Mercedes Actros 2651',
    year: '2024',
    km: '8.000',
    fuel: 'Diesel',
    price: 'R$ 550.000',
    image: truckRed,
    images: [truckRed, truckRed, truckRed],
    brand: 'Mercedes-Benz',
    tag: 'Novo',
    description:
      'Mercedes-Benz Actros 2651 praticamente zero! Modelo top de linha com a revolucionária cabine Megaspace. Tecnologia MirrorCam substituindo os retrovisores tradicionais por câmeras digitais. Máximo em segurança e economia.',
    specs: {
      motor: 'Mercedes OM 471 6 cilindros',
      potencia: '510 cv',
      torque: '2.500 Nm',
      cambio: 'PowerShift 3 (12 marchas)',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.600 mm',
      cabine: 'Megaspace (Leito)',
      cor: 'Vermelho',
      placa: 'Final 8',
    },
    features: [
      'MirrorCam (câmeras digitais)',
      'Multimedia Cockpit 12"',
      'Predictive Powertrain Control',
      'Active Brake Assist 5',
      'Câmbio PowerShift 3 automatizado',
      'Ar-condicionado automático',
      'Faróis LED inteligentes',
      'Suspensão pneumática ECS',
      'Sistema Fleetboard',
      'Assistente de faixa',
    ],
  },
  {
    id: 4,
    name: 'DAF XF 530',
    year: '2023',
    km: '32.000',
    fuel: 'Diesel',
    price: 'R$ 490.000',
    image: truckSilver,
    images: [truckSilver, truckSilver, truckSilver],
    brand: 'DAF',
    tag: 'Oferta',
    description:
      'DAF XF 530 FTS com cabine Super Space Cab, a mais espaçosa da categoria. Caminhão internacional com tecnologia de ponta e excelente custo-benefício. Manutenção em dia e pneus novos. Oportunidade única!',
    specs: {
      motor: 'PACCAR MX-13 6 cilindros',
      potencia: '530 cv',
      torque: '2.500 Nm',
      cambio: 'TraXon 12 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.800 mm',
      cabine: 'Super Space Cab',
      cor: 'Prata',
      placa: 'Final 1',
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
    name: 'Scania S500',
    year: '2022',
    km: '78.000',
    fuel: 'Diesel',
    price: 'R$ 510.000',
    image: truckWhite,
    images: [truckWhite, truckWhite, truckWhite],
    brand: 'Scania',
    tag: 'Seminovo',
    description:
      'Scania S500 da nova geração com cabine de piso plano. Ideal para motoristas que buscam o máximo de conforto em viagens longas. Motor potente e econômico, com histórico completo de manutenção na rede Scania.',
    specs: {
      motor: 'Scania DC13 6 cilindros',
      potencia: '500 cv',
      torque: '2.550 Nm',
      cambio: 'Opticruise 12+2 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.700 mm',
      cabine: 'S Highline (Piso plano)',
      cor: 'Branco',
      placa: 'Final 3',
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
    name: 'Volvo FH 460',
    year: '2023',
    km: '55.000',
    fuel: 'Diesel',
    price: 'R$ 480.000',
    image: truckBlue,
    images: [truckBlue, truckBlue, truckBlue],
    brand: 'Volvo',
    tag: 'Seminovo',
    description:
      'Volvo FH 460 com cabine Globetrotter. Excelente opção para quem busca a confiabilidade Volvo com um investimento acessível. Câmbio I-Shift suave e preciso. Histórico completo na rede autorizada.',
    specs: {
      motor: 'Volvo D13K 6 cilindros',
      potencia: '460 cv',
      torque: '2.300 Nm',
      cambio: 'I-Shift 12 marchas',
      eixos: '6x2',
      pbt: '23.000 kg',
      entreEixos: '3.600 mm',
      cabine: 'Globetrotter',
      cor: 'Azul',
      placa: 'Final 7',
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
    name: 'Mercedes Arocs 3345',
    year: '2024',
    km: '5.000',
    fuel: 'Diesel',
    price: 'R$ 640.000',
    image: truckRed,
    images: [truckRed, truckRed, truckRed],
    brand: 'Mercedes-Benz',
    tag: 'Novo',
    description:
      'Mercedes-Benz Arocs 3345 – o caminhão para trabalho pesado e fora de estrada. Construído para encarar os terrenos mais difíceis com robustez e confiabilidade. Chassi reforçado e suspensão preparada para mineração e construção.',
    specs: {
      motor: 'Mercedes OM 460 6 cilindros',
      potencia: '449 cv',
      torque: '2.200 Nm',
      cambio: 'PowerShift 3 (16 marchas)',
      eixos: '6x4',
      pbt: '42.000 kg',
      entreEixos: '3.300 mm',
      cabine: 'ClassicSpace (Curta)',
      cor: 'Vermelho',
      placa: 'Final 9',
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
    name: 'DAF CF 450',
    year: '2022',
    km: '62.000',
    fuel: 'Diesel',
    price: 'R$ 410.000',
    image: truckSilver,
    images: [truckSilver, truckSilver, truckSilver],
    brand: 'DAF',
    tag: 'Oferta',
    description:
      'DAF CF 450 versátil e eficiente. O CF é conhecido pelo melhor custo-benefício da linha DAF, sendo ideal para distribuição e operações regionais. Cabine confortável e econômico no consumo de diesel.',
    specs: {
      motor: 'PACCAR MX-11 6 cilindros',
      potencia: '450 cv',
      torque: '2.200 Nm',
      cambio: 'TraXon 12 marchas',
      eixos: '4x2',
      pbt: '16.000 kg',
      entreEixos: '3.800 mm',
      cabine: 'Space Cab',
      cor: 'Prata',
      placa: 'Final 4',
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
