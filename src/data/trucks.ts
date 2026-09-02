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
  mercedesAccelo1017: getImages('mercedesAccelo1017'),
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
    tipo_carroceria: string;
  };
}

export const allTrucks: Truck[] = [];

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
