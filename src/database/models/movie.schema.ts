import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { MovieFormatsEnum } from '../../shared/constants';

@Table({
  timestamps: true,
  tableName: 'movies'
})
export class MovieModel extends Model{
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
    title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    year!: number;

  @Column({
    type: DataType.ENUM(...Object.values(MovieFormatsEnum)),
    allowNull: false
  })
    format!: MovieFormatsEnum;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    actors!: string;
}
