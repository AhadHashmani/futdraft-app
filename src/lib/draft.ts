import { PLAYER_LIBRARY, type GameYear, type PlayerCard, type Position } from '../data/players'

export interface DraftSlotBlueprint {
  label: string
  position: Position
  role: 'starter' | 'sub' | 'reserve'
  line: SlotLine
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

export type Formation = '4-3-3' | '4-2-3-1' | '4-4-2' | '3-4-3' | '4-3-1-2' | '5-3-2' | '3-5-2'
export type SlotLine = 'attack' | 'midfield' | 'defense' | 'goalkeeper' | 'bench' | 'reserve'

export const FORMATIONS: Formation[] = ['4-3-3', '4-2-3-1', '4-4-2', '3-4-3', '4-3-1-2', '5-3-2', '3-5-2']
export const YEAR_OPTIONS: GameYear[] = [17, 26]

const STARTERS: Record<Formation, DraftSlotBlueprint[]> = {
  '4-3-3': [
    { label: 'Left wing', position: 'LW', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Right wing', position: 'RW', role: 'starter', line: 'attack' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Attacking mid', position: 'CAM', role: 'starter', line: 'midfield' },
    { label: 'Defensive mid', position: 'CDM', role: 'starter', line: 'midfield' },
    { label: 'Left back', position: 'LB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Right back', position: 'RB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '4-2-3-1': [
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Left mid', position: 'LM', role: 'starter', line: 'midfield' },
    { label: 'Attacking mid', position: 'CAM', role: 'starter', line: 'midfield' },
    { label: 'Right mid', position: 'RM', role: 'starter', line: 'midfield' },
    { label: 'Defensive mid', position: 'CDM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Left back', position: 'LB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Right back', position: 'RB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '4-4-2': [
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Left mid', position: 'LM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Right mid', position: 'RM', role: 'starter', line: 'midfield' },
    { label: 'Left back', position: 'LB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Right back', position: 'RB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '3-4-3': [
    { label: 'Left wing', position: 'LW', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Right wing', position: 'RW', role: 'starter', line: 'attack' },
    { label: 'Left mid', position: 'LM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Right mid', position: 'RM', role: 'starter', line: 'midfield' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '4-3-1-2': [
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Attacking mid', position: 'CAM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Defensive mid', position: 'CDM', role: 'starter', line: 'midfield' },
    { label: 'Left back', position: 'LB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Right back', position: 'RB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '5-3-2': [
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Attacking mid', position: 'CAM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Left wing back', position: 'LWB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Right wing back', position: 'RWB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
  '3-5-2': [
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Striker', position: 'ST', role: 'starter', line: 'attack' },
    { label: 'Left mid', position: 'LM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Attacking mid', position: 'CAM', role: 'starter', line: 'midfield' },
    { label: 'Central mid', position: 'CM', role: 'starter', line: 'midfield' },
    { label: 'Right mid', position: 'RM', role: 'starter', line: 'midfield' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Centre back', position: 'CB', role: 'starter', line: 'defense' },
    { label: 'Goalkeeper', position: 'GK', role: 'starter', line: 'goalkeeper' },
  ],
}

const BENCH_SLOTS: DraftSlotBlueprint[] = [
  { label: 'Left wing', position: 'LW', role: 'sub', line: 'bench' },
  { label: 'Right wing', position: 'RW', role: 'sub', line: 'bench' },
  { label: 'Striker', position: 'ST', role: 'sub', line: 'bench' },
  { label: 'Forward', position: 'CF', role: 'sub', line: 'bench' },
  { label: 'Central mid', position: 'CM', role: 'sub', line: 'bench' },
  { label: 'Left back', position: 'LB', role: 'sub', line: 'bench' },
  { label: 'Right back', position: 'RB', role: 'sub', line: 'bench' },
  { label: 'Goalkeeper', position: 'GK', role: 'reserve', line: 'reserve' },
  { label: 'Goalkeeper', position: 'GK', role: 'reserve', line: 'reserve' },
  { label: 'Centre back', position: 'CB', role: 'reserve', line: 'reserve' },
  { label: 'Central mid', position: 'CM', role: 'reserve', line: 'reserve' },
  { label: 'Forward', position: 'CF', role: 'reserve', line: 'reserve' },
]

export function getFormationSlots(formation: Formation): DraftSlotBlueprint[] {
  return [...STARTERS[formation], ...BENCH_SLOTS]
}

function pickUnique<T>(items: T[], count: number): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
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

function samplePool(year: number): PlayerCard[] {
  const pool = PLAYER_LIBRARY.filter((player) => player.year === year)
  return pool.length > 0 ? pool : PLAYER_LIBRARY.filter((player) => player.year === 26)
}

export function buildDraftBoard(year: GameYear, formation: Formation = '4-3-3'): DraftBoard {
  const pool = samplePool(year)
  const slots = getFormationSlots(formation)

  const options = slots.map((slot, index) => {
    const ranked = [...pool].sort((a, b) => {
      const positionMatch = matchPosition(slot.position, b) - matchPosition(slot.position, a)
      const rarityScore = (card: PlayerCard) => (card.rarity === 'icon' ? 2 : card.rarity === 'special' ? 1 : 0)
      return positionMatch || b.rating - a.rating || rarityScore(b) - rarityScore(a)
    })
    return pickUnique(ranked.slice(0, 5), 5).map((card) => ({ slotIndex: index, card }))
  })

  return {
    slots,
    captainOptions: pickUnique(pool, 5),
    options,
  }
}

export function calculateDraftScore(
  selectedCards: PlayerCard[],
  captainId: number | null,
): { rating: number; chemistry: number; draftScore: number } {
  if (selectedCards.length === 0) {
    return { rating: 0, chemistry: 0, draftScore: 0 }
  }

  const ratingAverage = selectedCards.reduce((sum, card) => sum + card.rating, 0) / selectedCards.length
  const aboveAverage = selectedCards.filter((card) => card.rating > ratingAverage).length
  const ratingBonus = Math.round(aboveAverage * 1.8)
  const rating = Math.min(99, Math.round(ratingAverage + ratingBonus))

  const captainBoost = captainId && selectedCards.some((card) => card.id === captainId) ? 8 : 0
  const chemistry = Math.min(
    100,
    Math.round(
      (selectedCards.reduce((sum, card) => sum + Math.max(60, card.rating), 0) / selectedCards.length) * 0.6 + captainBoost,
    ),
  )

  return {
    rating,
    chemistry,
    draftScore: Math.min(199, rating + chemistry),
  }
}
