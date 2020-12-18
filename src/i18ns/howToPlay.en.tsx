import React from 'react'
import { DamageTable } from '../DamageTable'

export const howToPlay = (
  <div>
    <h1>Magile</h1>
    <h2>Story</h2>
    <p>
      In a magical kingdom, there were some wizards. They always research a weapon called "Mage", a very powerful magic.
    </p>
    <p>
      One day they met some engineers who were fans of ancient technologies. The engineers mixed ancient technologies
      with modern magic, and created a new weapon called "Missile", challenged the cute wizards.
    </p>
    <p>
      A battle between Mages and Missiles starts now!
    </p>
    <h2>Cards</h2>
    <h4>Basic cards:</h4>
    <ul>
      <li>Mages*45: Earth, Water, Fire, Wind, Thunder each *9</li>
      <li>Missile*45: Earth, Water, Fire, Wind, Thunder each *9</li>
    </ul>
    <h4>Function cards:</h4>
    <ul>
      <li>Magiles*6: Light, Dark each *3</li>
      <li>Ignite*6: Homo, Hetero each *3</li>
      <li>Angel Guard*6</li>
    </ul>
    <h2>How To Play</h2>
    <ol>
      <li>Choose first player randomly to initiate a transfer</li>
      <li>Initiate transfer: choose one missile or mage and decide whether is it a homo transfer or hetero transfer</li>
      <li>
        <div>Next player respond to the transfer</div>
        <ul>
          <li>if it is a homo transfer, you can either
            <ul>
              <li>play 1/3 mage/missile of same color</li>
              <li>or play a homo ignite</li>
            </ul>
          </li>
          <li>if it is a hetero transfer, you can either
            <ul>
              <li>play 1/3 mage/missle/magile of color that were not played
                yet, and same type as the first card(mage/missile), where magile is both a mage and a missile
              </li>
              <li>or play a hetero ignite</li>
            </ul>
          </li>
          <li>If someone played an ignite at this transfer, you can only respond with same ignite or angel guard, each additional ignite +1 damage (that is first ignite dont have damage)</li>
          <li>respond with an angel guard</li>
          <li>give up respond and take damage</li>
        </ul>
      </li>
      <li>After playing card, draw cards until number of cards = hp</li>
      <li>
        If cannot respond will be damaged. The amount refer to the damage table. Discard until number of cards = hp.
        Same player initiate a new transfer
      </li>
      <li>If anyone hp {'<='} 3, game will enter duel mode. During duel mode all damage +1 and function card stop working (cannot respond with magile/ignite/angel guard). Effective to all players</li>
      <li>If anyone hp {'<='} 0, game end and he is the only loser, the rest win</li>
    </ol>
    <h2>Damage Table</h2>
    <DamageTable/>
    <p>After playing first ignite in the transfer, each additional ignite damage+1; during duel damage+1.</p>
  </div>
)
