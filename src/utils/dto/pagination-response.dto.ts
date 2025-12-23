import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  rows: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
}

export function PaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    rows!: T[];

    @ApiProperty({
      type: Object,
      example: {
        totalItems: 0,
        itemsPerPage: 0,
        currentPage: 0,
      },
    })
    meta!: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
    };
  }
  // Object.defineProperty(Pagination, 'name', { value: `Pagination${classReference.name}` });

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
