import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Person } from "./person";

interface ZoneAttributes {
  id: number;
  name: string;
  state: string;
}

interface ZoneCreationAttributes extends Optional<ZoneAttributes, "id"> {}

@Table({
  tableName: "zones",
  timestamps: true,
})
export class Zone extends Model<ZoneAttributes, ZoneCreationAttributes> {
  @Column
  name!: string;

  @Column
  state!: string;

  @HasMany(() => Person)
  people!: Person[];

}
