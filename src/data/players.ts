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

export const PLAYER_LIBRARY: PlayerCard[] = [
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
