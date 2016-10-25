import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  // simulates a delay of 2 seconds
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(
      heroes => heroes.find(hero => hero.id === id)
    );
  }
}