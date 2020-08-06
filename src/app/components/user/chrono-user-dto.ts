import { ChronoListDto } from '../list/chrono-list-dto';

export interface ChronoUserDto {
  id: number;
  userName: string;
  emailAddress: string;
  userLists: ChronoListDto[];
}
