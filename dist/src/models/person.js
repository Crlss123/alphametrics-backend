"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const zone_1 = require("./zone");
let Person = class Person extends sequelize_typescript_1.Model {
    first_name;
    second_name;
    first_lastname;
    second_lastname;
    curp;
    gender;
    status;
    zone_id;
    zone;
};
exports.Person = Person;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    __metadata("design:type", String)
], Person.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    __metadata("design:type", String)
], Person.prototype, "second_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    __metadata("design:type", String)
], Person.prototype, "first_lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    __metadata("design:type", String)
], Person.prototype, "second_lastname", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(18),
    }),
    __metadata("design:type", String)
], Person.prototype, "curp", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1),
    }),
    __metadata("design:type", String)
], Person.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Person.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => zone_1.Zone),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Person.prototype, "zone_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => zone_1.Zone),
    __metadata("design:type", zone_1.Zone)
], Person.prototype, "zone", void 0);
exports.Person = Person = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "people",
        timestamps: true,
    })
], Person);
