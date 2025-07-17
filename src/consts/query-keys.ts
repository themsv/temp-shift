const queryKeys = {
  portfolio: {
    all: ['portfolio'] as const,
    list: () => [...queryKeys.portfolio.all, 'list'] as const,
    details: (id: string) => [...queryKeys.portfolio.all, id] as const,
  },
  setting: {
    all: ['setting'] as const,
    static: () => [...queryKeys.setting.all, 'static'] as const,
    byUser: (userId: string) => [...queryKeys.setting.all, userId] as const,
  },
};

export const mutationKeys = {
  portfolio: {
    create: () => [...queryKeys.portfolio.all, 'create'],
    update: (id: string) => [...queryKeys.portfolio.all, 'update', id],
  },
  settings: {
    update: (id: string) => [...queryKeys.setting.all, 'update', id],
  },
};

export default queryKeys;
