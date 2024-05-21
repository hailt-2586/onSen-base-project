export const getCurrentDate = () => {
  return new Date().toISOString();
};

export const exampleSuccessResponse = (status: number, message: string, data: any) => {
  return {
    status: status,
    description: message,
    schema: {
      example: {
        statusCode: status,
        message,
        data,
      },
    },
  };
};

export const exampleErrorResponse = (status: number, type: any) => {
  return {
    status: status,
    description: 'Error Response',
    type: type,
  };
};
