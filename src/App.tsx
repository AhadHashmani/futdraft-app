import { useMemo, useState } from 'react'
import './App.css'
import { FORMATIONS, YEAR_OPTIONS, buildDraftBoard, calculateDraftScore } from './lib/draft'
import type { Formation } from './lib/draft'
import type { PlayerCard } from './data/players'

const STARTING_COINS = 2500
const STARTER_COUNT = 11
const LINE_GROUPS = [
  { id: 'attack', label: 'Attack' },
  { id: 'midfield', label: 'Midfield' },
  { id: 'defense', label: 'Back line' },
  { id: 'goalkeeper', label: 'Goalkeeper' },
] as const

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function PlayerCardFace({ player, compact = false, captain = false }: { player: PlayerCard; compact?: boolean; captain?: boolean }) {
  return (
    <div className={`player-card-face rarity-${player.rarity}${compact ? ' compact' : ''}`}>
      <div className="card-topline">
        <div className="card-rating">
          <strong>{player.rating}</strong>
          <span>{player.position}</span>
        </div>
        <span className="card-year">{player.year === 17 ? '17' : '26'}</span>
      </div>
      <div className="player-art" aria-hidden="true">
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
        <span className="player-monogram">{initials(player.name)}</span>
        <span className="art-star">✦</span>
      </div>
      <div className="card-details">
        <strong className="card-name">{player.name}</strong>
        <span>{player.club}</span>
      </div>
      <div className="card-footer">
        <span>{player.nation}</span>
        <span>{player.league}</span>
      </div>
      {captain && <span className="captain-ribbon">C</span>}
    </div>
  )
}

function App() {
  const [selectedYear, setSelectedYear] = useState<(typeof YEAR_OPTIONS)[number]>(26)
  const [formation, setFormation] = useState<Formation>('4-3-3')
  const [captainId, setCaptainId] = useState<number | null>(null)
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null)
  const [draftBoard, setDraftBoard] = useState(() => buildDraftBoard(selectedYear, formation))
  const [selectedCards, setSelectedCards] = useState<(PlayerCard | null)[]>(Array(23).fill(null))
  const [coins, setCoins] = useState(STARTING_COINS)
  const [notice, setNotice] = useState('')

  const draftScore = useMemo(
    () => calculateDraftScore(selectedCards.slice(0, STARTER_COUNT).filter(Boolean) as PlayerCard[], captainId),
    [captainId, selectedCards],
  )
  const selectedStarters = selectedCards.slice(0, STARTER_COUNT).filter(Boolean).length
  const selectedTotal = selectedCards.filter(Boolean).length
  const currentOptions = expandedSlot === null ? [] : draftBoard.options[expandedSlot] ?? []
  const captainCandidates = selectedCards.slice(0, STARTER_COUNT).filter((card): card is PlayerCard => card !== null)

  const resetDraft = (year: (typeof YEAR_OPTIONS)[number], nextFormation: Formation) => {
    setDraftBoard(buildDraftBoard(year, nextFormation))
    setSelectedCards(Array(23).fill(null))
    setCaptainId(null)
    setExpandedSlot(null)
    setNotice('Fresh board ready. Build your starting XI.')
  }

  const chooseYear = (year: (typeof YEAR_OPTIONS)[number]) => {
    setSelectedYear(year)
    resetDraft(year, formation)
  }

  const handleFormationChange = (nextFormation: Formation) => {
    setFormation(nextFormation)
    resetDraft(selectedYear, nextFormation)
  }

  const handleCardPick = (slotIndex: number, card: PlayerCard) => {
    if (selectedCards.some((selected, index) => index !== slotIndex && selected?.id === card.id)) return

    setSelectedCards((previous) => {
      const next = [...previous]
      next[slotIndex] = card
      return next
    })
    if (captainId === selectedCards[slotIndex]?.id && selectedCards[slotIndex]?.id !== card.id) setCaptainId(null)
    setExpandedSlot(null)
    setNotice(`${card.name} added to ${draftBoard.slots[slotIndex].label.toLowerCase()}.`)
  }

  const handleSubmit = () => {
    if (selectedStarters < STARTER_COUNT) {
      const firstOpenStarter = selectedCards.slice(0, STARTER_COUNT).findIndex((card) => card === null)
      setExpandedSlot(firstOpenStarter)
      setNotice(`Choose ${STARTER_COUNT - selectedStarters} more starter${STARTER_COUNT - selectedStarters === 1 ? '' : 's'} to submit your squad.`)
      return
    }

    const reward = draftScore.draftScore * 10
    setCoins((previous) => previous + reward)
    setSelectedCards(Array(23).fill(null))
    setCaptainId(null)
    setExpandedSlot(null)
    setNotice(`Squad submitted — ${reward.toLocaleString()} coins earned. Ready for another round?`)
  }

  const renderSlot = (slotIndex: number) => {
    const slot = draftBoard.slots[slotIndex]
    const selectedPlayer = selectedCards[slotIndex]
    const isExpanded = expandedSlot === slotIndex
    const options = isExpanded ? currentOptions : []

    return (
      <article className={`slot-card${isExpanded ? ' is-open' : ''}${selectedPlayer ? ' is-filled' : ''}`} key={`${slot.line}-${slotIndex}`}>
        <button
          type="button"
          className="slot-toggle"
          aria-expanded={isExpanded}
          aria-label={`${slot.label}, ${selectedPlayer ? `selected ${selectedPlayer.name}` : 'empty'}. ${isExpanded ? 'Close' : 'Choose player'}`}
          onClick={() => setExpandedSlot(isExpanded ? null : slotIndex)}
        >
          <span className="slot-pos">{slot.position}</span>
          <span className="slot-copy">
            <strong>{slot.label}</strong>
            <small>{selectedPlayer ? 'Tap to change' : 'Choose a player'}</small>
          </span>
          <span className="slot-chevron" aria-hidden="true">{isExpanded ? '−' : selectedPlayer ? '↗' : '+'}</span>
        </button>
        {selectedPlayer ? (
          <div className="slot-player-preview">
            <PlayerCardFace player={selectedPlayer} compact captain={captainId === selectedPlayer.id} />
          </div>
        ) : (
          <div className="empty-card-art" aria-hidden="true"><span>✦</span></div>
        )}
        {isExpanded && (
          <div className="option-drawer">
            <div className="drawer-heading"><span>Available picks</span><small>{options.length} cards</small></div>
            {options.length ? options.map(({ card }) => {
              const alreadyPicked = selectedCards.some((selected, index) => index !== slotIndex && selected?.id === card.id)
              return (
                <button
                  key={card.id}
                  type="button"
                  className="option-pick"
                  disabled={alreadyPicked}
                  onClick={() => handleCardPick(slotIndex, card)}
                >
                  <PlayerCardFace player={card} compact />
                  <span className="pick-action">{alreadyPicked ? 'Picked' : 'Draft'}</span>
                </button>
              )
            }) : <p className="empty-options">No player options available for this spot.</p>}
          </div>
        )}
      </article>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="FUTPACK draft room home">
          <span className="brand-mark">F</span>
          <span><strong>FUTPACK</strong><small>DRAFT ROOM</small></span>
        </a>
        <div className="topbar-meta"><span className="live-dot" /> OFFLINE DRAFT <span className="meta-divider" /> SEASON {selectedYear}</div>
        <div className="coin-display"><span aria-hidden="true">◈</span> {coins.toLocaleString()} <small>COINS</small></div>
      </header>

      <main id="top" className="workspace">
        <aside className="control-rail">
          <div className="welcome-block">
            <p className="eyebrow">YOUR NEXT XI STARTS HERE</p>
            <h1>Build your<br /><em>dream squad.</em></h1>
            <p className="welcome-copy">Pick your era. Shape your formation. Draft a squad worth remembering.</p>
          </div>

          <section className="control-panel">
            <div className="panel-heading"><span className="step-number">01</span><div><h2>Choose an era</h2><p>Player pool</p></div></div>
            <div className="year-grid" role="group" aria-label="Choose player card era">
              {YEAR_OPTIONS.map((year) => (
                <button key={year} type="button" className={`year-chip${selectedYear === year ? ' active' : ''}`} aria-pressed={selectedYear === year} onClick={() => chooseYear(year)}>
                  <span>FUT</span><strong>{year}</strong>
                </button>
              ))}
            </div>
            <p className="field-hint">Classic legends &amp; current stars</p>
          </section>

          <section className="control-panel formation-panel">
            <label htmlFor="formation-select" className="panel-heading"><span className="step-number">02</span><span><strong>Set your shape</strong><small>Formation</small></span></label>
            <select id="formation-select" value={formation} onChange={(event) => handleFormationChange(event.target.value as Formation)}>
              {FORMATIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </section>

          <section className="captain-panel">
            <div className="captain-heading"><div><p className="eyebrow">LEADERSHIP</p><h2>Choose a captain</h2></div><span className="captain-badge">C</span></div>
            {captainCandidates.length ? (
              <div className="captain-list">
                {captainCandidates.map((player) => (
                  <button key={player.id} type="button" className={`captain-option${captainId === player.id ? ' active' : ''}`} aria-pressed={captainId === player.id} onClick={() => setCaptainId(captainId === player.id ? null : player.id)}>
                    <span className="captain-initials">{initials(player.name)}</span><span className="captain-name">{player.name}<small>{player.position} · {player.club}</small></span><strong>{player.rating}</strong>
                  </button>
                ))}
              </div>
            ) : <p className="captain-empty">Draft a player into your XI to choose your captain.</p>}
            <p className="field-hint">Captain earns a chemistry boost.</p>
          </section>

          <section className="score-panel" aria-label="Squad rating and score">
            <div className="score-topline"><span>SQUAD RATING</span><span className="score-live"><i /> LIVE</span></div>
            <div className="score-number">{String(draftScore.rating).padStart(2, '0')}<span> OVR</span></div>
            <div className="score-stats"><div><span>CHEMISTRY</span><strong>{draftScore.chemistry}<small>/100</small></strong></div><div><span>DRAFT SCORE</span><strong>{draftScore.draftScore}</strong></div></div>
            <div className="progress-track" role="progressbar" aria-label="Starting players selected" aria-valuemin={0} aria-valuemax={STARTER_COUNT} aria-valuenow={selectedStarters}><span style={{ width: `${(selectedStarters / STARTER_COUNT) * 100}%` }} /></div>
            <div className="progress-caption"><span>Starting XI</span><strong>{String(selectedStarters).padStart(2, '0')} / 11</strong></div>
            <button type="button" className="submit-button" onClick={handleSubmit}><span>Submit squad</span><span aria-hidden="true">↗</span></button>
            {notice && <p className="status-message" role="status">{notice}</p>}
          </section>
          <p className="disclaimer">Fan-made draft concept. Not affiliated with or endorsed by EA.</p>
        </aside>

        <section className="draft-area" aria-label="Draft board">
          <div className="board-heading">
            <div><p className="eyebrow">THE TRANSFER ROOM <span className="heading-star">✦</span></p><h2>Assemble your squad<span>.</span></h2><p className="board-subtitle">Every pick changes the game. Make them count.</p></div>
            <div className="board-badges"><span className="formation-badge"><i className="pitch-icon" />{formation}</span><span className="pool-badge">{selectedYear === 17 ? 'CLASSIC POOL' : 'CURRENT POOL'}</span></div>
          </div>

          <div className="pitch-wrap">
            <div className="pitch-title"><span>STARTING XI</span><span className="pitch-instruction">Tap a role to browse picks</span><span>{selectedStarters} / 11 SELECTED</span></div>
            <div className="pitch" aria-label={`${formation} starting lineup`}>
              <div className="pitch-lines" aria-hidden="true"><span className="halfway-line" /><span className="center-circle" /><span className="penalty-box top-box" /><span className="penalty-box bottom-box" /><span className="goal-box top-goal" /><span className="goal-box bottom-goal" /></div>
              {LINE_GROUPS.map((group) => {
                const indices = draftBoard.slots.slice(0, STARTER_COUNT).flatMap((slot, index) => slot.line === group.id ? [index] : [])
                return <div key={group.id} className={`pitch-line line-${group.id}`} aria-label={group.label}>{indices.map(renderSlot)}</div>
              })}
            </div>
          </div>

          <div className="bench-heading"><div><p className="eyebrow">SQUAD DEPTH</p><h3>Bench &amp; reserves</h3></div><span>{selectedTotal - selectedStarters} / 12 PICKS</span></div>
          <div className="bench-grid">{draftBoard.slots.slice(STARTER_COUNT).map((_, index) => renderSlot(index + STARTER_COUNT))}</div>
          <footer className="board-footer"><span>FUTPACK <i>×</i> THE DRAFT ROOM</span><span>UNOFFICIAL FAN CONCEPT · BUILT FOR THE LOVE OF FOOTBALL</span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
