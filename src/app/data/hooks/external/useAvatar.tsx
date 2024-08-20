import { useQuery } from "react-query";
import { FindAvatarByNameUseCase } from "../../use-cases/external/find-avatar-by-name";

export function useAvatar(name: string) {
  return useQuery(["avatar", name], {
    queryFn: async () => await FindAvatarByNameUseCase.execute(name),
  });
}