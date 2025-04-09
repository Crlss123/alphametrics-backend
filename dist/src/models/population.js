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
exports.Population = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const person_1 = require("./person");
const zone_1 = require("./zone");
let Population = class Population extends sequelize_typescript_1.Model {
    age;
    zone_id;
    zone;
    people;
};
exports.Population = Population;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Population.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => zone_1.Zone),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Population.prototype, "zone_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => zone_1.Zone, {
        foreignKey: "zone_id",
        constraints: false,
    }),
    __metadata("design:type", zone_1.Zone)
], Population.prototype, "zone", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => person_1.Person),
    __metadata("design:type", Array)
], Population.prototype, "people", void 0);
exports.Population = Population = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "populations",
        timestamps: true,
    })
], Population);
