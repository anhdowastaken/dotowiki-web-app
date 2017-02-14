/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';

// Ability model
class Ability extends Backbone.Model {
  // Properties of Abilities model
  private ability_id: string;
  private key: string;
  private name: string;
  private full_name: string;
  private icon_url: string;
  private portrait_url: string;
  private description: string;
  private affects: string;
  private damage: string;
  private attribute: string;
  private cooldownAndManacost: string;
  private notes: string;
  private lore: string;

  constructor(jsonData?: any) {
    super();
    jsonData.id ? this.ability_id = jsonData.id : this.ability_id = "";
    jsonData.key ? this.key = jsonData.key : this.key = "";
    jsonData.name ? this.name = jsonData.name : this.name = "";
    jsonData.full_name ? this.full_name = jsonData.full_name : this.full_name = "";
    jsonData.icon_url ? this.icon_url = jsonData.icon_url : this.icon_url = "";
    jsonData.portrait_url ? this.portrait_url = jsonData.portrait_url : this.portrait_url = "";
    jsonData.description ? this.description = jsonData.description : this.description = "";
    jsonData.affects ? this.affects = jsonData.affects : this.affects = "";
    jsonData.damage ? this.damage = jsonData.damage : this.damage = "";
    jsonData.attribute ? this.attribute = jsonData.attribute : this.attribute = "";
    jsonData.cooldownAndManacost ? this.cooldownAndManacost = jsonData.cooldownAndManacost : this.cooldownAndManacost = "";
    jsonData.notes ? this.notes = jsonData.notes : this.notes = "";
    jsonData.lore ? this.lore = jsonData.lore : this.lore = "";
  }
}

class Abilities extends Backbone.Collection<Backbone.Model> {
  // Reference to Ability model
  model = Ability;
}

// Hero model
class Hero extends Backbone.Model {
  constructor(jsonData?: any) {
    super();
    jsonData.name ? this.name = jsonData.name : this.name = "";
    jsonData.short_name ? this.short_name = jsonData.short_name : this.short_name = "";
    jsonData.localized_name ? this.localized_name = jsonData.localized_name : this.localized_name = "";
    //
    // // Image
    // this.icon_url = "";
    // this.portrait_url = "";
    // this.small_horizontal_portrait = "";
    // this.large_horizontal_portrait = "";
    // this.full_quality_horizontal_portrait = "";
    // this.full_quality_vertical_portrait = "";
    //
    // // Stat
    // this.armorPhysical = -1;
    // this.magicalResistance = 25;
    // this.attackDamageMin = 1;
    // this.attackDamageMax = 1;
    // this.attackRate = 1.7;
    // this.attackAnimationPoint = 0.75;
    // this.attackAcquisitionRange = 800;
    // this.attackRange = 600;
    // this.attributePrimary = "DOTA_ATTRIBUTE_STRENGTH";
    // this.attributeBaseStrength = 0;
    // this.attributeStrengthGain = 0;
    // this.attributeBaseIntelligence = 0;
    // this.attributeIntelligenceGain = 0;
    // this.attributeBaseAgility = 0;
    // this.attributeAgilityGain = 0;
    // this.movementSpeed = 300;
    // this.movementTurnRate = 0.500000;
    // this.statusHealth = 200;
    // this.statusHealthRegen = 0.250000;
    // this.statusMana = 50;
    // this.statusManaRegen = 0.010000;
    // this.visionDaytimeRange = 1800;
    // this.visionNighttimeRange = 800;
    //
    // Abilities
    this.abilities = new Abilities();
    if (jsonData.abilities && jsonData.abilities.length > 0) {
      this.abilities.reset(jsonData.abilities);
    }
    //
    // // Others
    // this.role = "";
    // this.team = "Good";
    // this.legs = 2;
    // this.lore = "";
  }

  set name(value: string) {
    super.set('name', value);
  }

  get name(): string {
    return super.get('name');
  }

  set short_name(value: string) {
    super.set('short_name', value);
  }

  get short_name(): string {
    return super.get('short_name');
  }

  set localized_name(value: string) {
    super.set('localized_name', value);
  }

  get localized_name(): string {
    return super.get('localized_name');
  }

  set abilities(value: Abilities) {
    super.set('abilities', value);
  }

  get abilities(): Abilities {
    return super.get('abilities');
  }
}

class Heroes extends Backbone.Collection<Backbone.Model> {
  model = Hero;
  url = 'https://dotowiki-service.herokuapp.com/heroes';

  constructor() {
    super();
    super.fetch({
      success: function(collection, response, options) {
        console.log(collection.models[0]);
        // console.log(response);
        // console.log(options);
      }
    });
  }
}

class HeroView extends Backbone.View<Backbone.Model> {
  tagName = 'li';
}

class HeroesView extends Backbone.View<Backbone.Model> {
  tagName = 'ul';
}

let heroes = new Heroes(); 
