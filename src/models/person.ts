import {Table, Model, Column, DataType, Unique, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import {Zone} from './zone'

interface PersonAttributes{
  id: number;
  first_name: string;
  second_name?: string;
  first_lastname: string;
  second_lastname: string;
  curp: string;
  genero: string;
  graduado: boolean;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'>{}

@Table ({
  tableName: "Evaluados",
  timestamps: true,
})
export class Person extends Model<PersonAttributes, PersonCreationAttributes>{
 
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
    type:DataType.STRING(50),
   })
   second_lastname!: string;

   @Unique
   @Column({
    type:DataType.STRING(18),
   })
   curp!: string;

   @Column({
    type:DataType.STRING(1),
   })
   genero!: string;

   @Column({
    type:DataType.BOOLEAN,
    defaultValue:false,
   })
   graduado!:boolean;

   @ForeignKey(() => Zone)
   @Column
   zone_id!:number;

   @BelongsTo(() => Zone)
   zone!: Zone;
}