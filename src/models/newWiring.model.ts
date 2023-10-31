import { Column, DataType, Model, Table } from "sequelize-typescript";
import { SourceModbus } from "./status.enum";

@Table({ tableName: "new_wiring_jspro" })

export default class NewWiring extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @Column({
    type: DataType.STRING(10),
    field: "sites_id",
  })
  sites_id?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "status",
  })
  status?: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(SourceModbus)),
    field: "source_modbus",
    allowNull: false,
  })
  source_modbus: any;

  @Column({
    type: DataType.STRING(255),
    field: "notes",
  })
  notes?: string;
}
