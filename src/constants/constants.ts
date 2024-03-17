export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1280,
};

export const routes = {
  main: '/',
  login: '/login',
  register: '/register',
  recoverPassword: '/recover-password',
  regulations: '/regulations',
  aboutUs: '/about-us',
  accountSettings: '/account-settings',
  product: '/product',
  productList: '/product-list',
  addProduct: '/add-product',
  cart: '/cart',
  buyWithoutRegister: '/buy-without-register',
  deliverySummary: '/delivery-summary',
};

export const avatarColors = [
  '#ff7f0e',
  '#1f77b4',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

export const ConstantProduct = () => {
  const categoryOptions = [
    {
      name: 'Headphones',
      id: 1,
      nameValue: 'Headphones',
    },
    {
      name: 'Smartwatch',
      id: 2,
      nameValue: 'Smartwatch',
    },
    {
      name: 'Watch',
      id: 3,
      nameValue: 'Watch',
    },
  ];

  return {
    categoryOptions,
  };
};
