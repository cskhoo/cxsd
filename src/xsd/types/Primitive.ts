// This file is part of fast-xml, copyright (c) 2015 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {Base} from './Base';
import {State} from '../State';
import {QName} from '../QName';

export class TypeBase extends Base {
	init(state: State) {
		this.define(state, 'type');
		this.scope.setType(this);
		this.surrogateKey = TypeBase.nextKey++;
	}

	id: string = null;
	name: string = null;

	// Internally used members
	parent: TypeBase | QName;
	surrogateKey: number;
	private static nextKey = 0;
}

export class Primitive extends TypeBase {
	constructor(name: string) {
		super(null);

		this.name = name;
	}

	static getTypes() {
		var tbl = this.typeTbl;

		if(!tbl) {
			tbl = {};

			var spec = [
				['boolean', 'boolean'],
				['date dateTime duration time', 'number'],
				['anyURI language NCName NMTOKEN NMTOKENS normalizedString QName string token', 'string'],
				['byte decimal double float int integer long negativeInteger nonNegativeInteger nonPositiveInteger positiveInteger short unsignedLong unsignedInt unsignedShort unsignedByte', 'number']
			];

			for(var typeSpec of spec) {
				var prim = new Primitive(typeSpec[1]);

				for(var name of typeSpec[0].split(' ')) {
					tbl[name.toLowerCase()] = prim;
				}
			}

			this.typeTbl = tbl;
		}

		return(tbl);
	}

	static typeTbl: {[name: string]: Primitive};
}
