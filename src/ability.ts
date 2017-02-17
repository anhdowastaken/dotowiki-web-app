/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';

// Ability model
class Ability extends Backbone.Model {
  // Properties of Abilities model
  set ability_id(value: string) { super.set("ability_id", value); } 
  get ability_id(): string { return super.get("ability_id"); }

  set key(value: string) { super.set("key", value); }
  get key(): string { return super.get("key"); }

  set name(value: string) { super.set("name", value); }
  get name(): string { return super.get("name"); }

  set full_name(value: string) { super.set("full_name", value); }
  get full_name(): string { return super.get("full_name"); }

  set icon_url(value: string) { super.set("icon_url", value); }
  get icon_url(): string { return super.get("icon_url"); }

  set portrait_url(value: string) { super.set("portrait_url", value); }
  get portrait_url(): string { return super.get("portrait_url"); }

  set description(value: string) { super.set("description", value); }
  get description(): string { return super.get("description"); }

  set affects(value: string) { super.set("affects", value); }
  get affects(): string { return super.get("affects"); }

  set damage(value: string) { super.set("damage", value); }
  get damage(): string { return super.get("damage"); }

  set attribute(value: string) { super.set("attribute", value); }
  get attribute(): string { return super.get("attribute"); }

  set cooldownAndManacost(value: string) { super.set("cooldownAndManacost", value); }
  get cooldownAndManacost(): string { return super.get("cooldownAndManacost"); }

  set notes(value: string) { super.set("notes", value); }
  get notes(): string { return super.get("notes"); }

  set lore(value: string) { super.set("lore", value); }
  get lore(): string { return super.get("lore"); }

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
  model = Ability;
}

export { Ability };
export { Abilities };
