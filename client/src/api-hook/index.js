import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { ASSET, LOCATION, RACK_COUPBOARD, ROW } from "../urls";

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
