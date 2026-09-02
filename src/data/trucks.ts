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
