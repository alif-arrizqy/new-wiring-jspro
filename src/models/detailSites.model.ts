import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({ tableName: "detailssites", timestamps: false })

export default class DetailSites extends Model {
  @Column({
    type: DataType.STRING(10),
    field: "site_id_name",
  })
  site_id_name?: string;

  @Column({
    type: DataType.STRING(10),
    field: "name",
  })
  name?: string;
}
