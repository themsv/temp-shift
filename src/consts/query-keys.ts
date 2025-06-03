const queryKeys = {
  portfolio: {
    all: ['portfolio'],
    list: () => [...queryKeys.portfolio.all, 'list'],
    details: (id: string) => [...queryKeys.portfolio.all, id],
  },
};

export default queryKeys;
