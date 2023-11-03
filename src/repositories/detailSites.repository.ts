import DetailSites from "../models/detailSites.model";

interface IDetailSites {
  retrieveAll(): Promise<DetailSites[]>;
}

class DetailSitesRepository implements IDetailSites {
  async retrieveAll(): Promise<DetailSites[]> {
    try {
      const data = await DetailSites.findAll();
      const response: any = {
        message: "success",
        data,
      }
      return response;
    } catch (err) {
      throw new Error(`Failed to retrieve all data, ${err}`);
    }
  }
}

export default new DetailSitesRepository();