/* Stephen Johnson
 * CSCI 4602-12
 * Assigment 2: Affair Manager
 * 9/23/2021
 *
 * Classes and functions used to interact with the UI created by Dr. James Church for an Affair Manager
 */
//Class that represents any affair (event) being put on by an organization
//Affairs have names, locations (zip codes), times, and a list of members putting on the event
var Affair = /** @class */ (function () {
    function Affair(name, locale, time) {
        this.name = name;
        this.locale = locale;
        this.time = time;
        this.members = [];
    }
    Affair.prototype.getName = function () {
        return this.name;
    };
    Affair.prototype.setName = function (name) {
        this.name = name;
    };
    Affair.prototype.getLocale = function () {
        return this.locale;
    };
    Affair.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    Affair.prototype.getTime = function () {
        return this.time;
    };
    Affair.prototype.setTime = function (time) {
        this.time = time;
    };
    Affair.prototype.getMembers = function () {
        return this.members;
    };
    Affair.prototype.addMember = function (member) {
        if (checkDoubles(member.getName(), this.members)) {
            console.log("This member is already part of this affair.");
        }
        else {
            this.members.push(member);
        }
    };
    Affair.prototype.removeMember = function (member) {
        if (checkDoubles(member.getName(), this.members)) {
            var index = this.members.indexOf(member);
            delete this.members[index];
        }
        else {
            console.log("This member is not part of this affair.");
        }
    };
    return Affair;
}());
//Class that represents any individual member within the system
//Each Member has a name and email address
var Member = /** @class */ (function () {
    function Member(name, email) {
        this.name = name;
        this.email = email;
    }
    Member.prototype.getName = function () {
        return this.name;
    };
    Member.prototype.getEmail = function () {
        return this.email;
    };
    return Member;
}());
//Class that represents an Organization
//It has a name and an array of type Affair that holds all the affairs being put on by the organization
var Org = /** @class */ (function () {
    function Org(name) {
        this.name = name;
        this.affairs = [];
    }
    Org.prototype.addAffair = function (affair) {
        this.affairs.push(affair);
    };
    Org.prototype.getName = function () {
        return this.name;
    };
    return Org;
}());
//Affair Manager class that is used to implement all the major functions of the program
//Has arrays of Member, Affair, and Org type
var AffairManager = /** @class */ (function () {
    function AffairManager() {
        this.members = [];
        this.affairs = [];
        this.orgs = [];
    }
    AffairManager.prototype.addMember = function (memName, email) {
        if (checkDoubles(memName, this.members)) {
            console.log("This member is already part of the Affair Manager.");
        }
        else {
            this.members.push(new Member(memName, email));
        }
    };
    AffairManager.prototype.addAffair = function (affairName, locale, date) {
        if (checkDoubles(affairName, this.affairs)) {
            console.log("This affair is already part of the Affair Manager.");
        }
        else {
            this.affairs.push(new Affair(affairName, locale, date));
        }
    };
    AffairManager.prototype.addOrganization = function (orgName) {
        if (checkDoubles(orgName, this.orgs)) {
            console.log("This organization is already part of the Affair Manager.");
        }
        else {
            this.orgs.push(new Org(orgName));
        }
    };
    AffairManager.prototype.addMemberToAffair = function (memName, affairName) {
        if (checkDoubles(memName, this.members) && checkDoubles(affairName, this.affairs)) {
            findElement(affairName, this.affairs).addMember(findElement(memName, this.members));
        }
        else {
            console.log("This member or affair does not yet exist in the Affair Manager.");
        }
    };
    AffairManager.prototype.findMemberNames = function (memName) {
        if (checkDoubles(memName, this.members)) {
            return findElement(memName, this.members).getName();
        }
        else {
            return undefined;
        }
    };
    AffairManager.prototype.findAffairNames = function (affairName) {
        if (checkDoubles(affairName, this.affairs)) {
            return findElement(affairName, this.affairs).getName();
        }
        else {
            return undefined;
        }
    };
    AffairManager.prototype.findOrganizationNames = function (orgName) {
        if (checkDoubles(orgName, this.orgs)) {
            return findElement(orgName, this.orgs).getName();
        }
        else {
            return undefined;
        }
    };
    AffairManager.prototype.modifyAffair = function (affairName, newName, newTime) {
        if (typeof newName !== 'undefined') {
            if (checkDoubles(affairName, this.affairs)) {
                findElement(affairName, this.affairs).setName(newName);
            }
            else {
                console.log("This affair does not yet exist in the Affair Manager.");
            }
        }
        else {
            if (checkDoubles(affairName, this.affairs)) {
                findElement(affairName, this.affairs).setTime(newTime);
            }
            else {
                console.log("This affair does not yet exist in the Affair Manager.");
            }
        }
    };
    AffairManager.prototype.addAffairToOrganization = function (affairName, orgName) {
        if (checkDoubles(orgName, this.orgs) && checkDoubles(affairName, this.affairs)) {
            findElement(orgName, this.orgs).addAffair(findElement(affairName, this.affairs));
        }
        else {
            console.log("This organization or affair does not yet exist in the Affair Manager.");
        }
    };
    AffairManager.prototype.getMembers = function (affairName) {
        var mems;
        if (checkDoubles(affairName, this.affairs)) {
            findElement(affairName, this.affairs).getMembers().forEach(function (element) {
                mems.push(element);
            });
        }
        else {
            console.log("This affair does not yet exist in the Affair Manager and thus has zero members.");
            mems[0] = "no members";
        }
        return mems;
    };
    return AffairManager;
}());
//Takes a string and any value (intended to be an array of one of the classes I have defined) 
//and determines if there is an element in that array that has that string as its name value
//Returns a bool
function checkDoubles(name, arr) {
    var isDouble = false;
    arr.forEach(function (element) {
        if (name === element.getName()) {
            isDouble = true;
        }
    });
    return isDouble;
}
//Takes a string and any value (intended to be an array of one of the classes I have defined) 
//and returns the element within the array that has that string as a name
//Only used after it has been determined that an item with that name is in the array
function findElement(name, arr) {
    return arr[arr.indexOf[name]];
}
