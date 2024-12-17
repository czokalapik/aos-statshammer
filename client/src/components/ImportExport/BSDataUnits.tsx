import { Button } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { nanoid } from 'nanoid';
import React from 'react';
import { notificationsStore } from 'store/slices';
import { Faction } from 'types/army';
import { IModifierInstance, IModifierInstanceParameter } from 'types/modifiers';
import { IUnitParameter, IWeaponProfileParameter } from 'types/unit';

interface IBSDataUnitsProps {
  onLoadBSDataUnits: (units: IUnitParameter[], faction: Faction) => void;
}

const BSDataUnits = ({ onLoadBSDataUnits }: IBSDataUnitsProps) => {

  const githubRawPrefix = 'https://raw.githubusercontent.com/BSData/age-of-sigmar-4th/main/';
  const costSuffix = '.cat';
  const librarySuffix = '%20-%20Library.cat';

  const hasChild = (element:Element, tag:string, attribute:string, attributeValue:string):boolean => {
    const match = element.querySelectorAll(tag).entries().filter(entry => entry[1].getAttribute(attribute)===attributeValue).map(entry => entry[1]).toArray();
    return match.length>0;
  }

  const findNode = (element:Element, tag:string, attribute:string, attributeValue:string, unitName:string, logError=true):Element|undefined => {
    const match = element.querySelectorAll(tag).entries().filter(entry => entry[1].getAttribute(attribute)===attributeValue).map(entry => entry[1]).toArray();
    if (match.length === 0){
      if (logError){
        console.log(`Unable to find attribute ${attribute} with value ${attributeValue} for unit ${unitName}`);
      }
      return undefined;
    }
    return match[0];
  }

  const findNodeValue = (element:Element, tag:string, attribute:string, attributeValue:string, unitName:string):string => {
    return findNode(element, tag, attribute, attributeValue, unitName)?.textContent?.trim()||'';
  }

  const readDefaultAmount = (node:Element):number[]|undefined => {
    const defaultAmountString = node.getAttribute('defaultAmount');
    if (!defaultAmountString) {
      return undefined;
    }
    return defaultAmountString.split(',').map(s => Number(s));
  }

  const readUnitFromNode = (element:Element, costs:Map<string,number>):IUnitParameter => {
    const name = element.getAttribute('name')||'';
    const health = Number(findNodeValue(element, 'characteristic', 'name', 'Health', name));
    const save = Number(findNodeValue(element, 'characteristic', 'name', 'Save', name).replace('+',''));
    const modelNode = findNode(element, 'selectionEntry', 'type', 'model', name, false)||findNode(element, 'selectionEntry', 'name', name, name, true)||element;
    const modelDefaultAmounts = readDefaultAmount(modelNode);

    const constraintsNode = element.querySelectorAll('selectionEntry[type="model"]>constraints')[0];
    const modelMinCount = Number(findNode(constraintsNode||modelNode, 'constraint', 'type', 'min', name)?.getAttribute('value'));
    const models = modelDefaultAmounts? modelDefaultAmounts.reduce((a,b)=>a+b):modelMinCount;
    const points = costs.get(name)||100;
    const modifiers:IModifierInstanceParameter[] = [];
    const champion = element.querySelectorAll('categoryLink[name="CHAMPION"]').length>0;
    const ward = element.querySelectorAll('categoryLink[name^="WARD"]');
    if (ward.length>0){
      const wardOn = Number(ward[0].getAttribute('name')?.replace('WARD (','').replace('+)',''));
      modifiers.push({id:"TARGET_FNP",active:true,options:{on:wardOn}});
    }

    // Ethreal for Nighthaunt and a list of hardcoded units...
    const ethrealUnits = ['Be\'lakor','Jade Obelisk','The Light of Eltharion']
    const ethereal = element.querySelectorAll('categoryLink[name="NIGHTHAUNT"]').length>0||ethrealUnits.findIndex(u=> u===name)>=0;
    if (ethereal){
      modifiers.push({id:"TARGET_ETHEREAL",active:true, options:{}});
    }

    const elementToWeapon = (selectionEntry:Element):IWeaponProfileParameter|undefined => {
      const profile = selectionEntry.querySelectorAll('profile')[0];
      if (!profile) {
        // console.log(`no profile found for unit ${name} with entry ${selectionEntry.getAttribute('name')}`);
        return undefined;
      }
      let weaponName = profile.getAttribute('name')||'Unknown weapon';
      let active = true;

      const typeName = profile.getAttribute('typeName');
      if (typeName!=='Melee Weapon' && typeName!=='Ranged Weapon') {
        // console.log(`Unkown weapon type ${typeName} for unit ${name} profile ${weaponName}`);
        return undefined;
      }
      if (typeName==='Ranged Weapon'){
        weaponName+=' (ranged)';
      }
      const weaponDefaultAmounts = readDefaultAmount(selectionEntry);

      const computeModels = (unitModels:number[]|undefined, weaponModels:number[]|undefined):number => {
        if (!unitModels || !weaponModels) {
          return models;
        }
        if (unitModels.length!==weaponModels.length){
          if (unitModels.length<weaponModels.length){
            console.log(`Double check weapon profile ${weaponName} on unit ${name} that has more default values`);
          }
          return unitModels.reduce((a,b)=>a+b);
        }
        return unitModels.map((v,i)=>v*weaponModels[i]).reduce((a,b)=>a+b);
      }

      const num_models=computeModels(modelDefaultAmounts,weaponDefaultAmounts);
      const attacks=findNodeValue(profile, 'characteristic', 'name', 'Atk', weaponName);
      const to_hit=Number(findNodeValue(profile, 'characteristic', 'name', 'Hit', weaponName).replace('+',''));
      const to_wound=Number(findNodeValue(profile, 'characteristic', 'name', 'Wnd', weaponName).replace('+',''));
      const rend=Number(findNodeValue(profile, 'characteristic', 'name', 'Rnd', weaponName));
      const damage=findNodeValue(profile, 'characteristic', 'name', 'Dmg', weaponName);
      const ability=findNodeValue(profile, 'characteristic', 'name', 'Ability', weaponName);

      const modifiers:IModifierInstance[] = [];

      if (champion && !ability.includes('Companion')){
        modifiers.push({id:"LEADER_BONUS", active:true, uuid:nanoid(),options:{characteristic:"attacks",bonus:1,numLeaders:1}});
      }
      if (ability.includes('Crit (Mortal)')){
        modifiers.push({id:"MORTAL_WOUNDS",active:true, uuid:nanoid(),options:{characteristic:"to_hit",on:6,mortalWounds:damage,unmodified:true,inAddition:false}});
      }
      if (ability.includes('Crit (Auto-wound)')){
        modifiers.push({id:"AUTO_WOUND",active:true, uuid:nanoid(),options:{characteristic:"to_hit",on:6,unmodified:true}});
      }
      if (ability.includes('Crit (2 Hits)')){
        modifiers.push({id:"EXPLODING",active:true, uuid:nanoid(),options:{characteristic:"to_hit",on:6,extraHits:1,unmodified:true}});
      }

      if (isNaN(to_wound)){
        active = false;
        weaponName+=' (check rules)';
      }

      return {
        name:weaponName,
        active,
        num_models,
        attacks,
        to_hit,
        to_wound,
        rend,
        damage,
        modifiers,
      };
    }

    const weapon_profiles = modelNode.querySelectorAll('selectionEntry[type="upgrade"]').values().map(e => elementToWeapon(e)).filter(w => w!==undefined).toArray();

    return {
      name,
      active: false,
      reinforced: false,
      points,
      health,
      models,
      save,
      attacksModifier: 0,
      modifiers,
      weapon_profiles,
    }
  }

  const onClick = () => {
    Object.keys(Faction).filter(f => isNaN(Number(f)) && f!=='List')
    .forEach(faction => {
      const pathName = Faction[faction].replace(' ','%20');
      const libraryUrl = githubRawPrefix+pathName+librarySuffix;
      const costUrl = githubRawPrefix+pathName+costSuffix;
      const readXmlFileFromUrl = (url:string, callBack:(doc:Document)=>void) => {
        try {
          fetch(url).then(response => response.text().then(xml => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "application/xml");
            callBack(doc);
        }))
        } catch (exception){
          notificationsStore.actions.addNotification({
            message:
              `Sorry, an error occured while loading faction ${faction}`,
            variant: 'error',
          })
        }
      };
      const readUnits = (doc:Document, costs) => {
        const units = doc.querySelectorAll('selectionEntry').entries()
        .filter(entry => entry[1].getAttribute('type')==='unit')
        .filter(entry => !hasChild(entry[1], 'categoryLink', 'name', 'FACTION TERRAIN')&&!hasChild(entry[1], 'categoryLink', 'name', 'MANIFESTATION')&&!hasChild(entry[1], 'categoryLink', 'name', 'ENDLESS SPELL'))
        .map(entry => readUnitFromNode(entry[1], costs)).toArray();
        onLoadBSDataUnits(units, Faction[faction]);
      };
      const readCosts = (doc:Document) => {
        const costs:Map<string, number> = new Map<string, number>();
        doc.querySelectorAll('entryLink').values()
          .filter(entry => entry.querySelectorAll('cost').length>0)
          .forEach(entry => costs.set(entry.getAttribute('name')||'', Number(entry.querySelectorAll('cost')[0].getAttribute('value'))));
        readXmlFileFromUrl(libraryUrl, libraryDoc => readUnits(libraryDoc, costs))
      };
      readXmlFileFromUrl(costUrl, readCosts);
    });
  }

  return (
    <div><Button
    variant="contained"
    startIcon={<ImportExport />}
    color="primary"
    component="span"
    onClick={onClick}
  >
    Load factions from BS Data
  </Button></div>
  );
};

export default BSDataUnits;
