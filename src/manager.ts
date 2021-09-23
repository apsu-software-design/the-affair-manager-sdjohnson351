/* Stephen Johnson
 * CSCI 4602-12
 * Assigment 2: Affair Manager
 * 9/23/2021
 * 
 * Classes and functions used to interact with the UI created by Dr. James Church for an Affair Manager
 */

//Class that represents any affair (event) being put on by an organization
//Affairs have names, locations (zip codes), times, and a list of members putting on the event
class Affair{
    private name: string;
    private locale: number;
    private time: string;
    private members: Member[];

    constructor(name: string, locale: number, time: string){
        this.name = name;
        this.locale = locale;
        this.time = time;
        this.members = [];
    }

    getName(): string {
        return this.name;
    }
    setName(name: string){
        this.name = name;
    }

    getLocale(): number {
        return this.locale;
    }
    setLocale(locale: number){
        this.locale = locale;
    }

    getTime(): string {
        return this.time;
    }
    setTime(time: string){
        this.time = time;
    }

    getMembers(): Member[]{
        return this.members;
    }

    addMember(member: Member){
        if(checkDoubles(member.getName(), this.members)){
            console.log("This member is already part of this affair.");
        } else { this.members.push(member); }
    }

    removeMember(member: Member){
        if(checkDoubles(member.getName(), this.members)){
            let index = this.members.indexOf(member);
            delete this.members[index];
        }else{
            console.log("This member is not part of this affair.");
        }
    }
}

//Class that represents any individual member within the system
//Each Member has a name and email address
class Member {
    private name: string;
    private email: string;

    constructor(name: string, email: string){
        this.name = name;
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }
    
}

//Class that represents an Organization
//It has a name and an array of type Affair that holds all the affairs being put on by the organization
class Org {
    private name: string;
    private affairs: Affair[];

    constructor(name: string){
        this.name = name;
        this.affairs = [];
    }

    addAffair(affair: Affair){
        this.affairs.push(affair);
    }

    getName(): string {
        return this.name;
    }
}

//Affair Manager class that is used to implement all the major functions of the program
//Has arrays of Member, Affair, and Org type
class AffairManager {
    private members: Member[]; // = new Array();
    private affairs: Affair[]; // = new Array();
    private orgs: Org[]; // = new Array();

    constructor(){
        this.members = [];
        this.affairs = [];
        this.orgs = [];
    }

    addMember(memName: string, email: string){
        if(checkDoubles(memName, this.members)){
            console.log("This member is already part of the Affair Manager.");
        }else { this.members.push(new Member(memName, email)); }
    }

    addAffair(affairName: string, locale: number, date: string){
        if(checkDoubles(affairName, this.affairs)){
            console.log("This affair is already part of the Affair Manager.");
        }else { this.affairs.push(new Affair(affairName, locale, date)); }   
    }

    addOrganization(orgName: string){
        if(checkDoubles(orgName, this.orgs)){
            console.log("This organization is already part of the Affair Manager.");
        }else { this.orgs.push(new Org(orgName)); }   
    }

    addMemberToAffair(memName: string, affairName: string){
        if(checkDoubles(memName, this.members) && checkDoubles(affairName, this.affairs)){
            findElement(affairName, this.affairs).addMember(findElement(memName, this.members));
        }else{ 
            console.log("This member or affair does not yet exist in the Affair Manager.");
        }
    }

    findMemberNames(memName: string): string | undefined{
        if(checkDoubles(memName, this.members)){
            return findElement(memName, this.members).getName();
        } else{
            return undefined;
        }
    }

    findAffairNames(affairName: string): string | undefined{
        if(checkDoubles(affairName, this.affairs)){
            return findElement(affairName, this.affairs).getName();
        } else{
            return undefined;
        }
    }

    findOrganizationNames(orgName: string): string | undefined{
        if(checkDoubles(orgName, this.orgs)){
            return findElement(orgName, this.orgs).getName();
        } else{
            return undefined;
        }
    }

    modifyAffair(affairName: string, newName?: string, newTime?: string){
        if(typeof newName !== 'undefined'){
            if(checkDoubles(affairName, this.affairs)){
                findElement(affairName, this.affairs).setName(newName);
            } else {
                console.log("This affair does not yet exist in the Affair Manager.");
            }
        } else {
            if(checkDoubles(affairName, this.affairs)){
                findElement(affairName, this.affairs).setTime(newTime);
            } else {
                console.log("This affair does not yet exist in the Affair Manager.");
            }
        }
    }

    addAffairToOrganization(affairName: string, orgName: string){
        if(checkDoubles(orgName, this.orgs) && checkDoubles(affairName, this.affairs)){
            findElement(orgName, this.orgs).addAffair(findElement(affairName, this.affairs));
        }else{ 
            console.log("This organization or affair does not yet exist in the Affair Manager.");
        }
    }

    getMembers(affairName: string): string[]{
        let mems: string[];
        if(checkDoubles(affairName, this.affairs)){
            findElement(affairName, this.affairs).getMembers().forEach(element => {
                mems.push(element);
            });
        } else{
            console.log("This affair does not yet exist in the Affair Manager and thus has zero members.");
            mems[0] = "no members";
        }
        return mems;
    }
}

//Takes a string and any value (intended to be an array of one of the classes I have defined) 
//and determines if there is an element in that array that has that string as its name value
//Returns a bool
function checkDoubles(name: string, arr): boolean{
    let isDouble: boolean = false;
    arr.forEach(element => {
        if(name === element.getName()){
            isDouble = true;
        }
    });
    
    return isDouble;
}

//Takes a string and any value (intended to be an array of one of the classes I have defined) 
//and returns the element within the array that has that string as a name
//Only used after it has been determined that an item with that name is in the array
function findElement(name: string, arr): any {
    return arr[arr.indexOf[name]];
}