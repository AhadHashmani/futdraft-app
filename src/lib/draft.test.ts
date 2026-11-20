import { describe, expect, it } from 'vitest'
import { buildDraftBoard, calculateDraftScore, getFormationSlots } from './draft'
import { PLAYER_LIBRARY } from '../data/players'
import { calculateChemistry, type Squad } from './chemistry'

describe('draft logic', () => {
  it('provides five distinct options for every draft slot', () => {
    const board = buildDraftBoard(26)

    for (const slotOptions of board.options) {
      expect(slotOptions).toHaveLength(5)
      const seen = new Set<number>()
      for (const option of slotOptions) {
        expect(seen.has(option.card.id)).toBe(false)
        seen.add(option.card.id)
      }
    }
  })

  it('builds a complete 23-player squad with a goalkeeper in the starting XI', () => {
    const board = buildDraftBoard(26)

    expect(board.slots).toHaveLength(23)
    expect(board.slots.slice(0, 11).some((slot) => slot.position === 'GK')).toBe(true)
    expect(board.options.every((slotOptions) => slotOptions.length > 0)).toBe(true)
  })

  it('changes the actual starter positions when the formation changes', () => {
    const fourThreeThree = getFormationSlots('4-3-3').slice(0, 11).map((slot) => slot.position)
    const fiveThreeTwo = getFormationSlots('5-3-2').slice(0, 11).map((slot) => slot.position)

    expect(fourThreeThree).not.toEqual(fiveThreeTwo)
    expect(fiveThreeTwo.filter((position) => position === 'CB')).toHaveLength(3)
  })

  it('uses the selected historical player pool', () => {
    const board = buildDraftBoard(17)

    expect(board.captainOptions.length).toBeGreaterThan(0)
    expect(board.captainOptions.every((player) => player.year === 17)).toBe(true)
  })

  it('scores a valid squad without a captain', () => {
    const squad = PLAYER_LIBRARY.slice(0, 11).map((player) => ({ ...player }))
    const score = calculateDraftScore(squad, null)

    expect(score.rating).toBeGreaterThan(0)
    expect(score.chemistry).toBeGreaterThan(0)
    expect(score.draftScore).toBeGreaterThan(0)
  })

  it('treats former teammates as a yellow link and upgrades it to green when the usual chemistry is already yellow', () => {
    const basePair: Squad = {
      formationId: '4-3-3',
      manager: null,
      slots: [
        { slotIndex: 0, slotPosition: 'ST', playedPosition: 'ST', card: { cardId: 'wayne-rooney', name: 'Wayne Rooney', gameYear: 26, rating: 87, naturalPosition: 'ST', nationId: 1, leagueId: 1, clubId: 1, isIcon: false }, hasLoyalty: false },
        { slotIndex: 1, slotPosition: 'LW', playedPosition: 'LW', card: { cardId: 'cristiano-ronaldo', name: 'Cristiano Ronaldo', gameYear: 26, rating: 90, naturalPosition: 'ST', nationId: 2, leagueId: 2, clubId: 2, isIcon: false }, hasLoyalty: false },
        { slotIndex: 2, slotPosition: 'RW', playedPosition: 'RW', card: null, hasLoyalty: false },
        { slotIndex: 3, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 4, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 5, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 6, slotPosition: 'CDM', playedPosition: 'CDM', card: null, hasLoyalty: false },
        { slotIndex: 7, slotPosition: 'LB', playedPosition: 'LB', card: null, hasLoyalty: false },
        { slotIndex: 8, slotPosition: 'CB', playedPosition: 'CB', card: null, hasLoyalty: false },
        { slotIndex: 9, slotPosition: 'CB', playedPosition: 'CB', card: null, hasLoyalty: false },
        { slotIndex: 10, slotPosition: 'RB', playedPosition: 'RB', card: null, hasLoyalty: false },
      ],
    }

    const upgradedPair: Squad = {
      formationId: '4-3-3',
      manager: null,
      slots: [
        { slotIndex: 0, slotPosition: 'ST', playedPosition: 'ST', card: { cardId: 'wayne-rooney', name: 'Wayne Rooney', gameYear: 26, rating: 87, naturalPosition: 'ST', nationId: 1, leagueId: 1, clubId: 1, isIcon: false }, hasLoyalty: false },
        { slotIndex: 1, slotPosition: 'LW', playedPosition: 'LW', card: { cardId: 'cristiano-ronaldo', name: 'Cristiano Ronaldo', gameYear: 26, rating: 90, naturalPosition: 'ST', nationId: 1, leagueId: 1, clubId: 2, isIcon: false }, hasLoyalty: false },
        { slotIndex: 2, slotPosition: 'RW', playedPosition: 'RW', card: null, hasLoyalty: false },
        { slotIndex: 3, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 4, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 5, slotPosition: 'CM', playedPosition: 'CM', card: null, hasLoyalty: false },
        { slotIndex: 6, slotPosition: 'CDM', playedPosition: 'CDM', card: null, hasLoyalty: false },
        { slotIndex: 7, slotPosition: 'LB', playedPosition: 'LB', card: null, hasLoyalty: false },
        { slotIndex: 8, slotPosition: 'CB', playedPosition: 'CB', card: null, hasLoyalty: false },
        { slotIndex: 9, slotPosition: 'CB', playedPosition: 'CB', card: null, hasLoyalty: false },
        { slotIndex: 10, slotPosition: 'RB', playedPosition: 'RB', card: null, hasLoyalty: false },
      ],
    }

    const baseChemistry = calculateChemistry(basePair)
    const upgradedChemistry = calculateChemistry(upgradedPair)
    const basePairLink = baseChemistry.links.find((link) => (link.slotA === 0 && link.slotB === 1) || (link.slotA === 1 && link.slotB === 0))
    const upgradedPairLink = upgradedChemistry.links.find((link) => (link.slotA === 0 && link.slotB === 1) || (link.slotA === 1 && link.slotB === 0))

    expect(basePairLink).toBeDefined()
    expect(basePairLink?.strength).toBe('weak')
    expect(upgradedPairLink).toBeDefined()
    expect(upgradedPairLink?.strength).toBe('strong')
  })
})
