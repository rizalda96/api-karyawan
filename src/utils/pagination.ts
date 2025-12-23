import { PaginationResponseDto } from './dto/pagination-response.dto';
import { IPaginationMeta } from './pagination-meta';

export const pagination = <T>(
  rows: T[],
  options: IPaginationMeta,
): PaginationResponseDto<T> => {
  return {
    rows,
    meta: options,
  };
};
