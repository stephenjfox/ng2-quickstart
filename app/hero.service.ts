import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';


import { Hero } from './hero'
import { InMemoryDataService } from './in-memory-data.service';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';  // URL to web API

  constructor(private http: Http) { }

  getHero(id: number) {
    // return Promise.resolve(HEROES).then(
    //   heroes => heroes.filter(hero => hero.id === id)[0]
    // )
    return this.getHeroes().then(heroes => heroes
                           .filter(hero => hero.id === id)[0])
  }

  getHeroes() : Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError)
  }

  // We'll figure it out. No worries :)
  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  // drop it like it's HeroesComponent
  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }


  handleError(error: any) {
    console.error('There was an error:', error)
    return Promise.reject(error.message || error)
  }
}
