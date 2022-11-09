export class Structure {
    name: string;
    city: string;
    region: string;
    advertiser: string;
    exams: string[];

    constructor(partialStructure: Partial<Structure>) {
        Object.assign(this, partialStructure);
    }


 }

export function fromJson(json: string) {
    return JSON.parse(json);
}