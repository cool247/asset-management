import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import {
  ASSET,
  ASSET_ITEM,
  ASSET_REQ,
  ASSET_TYPE,
  LOCATION,
  RACK_COUPBOARD,
  ROW,
} from "../urls";

export const useGetRows = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllRow"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(ROW);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllRow"] });
  };
  return { data, isLoading, isError, refetch };
};
export const useGetLocation = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllLocation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(LOCATION);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllLocation"] });
  };
  return { data, isLoading, isError, refetch };
};

export const useGetRackCupBoard = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllRackCupboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(RACK_COUPBOARD);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllRackCupboard"] });
  };
  return { data, isLoading, isError, refetch };
};
export const useGetAssets = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllAssets"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(ASSET);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllAssets"] });
  };
  return { data, isLoading, isError, refetch };
};

export const useGetAssetsById = id => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAssetsById", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.get(ASSET + "/" + id);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAssetsById"] });
  };
  return { data, isLoading, isError, refetch };
};

export const useGetAssetTypes = () => {
  const { data } = useQuery({
    queryKey: ["getAllAssetTypes"],
    queryFn: async () => {
      return (await axiosInstance.get(ASSET_TYPE)).data;
    },
  });

  return { data };
};

export const useGetAllAssetTypes = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllAssetTypesWithProperty"],
    queryFn: async () => {
      return (await axiosInstance.get(ASSET_TYPE)).data;
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["getAllAssetTypesWithProperty"],
    });
  };

  return { data, isLoading, refetch };
};

export const useGetAssetItemByAssetId = id => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getAllAssetItemsByAssetID", id],
    queryFn: async () => {
      return (await axiosInstance.get(ASSET_ITEM + "/" + id)).data;
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllAssetItemsByAssetID"] });
  };

  return { data, isLoading, refetch };
};

export const useGetAssetTypeWithPropertiesById = id => {
  console.log(id, "id");
  const { data, isLoading } = useQuery({
    queryKey: ["getAssetTypeWithPropertiesById", id],
    queryFn: async () => {
      return (await axiosInstance.get(ASSET_TYPE + "/" + id)).data;
    },
  });

  return { data, isLoading };
};

export const useGetMyAllAssetsRequest = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-all-requests"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(ASSET_REQ + "/my-all-requests");
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["my-all-requests"] });
  };
  return { data, isLoading, isError, refetch };
};
export const useGetAllAssetsRequestAdmin = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllAssetsRequestAdmin"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(ASSET_REQ);
      return data;
    },
  });
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["getAllAssetsRequestAdmin"] });
  };
  return { data, isLoading, isError, refetch };
};
