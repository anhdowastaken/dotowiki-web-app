/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';
import { Heroes } from "./hero.ts"

class HeroView extends Backbone.View<Backbone.Model> {
  tagName = 'li';
}

class HeroesView extends Backbone.View<Backbone.Model> {
  tagName = 'ul';
}

let heroes = new Heroes(); 
