import { ASSET, ASSET_ITEM, ASSET_REQ, ASSET_TYPE, LOCATION, RACK_COUPBOARD, ROW } from "../urls";
import axiosInstance from "../utils/axios";

export const addUpdateRow = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(ROW + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(ROW + `/create-new`, req);
  return data;
};

export const deleteRow = async id => {
  const data = await axiosInstance.delete(ROW + `/${id}`);
  return data;
};

export const addUpdatLocation = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(LOCATION + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(LOCATION + `/create-new`, req);
  return data;
};

export const deleteLocation = async id => {
  const data = await axiosInstance.delete(LOCATION + `/${id}`);
  return data;
};

export const addUpdatRackCupBoard = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(RACK_COUPBOARD + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(RACK_COUPBOARD + `/create-new`, req);
  return data;
};

export const deleteRackCupBoard = async id => {
  const data = await axiosInstance.delete(RACK_COUPBOARD + `/${id}`);
  return data;
};

export const addUpdatAsset = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(ASSET + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(ASSET + `/create-new`, req);
  return data;
};

export const deleteAsset = async id => {
  const data = await axiosInstance.delete(ASSET + `/${id}`);
  return data;
};
export const createAsstReq = async req => {
  const data = await axiosInstance.post(ASSET_REQ + `/create-new`, req);
  return data;
};
export const updateReqByAdmin = async (req, id) => {
  const data = await axiosInstance.put(ASSET_REQ + `/${id}`, req);
  return data;
};


export const addUpdateAssetType = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(ASSET_TYPE + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(ASSET_TYPE + `/create-new`, req);
  return data;
};

export const addUpdateAssetItem = async (req, id) => {
  if (id) {
    const data = await axiosInstance.patch(ASSET_ITEM + `/${id}`, req);
    return data;
  }
  const data = await axiosInstance.post(ASSET_ITEM + `/create-new`, req);
  return data;
};