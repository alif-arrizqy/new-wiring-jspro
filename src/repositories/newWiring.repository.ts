import NewWiring from "../models/newWiring.model";

interface INewWiring {
  save(newWiring: NewWiring): Promise<NewWiring>;
  retrieveAll(): Promise<NewWiring[]>;
  retrieveBySitesId(sites_id: string): Promise<NewWiring | null>;
  update(tutorial: NewWiring): Promise<number>;
  delete(id: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class NewWiringRepository implements INewWiring {
  async save(newWiring: NewWiring): Promise<NewWiring> {
    try {
      // validate sites_id in database
      const isExist = await NewWiring.findOne({
        where: { sites_id: newWiring.sites_id },
      });
      if (isExist) {
        throw new Error(
          `sites_id: ${newWiring.sites_id} already exist in database`
        );
      }
      const saveData = await NewWiring.create({
        sites_id: newWiring.sites_id,
        status: newWiring.status,
        source_modbus: newWiring.source_modbus.toLowerCase(),
        notes: newWiring.notes,
      });

      const resp:any = {
        message: "success",
        data: saveData,
      }
      return resp;
    } catch (err) {
      throw new Error(`Failed to create data, ${err}`);
    }
  }

  async retrieveAll(): Promise<NewWiring[]> {
    try {
      return await NewWiring.findAll();
    } catch (err) {
      throw new Error(`Failed to retrieve all data, ${err}`);
    }
  }

  async retrieveBySitesId(sites_id: string): Promise<NewWiring | null> {
    try {
      return await NewWiring.findOne({ where: { sites_id: sites_id } });
    } catch (err) {
      throw new Error(`Failed to retrieve data, ${err}`);
    }
  }

  async update(newWiring: NewWiring): Promise<number> {
    const { id, sites_id, status, source_modbus, notes } = newWiring;
    try {
      const response = await NewWiring.update(
        { sites_id, status, source_modbus, notes },
        { where: { id: id } }
      );
      return response[0];
    } catch (err) {
      throw new Error(`failed to update data, ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const response = await NewWiring.destroy({
        where: { id: id },
      });

      return response;
    } catch (err) {
      throw new Error(`Failed to delete data, ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return NewWiring.destroy({
        where: {},
        truncate: false,
      });
    } catch (err) {
      throw new Error(`Failed to delete data, ${err}`);
    }
  }
}

export default new NewWiringRepository();
