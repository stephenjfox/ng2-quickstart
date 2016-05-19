import { Injectable } from '@angular/core'

import { Hero } from './hero'
import { HEROES } from './mock-heroes'

@Injectable()
export class HeroService {

  getHero(id: number) {
    // couldn't we filter beforehand, with something like:
    /*
    return Promise.resolve(HEROES.filter(hero => hero.id === id))
    */
    // but that would be coupled to our mock... I see what you did there, Google
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    )
  }

  getHeroes() {
    // get 'em
    return Promise.resolve(HEROES)
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 2000) // 2 seconds delay
    )
  }
}
