import * as Backbone from 'backbone';

// Ability model
class Ability extends Backbone.Model {
  // Properties of Abilities model
  url = 'https://dotowiki-service.herokuapp.com/getAbility';

  get key(): string { return super.get("key"); }

  get name(): string { return super.get("name"); }

  get full_name(): string { return super.get("full_name"); }

  get icon_url(): string { return super.get("icon_url"); }

  get portrait_url(): string { return super.get("portrait_url"); }

  get description(): string { return super.get("description"); }

  get affects(): string { return super.get("affects"); }

  get damage(): string { return super.get("damage"); }

  get attribute(): string { return super.get("attribute"); }

  get cooldownAndManacost(): string { return super.get("cooldownAndManacost"); }

  get notes(): string { return super.get("notes"); }

  get lore(): string { return super.get("lore"); }

  defaults(): any {
    return {
      key: "",
      name: "",
      full_name: "",
      icon_url: "",
      portrait_url: "",
      description: "",
      affects: "",
      damage: "",
      attribute: "",
      cooldownAndManacost: "",
      notes: "",
      lore: ""
    }
  }
}

class Abilities extends Backbone.Collection<Backbone.Model> {
  model = Ability;
}

export { Ability };
export { Abilities };
