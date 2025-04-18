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
exports.Institution = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const person_1 = require("./person");
let Institution = class Institution extends sequelize_typescript_1.Model {
    name;
    people;
};
exports.Institution = Institution;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Institution.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => person_1.Person),
    __metadata("design:type", Array)
], Institution.prototype, "people", void 0);
exports.Institution = Institution = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "institutions",
        timestamps: true,
    })
], Institution);
