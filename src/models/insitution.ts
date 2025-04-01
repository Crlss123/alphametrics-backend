import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Person } from "./person";

interface InstitutionAttributes {
  id: number;
  name: string;
}

interface InstitutionCreationAttributes
  extends Optional<InstitutionAttributes, "id"> {}

@Table({
  tableName: "institutions",
  timestamps: true,
})
export class Institution extends Model<
  InstitutionAttributes,
  InstitutionCreationAttributes
> {
  @Column
  name!: string;

  @HasMany(() => Person)
  people!: Person[];
}
