/// <reference path="../node_modules/@types/backbone/index.d.ts" />
import * as Backbone from 'backbone';
import { Abilities } from "./ability.ts";

// Hero model
class Hero extends Backbone.Model {
  set name(value: string) { super.set('name', value); }
  get name(): string { return super.get('name'); }

  set short_name(value: string) { super.set('short_name', value); }
  get short_name(): string { return super.get('short_name'); }

  set localized_name(value: string) { super.set('localized_name', value); }
  get localized_name(): string { return super.get('localized_name'); }

  set abilities(value: Abilities) { super.set('abilities', value); }
  get abilities(): Abilities { return super.get('abilities'); }

  set icon_url(value: string) { super.set("icon_url", value); }
  get icon_url(): string { return super.get("icon_url"); }

  set portrait_url(value: string) { super.set("portrait_url", value); }
  get portrait_url(): string { return super.get("portrait_url"); }

  set armorPhysical(value: number) { super.set("armorPhysical", value); }
  get armorPhysical(): number { return super.get("armorPhysical"); }

  set magicalResistance(value: number) { super.set("magicalResistance", value); }
  get magicalResistance(): number { return super.get("magicalResistance"); }

  set attackDamageMin(value: number) { super.set("attackDamageMin", value); }
  get attackDamageMin(): number { return super.get("attackDamageMin"); }

  set attackDamageMax(value: number) { super.set("attackDamageMax", value); }
  get attackDamageMax(): number { return super.get("attackDamageMax"); }

  set attackRate(value: number) { super.set("attackRate", value); }
  get attackRate(): number { return super.get("attackRate"); }

  set attackAnimationPoint(value: number) { super.set("attackAnimationPoint", value); }
  get attackAnimationPoint(): number { return super.get("attackAnimationPoint"); }

  set attackAcquisitionRange(value: number) { super.set("attackAcquisitionRange", value); }
  get attackAcquisitionRange(): number { return super.get("attackAcquisitionRange"); }

  set attackRange(value: number) { super.set("attackRange", value); }
  get attackRange(): number { return super.get("attackRange"); }

  set attributePrimary(value: string) { super.set("attributePrimary", value); }
  get attributePrimary(): string { return super.get("attributePrimary"); }

  set attributeBaseStrength(value: number) { super.set("attributeBaseStrength", value); }
  get attributeBaseStrength(): number { return super.get("attributeBaseStrength"); }

  set attributeStrengthGain(value: number) { super.set("attributeStrengthGain", value); }
  get attributeStrengthGain(): number { return super.get("attributeStrengthGain"); }

  set attributeBaseAgility(value: number) { super.set("attributeBaseAgility", value); }
  get attributeBaseAgility(): number { return super.get("attributeBaseAgility"); }

  set attributeAgilityGain(value: number) { super.set("attributeAgilityGain", value); }
  get attributeAgilityGain(): number { return super.get("attributeAgilityGain"); }

  set attributeBaseIntelligence(value: number) { super.set("attributeBaseIntelligence", value); }
  get attributeBaseIntelligence(): number { return super.get("attributeBaseIntelligence"); }

  set attributeIntelligenceGain(value: number) { super.set("attributeIntelligenceGain", value); }
  get attributeIntelligenceGain(): number { return super.get("attributeIntelligenceGain"); }

  set movementSpeed(value: number) { super.set("movementSpeed", value); }
  get movementSpeed(): number { return super.get("movementSpeed"); }

  set movementTurnRate(value: number) { super.set("movementSpeed", value); }
  get movementTurnRate(): number { return super.get("movementTurnRate"); }

  set statusHealth(value: number) { super.set("statusHealth", value); }
  get statusHealth(): number { return super.get("statusHealth"); }

  set statusHealthRegen(value: number) { super.set("statusHealthRegen", value); }
  get statusHealthRegen(): number { return super.get("statusHealthRegen"); }

  set statusMana(value: number) { super.set("statusMana", value); }
  get statusMana(): number { return super.get("statusMana"); }

  set statusManaRegen(value: number) { super.set("statusManaRegen", value); }
  get statusManaRegen(): number { return super.get("statusManaRegen"); }

  set visionDaytimeRange(value: number) { super.set("visionDaytimeRange", value); }
  get visionDaytimeRange(): number { return super.get("visionDaytimeRange"); }

  set visionNighttimeRange(value: number) { super.set("visionNighttimeRange", value); }
  get visionNighttimeRange(): number { return super.get("visionNighttimeRange"); }

  set role(value: string) { super.set("role", value); }
  get role(): string { return super.get("role"); }

  set team(value: string) { super.set("team", value); }
  get team(): string { return super.get("team"); }

  set legs(value: number) { super.set("legs", value); }
  get legs(): number { return super.get("legs"); }

  set lore(value: string) { super.set("lore", value); }
  get lore(): string { return super.get("lore"); }

  constructor(jsonData?: any) {
    super();
    jsonData.name ? this.name = jsonData.name : this.name = "";
    jsonData.short_name ? this.short_name = jsonData.short_name : this.short_name = "";
    jsonData.localized_name ? this.localized_name = jsonData.localized_name : this.localized_name = "";
    jsonData.icon_url ? this.icon_url = jsonData.icon_url : this.icon_url = "";
    jsonData.portrait_url ? this.portrait_url = jsonData.portrait_url : this.portrait_url = "";

    jsonData.armorPhysical ? this.armorPhysical = jsonData.armorPhysical : this.armorPhysical = -1;
    jsonData.magicalResistance ? this.magicalResistance = jsonData.magicalResistance : this.magicalResistance = 25;
    jsonData.attackDamageMin ? this.attackDamageMin = jsonData.attackDamageMin : this.attackDamageMin = 1;
    jsonData.attackDamageMax ? this.attackDamageMax = jsonData.attackDamageMax : this.attackDamageMax = 1;
    jsonData.attackRate ? this.attackRate = jsonData.attackRate : this.attackRate = 1.7;
    jsonData.attackAnimationPoint ? this.attackAnimationPoint = jsonData.attackAnimationPoint : this.attackAnimationPoint = 0.75;
    jsonData.attackAcquisitionRange ? this.attackAcquisitionRange = jsonData.attackAcquisitionRange : this.attackAcquisitionRange = 800;
    jsonData.attackRange ? this.attackRange = jsonData.attackRange : this.attackRange = 600;
    jsonData.attributePrimary ? this.attributePrimary = jsonData.attributePrimary : this.attributePrimary = "DOTA_ATTRIBUTE_STRENGTH";
    jsonData.attributeBaseStrength ? this.attributeBaseStrength = jsonData.attributeBaseStrength : this.attributeBaseStrength = 0;
    jsonData.attributeStrengthGain ? this.attributeStrengthGain = jsonData.attributeStrengthGain : this.attributeStrengthGain = 0;
    jsonData.attributeBaseIntelligence ? this.attributeBaseIntelligence = jsonData.attributeBaseIntelligence : this.attributeBaseIntelligence = 0;
    jsonData.attributeIntelligenceGain ? this.attributeIntelligenceGain = jsonData.attributeIntelligenceGain : this.attributeIntelligenceGain = 0;
    jsonData.attributeBaseAgility ? this.attributeBaseAgility = jsonData.attributeBaseAgility : this.attributeBaseAgility = 0;
    jsonData.attributeAgilityGain ? this.attributeAgilityGain = jsonData.attributeAgilityGain : this.attributeAgilityGain = 0;
    jsonData.movementSpeed ? this.movementSpeed = jsonData.movementSpeed : this.movementSpeed = 300;
    jsonData.movementTurnRate ? this.movementTurnRate = jsonData.movementTurnRate : this.movementTurnRate = 0.500000;
    jsonData.statusHealth ? this.statusHealth = jsonData.statusHeal : this.statusHealth = 200;
    jsonData.statusHealthRegen ? this.statusHealthRegen = jsonData.statusHealthRegen : this.statusHealthRegen = 0.250000;
    jsonData.statusMana ? this.statusMana = jsonData.statusMana : this.statusMana = 50;
    jsonData.statusManaRegen ? this.statusManaRegen = jsonData.statusManaRegen : this.statusManaRegen = 0.010000;
    jsonData.visionDaytimeRange ? this.visionDaytimeRange = jsonData.visionDaytimeRange : this.visionDaytimeRange = 1800;
    jsonData.visionNighttimeRange ? this.visionNighttimeRange = jsonData.visionNighttimeRange : this.visionNighttimeRange = 800;

    // Abilities
    this.abilities = new Abilities();
    if (jsonData.abilities && jsonData.abilities.length > 0) {
      this.abilities.reset(jsonData.abilities);
    }

    // Others
    jsonData.role ? this.role = jsonData.role : this.role = "";
    jsonData.team ? this.team = jsonData.team : this.team = "Good";
    jsonData.legs ? this.legs = jsonData.legs : this.legs = 2;
    jsonData.lore ? this.lore = jsonData.lore : this.lore = "";
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

export default { Hero };
export { Heroes };
