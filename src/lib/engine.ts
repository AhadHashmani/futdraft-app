export type Position =
  | 'GK'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'CF'
  | 'ST'

export type GameYear = 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26

export type Rarity = 'bronze' | 'silver' | 'gold' | 'rare' | 'special' | 'icon'

export interface PlayerCard {
  id: number
  name: string
  rating: number
  year: GameYear
  position: Position
  nation: string
  club: string
  league: string
  rarity: Rarity
}

export interface DraftSlotBlueprint {
  label: string
  position: Position
  role: 'starter' | 'sub' | 'reserve'
}

export interface DraftOption {
  slotIndex: number
  card: PlayerCard
}

export interface DraftBoard {
  slots: DraftSlotBlueprint[]
  options: DraftOption[][]
  captainOptions: PlayerCard[]
}

export const YEAR_OPTIONS: GameYear[] = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26]

export const FORMATION_OPTIONS = [
  '4-3-3',
  '4-2-3-1',
  '4-4-2',
  '3-4-3',
  '4-3-1-2',
  '5-3-2',
  '3-5-2',
] as const

export const SLOT_BLUEPRINTS: DraftSlotBlueprint[] = [
  { label: 'Striker', position: 'ST', role: 'starter' },
  { label: 'Left Wing', position: 'LW', role: 'starter' },
  { label: 'Right Wing', position: 'RW', role: 'starter' },
  { label: 'CAM', position: 'CAM', role: 'starter' },
  { label: 'CM', position: 'CM', role: 'starter' },
  { label: 'CM', position: 'CM', role: 'starter' },
  { label: 'CDM', position: 'CDM', role: 'starter' },
  { label: 'LB', position: 'LB', role: 'starter' },
  { label: 'CB', position: 'CB', role: 'starter' },
  { label: 'CB', position: 'CB', role: 'starter' },
  { label: 'RB', position: 'RB', role: 'starter' },
  { label: 'LW', position: 'LW', role: 'sub' },
  { label: 'RW', position: 'RW', role: 'sub' },
  { label: 'ST', position: 'ST', role: 'sub' },
  { label: 'CF', position: 'CF', role: 'sub' },
  { label: 'CM', position: 'CM', role: 'sub' },
  { label: 'LB', position: 'LB', role: 'sub' },
  { label: 'RB', position: 'RB', role: 'sub' },
  { label: 'GK', position: 'GK', role: 'reserve' },
  { label: 'GK', position: 'GK', role: 'reserve' },
  { label: 'CB', position: 'CB', role: 'reserve' },
  { label: 'CM', position: 'CM', role: 'reserve' },
  { label: 'CF', position: 'CF', role: 'reserve' },
]

const PLAYER_LIBRARY: PlayerCard[] = [
  { id: 1, name: 'Kylian Mbappé', rating: 92, year: 26, position: 'ST', nation: 'France', club: 'Real Madrid', league: 'LaLiga', rarity: 'special' },
  { id: 2, name: 'Ousmane Dembélé', rating: 89, year: 26, position: 'LW', nation: 'France', club: 'Paris Saint-Germain', league: 'Ligue 1', rarity: 'gold' },
  { id: 3, name: 'Erling Haaland', rating: 91, year: 26, position: 'ST', nation: 'Norway', club: 'Manchester City', league: 'Premier League', rarity: 'special' },
  { id: 4, name: 'Rodri', rating: 90, year: 26, position: 'CDM', nation: 'Spain', club: 'Manchester City', league: 'Premier League', rarity: 'special' },
  { id: 5, name: 'Virgil van Dijk', rating: 88, year: 26, position: 'CB', nation: 'Netherlands', club: 'Liverpool', league: 'Premier League', rarity: 'gold' },
  { id: 6, name: 'Alisson Becker', rating: 89, year: 26, position: 'GK', nation: 'Brazil', club: 'Liverpool', league: 'Premier League', rarity: 'gold' },
  { id: 7, name: 'Jude Bellingham', rating: 91, year: 26, position: 'CM', nation: 'England', club: 'Real Madrid', league: 'LaLiga', rarity: 'special' },
  { id: 8, name: 'Vinícius Júnior', rating: 91, year: 26, position: 'LW', nation: 'Brazil', club: 'Real Madrid', league: 'LaLiga', rarity: 'special' },
  { id: 9, name: 'Bukayo Saka', rating: 89, year: 26, position: 'RW', nation: 'England', club: 'Arsenal', league: 'Premier League', rarity: 'gold' },
  { id: 10, name: 'Declan Rice', rating: 87, year: 26, position: 'CM', nation: 'England', club: 'Arsenal', league: 'Premier League', rarity: 'gold' },
  { id: 11, name: 'Rúben Dias', rating: 86, year: 26, position: 'CB', nation: 'Portugal', club: 'Manchester City', league: 'Premier League', rarity: 'gold' },
  { id: 12, name: 'Theo Hernandez', rating: 85, year: 26, position: 'LB', nation: 'France', club: 'AC Milan', league: 'Serie A', rarity: 'gold' },
  { id: 13, name: 'Achraf Hakimi', rating: 87, year: 26, position: 'RB', nation: 'Morocco', club: 'Paris Saint-Germain', league: 'Ligue 1', rarity: 'gold' },
  { id: 14, name: 'Kevin De Bruyne', rating: 88, year: 26, position: 'CAM', nation: 'Belgium', club: 'Manchester City', league: 'Premier League', rarity: 'gold' },
  { id: 15, name: 'Antoine Griezmann', rating: 85, year: 26, position: 'CF', nation: 'France', club: 'Atlético Madrid', league: 'LaLiga', rarity: 'gold' },
  { id: 16, name: 'Lautaro Martínez', rating: 88, year: 26, position: 'ST', nation: 'Argentina', club: 'Inter Milan', league: 'Serie A', rarity: 'gold' },
  { id: 17, name: 'Federico Valverde', rating: 87, year: 26, position: 'CM', nation: 'Uruguay', club: 'Real Madrid', league: 'LaLiga', rarity: 'gold' },
  { id: 18, name: 'Gianluigi Donnarumma', rating: 89, year: 26, position: 'GK', nation: 'Italy', club: 'Paris Saint-Germain', league: 'Ligue 1', rarity: 'gold' },
  { id: 19, name: 'Cristiano Ronaldo', rating: 86, year: 26, position: 'ST', nation: 'Portugal', club: 'Al Nassr', league: 'Saudi Pro League', rarity: 'gold' },
  { id: 20, name: 'Phil Foden', rating: 89, year: 26, position: 'CAM', nation: 'England', club: 'Manchester City', league: 'Premier League', rarity: 'gold' },
  { id: 21, name: 'Luis Díaz', rating: 84, year: 26, position: 'LW', nation: 'Colombia', club: 'Liverpool', league: 'Premier League', rarity: 'silver' },
  { id: 22, name: 'Pedri', rating: 88, year: 26, position: 'CM', nation: 'Spain', club: 'Barcelona', league: 'LaLiga', rarity: 'gold' },
  { id: 23, name: 'William Saliba', rating: 85, year: 26, position: 'CB', nation: 'France', club: 'Arsenal', league: 'Premier League', rarity: 'gold' },
  { id: 24, name: 'Trent Alexander-Arnold', rating: 87, year: 26, position: 'RB', nation: 'England', club: 'Liverpool', league: 'Premier League', rarity: 'gold' },
  { id: 25, name: 'Rafael Leão', rating: 86, year: 26, position: 'LW', nation: 'Portugal', club: 'AC Milan', league: 'Serie A', rarity: 'gold' },
  { id: 26, name: 'Marc-André ter Stegen', rating: 86, year: 26, position: 'GK', nation: 'Germany', club: 'Barcelona', league: 'LaLiga', rarity: 'gold' },
  { id: 27, name: 'Andriy Shevchenko', rating: 89, year: 17, position: 'ST', nation: 'Ukraine', club: 'Dynamo Kyiv', league: 'Ukrainian Premier League', rarity: 'special' },
  { id: 28, name: 'Andrea Pirlo', rating: 89, year: 17, position: 'CM', nation: 'Italy', club: 'Juventus', league: 'Serie A', rarity: 'special' },
  { id: 29, name: 'Cesc Fàbregas', rating: 89, year: 17, position: 'CM', nation: 'Spain', club: 'Chelsea', league: 'Premier League', rarity: 'special' },
  { id: 30, name: 'Iker Casillas', rating: 90, year: 17, position: 'GK', nation: 'Spain', club: 'Real Madrid', league: 'LaLiga', rarity: 'special' },
  { id: 31, name: 'Sergio Ramos', rating: 88, year: 17, position: 'CB', nation: 'Spain', club: 'Real Madrid', league: 'LaLiga', rarity: 'gold' },
  { id: 32, name: 'Ronaldo', rating: 93, year: 17, position: 'ST', nation: 'Brazil', club: 'Real Madrid', league: 'LaLiga', rarity: 'icon' },
  { id: 33, name: 'Kaka', rating: 87, year: 17, position: 'CAM', nation: 'Brazil', club: 'Real Madrid', league: 'LaLiga', rarity: 'gold' },
  { id: 34, name: 'David Silva', rating: 86, year: 17, position: 'CAM', nation: 'Spain', club: 'Manchester City', league: 'Premier League', rarity: 'gold' },
  { id: 35, name: 'Eden Hazard', rating: 89, year: 17, position: 'LW', nation: 'Belgium', club: 'Chelsea', league: 'Premier League', rarity: 'special' },
  { id: 36, name: 'Zlatan Ibrahimović', rating: 90, year: 17, position: 'ST', nation: 'Sweden', club: 'Manchester United', league: 'Premier League', rarity: 'special' },
  { id: 37, name: 'Paolo Maldini', rating: 90, year: 17, position: 'CB', nation: 'Italy', club: 'AC Milan', league: 'Serie A', rarity: 'icon' },
  { id: 38, name: 'Arjen Robben', rating: 89, year: 17, position: 'LW', nation: 'Netherlands', club: 'Bayern Munich', league: 'Bundesliga', rarity: 'special' },
  { id: 39, name: 'Xavi', rating: 90, year: 17, position: 'CM', nation: 'Spain', club: 'Barcelona', league: 'LaLiga', rarity: 'special' },
]

function samplePool(year: number): PlayerCard[] {
  const pool = PLAYER_LIBRARY.filter((player) => player.year === year)

  if (pool.length === 0) {
    return PLAYER_LIBRARY.filter((player) => player.year === 26)
  }

  return pool
}

function pickUnique<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function matchPosition(slotPosition: Position, card: PlayerCard): number {
  if (slotPosition === card.position) return 1

  const related: Record<Position, Position[]> = {
    ST: ['CF'],
    CF: ['ST'],
    LW: ['LM'],
    LM: ['LW'],
    RW: ['RM'],
    RM: ['RW'],
    CDM: ['CM'],
    CM: ['CDM', 'CAM'],
    CAM: ['CM'],
    LB: ['LWB'],
    LWB: ['LB'],
    RB: ['RWB'],
    RWB: ['RB'],
    GK: [],
    CB: [],
  }

  if (related[slotPosition]?.includes(card.position)) {
    return 0.6
  }

  return 0.35
}

export function buildDraftBoard(year: number): DraftBoard {
  const pool = samplePool(year)
  const captainOptions = pickUnique(pool, 5)

  const options = SLOT_BLUEPRINTS.map((slot, index) => {
    const rankedCards = [...pool]
      .sort((a, b) => {
        const aMatch = matchPosition(slot.position, a)
        const bMatch = matchPosition(slot.position, b)
        const ratingGap = b.rating - a.rating
        const rarityWeight = (b.rarity === 'icon' ? 2 : b.rarity === 'special' ? 1.5 : 1) -
          (a.rarity === 'icon' ? 2 : a.rarity === 'special' ? 1.5 : 1)

        return (bMatch * 10 + ratingGap * 0.5 + rarityWeight) - (aMatch * 10 + a.rating * 0.5 + rarityWeight)
      })
      .slice(0, 12)

    return pickUnique(rankedCards, 5).map((card) => ({ slotIndex: index, card }))
  })

  return {
    slots: SLOT_BLUEPRINTS,
    options,
    captainOptions,
  }
}

export function calculateDraftScore(
  selectedCards: PlayerCard[],
  captainId: number | null,
): { rating: number; chemistry: number; draftScore: number } {
  const fullList = selectedCards.filter(Boolean)

  if (fullList.length === 0) {
    return { rating: 0, chemistry: 0, draftScore: 0 }
  }

  const ratingAverage = fullList.reduce((sum, card) => sum + card.rating, 0) / fullList.length
  const aboveAverage = fullList.filter((card) => card.rating > ratingAverage).length
  const ratingBonus = Math.round(aboveAverage * 1.8)
  const rating = Math.min(99, Math.round(ratingAverage + ratingBonus))

  const captainBoost = captainId
    ? fullList.some((card) => card.id === captainId)
      ? 8
      : 0
    : 0

  const chemistry = Math.min(100, Math.round((fullList.reduce((sum, card) => sum + Math.max(60, card.rating), 0) / fullList.length) * 0.6 + captainBoost))
  const draftScore = Math.min(199, rating + chemistry)

  return {
    rating,
    chemistry,
    draftScore,
  }
}
