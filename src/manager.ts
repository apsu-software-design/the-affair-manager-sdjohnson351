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
    private locale: string;
    private time: string;
    private members: Member[];

    constructor(name: string, locale: string, time: string){
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

    getLocale(): string {
        return this.locale;
    }
    setLocale(locale: string){
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
}

//Class that represents any individual member within the system
//Each Member has a name and email address and a value that dictates if it is part of an affair
class Member {
    private name: string;
    private email: string;
    private isInAffair: boolean;

    constructor(name?: string, email?: string){
        this.name = name;
        this.email = email;
        this.isInAffair = false;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }

    getIsInAffair(): boolean{
        return this.isInAffair;
    }

    swapAffair(){
        if(this.isInAffair){ this.isInAffair = false;}
        else { this.isInAffair = true;}
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
    private members: Member[];
    private affairs: Affair[];
    private orgs: Org[];

    constructor(){
        this.members = [];
        this.affairs = [];
        this.orgs = [];
    }

    addMember(memName: string, email: string){
        let validEmail: boolean = true;

        if(email === "" || email.indexOf("@") === -1 || email.indexOf(" ") >= 0){ validEmail = false;}
        if(checkDoubles(memName, this.members)){
            console.log("This member is already part of the Affair Manager.");
        }else if(memName === "" || validEmail === false){ console.log("Invalid input: Empty parameter or invalid email.");}
        else { this.members.push(new Member(memName, email)); console.log('User added!'); }
    }

    addAffair(affairName: string, locale: string, date: string): number{
        if(checkDoubles(affairName, this.affairs)){
            console.log("This affair is already part of the Affair Manager.");
            return -1;
        }else if(affairName === "" || locale === "" || date === ""){console.log("Invalid input."); return -1;}
        else { this.affairs.push(new Affair(affairName, locale, date)); return 0;}   
    }

    addOrganization(orgName: string): number{
        if(checkDoubles(orgName, this.orgs)){
            console.log("This organization is already part of the Affair Manager.");
            return -1;
        }else if(orgName === ""){ console.log("Invalid input."); return -1;}
        else { this.orgs.push(new Org(orgName)); return 0;}   
    }

    addMemberToAffair(memName: string, affairName: string){
        let member: Member = findElement(memName, this.members);
        if(checkDoubles(memName, this.members) && checkDoubles(affairName, this.affairs) && member.getIsInAffair() === false){
            findElement(affairName, this.affairs).addMember(member);
            member.swapAffair();
        }else if(member.getIsInAffair()){ 
            console.log("This member, " + memName + ", is already part of an affair."); 
        }else{ 
            console.log("This member or affair does not yet exist in the Affair Manager.");
        }
    }

    findMemberNames(memName: string): string[] | undefined{
        if(checkDoubles(memName, this.members)){
            let memNames: string[] = [];
            memNames[0] = memName;
            return memNames;
        } else{
            return undefined;
        }
    }

    findAffairNames(affairName: string): string[] | undefined{
        if(checkDoubles(affairName, this.affairs)){
            let affairNames: string[] = [];
            affairNames[0] = affairName;
            return affairNames;
        } else{
            return undefined;
        }
    }

    findOrganizationNames(orgName: string): string[] | undefined{
        if(checkDoubles(orgName, this.orgs)){
            let orgNames: string[] = [];
            orgNames[0] = orgName;
            return orgNames;
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
        let mems: string[] = [];
        if(checkDoubles(affairName, this.affairs)){
            findElement(affairName, this.affairs).getMembers().forEach(element => {
                mems.push(element.getName());
            });
        } else{
            mems[0] = "no members";
        }
        return mems;
    }
}

//Takes a string and any array (intended to be an array of one of the classes I have defined) 
//and determines if there is an element in that array that has that string as its name value
//Returns a bool
function checkDoubles(name: string, arr: any[]): boolean{
    let isDouble: boolean = false;
    arr.forEach(element => {
        if(name === element.getName()){
            isDouble = true;
        }
    });
    return isDouble;
}

//Takes a string and any array (intended to be an array of one of the classes I have defined) 
//and returns the element within the array that has that string as a name
//Only used after it has been determined that an item with that name is in the array
function findElement(name: string, arr: any[]): any {
    let elm;
    arr.forEach(element => {
        if(name === element.getName()){
            elm = element;
        }
    })
    return arr[arr.indexOf(elm, 0)];
}

export { AffairManager };