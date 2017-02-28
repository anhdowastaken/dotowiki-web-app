import * as Backbone from 'backbone';
import { Ability } from "./ability.ts";
import { Abilities } from "./ability.ts";

// Hero model
class Hero extends Backbone.Model {
  // Name of property should be similar to data got from server
  url = 'https://dotowiki-service.herokuapp.com/getHero';

  // If don't want to grant permission to change property, don't define setter
  get name(): string { return super.get('name'); }

  get short_name(): string { return super.get('short_name'); }

  get localized_name(): string { return super.get('localized_name'); }

  get icon_url(): string { return super.get("icon_url"); }

  get portrait_url(): string { return super.get("portrait_url"); }

  get armorPhysical(): number { return super.get("armorPhysical"); }

  get magicalResistance(): number { return super.get("magicalResistance"); }

  get attackDamageMin(): number { return super.get("attackDamageMin"); }

  get attackDamageMax(): number { return super.get("attackDamageMax"); }

  get attackRate(): number { return super.get("attackRate"); }

  get attackAnimationPoint(): number { return super.get("attackAnimationPoint"); }

  get attackAcquisitionRange(): number { return super.get("attackAcquisitionRange"); }

  get attackRange(): number { return super.get("attackRange"); }

  get attributePrimary(): string { return super.get("attributePrimary"); }

  get attributeBaseStrength(): number { return super.get("attributeBaseStrength"); }

  get attributeStrengthGain(): number { return super.get("attributeStrengthGain"); }

  get attributeBaseAgility(): number { return super.get("attributeBaseAgility"); }

  get attributeAgilityGain(): number { return super.get("attributeAgilityGain"); }

  get attributeBaseIntelligence(): number { return super.get("attributeBaseIntelligence"); }

  get attributeIntelligenceGain(): number { return super.get("attributeIntelligenceGain"); }

  get movementSpeed(): number { return super.get("movementSpeed"); }

  get movementTurnRate(): number { return super.get("movementTurnRate"); }

  get statusHealth(): number { return super.get("statusHealth"); }

  get statusHealthRegen(): number { return super.get("statusHealthRegen"); }

  get statusMana(): number { return super.get("statusMana"); }

  get statusManaRegen(): number { return super.get("statusManaRegen"); }

  get visionDaytimeRange(): number { return super.get("visionDaytimeRange"); }

  get visionNighttimeRange(): number { return super.get("visionNighttimeRange"); }

  get role(): string { return super.get("role"); }

  get team(): string { return super.get("team"); }

  get legs(): number { return super.get("legs"); }

  get lore(): string { return super.get("lore"); }

  // Nested model/collection seems not work with setter and getter
  // Override parse(...) method to configure by yourself
  private abilities: Abilities;
  getAbilities(): Abilities {
    return this.abilities;
  }

  // If there is any undefined property, its value will be taken
  // from defaults() method
  defaults(): any {
    return {
      name: "",
      short_name: "",
      localized_name: "",
      icon_url: "",
      portrait_url: "",

      armorPhysical: -1,
      magicalResistance: 25,
      attackDamageMin: 1,
      attackDamageMax: 1,
      attackRate: 1.7,
      attackAnimationPoint: 0.75,
      attackAcquisitionRange: 800,
      attackRange: 600,
      attributePrimary: "DOTA_ATTRIBUTE_STRENGTH",
      attributeBaseStrength: 0,
      attributeStrengthGain: 0,
      attributeBaseIntelligence: 0,
      attributeIntelligenceGain: 0,
      attributeBaseAgility: 0,
      attributeAgilityGain: 0,
      movementSpeed: 300,
      movementTurnRate: 0.500000,
      statusHealth: 200,
      statusHealthRegen: 0.250000,
      statusMana: 50,
      statusManaRegen: 0.010000,
      visionDaytimeRange: 1800,
      visionNighttimeRange: 800,

      abilities: new Abilities(),

      // Others
      role: "",
      team: "Good",
      legs: 2,
      lore: ""
    }
  }

  parse(response: any, options?: any): any {
    this.abilities = new Abilities();
    // Resolve nested model/collection
    if (response.abilities && response.abilities.length > 0) {
      this.abilities.reset(response.abilities);
    }
    return response;
  }
}

class Heroes extends Backbone.Collection<Backbone.Model> {
  model = Hero;
  url = 'https://dotowiki-service.herokuapp.com/getHeroList';
}

export { Hero };
export { Heroes };
