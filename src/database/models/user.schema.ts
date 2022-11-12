import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users'
})
export class UserModel extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    email!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false
    })
      name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    password!: string;
}

