export type CandleType = "7_days" | "24_hours";

export interface SaintOption {
  id: string;
  name: string;
  title: string;
  image: string;
  candleTypes: CandleType[];
}

export const SAINTS_CATALOG: SaintOption[] = [
  {
    id: "santa-teresinha",
    name: "Santa Teresinha do Menino Jesus",
    title: "Doutora da Igreja & Padroeira das Missões",
    image: "/images/santa-teresinha.jpg",
    candleTypes: ["7_days", "24_hours"],
  },
  {
    id: "sao-jose",
    name: "São José",
    title: "Patrono da Igreja & Protetor das Famílias",
    image: "/images/sao-jose.jpg",
    candleTypes: ["24_hours"],
  },
  {
    id: "ns-carmo",
    name: "Nossa Senhora do Carmo",
    title: "Rainha do Carmelo & Mãe do Santo Escapulário",
    image: "/images/ns-carmo.jpg",
    candleTypes: ["24_hours"],
  },
  {
    id: "sao-francisco",
    name: "São Francisco de Assis",
    title: "Arauto da Paz & Amigo dos Pobres",
    image: "/images/sao-francisco.jpg",
    candleTypes: ["24_hours"],
  },
  {
    id: "padre-pio",
    name: "São Padre Pio de Pietrelcina",
    title: "Apóstolo do Confessionário & Homem de Oração",
    image: "/images/padre-pio.jpg",
    candleTypes: ["24_hours"],
  },
];

export interface LitCandle {
  id: string;
  devoteeName: string;
  location?: string;
  intention: string;
  type: CandleType;
  saintId: string;
  saintName: string;
  saintImage: string;
  litAt: string; // ISO date string
  durationHours: number; // 168 (7 days) or 24 (24 hours)
  prayerCount: number;
  isUserOwned?: boolean;
}

// Initial candles so the altar is welcoming and community-filled
export const INITIAL_CANDLES: LitCandle[] = [
  {
    id: "candle-1",
    devoteeName: "Maria Aparecida dos Santos",
    location: "Aparecida - SP",
    intention: "Pela saúde e recuperação do meu esposo no hospital e pela paz em nosso lar.",
    type: "7_days",
    saintId: "santa-teresinha",
    saintName: "Santa Teresinha do Menino Jesus",
    saintImage: "/images/santa-teresinha.jpg",
    litAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    durationHours: 168,
    prayerCount: 42,
  },
  {
    id: "candle-2",
    devoteeName: "Pe. Marcelo e Paróquia",
    location: "Belo Horizonte - MG",
    intention: "Por todas as famílias aflitas e pelas vocações sacerdotais e religiosas.",
    type: "7_days",
    saintId: "santa-teresinha",
    saintName: "Santa Teresinha do Menino Jesus",
    saintImage: "/images/santa-teresinha.jpg",
    litAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    durationHours: 168,
    prayerCount: 89,
  },
  {
    id: "candle-3",
    devoteeName: "Lucas e Beatriz",
    location: "Curitiba - PR",
    intention: "Pelo nascimento abençoado de nossa filha Teresa e consagração da família.",
    type: "7_days",
    saintId: "santa-teresinha",
    saintName: "Santa Teresinha do Menino Jesus",
    saintImage: "/images/santa-teresinha.jpg",
    litAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    durationHours: 168,
    prayerCount: 31,
  },
  {
    id: "candle-4",
    devoteeName: "Terezinha de Fátima",
    location: "Fortaleza - CE",
    intention: "Em honra a São José pela providência de um emprego para o meu filho.",
    type: "24_hours",
    saintId: "sao-jose",
    saintName: "São José",
    saintImage: "/images/sao-jose.jpg",
    litAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    durationHours: 24,
    prayerCount: 19,
  },
  {
    id: "candle-5",
    devoteeName: "Carmelitas Seculares",
    location: "Lisboa / Salvador",
    intention: "Sob o manto de Nossa Senhora do Carmo, pela paz no mundo e proteção aos perseguidos.",
    type: "24_hours",
    saintId: "ns-carmo",
    saintName: "Nossa Senhora do Carmo",
    saintImage: "/images/ns-carmo.jpg",
    litAt: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
    durationHours: 24,
    prayerCount: 27,
  },
  {
    id: "candle-6",
    devoteeName: "Irmão Francisco",
    location: "Petrópolis - RJ",
    intention: "Pela conversão e reconciliação dos irmãos desavindos.",
    type: "24_hours",
    saintId: "sao-francisco",
    saintName: "São Francisco de Assis",
    saintImage: "/images/sao-francisco.jpg",
    litAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    durationHours: 24,
    prayerCount: 15,
  },
];
