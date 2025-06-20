'use client';

import { ActionIcon, Pagination, Table } from '@mantine/core';
import { IconChecks, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './BooksTable.module.css';
import React, { FC } from 'react';
import { useToggle } from '@mantine/hooks';
import { usePagination } from '@/app/hooks/usePagination';
import { Book } from '@/app/search/books/types/books';

interface BooksTableProps {
  data: Book[];
  withDelete?: boolean;
  deleteRows?: (ids: string) => void;
}
const BooksTable: FC<BooksTableProps> = ({ data, withDelete, deleteRows }) => {
  const { currentItems, page, total, setPage } = usePagination<Book>(data);
  const [isEditable, setIsEditable] = useToggle();

  const rows = currentItems.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.publisher}</Table.Td>
      <Table.Td>{item.genere}</Table.Td>
      <Table.Td>{item.publishedYear}</Table.Td>
      <Table.Td>{item.publicationCount}</Table.Td>
      {withDelete && isEditable && (
        <Table.Td p={10}>
          <ActionIcon color="red" variant="subtle" onClick={() => deleteRows?.(item.id)}>
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table
      horizontalSpacing="20px"
      verticalSpacing="16px"
      highlightOnHover
      className=" mt-8 rounded-md"
      highlightOnHoverColor="#4169ee16"
      bg="#ffffff"
      withRowBorders
    >
      <Table.Thead bg="#262628">
        <Table.Tr>
          <Table.Th className="text-[16px] text-white ">Название</Table.Th>
          <Table.Th className="text-[16px] text-white ">Издатель</Table.Th>
          <Table.Th className="text-[16px] text-white ">Жанр</Table.Th>
          <Table.Th className="text-[16px] text-white ">Год издания</Table.Th>
          <Table.Th className="text-[16px] text-white ">Количество книг</Table.Th>
          <Table.Th px={10} className="w-[40px]">
            <ActionIcon onClick={() => setIsEditable()} variant="subtle" color="white">
              {!isEditable ? <IconEdit /> : <IconChecks />}
            </ActionIcon>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>
        <div className="flex justify-center">
          <Pagination
            size="md"
            classNames={{ control: classes.paginationControls }}
            color="#E6D4E6"
            total={total}
            value={page}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </Table.Caption>
    </Table>
  );
};

export default BooksTable;
