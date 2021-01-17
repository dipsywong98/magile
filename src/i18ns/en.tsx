import { gamenetI18n } from 'gamenet-material'
import { ICard, ICardColor, ICardType, IMode } from '../types'
import { howToPlay } from './howToPlay.en'

export const en = {
  ...gamenetI18n.en,
  gameName: 'Magile',
  howToPlay: 'How To Play',
  howToPlayContent: howToPlay,
  [IMode.HOMO]: 'Homo Transfer',
  [IMode.HETERO]: 'Hetero Transfer',
  [ICardType.MAGE]: 'Mage',
  [ICardType.MISSILE]: 'Missile',
  [ICardType.MAGILE]: 'Magile',
  [ICardType.IGNITE]: 'Ignite',
  [ICardType.ANGEL_GUARD]: 'Angel Guard',
  [ICardColor.NONE]: 'None',
  [ICardColor.EARTH]: 'Earth',
  [ICardColor.WATER]: 'Water',
  [ICardColor.FIRE]: 'Fire',
  [ICardColor.WIND]: 'Wind',
  [ICardColor.THUNDER]: 'Thunder',
  [ICardColor.LIGHT]: 'Light',
  [ICardColor.DARK]: 'Dark',
  [ICard.EARTH_MAGE]: 'Earth Mage',
  [ICard.WATER_MAGE]: 'Water Mage',
  [ICard.FIRE_MAGE]: 'Fire Mage',
  [ICard.WIND_MAGE]: 'Wind Mage',
  [ICard.THUNDER_MAGE]: 'Thunder Mage',
  [ICard.EARTH_MISSILE]: 'Earth Missile',
  [ICard.WATER_MISSILE]: 'Water Missile',
  [ICard.FIRE_MISSILE]: 'Fire Missile',
  [ICard.WIND_MISSILE]: 'Wind Missile',
  [ICard.THUNDER_MISSILE]: 'Thunder Missile',
  [ICard.LIGHT_MAGILE]: 'Light Magile',
  [ICard.DARK_MAGILE]: 'Dark Magile',
  [ICard.HOMO_IGNITE]: 'Homo Ignite',
  [ICard.HETERO_IGNITE]: 'Hetero Ignite',
  [ICard.ANGEL_GUARD]: 'Angel Guard',
  gameOver: 'Game Over',
  duelHint: 'DUEL! NO Function card and each hit will deduct 1 more hp!',
  igniteHint: 'IGNITED! Respond only with same ignited or angel guard!',
  loserIs$player: 'Loser is {{player}}',
  $playerDiscardCardTil$cardCount: '{{player}} discard card til {{cardCount}}',
  $playerInitializingTransfer: '{{player}} initializing transfer',
  $playerRespondTo$modeTransfer: '{{player}} responding to {{mode}}.',
  current$damage: 'Current damage: {{damage}}',
  again: 'Again',
  drawDeck: 'Draw Deck',
  notYourTurn: 'Not Your Turn',
  takeHit: 'Take Hit',
  areYouSureYouWantToTakeHit: 'Are you sure you want to take hit?',
  respond: 'Respond',
  initializeHomoTransfer: 'Initialize Homo Transfer',
  initializeHeteroTransfer: 'Initialize Hetero Transfer',
  trash: 'Trash',
  cannotDraw$playerAlreadyHas$countCards: `cannot draw, {{player}} already has {{count}} cards`,
  $playerDoesNotOwnCard$card: '{{player}} doesnt own card {{card}}',
  playerCardMoreThanHp: 'Player has card more than his hp, please discard',
  cannotMixIgniteAngelWithMagiles: 'cannot mix ignite or angel card with mage, missiles and magiles',
  cannotPlayFunctionDuringDuel: 'cannot play function card during duel',
  canPlayOnly1Or3Cards: 'you can only play 1 card or 3 cards',
  specifyHomoOrHeteroAtFirstTransfer: 'please specify homo transfer or hetero transfer as the first to transfer',
  canOnlyDoHeteroWhenNextIs1hp: 'can only do hetero transfer when next player is 1 hp',
  canOnlyPlay1CardWhenAtFirstTransfer: 'please play one card as the first to transfer',
  canOnlyPlayNonFunctionWhenAtFirstTransfer: 'cannot play function type as the first to transfer',
  canOnlyPlay$colorInThisHomoTransfer: 'cannot play color other than {{color}} in this homo transfer',
  $colorsPlayedAnd$colorsCanPlayInThisHetero$typeTransfer: '{{colorsPlayed}} {{type}} played. You may play {{colorsCanPlay}} {{type2}} in this hetero transfer',
  youMayPlay$typeOnly: 'You may play {{type}} only',
  youMayPlay$typeOrMagileOnly: 'You may play {{type}} or Magile only',
  cannotPlayHomoIgniteDuringHeteroTransfer: 'Cannot Play Homo Ignite during Hetero transfer',
  cannotPlayHeteroIgniteDuringHomoTransfer: 'Cannot Play Hetero Ignite during Homo transfer',
  invalidMove: 'invalidMove',
  shouldDiscard$countCards: 'should discard {{count}} cards',
  transferMode: 'Transfer Mode',
  mmmCount: 'Mage/Missile/Magile count on stage',
  damage: 'Damage',
  damageTableHint: 'After playing first ignite in the transfer, each additional ignite damage+1; during duel damage+1.',
  damageTable: 'Damage Table',
  close: 'close',
  notAbleToRespond: 'Not able to respond',
  hit$playerWith$damage: 'Hit {{player}} causing {{damage}} damage'
}
