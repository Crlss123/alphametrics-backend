import {
  Table,
  Model,
  Column,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Person } from "./person";
import { Zone } from "./zone";

interface PopulationAttributes {
  id: number;
  age: number;
  zone_id: number;
}

interface PopulationCreationAttributes
  extends Optional<PopulationAttributes, "id"> {}

@Table({
  tableName: "populations",
  timestamps: true,
})
export class Population extends Model<
  PopulationAttributes,
  PopulationCreationAttributes
> {
  @Column
  age!: number;

  @ForeignKey(() => Zone)
  @Column
  zone_id!: number;

  @BelongsTo(() => Zone, {
    foreignKey: "zone_id",
    constraints: false,
  })
  zone!: Zone;

  @HasMany(() => Person)
  people!: Person[];
}
