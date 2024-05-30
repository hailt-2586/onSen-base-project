export const PoolMock = {
  store: {
    id: 1,
    created_at: '2024-05-20T19:49:52.062Z',
  },
  listPool: {
    items: [
      {
        pool_id: 1,
        pool_project_name: 'Project name',
        pool_ticker: 'TICKER',
        pool_participants: 1234,
        pool_funds_raised: '12345678.00000000',
        pool_live_until: null,
        pool_status: 'Upcoming',
        pool_opens_on: null,
        pool_chain: 'ETH',
        pool_start_date: null,
        pool_curator: 'ETH',
        pool_created_at: '2024-05-28T00:54:54.101Z',
        pool_updated_at: '2024-05-28T00:54:54.101Z',
      },
    ],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  },
  poolWithInformation: {
    id: 4,
    project_name: 'project 4',
    ticker: 'string',
    participants: 0,
    funds_raised: '0.00000000',
    live_until: '2024-05-29T14:48:00.000Z',
    status: 'Upcoming',
    opens_on: '2024-05-29T14:48:00.000Z',
    chain: 'string',
    start_date: '2024-05-29T14:48:00.000Z',
    curator: 'string',
    social_links: [
      {
        url: 'https://projectwebsite.com',
        name: 'website',
      },
      {
        url: 'https://twitter.com/project',
        name: 'twitter',
      },
    ],
    token_vesting: true,
    lbp_type: 'string',
    about: 'string',
    created_at: '2024-05-28T23:45:51.088Z',
    updated_at: '2024-05-28T23:45:51.088Z',
    prices: [
      {
        id: 2,
        current_price: '0.0000000000',
        market_cap: '0.00',
        liquidity: '0.00',
        pool_value: '0.00',
        fdv: '0.00',
        volume: '0.00',
        created_at: '2024-05-28T23:45:51.101Z',
        updated_at: '2024-05-28T23:45:51.101Z',
      },
    ],
    price_histories: [
      {
        id: 1,
        date: '2024-05-29T06:45:51.108Z',
        price: '0.0000000000',
        created_at: '2024-05-28T23:45:51.109Z',
        updated_at: '2024-05-28T23:45:51.109Z',
      },
    ],
    team_members: [],
    ecosystems: [],
  },
};
