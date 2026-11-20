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

export interface Card {
  cardId: string
  name?: string
  gameYear: number
  rating: number
  naturalPosition: Position
  nationId: number
  leagueId: number
  clubId: number
  isIcon: boolean
}

export interface SquadSlot {
  slotIndex: number
  slotPosition: Position
  card: Card | null
  playedPosition: Position
  hasLoyalty: boolean
}

export interface Manager {
  nationId: number
  leagueId: number
}

export interface Squad {
  formationId: string
  slots: SquadSlot[]
  manager: Manager | null
}

export interface ChemistryResult {
  teamChemistry: number
  playerChemistry: Map<number, number>
  links: LinkResult[]
}

export interface LinkResult {
  slotA: number
  slotB: number
  strength: 'none' | 'weak' | 'strong' | 'perfect'
}

export interface SquadScore {
  rating: number
  chemistry: number
  draftScore: number
}

export type FormationLinks = Record<string, number[][]>

export const FORMATION_LINKS: FormationLinks = {
  '4-3-3': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  '4-2-3-1': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  '4-4-2': [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 9]],
  '3-4-3': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  '4-3-1-2': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  '5-3-2': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  '3-5-2': [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
}

export function calculateChemistry(squad: Squad): ChemistryResult {
  const playerChemistry = new Map<number, number>()
  const links: LinkResult[] = []

  for (const slot of squad.slots) {
    if (slot.slotIndex >= 11 || !slot.card) {
      playerChemistry.set(slot.slotIndex, 0)
      continue
    }

    const adjacency = FORMATION_LINKS[squad.formationId] ?? []
    let totalLinkValue = 0
    let linkCount = 0

    for (const [a, b] of adjacency) {
      if (a === slot.slotIndex || b === slot.slotIndex) {
        const other = a === slot.slotIndex ? b : a
        const teammate = squad.slots[other]?.card

        if (!teammate) continue

        const strength = determineLinkStrength(slot.card, teammate, squad.manager)
        if (strength === 'none') continue

        totalLinkValue += strengthValue(strength)
        linkCount += 1
        links.push({ slotA: slot.slotIndex, slotB: other, strength })
      }
    }

    const base = linkCount === 0 ? 0 : totalLinkValue / linkCount
    const positionBonus = determinePositionModifier(slot.slotPosition, slot.card.naturalPosition)
    const loyaltyBonus = slot.hasLoyalty ? 1 : 0
    const managerBonus = squad.manager ? managerModifier(slot.card, squad.manager) : 0
    const computed = Math.max(0, Math.min(10, Math.round((base + positionBonus + loyaltyBonus + managerBonus) * 10) / 10))
    playerChemistry.set(slot.slotIndex, computed)
  }

  const teamChemistry = clamp(Math.round((Array.from(playerChemistry.values()).reduce((sum, value) => sum + value, 0) / 11) * 10), 0, 100)

  return {
    teamChemistry,
    playerChemistry,
    links,
  }
}

export function calculateRating(squad: Squad): number {
  const filled = squad.slots.filter((slot) => slot.card !== null)
  if (filled.length === 0) return 0

  const total = filled.reduce((sum, slot) => sum + slot.card!.rating, 0)
  const average = total / filled.length
  const aboveAverage = filled.filter((slot) => slot.card!.rating > average).length
  const bonus = Math.round(aboveAverage * 1.8)
  return Math.min(99, Math.round(average + bonus))
}

export function calculateScore(squad: Squad): SquadScore {
  const rating = calculateRating(squad)
  const chemistry = calculateChemistry(squad).teamChemistry
  const draftScore = Math.min(199, rating + chemistry)

  return { rating, chemistry, draftScore }
}

const HISTORICAL_TEAMMATE_PAIRS = new Map<string, string>([
  ['wayne rooney', 'cristiano ronaldo'],
  ['cristiano ronaldo', 'wayne rooney'],
])

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function isHistoricalTeammatePair(a: Card, b: Card): boolean {
  if (!a.name || !b.name) return false

  const left = normalizeName(a.name)
  const right = normalizeName(b.name)

  return left !== right && HISTORICAL_TEAMMATE_PAIRS.get(left) === right
}

function determineLinkStrength(a: Card, b: Card, manager: Manager | null): LinkResult['strength'] {
  const sameClub = a.clubId === b.clubId
  const sameLeague = a.leagueId === b.leagueId
  const sameNation = a.nationId === b.nationId

  let baseStrength: LinkResult['strength'] = 'none'

  if (sameClub && sameNation) baseStrength = 'perfect'
  else if (sameClub || (sameNation && sameLeague)) baseStrength = 'strong'
  else if (sameNation || sameLeague) baseStrength = 'weak'

  if (manager && (manager.nationId === a.nationId || manager.leagueId === a.leagueId)) {
    baseStrength = baseStrength === 'none' ? 'strong' : baseStrength
  }

  if (isHistoricalTeammatePair(a, b)) {
    return baseStrength === 'none' ? 'weak' : baseStrength === 'weak' ? 'strong' : baseStrength
  }

  return baseStrength
}

function strengthValue(value: LinkResult['strength']): number {
  switch (value) {
    case 'perfect':
      return 3
    case 'strong':
      return 2
    case 'weak':
      return 1
    default:
      return 0
  }
}

function determinePositionModifier(slotPosition: Position, naturalPosition: Position): number {
  if (slotPosition === naturalPosition) return 1
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

  return related[slotPosition]?.includes(naturalPosition) ? 0.6 : 0.3
}

function managerModifier(card: Card, manager: Manager): number {
  const nationMatch = card.nationId === manager.nationId ? 0.6 : 0
  const leagueMatch = card.leagueId === manager.leagueId ? 0.4 : 0
  return nationMatch + leagueMatch
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
