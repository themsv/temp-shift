const queryKeys = {
  portfolio: {
    all: ['portfolio'] as const,
    list: () => [...queryKeys.portfolio.all, 'list'] as const,
    details: (id: string) => [...queryKeys.portfolio.all, id] as const,
  },
  setting: {
    all: ['setting'] as const,
    default: () => [...queryKeys.setting.all, 'default'] as const,
    byUser: (userId: string) => [...queryKeys.setting.all, userId] as const,
  },
};

export default queryKeys;
