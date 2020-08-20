import React from 'react';
import {Text} from '@app/core';

export const TextSample = (): JSX.Element => {
  return (
    <>
      <Text type='h1'>H1</Text>
      <Text type='h2'>H2</Text>
      <Text type='h3'>H3</Text>
      <Text type='h4'>H4</Text>
      <Text type='h5'>H5</Text>
      <Text type='h6'>H6</Text>
      <Text type='label'>label</Text>
      <Text type='p'>paragraph</Text>
      <Text uppercase>uppercase</Text>
      <Text lowercase>LOWERCASE</Text>
    </>
  );
};
