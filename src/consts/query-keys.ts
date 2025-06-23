const queryKeys = {
  portfolio: {
    all: ['portfolio'] as const,
    list: () => [...queryKeys.portfolio.all, 'list'] as const,
    details: (id: string) => [...queryKeys.portfolio.all, id] as const,
  },
};

export default queryKeys;
