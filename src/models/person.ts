import {
  Table,
  Model,
  Column,
  DataType,
  Unique,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Population } from "./population";

interface PersonAttributes {
  id: number;
  first_name: string;
  second_name?: string;
  first_lastname: string;
  second_lastname: string;
  curp: string;
  gender: string;
  status: boolean;
  population_id: number;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, "id"> {}

@Table({
  tableName: "people",
  timestamps: true,
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes> {
  @Column({
    type: DataType.STRING(50),
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(50),
  })
  second_name?: string;

  @Column({
    type: DataType.STRING(50),
  })
  first_lastname!: string;

  @Column({
    type: DataType.STRING(50),
  })
  second_lastname!: string;

  @Unique({ name: "curp_unique", msg: "curp_should_be_unique" })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(18),
  })
  curp!: string;

  @Column({
    type: DataType.STRING(1),
  })
  gender!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status!: boolean;

  @ForeignKey(() => Population)
  @Column({
    type: DataType.INTEGER,
  })
  population_id!: number;

  @BelongsTo(() => Population, {
    foreignKey: "population_id",
    constraints: false,
  })
  population!: Population;
}
